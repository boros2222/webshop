package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class GenericEntity {

    public abstract Long getId();

    @JsonIgnore
    public boolean isNew() {
        return getId() == null;
    }
}
