package eu.borostack.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "order_details")
public class OrderDetails extends GenericEntity implements Serializable {

    @Id
    @SequenceGenerator(name = "s_order_details", sequenceName = "s_order_details", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_order_details")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_account_id", nullable = false)
    private UserAccount userAccount;

    @ManyToOne
    @JoinColumn(name = "shipping_address_id", nullable = false)
    private Address shippingAddress;

    @ManyToOne
    @JoinColumn(name = "invoice_address_id", nullable = false)
    private Address invoiceAddress;

    @Column(name = "invoice_name")
    private String invoiceName;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Transient
    private List<OrderedProduct> orderedProducts;

    @PrePersist
    private void init() {
        setOrderDate(LocalDateTime.now());
    }
}
