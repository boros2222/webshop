package eu.borostack.service;

import eu.borostack.entity.OrderedProduct;
import eu.borostack.entity.UserAccount;
import org.stringtemplate.v4.ST;

import javax.ejb.Stateless;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

@Stateless
public class MailService {

    public void sendOrderMail(final UserAccount userAccount, final List<OrderedProduct> orderedProducts) {
        ST template = new ST(readTemplate("order.st"), '$', '$');
        template.add("user", userAccount);
        template.add("products", orderedProducts);
        final String content = template.render();
        sendMail(userAccount.getEmail(), "Megrendelés visszaigazolása", content);
    }

    private void sendMail(final String toEmail, final String subject, final String content) {
        Properties properties = System.getProperties();
        properties.put("mail.smtp.starttls.enable", System.getProperty("mail.starttls"));
        properties.put("mail.smtp.auth", System.getProperty("mail.auth"));
        properties.put("mail.smtp.host", System.getProperty("mail.host"));
        properties.put("mail.smtp.port", System.getProperty("mail.port"));

        Session session = Session.getInstance(properties,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(System.getProperty("mail.user"), System.getProperty("mail.password"));
                    }
                });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(System.getProperty("mail.fromEmail")));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
            message.setSubject(subject);
            message.setContent(content, "text/html");
            Transport.send(message);
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }

    private String readTemplate(final String fileName) {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("templates/" + fileName);
        if (inputStream == null) {
            return null;
        }
        InputStreamReader isr = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
        BufferedReader reader = new BufferedReader(isr);
        return reader.lines().collect(Collectors.joining(System.lineSeparator()));
    }
}
