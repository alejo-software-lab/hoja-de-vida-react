package com.alejosoftware.cv.service;

import com.alejosoftware.cv.model.ContactMessage;
import com.alejosoftware.cv.repository.ContactMessageRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailNotificationService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${app.mail.from:alejosoftwarelabs@gmail.com}")
    private String mailFrom;

    @Value("${app.mail.to:alejosoftwarelabs@gmail.com}")
    private String mailTo;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @Async
    public void sendContactEmail(ContactMessage message, ContactMessageRepository repository) {
        log.info("Attempting to send email for message ID: {} to: {}, mailSender is null: {}", 
                 message.getId(), mailTo, mailSender == null);

        if (!mailEnabled) {
            log.info("Mail disabled, skipping send");
            return;
        }
        if (mailSender == null) {
            log.warn("JavaMailSender is null, cannot send email");
            return;
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(mailFrom);
            helper.setTo(mailTo);
            helper.setReplyTo(message.getEmail());
            helper.setSubject("[CV] " + message.getSubject());

            String textContent = String.format(
                    "Nombre: %s\nCorreo: %s\n\n%s",
                    message.getName(), message.getEmail(), message.getMessage()
            );
            helper.setText(textContent);

            mailSender.send(mimeMessage);
            log.info("EMAIL_SENT_OK for message ID: {}", message.getId());

            message.setEmailSent(true);
            repository.save(message);
        } catch (Exception e) {
            log.error("EMAIL_SEND_FAILED for message ID {}: {} - {}", message.getId(), e.getClass().getName(), e.getMessage(), e);
        }
    }
}
