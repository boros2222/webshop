package eu.borostack.dao;

import com.querydsl.jpa.impl.JPAQuery;
import eu.borostack.entity.OrderedProduct;
import eu.borostack.entity.QOrderedProduct;

import javax.ejb.Stateless;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
@Transactional
public class OrderedProductDao extends GenericDao<Long, OrderedProduct> {

    public OrderedProductDao() {
        super(OrderedProduct.class);
    }

    public List<OrderedProduct> findAllByOrderDetailsId(Long orderDetailsId) {
        QOrderedProduct orderedProduct = QOrderedProduct.orderedProduct;
        return new JPAQuery<OrderedProduct>(entityManager)
                .select(orderedProduct)
                .from(orderedProduct)
                .where(orderedProduct.orderDetails.id.eq(orderDetailsId))
                .fetch();
    }
}