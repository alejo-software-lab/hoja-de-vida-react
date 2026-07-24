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

    private static final String WEB3FORMS_URL = "https://api.web3forms.com/submit";
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${web3forms.access-key:}")
    private String accessKey;

    @Value("${app.mail.to:alejosoftwarelabs@gmail.com}")
    private String mailTo;

    @Async
    public void sendContactEmail(ContactMessage message, ContactMessageRepository repository) {
        log.info("Attempting to send email via Web3Forms for message ID: {}", message.getId());

        if (accessKey == null || accessKey.isBlank()) {
            log.warn("Web3Forms access key not configured, skipping email");
            return;
        }

        try {
            Map<String, String> body = new HashMap<>();
            body.put("access_key", accessKey);
            body.put("to", mailTo);
            body.put("subject", "[CV] " + message.getSubject());
            body.put("from_name", message.getName());
            body.put("email", message.getEmail());
            body.put("message", message.getMessage());
            body.put("botcheck", "");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(WEB3FORMS_URL, request, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("EMAIL_SENT_OK via Web3Forms for message ID: {}", message.getId());
                message.setEmailSent(true);
                repository.save(message);
            } else {
                log.error("EMAIL_SEND_FAILED via Web3Forms for message ID: {} - HTTP {}",
                        message.getId(), response.getStatusCode());
            }
        } catch (Exception e) {
            log.error("EMAIL_SEND_FAILED for message ID {}: {} - {}",
                    message.getId(), e.getClass().getName(), e.getMessage(), e);
        }
    }
}
