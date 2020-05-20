package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user_account")
@JsonIgnoreProperties(value={ "password"}, allowSetters= true)
public class UserAccount extends GenericEntity {

    @Id
    @SequenceGenerator(name = "s_user_account", sequenceName = "s_user_account", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_user_account")
    private Long id;

    @Column(name = "name")
    @NotEmpty(message = "Nevet kötelező megadni!")
    private String name;

    @JsonIgnore
    @Column(name = "hash")
    private String hash;

    @JsonIgnore
    @Column(name = "salt")
    private String salt;

    @Column(name = "email")
    @NotEmpty(message = "Email címet kötelező megadni!")
    @Email(message = "Email formátumot kell megadni!")
    private String email;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "invoice_address_id", referencedColumnName = "id")
    private Address invoiceAddress;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "id")
    private Address shippingAddress;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "userAccount")
    private Set<UserRole> userRoles = new HashSet<>();

    @JsonIgnore
    @Column(name = "deleted")
    private Boolean deleted;

    @Transient
    private String password;

    @PrePersist
    private void init() {
        setRegistrationDate(LocalDateTime.now());
        setDeleted(false);
    }

    @Transient
    public boolean isAdmin() {
        return userRoles.stream().map(UserRole::getRole).anyMatch(Role.ADMIN::equals);
    }
}
