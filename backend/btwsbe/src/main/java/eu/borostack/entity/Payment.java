package eu.borostack.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "payment")
public class Payment extends GenericEntity implements Serializable {

    @Id
    @SequenceGenerator(name = "s_payment", sequenceName = "s_payment", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_payment")
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_details_id", referencedColumnName = "id", nullable = false)
    private OrderDetails orderDetails;

    @Column(name = "service")
    private String service;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "is_paid", nullable = false)
    private Boolean paid;

    @Column(name = "total_price", nullable = false)
    private Integer totalPrice;
}
