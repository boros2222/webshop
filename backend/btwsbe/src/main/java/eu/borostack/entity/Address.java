package eu.borostack.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Entity
@Table(name = "address")
public class Address {

    @Id
    @SequenceGenerator(name = "s_address", sequenceName = "s_address", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_address")
    private Long id;

    @Column(name = "postal_code")
    @NotEmpty(message = "Irányítószámot kötelező megadni!")
    private String postalCode;

    @Column(name = "city")
    @NotEmpty(message = "Várost kötelező megadni!")
    private String city;

    @Column(name = "street")
    @NotEmpty(message = "Utcát kötelező megadni!")
    private String street;

    @Column(name = "house_number")
    @NotEmpty(message = "Házszámot kötelező megadni!")
    private String houseNumber;
}
