package com.alejosoftware.cv.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
@Slf4j
public class DebugController {

    @Value("${app.mail.to:alejosoftwarelabs@gmail.com}")
    private String mailTo;

    @GetMapping("/email-test")
    public Map<String, Object> testEmail() {
        Map<String, Object> result = new LinkedHashMap<>();
        String url = "https://formsubmit.co/ajax/" + mailTo;

        result.put("service", "FormSubmit.co");
        result.put("url", url);

        try {
            RestTemplate restTemplate = new RestTemplate();

            Map<String, String> body = new HashMap<>();
            body.put("name", "Debug Test");
            body.put("email", mailTo);
            body.put("subject", "[TEST] Debug email from CV backend");
            body.put("message", "This is a test email from the debug endpoint at " + java.time.Instant.now());
            body.put("_captcha", "false");
            body.put("_template", "table");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            result.put("httpStatus", response.getStatusCode().value());
            result.put("response", response.getBody());

            if (response.getStatusCode().is2xxSuccessful()) {
                result.put("status", "OK");
                result.put("message", "Email sent! Check inbox and spam. First time you may need to confirm a link from FormSubmit.");
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
