package com.alejosoftware.cv.service;

import com.alejosoftware.cv.model.ContactMessage;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${app.mail.to}")
    private String toEmail;

    public boolean sendContactEmail(ContactMessage message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setReplyTo(message.getEmail());
            helper.setSubject("[CV] " + message.getSubject());

            String text = String.format(
                "Nombre: %s\nCorreo: %s\n\n%s",
                message.getName(),
                message.getEmail(),
                message.getMessage()
            );
            helper.setText(text, false);

            mailSender.send(mimeMessage);
            log.info("Email sent successfully for contact from: {}", message.getEmail());
            return true;
        } catch (MessagingException e) {
            log.error("Failed to send email: {}", e.getMessage());
            return false;
        }
    }
}