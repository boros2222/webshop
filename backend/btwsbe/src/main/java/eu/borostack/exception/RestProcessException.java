package eu.borostack.exception;

import lombok.Getter;

import javax.ejb.ApplicationException;
import javax.ws.rs.core.Response;

@Getter
@ApplicationException(rollback = true)
public class RestProcessException extends Exception {

    private Response response;

    public RestProcessException(Response response) {
        this.response = response;
    }
}
