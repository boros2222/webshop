package eu.borostack.service;

import eu.borostack.entity.OrderDetails;
import eu.borostack.entity.OrderedProduct;
import eu.borostack.entity.UserAccount;
import org.stringtemplate.v4.ST;

import javax.enterprise.context.ApplicationScoped;
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

@ApplicationScoped
public class MailService {

    public void sendNewPasswordMail(final UserAccount userAccount) {
        ST template = new ST(loadMailTemplate("new_password.st"), '$', '$');
        template.add("user", userAccount);
        template.add("url", System.getProperty("frontend.url") + "/forgot-password/" + userAccount.getNewPasswordCode());
        final String content = template.render();
        sendMail(userAccount.getEmail(), "Új jelszó igénylése", content);
    }

    public void sendActivateMail(final UserAccount userAccount) {
        ST template = new ST(loadMailTemplate("activate_user.st"), '$', '$');
        template.add("user", userAccount);
        template.add("url", System.getProperty("frontend.url") + "/activate/" + userAccount.getActivateCode());
        final String content = template.render();
        sendMail(userAccount.getEmail(), "Regisztráció megerősítése", content);
    }

    public void sendOrderMail(final UserAccount userAccount, final OrderDetails order, final List<OrderedProduct> orderedProducts) {
        ST template = new ST(loadMailTemplate("order.st"), '$', '$');
        final Long priceSum = orderedProducts.stream().map(product -> product.getQuantity() * product.getPrice()).reduce(0L, Long::sum);
        final Integer quantitySum = orderedProducts.stream().map(OrderedProduct::getQuantity).reduce(0, Integer::sum);
        template.add("user", userAccount);
        template.add("order", order);
        template.add("products", orderedProducts);
        template.add("priceSum", priceSum);
        template.add("quantitySum", quantitySum);
        final String content = template.render();
        sendMail(userAccount.getEmail(), "Megrendelés visszaigazolása", content);
    }

    public void sendOrderStatusMail(final UserAccount userAccount, final OrderDetails order) {
        ST template = new ST(loadMailTemplate("order_status.st"), '$', '$');
        template.add("user", userAccount);
        template.add("order", order);
        final String content = template.render();
        sendMail(userAccount.getEmail(), "Megrendelésének állapota", content);
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
            message.setSubject("[Borostack Webshop] " + subject);
            message.setContent(content, "text/html");
            Transport.send(message);
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }

    private String loadMailTemplate(final String fileName) {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("templates/mail/" + fileName);
        if (inputStream == null) {
            return null;
        }
        InputStreamReader isr = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
        BufferedReader reader = new BufferedReader(isr);
        return reader.lines().collect(Collectors.joining(System.lineSeparator()));
    }
}
