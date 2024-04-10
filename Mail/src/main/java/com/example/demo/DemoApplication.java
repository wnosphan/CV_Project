package com.example.demo;

import com.example.demo.services.MailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.IOException;

@SpringBootApplication
@EnableScheduling
public class DemoApplication {
	private final MailService mailService;

	@Value("${scheduled.email.cron}")
	private String scheduledEmailCron;

	public DemoApplication(MailService mailService) {
		this.mailService = mailService;
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	// Schedule sending email every hour
	@Scheduled(cron = "${scheduled.email.cron}")
	public void sendScheduledEmail() {
		try {
			mailService.sendHtmlEmail();
			System.out.println("Scheduled email sent successfully.");
		} catch (MessagingException | IOException e) {
			System.out.println("Error sending scheduled email: " + e.getMessage());
		}
	}
}
