package eu.borostack.util;

import lombok.Getter;
import lombok.Setter;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

@ApplicationScoped
public class ResponseFactory {

    private ResponseFactory() {
    }

    public static Response createMessageResponse(String message, boolean error) {
        return Response.ok(new MessageResponse(message, error)).status(200).build();
    }

    public static Response createMessageResponse(String message, boolean error, int status) {
        return Response.ok(new MessageResponse(message, error)).status(status).build();
    }

    public static Response createMessageResponse(String message, boolean error, NewCookie... newCookies) {
        return Response.ok(new MessageResponse(message, error)).status(200).cookie(newCookies).build();
    }

    public static Response createMessageResponse(String message, boolean error, int status, NewCookie... newCookies) {
        return Response.ok(new MessageResponse(message, error)).status(status).cookie(newCookies).build();
    }

    public static <T> Response createResponse(T entity) {
        return Response.ok(entity).status(200).build();
    }

    public static <T> Response createResponse(T entity, int status) {
        return Response.ok(entity).status(status).build();
    }

    public static <T> Response createResponse(T entity, NewCookie... newCookies) {
        return Response.ok(entity).status(200).cookie(newCookies).build();
    }

    public static <T> Response createResponse(T entity, int status, NewCookie... newCookies) {
        return Response.ok(entity).status(status).cookie(newCookies).build();
    }

    public static Response createResponse(Response response, int status) {
        return Response.fromResponse(response).status(status).build();
    }

    public static Response createResponse(Response response, NewCookie... newCookies) {
        return Response.fromResponse(response).cookie(newCookies).build();
    }

    public static Response createResponse(Response response, int status, NewCookie... newCookies) {
        return Response.fromResponse(response).status(status).cookie(newCookies).build();
    }

    @Getter
    @Setter
    private static class MessageResponse {
        private String message;
        private boolean error;

        private MessageResponse(String message, boolean error) {
            this.message = message;
            this.error = error;
        }
    }
}
