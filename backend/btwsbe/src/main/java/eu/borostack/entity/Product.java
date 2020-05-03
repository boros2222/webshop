package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product extends GenericEntity {

    @Id
    @SequenceGenerator(name = "s_product", sequenceName = "s_product", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_product")
    private Long id;

    @Column(name = "name")
    @NotEmpty(message = "Product name must be set")
    private String name;

    @Column(name = "short_description")
    private String shortDescription;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    @NotNull(message = "Product price must be set")
    private Long price;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @NotNull(message = "Product category must be set")
    private Category category;

    @OneToMany(mappedBy="product", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Picture> pictures = new ArrayList<>();

    @JsonIgnore
    @Column(name = "deleted")
    private Boolean deleted;

    @PrePersist
    private void init() {
        setDeleted(false);
    }
}
