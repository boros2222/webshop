package eu.borostack.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "v_order_details")
public class OrderDetailsView extends GenericEntity implements Serializable {

    @Id
    @Column(name = "order_details_id")
    private Long orderDetailsId;

    @Column(name = "user_account_id")
    private Long userAccountId;

    @Column(name = "product_count")
    private Long productCount;

    @Column(name = "price_sum")
    private Long priceSum;

    @Column(name = "invoice_name")
    private String invoiceName;

    @ManyToOne
    @JoinColumn(name = "shipping_address_id")
    private Address shippingAddress;

    @ManyToOne
    @JoinColumn(name = "invoice_address_id")
    private Address invoiceAddress;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Override
    public Long getId() {
        return orderDetailsId;
    }
}
