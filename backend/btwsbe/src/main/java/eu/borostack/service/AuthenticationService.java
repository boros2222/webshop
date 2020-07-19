package eu.borostack.service;

import eu.borostack.config.AppConfig;
import eu.borostack.dao.UserAccountDao;
import eu.borostack.entity.Role;
import eu.borostack.entity.UserAccount;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.mindrot.jbcrypt.BCrypt;

import javax.crypto.SecretKey;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.NewCookie;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RequestScoped
public class AuthenticationService {
    private final String AUTH_COOKIE_NAME = "auth";
    private final SecretKey JWT_KEY = Keys.hmacShaKeyFor(AppConfig.getJwtKey());

    @Inject
    private HttpServletRequest request;

    @Inject
    private UserAccountDao userAccountDao;

    private boolean loggedInUserChecked = false;

    private UserAccount loggedInUser;

    public NewCookie authenticate(UserAccount loginUser, UserAccount existingUser) {
        if (BCrypt.checkpw(loginUser.getPassword(), existingUser.getHash())) {
            return generateJwtToken(existingUser);
        } else {
            return null;
        }
    }

    public NewCookie authorize(List<Role> roles, Long userAccountId) {
        boolean hasPermission = false;

        UserAccount loggedInUser = getLoggedInUser();
        if (loggedInUser != null) {
            hasPermission = true;
            if (roles != null && !roles.isEmpty()) {
                hasPermission = roles.contains(loggedInUser.getRole());
            }
            if (userAccountId != null) {
                hasPermission = hasPermission && (loggedInUser.getId().equals(userAccountId) || loggedInUser.isAdmin());
            }
        }

        if (hasPermission) {
            return generateJwtToken(loggedInUser);
        } else {
            return null;
        }
    }

    public UserAccount getLoggedInUser() {
        if (!loggedInUserChecked) {
            loggedInUser = checkLoggedInUser();
            loggedInUserChecked = true;
        }
        return loggedInUser;
    }

    private UserAccount checkLoggedInUser() {
        Cookie[] cookies = request.getCookies();
        Cookie authCookie = null;
        if (cookies != null) {
            authCookie = Arrays.stream(cookies)
                    .filter(cookie -> AUTH_COOKIE_NAME.equals(cookie.getName()))
                    .findFirst().orElse(null);
        }

        if (authCookie != null) {
            Jws<Claims> jws = decodeJwtToken(authCookie.getValue());

            if (jws != null) {
                Integer id = (Integer) jws.getBody().get("id");
                String email = (String) jws.getBody().get("email");
                UserAccount userAccount = userAccountDao.findByEmail(email);
                if (userAccount != null && userAccount.getId().equals(id.longValue())) {
                    return userAccount;
                }
            }
        }

        return null;
    }

    private Jws<Claims> decodeJwtToken(final String token) {
        Jws<Claims> jws;
        try {
            jws = Jwts.parser()
                    .setSigningKey(JWT_KEY)
                    .requireIssuer("btwsbe")
                    .parseClaimsJws(token);
        } catch (JwtException ex) {
            jws = null;
        }
        return jws;
    }

    private NewCookie generateJwtToken(final UserAccount userAccount) {
        LocalDateTime ldt = LocalDateTime.now().plusHours(1);
        Date expiration = Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());
        String newToken = Jwts.builder()
                .setIssuer("btwsbe")
                .setSubject("user")
                .claim("id", userAccount.getId())
                .claim("email", userAccount.getEmail())
                .setExpiration(expiration)
                .signWith(JWT_KEY)
                .compact();

        return new NewCookie(AUTH_COOKIE_NAME, newToken, "/btwsbe/api/", null, 1,
                null, -1, expiration, false, false);
    }
}
