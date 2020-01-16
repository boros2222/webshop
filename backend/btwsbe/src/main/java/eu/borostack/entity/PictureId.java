package eu.borostack.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class PictureId implements Serializable {

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "path")
    private String path;

}
