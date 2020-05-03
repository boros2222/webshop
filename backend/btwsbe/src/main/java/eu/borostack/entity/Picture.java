package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "picture")
public class Picture extends GenericEntity {

    @Id
    @SequenceGenerator(name = "s_picture", sequenceName = "s_picture", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_picture")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false, referencedColumnName = "id")
    @JsonIgnore
    private Product product;

    @Column(name = "path", nullable = false)
    private String path;
}
