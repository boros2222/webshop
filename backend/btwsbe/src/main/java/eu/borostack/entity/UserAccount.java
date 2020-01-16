package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user_account")
public class UserAccount {

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

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "invoice_address_id", referencedColumnName = "id")
    @Valid
    private Address invoiceAddress;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "id")
    @Valid
    private Address shippingAddress;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="userAccount")
    private List<UserRole> userRoles;

    @Transient
    @NotEmpty(message = "Jelszót kötelező megadni!")
    private String password;

    @PrePersist
    private void init() {
        setRegistrationDate(LocalDateTime.now());
    }

    public List<UserRole> getUserRoles() {
        if (userRoles == null) {
            userRoles = new ArrayList<>();
        }
        return userRoles;
    }
}
