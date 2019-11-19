package eu.borostack.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseJson {

    private String message;
    private Boolean error;

    public ResponseJson(String message, Boolean error) {
        this.message = message;
        this.error = error;
    }
}
