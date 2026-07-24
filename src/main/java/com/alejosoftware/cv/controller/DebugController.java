package com.alejosoftware.cv.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/debug")
@Slf4j
public class DebugController {

    private static final String RESEND_API_URL = "https://api.resend.com/emails";

    @Value("${resend.api-key:}")
    private String apiKey;

    @Value("${app.mail.to:alejosoftwarelabs@gmail.com}")
    private String mailTo;

    @GetMapping("/email-test")
    public Map<String, Object> testEmail() {
        Map<String, Object> result = new LinkedHashMap<>();

        result.put("service", "Resend");
        result.put("apiKeyConfigured", apiKey != null && !apiKey.isBlank());

        if (apiKey == null || apiKey.isBlank()) {
            result.put("status", "ERROR");
            result.put("message", "Resend API key not configured. Set RESEND_API_KEY env var.");
            return result;
        }

        try {
            RestTemplate restTemplate = new RestTemplate();

            Map<String, Object> body = new HashMap<>();
            body.put("from", "CV Website <onboarding@resend.dev>");
            body.put("to", List.of(mailTo));
            body.put("subject", "[TEST] Debug email from CV backend");
            body.put("html", "<h2>Test email</h2><p>Sent from CV backend at " + java.time.Instant.now() + "</p>");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(RESEND_API_URL, request, String.class);

            result.put("httpStatus", response.getStatusCode().value());
            result.put("response", response.getBody());

            if (response.getStatusCode().is2xxSuccessful()) {
                result.put("status", "OK");
                result.put("message", "Email sent! Check inbox and spam.");
            } else {
                result.put("status", "ERROR");
            }
        } catch (Exception e) {
            result.put("status", "ERROR");
            result.put("errorClass", e.getClass().getName());
            result.put("errorMessage", e.getMessage());
            if (e.getCause() != null) {
                result.put("rootCause", e.getCause().getMessage());
            }
        }

        return result;
    }
}
