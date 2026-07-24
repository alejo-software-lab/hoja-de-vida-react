package com.alejosoftware.cv.controller;

import com.alejosoftware.cv.dto.ContactResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ContactResponse> handleAllExceptions(Exception ex) {
        log.error("Unhandled exception: ", ex);
        ContactResponse response = ContactResponse.builder()
                .ok(false)
                .saved(false)
                .emailSent(false)
                .error(ex.getClass().getSimpleName() + ": " + ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
