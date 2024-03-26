package com.example.demo.services;



import com.example.demo.repositories.CvRepository;
import com.example.demo.repositories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MailService {
     private final JavaMailSender mailSender;

     private final CvRepository cvRepository;
     private final UserRepository userRepository;

     public MailService(JavaMailSender mailSender, CvRepository cvRepository, UserRepository userRepository) {
            this.mailSender = mailSender;

         this.cvRepository = cvRepository;
         this.userRepository = userRepository;
     }
     @Async
        public void sendEmail(String to, String subject, String text) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
        }
    public void sendHtmlEmail() throws MessagingException, IOException {
        List<String> toEmails = userRepository.getAllEmails();
        if (toEmails.isEmpty()) {
            return; // Trả về nếu danh sách email trống
        }
        for (String toEmail : toEmails) {
            MimeMessage message = mailSender.createMimeMessage();
            message.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(toEmail));
            message.setSubject("Test");
            message.setText("Have "+countCvStatus()+" CV waiting to approve");
            mailSender.send(message);
        }
    }

    public String readfile (String filepath) throws IOException {
            Path path = Paths.get(filepath);
               return Files.readString(path, StandardCharsets.UTF_8);

        }
    public int countCvStatus () {
        return cvRepository.countByStatusContaining("INPROGRESS");
    }

}
