package eu.borostack.entity;

import lombok.Data;

@Data
public class ResponseJson {

    private String message;
    private Boolean error;

    public ResponseJson(String message, Boolean error) {
        this.message = message;
        this.error = error;
    }
}
