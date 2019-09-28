package eu.borostack.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Data
@Entity
@Table(name = "category")
public class Category {

    @Id
    @SequenceGenerator(name = "s_category", sequenceName = "s_category", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_category")
    private Long id;

    @Column(name = "name")
    @NotEmpty(message = "Category name must be set")
    private String name;
}