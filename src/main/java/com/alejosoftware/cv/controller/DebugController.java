package com.alejosoftware.cv.controller;

import com.alejosoftware.cv.service.EmailNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
@RequiredArgsConstructor
public class DebugController {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.host:NOT_SET}")
    private String mailHost;

    @Value("${spring.mail.port:NOT_SET}")
    private String mailPort;

    @Value("${spring.mail.username:NOT_SET}")
    private String mailUsername;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @GetMapping("/email-test")
    public Map<String, Object> testEmail() {
        Map<String, Object> result = new LinkedHashMap<>();

        result.put("mailHost", mailHost);
        result.put("mailPort", mailPort);
        result.put("mailUsername", mailUsername.isEmpty() ? "EMPTY_STRING" : mailUsername);
        result.put("mailEnabled", mailEnabled);
        result.put("mailSenderIsNull", mailSender == null);

        if (mailSender == null) {
            result.put("status", "ERROR");
            result.put("message", "JavaMailSender is null. SMTP not configured.");
            return result;
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom("alejosoftwarelabs@gmail.com");
            helper.setTo("alejosoftwarelabs@gmail.com");
            helper.setSubject("[TEST] Debug email from CV backend");
            helper.setText("This is a test email sent from the debug endpoint.\nTimestamp: " + java.time.Instant.now());
            mailSender.send(mimeMessage);
            result.put("status", "OK");
            result.put("message", "Email sent successfully!");
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
