package com.alejosoftware.cv.controller;

import com.alejosoftware.cv.dto.ContactResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ContactResponse> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        log.warn("Method not supported: {}", ex.getMessage());
        ContactResponse response = ContactResponse.builder()
                .ok(false)
                .saved(false)
                .emailSent(false)
                .error("El método HTTP utilizado no está permitido para este recurso.")
                .build();
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(response);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ContactResponse> handleMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex) {
        log.warn("Media type not supported: {}", ex.getMessage());
        ContactResponse response = ContactResponse.builder()
                .ok(false)
                .saved(false)
                .emailSent(false)
                .error("El tipo de contenido (Content-Type) enviado no es soportado.")
                .build();
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(response);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ContactResponse> handleNoResourceFound(NoResourceFoundException ex) {
        log.warn("Resource not found: {}", ex.getMessage());
        ContactResponse response = ContactResponse.builder()
                .ok(false)
                .saved(false)
                .emailSent(false)
                .error("El recurso solicitado no fue encontrado.")
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ContactResponse> handleValidationException(MethodArgumentNotValidException ex) {
        log.warn("Validation error on request: {}", ex.getMessage());
        ContactResponse response = ContactResponse.builder()
                .ok(false)
                .saved(false)
                .emailSent(false)
                .error("Los datos enviados no superaron las validaciones requeridas.")
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ContactResponse> handleAllExceptions(Exception ex) {
        log.error("Unhandled exception: ", ex);
        ContactResponse response = ContactResponse.builder()
                .ok(false)
                .saved(false)
                .emailSent(false)
                .error("Ha ocurrido un error interno en el servidor.")
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
