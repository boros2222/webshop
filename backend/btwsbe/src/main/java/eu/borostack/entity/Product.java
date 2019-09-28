package eu.borostack.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Data
@Entity
@Table(name = "product")
public class Product {

    @Id
    @SequenceGenerator(name = "s_category", sequenceName = "s_category", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_category")
    private Long id;

    @Column(name = "name")
    @NotEmpty(message = "Product name must be set")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    @NotEmpty(message = "Product price must be set")
    private Long price;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @NotEmpty(message = "Product category must be set")
    private Category category;

}