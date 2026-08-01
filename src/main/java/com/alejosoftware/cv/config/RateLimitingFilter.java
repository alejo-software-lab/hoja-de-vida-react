package com.alejosoftware.cv.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
@Slf4j
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS = 5;
    private static final long TIME_WINDOW_MS = 10 * 60 * 1000; // 10 minutos

    private final Map<String, RequestTracker> ipTrackers = new ConcurrentHashMap<>();

    private static class RequestTracker {
        final long startTime = System.currentTimeMillis();
        final AtomicInteger count = new AtomicInteger(1);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        if ("/api/contact".equals(path) && "POST".equalsIgnoreCase(request.getMethod())) {
            String clientIp = getClientIp(request);
            long now = System.currentTimeMillis();

            RequestTracker tracker = ipTrackers.compute(clientIp, (ip, currentTracker) -> {
                if (currentTracker == null || (now - currentTracker.startTime) > TIME_WINDOW_MS) {
                    return new RequestTracker();
                } else {
                    currentTracker.count.incrementAndGet();
                    return currentTracker;
                }
            });

            if (tracker.count.get() > MAX_REQUESTS) {
                log.warn("Rate limit exceeded for IP: {} on /api/contact", clientIp);
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("""
                        {"ok":false,"saved":false,"emailSent":false,"error":"Has superado el límite de envíos de mensajes. Por favor, intenta de nuevo en unos minutos."}
                        """);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String cfConnectingIp = request.getHeader("CF-Connecting-IP");
        if (cfConnectingIp != null && !cfConnectingIp.isBlank()) {
            return cfConnectingIp.trim();
        }
        return request.getRemoteAddr();
    }
}
