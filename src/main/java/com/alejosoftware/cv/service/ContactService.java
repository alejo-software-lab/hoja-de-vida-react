package com.alejosoftware.cv.service;

import com.alejosoftware.cv.dto.ContactRequest;
import com.alejosoftware.cv.dto.ContactResponse;
import com.alejosoftware.cv.model.ContactMessage;
import com.alejosoftware.cv.repository.ContactMessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class ContactService {

    private final ContactMessageRepository messageRepository;
    private final EmailNotificationService emailNotificationService;

    public ContactService(ContactMessageRepository messageRepository,
                          EmailNotificationService emailNotificationService) {
        this.messageRepository = messageRepository;
        this.emailNotificationService = emailNotificationService;
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

        emailNotificationService.sendContactEmail(message, messageRepository);

        return ContactResponse.builder()
                .ok(true)
                .saved(true)
                .emailSent(false)
                .messageId(message.getId())
                .receivedAt(message.getReceivedAt())
                .build();
    }

    public List<ContactMessage> getAllMessages() {
        return messageRepository.findAllByOrderByReceivedAtDesc();
    }
}
