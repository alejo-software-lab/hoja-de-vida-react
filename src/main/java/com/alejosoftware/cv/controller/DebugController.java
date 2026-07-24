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

    private static final String WEB3FORMS_URL = "https://api.web3forms.com/submit";

    @Value("${web3forms.access-key:}")
    private String accessKey;

    @GetMapping("/email-test")
    public Map<String, Object> testEmail() {
        Map<String, Object> result = new LinkedHashMap<>();

        result.put("service", "Web3Forms");
        result.put("accessKeyConfigured", accessKey != null && !accessKey.isBlank());

        if (accessKey == null || accessKey.isBlank()) {
            result.put("status", "ERROR");
            result.put("message", "Web3Forms access key not configured. Set WEB3FORMS_ACCESS_KEY env var.");
            return result;
        }

        try {
            RestTemplate restTemplate = new RestTemplate();

            Map<String, String> body = new HashMap<>();
            body.put("access_key", accessKey);
            body.put("to", "alejosoftwarelabs@gmail.com");
            body.put("subject", "[TEST] Debug email from CV backend");
            body.put("from_name", "Debug Test");
            body.put("email", "alejosoftwarelabs@gmail.com");
            body.put("message", "This is a test email sent from the debug endpoint at " + java.time.Instant.now());
            body.put("botcheck", "");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(WEB3FORMS_URL, request, String.class);

            result.put("httpStatus", response.getStatusCode().value());
            result.put("response", response.getBody());

            if (response.getStatusCode().is2xxSuccessful()) {
                result.put("status", "OK");
                result.put("message", "Email sent successfully! Check your inbox/spam.");
            } else {
                result.put("status", "ERROR");
                result.put("message", "Non-2xx response from Web3Forms");
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
