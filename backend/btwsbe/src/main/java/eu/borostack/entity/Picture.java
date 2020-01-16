package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "picture")
public class Picture {

    @EmbeddedId
    @JsonIgnore
    private PictureId id = new PictureId();

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false, referencedColumnName = "id", insertable = false, updatable = false)
    @MapsId("productId")
    @JsonIgnore
    private Product product;

    public void setPath(String path) {
        id.setPath(path);
    }

    public String getPath() {
        return id.getPath();
    }
}
