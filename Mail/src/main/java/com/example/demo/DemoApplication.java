package com.example.demo;

import com.example.demo.services.MailService;
import jakarta.mail.MessagingException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.IOException;

@SpringBootApplication
@EnableScheduling
public class DemoApplication {
	private final MailService mailService;

	public DemoApplication(MailService mailService) {
		this.mailService = mailService;
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	// Schedule sending email every hour
	@Scheduled(cron = "0 35 * * * *")
	public void sendScheduledEmail() {
		try {
			mailService.sendHtmlEmail();
			System.out.println("Scheduled email sent successfully.");
		} catch (MessagingException | IOException e) {
			System.out.println("Error sending scheduled email: " + e.getMessage());
		}
	}
}
