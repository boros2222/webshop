package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Role {
    USER("Felhasználó"), ADMIN("Adminisztrátor"), SUPERADMIN("Szuper Adminisztrátor");

    @Getter
    private String code;

    @Getter
    private String label;

    Role(String label) {
        this.label = label;
        this.code = this.name();
    }

    public static Role getByString(final String roleString) {
        for (final Role role : Role.values()) {
            if (role.name().equals(roleString)) {
                return role;
            }
        }
        return null;
    }
}
