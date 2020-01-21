package eu.borostack.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "ordered_product")
public class OrderedProduct extends GenericEntity {

    @Id
    @SequenceGenerator(name = "s_ordered_product", sequenceName = "s_ordered_product", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_ordered_product")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_details_id", nullable = false, referencedColumnName = "id")
    private OrderDetails orderDetails;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false, referencedColumnName = "id")
    private Product product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;
}
