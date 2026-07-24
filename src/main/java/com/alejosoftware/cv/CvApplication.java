package com.alejosoftware.cv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CvApplication {

    public static void main(String[] args) {
        SpringApplication.run(CvApplication.class, args);
    }
}