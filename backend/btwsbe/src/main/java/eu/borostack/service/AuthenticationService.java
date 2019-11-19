package eu.borostack.service;

import eu.borostack.config.AppConfig;
import eu.borostack.dao.UserAccountDao;
import eu.borostack.entity.ResponseJson;
import eu.borostack.entity.UserAccount;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import javax.inject.Inject;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;

public class AuthenticationService {

    private final String AUTH_COOKIE_NAME = "auth";
    private final SecretKey JWT_KEY = Keys.hmacShaKeyFor(AppConfig.getJwtKey());

    @Inject
    private HttpServletRequest request;

    @Inject
    private UserAccountDao userAccountDao;

    public Response authenticate(UserAccount userAccount) {
        return Response.ok(new ResponseJson("Sikeres bejelentkezés!", true))
                .cookie(generateJwtToken(userAccount)).build();
    }

    public NewCookie authorize() {
        Cookie[] cookies = request.getCookies();
        Cookie authCookie = null;
        if(cookies != null) {
            authCookie = Arrays.stream(cookies)
                    .filter(cookie -> AUTH_COOKIE_NAME.equals(cookie.getName()))
                    .findAny().orElse(null);
        }

        NewCookie newAuthCookie = null;
        if (authCookie != null) {
            Jws<Claims> jws = decodeJwtToken(authCookie.getValue());

            if (jws != null) {
                Integer id = (Integer) jws.getBody().get("id");
                String email = (String) jws.getBody().get("email");
                UserAccount userAccount = userAccountDao.findByEmail(email);
                if(userAccount.getId().equals(id.longValue())) {
                    newAuthCookie = generateJwtToken(userAccount);
                }
            }
        }
        return newAuthCookie;
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
