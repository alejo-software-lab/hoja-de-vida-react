package com.alejosoftware.cv.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse {
    private boolean ok;
    private boolean saved;
    private boolean emailSent;
    private Long messageId;
    private LocalDateTime receivedAt;
    private String message;
    private String error;
}