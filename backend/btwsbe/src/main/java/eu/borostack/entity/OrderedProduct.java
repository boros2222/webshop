package eu.borostack.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "ordered_product")
public class OrderedProduct {

    @EmbeddedId
    @JsonIgnore
    private OrderedProductId id;

    @ManyToOne
    @JoinColumn(name = "order_details_id", nullable = false, referencedColumnName = "id", insertable = false, updatable = false)
    @MapsId("orderDetailsId")
    private OrderDetails orderDetails;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false, referencedColumnName = "id", insertable = false, updatable = false)
    @MapsId("productId")
    private Product product;

    @Column(name = "quantity")
    private Integer quantity;
}
