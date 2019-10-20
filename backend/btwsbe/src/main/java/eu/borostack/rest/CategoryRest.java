package eu.borostack.rest;

import com.google.common.primitives.Bytes;
import com.querydsl.core.util.ArrayUtils;
import eu.borostack.config.AppConfig;
import eu.borostack.dao.CategoryDao;
import eu.borostack.entity.Category;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Path("category")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CategoryRest {

    @Inject
    CategoryDao categoryDao;

    @Path("list")
    @GET
    public Response getAllCategories(@Context HttpHeaders httpHeaders) {

        // GET TOKEN COOKIE
        /*Map<String, Cookie> cookies = httpHeaders.getCookies();
        Cookie ck = cookies.get("tokika");
        String token = "";

        if(ck != null) {
            System.out.println(ck.getValue());
            token = ck.getValue();
        } else {
            System.out.println("Nincs :(");
        }*/

        // CREATE JWT TOKEN
        /*byte[] keyBytes = AppConfig.getJwtKey();
        SecretKey key = Keys.hmacShaKeyFor(keyBytes);
        LocalDateTime ldt = LocalDateTime.now().plusHours(1);
        Date expiration = Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());

        String token = Jwts.builder()
                .setIssuer("btwsbe")
                .setSubject("67429")
                .claim("name", "Gazsi")
                .claim("age", 42)
                .setExpiration(expiration)
                .signWith(key)
                .compact();*/

        // DECODE JWT TOKEN
        /*Jws<Claims> jws;
        try {
            jws = Jwts.parser()
                    .setSigningKey(key)
                    .requireIssuer("btwsbe")
                    .parseClaimsJws(token);

            System.out.println(jws.getBody().getIssuer());
            System.out.println(jws.getBody().getExpiration());
            System.out.println(jws.getBody().getSubject());
            System.out.println(jws.getBody().get("name"));
            System.out.println(jws.getBody().get("age"));

        } catch (JwtException ex) {
            // jwt fail
            System.out.println(ex.getMessage());
        }

        NewCookie newCookie = new NewCookie("tokika", token);*/

        return Response.ok(categoryDao.findAll()).build();
    }

}
