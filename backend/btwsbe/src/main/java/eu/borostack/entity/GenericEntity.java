package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.beans.Transient;

public abstract class GenericEntity {

    public abstract Long getId();

    @JsonIgnore
    @Transient
    public boolean isNew() {
        return getId() == null;
    }
}
