package eu.borostack.exception;

import lombok.Getter;

import javax.ws.rs.core.Response;

@Getter
public class RestProcessException extends Exception {

    private Response response;

    public RestProcessException(Response response) {
        this.response = response;
    }
}
