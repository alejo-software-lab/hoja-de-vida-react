package com.alejosoftware.cv.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse {
    private boolean ok;
    private boolean saved;
    private boolean emailSent;
    private String message;
    private String error;
}