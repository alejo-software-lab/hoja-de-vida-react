package com.alejosoftware.cv.service;

import com.alejosoftware.cv.dto.ContactRequest;
import com.alejosoftware.cv.dto.ContactResponse;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class ContactService {

    private final ContactMessageRepository messageRepository;

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${app.mail.from:alejosoftwarelabs@gmail.com}")
    private String mailFrom;

    @Value("${app.mail.to:alejosoftwarelabs@gmail.com}")
    private String mailTo;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    public ContactService(ContactMessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public ContactResponse saveMessage(ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();

        message = messageRepository.save(message);

        if (mailEnabled && mailSender != null) {
            sendEmailAsync(message);
        }

        return ContactResponse.builder()
                .ok(true)
                .saved(true)
                .emailSent(false)
                .messageId(message.getId())
                .receivedAt(message.getReceivedAt())
                .build();
    }

    @Async
    public void sendEmailAsync(ContactMessage message) {
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
            log.info("Email sent successfully for message ID: {}", message.getId());

            message.setEmailSent(true);
            messageRepository.save(message);
        } catch (Exception e) {
            log.error("Error sending email for message ID {}: {}", message.getId(), e.getMessage());
        }
    }

    public List<ContactMessage> getAllMessages() {
        return messageRepository.findAllByOrderByReceivedAtDesc();
    }
}
