package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum OrderStatus {
    IN_PROGRESS("Feldolgozás alatt"), SHIPPED("Postázva"), DONE("Lezárva");

    @Getter
    private String code;

    @Getter
    private String label;

    OrderStatus(final String label) {
        this.label = label;
        this.code = this.name();
    }

    public static OrderStatus getByString(final String statusString) {
        for (final OrderStatus status : OrderStatus.values()) {
            if (status.name().equals(statusString)) {
                return status;
            }
        }
        return null;
    }
}
