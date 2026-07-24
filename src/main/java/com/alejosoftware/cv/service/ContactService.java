package com.alejosoftware.cv.service;

import com.alejosoftware.cv.dto.ContactRequest;
import com.alejosoftware.cv.dto.ContactResponse;
import com.alejosoftware.cv.model.ContactMessage;
import com.alejosoftware.cv.repository.ContactMessageRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactMessageRepository messageRepository;
    private final JavaMailSender mailSender;

    @Value("${app.mail.from:alejosoftwarelabs@gmail.com}")
    private String mailFrom;

    @Value("${app.mail.to:alejosoftwarelabs@gmail.com}")
    private String mailTo;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @Transactional
    public ContactResponse saveMessage(ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();

        message = messageRepository.save(message);

        boolean emailSent = false;
        if (mailEnabled) {
            try {
                sendEmail(message);
                emailSent = true;
                message.setEmailSent(true);
                messageRepository.save(message);
            } catch (MessagingException e) {
                log.error("Error sending email: ", e);
            }
        }

        return ContactResponse.builder()
                .ok(true)
                .saved(true)
                .emailSent(emailSent)
                .messageId(message.getId())
                .receivedAt(message.getReceivedAt())
                .build();
    }

    private void sendEmail(ContactMessage message) throws MessagingException {
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
    }

    public List<ContactMessage> getAllMessages() {
        return messageRepository.findAllByOrderByReceivedAtDesc();
    }
}