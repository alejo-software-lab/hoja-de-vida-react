package com.alejosoftware.cv.service;

import com.alejosoftware.cv.model.ContactMessage;
import com.alejosoftware.cv.repository.ContactMessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class EmailNotificationService {

    private static final String RESEND_API_URL = "https://api.resend.com/emails";
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${resend.api-key:}")
    private String apiKey;

    @Value("${app.mail.to:alejosoftwarelabs@gmail.com}")
    private String mailTo;

    @Async
    public void sendContactEmail(ContactMessage message, ContactMessageRepository repository) {
        log.info("Attempting to send email via Resend for message ID: {}", message.getId());

        if (apiKey == null || apiKey.isBlank()) {
            log.warn("Resend API key not configured, skipping email");
            return;
        }

        try {
            Map<String, Object> body = new HashMap<>();
            body.put("from", "CV Website <onboarding@resend.dev>");
            body.put("to", List.of(mailTo));
            body.put("reply_to", message.getEmail());
            body.put("subject", "[CV] " + message.getSubject());
            body.put("html", buildHtml(message));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(RESEND_API_URL, request, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("EMAIL_SENT_OK via Resend for message ID: {}", message.getId());
                message.setEmailSent(true);
                repository.save(message);
            } else {
                log.error("EMAIL_SEND_FAILED via Resend for message ID: {} - HTTP {} - {}",
                        message.getId(), response.getStatusCode(), response.getBody());
            }
        } catch (Exception e) {
            log.error("EMAIL_SEND_FAILED for message ID {}: {} - {}",
                    message.getId(), e.getClass().getName(), e.getMessage(), e);
        }
    }

    private String buildHtml(ContactMessage message) {
        String safeName = org.springframework.web.util.HtmlUtils.htmlEscape(message.getName() != null ? message.getName() : "");
        String safeEmail = org.springframework.web.util.HtmlUtils.htmlEscape(message.getEmail() != null ? message.getEmail() : "");
        String safeSubject = org.springframework.web.util.HtmlUtils.htmlEscape(message.getSubject() != null ? message.getSubject() : "");
        String safeMessage = org.springframework.web.util.HtmlUtils.htmlEscape(message.getMessage() != null ? message.getMessage() : "")
                .replace("\n", "<br>");

        return """
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                  <h2 style="color:#333;">Nuevo mensaje de contacto</h2>
                  <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px;font-weight:bold;">Nombre:</td><td style="padding:8px;">%s</td></tr>
                    <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">%s</td></tr>
                    <tr><td style="padding:8px;font-weight:bold;">Asunto:</td><td style="padding:8px;">%s</td></tr>
                  </table>
                  <div style="margin-top:16px;padding:16px;background:#f5f5f5;border-radius:8px;">
                    %s
                  </div>
                </div>
                """.formatted(safeName, safeEmail, safeSubject, safeMessage);
    }
}
