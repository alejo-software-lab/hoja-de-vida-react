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
import java.util.Map;

@Service
@Slf4j
public class EmailNotificationService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.mail.to:alejosoftwarelabs@gmail.com}")
    private String mailTo;

    @Async
    public void sendContactEmail(ContactMessage message, ContactMessageRepository repository) {
        String url = "https://formsubmit.co/ajax/" + mailTo;
        log.info("Attempting to send email via FormSubmit for message ID: {} to: {}", message.getId(), mailTo);

        try {
            Map<String, String> body = new HashMap<>();
            body.put("name", message.getName());
            body.put("email", message.getEmail());
            body.put("subject", "[CV] " + message.getSubject());
            body.put("message", message.getMessage());
            body.put("_captcha", "false");
            body.put("_template", "table");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("EMAIL_SENT_OK via FormSubmit for message ID: {}", message.getId());
                message.setEmailSent(true);
                repository.save(message);
            } else {
                log.error("EMAIL_SEND_FAILED via FormSubmit for message ID: {} - HTTP {}",
                        message.getId(), response.getStatusCode());
            }
        } catch (Exception e) {
            log.error("EMAIL_SEND_FAILED for message ID {}: {} - {}",
                    message.getId(), e.getClass().getName(), e.getMessage(), e);
        }
    }
}
