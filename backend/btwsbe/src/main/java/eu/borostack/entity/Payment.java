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
public class Payment implements Serializable {

    @Id
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_details_id", referencedColumnName = "id")
    private OrderDetails orderDetails;

    @Column(name = "service")
    private String service;

    @Column(name = "payment_date")
    private LocalDateTime payment_date;

    @Column(name = "is_paid")
    private Boolean paid;

    @Column(name = "total_price")
    private Integer totalPrice;
}
