package eu.borostack.dao;

import com.querydsl.jpa.impl.JPAQuery;
import eu.borostack.entity.OrderDetails;
import eu.borostack.entity.OrderDetailsView;
import eu.borostack.entity.OrderStatus;
import eu.borostack.entity.QOrderDetailsView;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@ApplicationScoped
public class OrderDetailsDao extends GenericDao<Long, OrderDetails> {

    public OrderDetailsDao() {
        super(OrderDetails.class);
    }

    public List<OrderDetailsView> findAllOrderDetailsViewsByUserAccountIdAndStatus(final Long userAccountId, final OrderStatus status) {
        final QOrderDetailsView orderDetailsView = QOrderDetailsView.orderDetailsView;
        JPAQuery<OrderDetailsView> query = new JPAQuery<OrderDetailsView>(entityManager)
                .select(orderDetailsView)
                .from(orderDetailsView)
                .where(orderDetailsView.userAccountId.eq(userAccountId))
                .orderBy(orderDetailsView.orderDate.desc());
        if (status != null) {
            query = query.where(orderDetailsView.status.eq(status));
        }
        return query.fetch();
    }

    public List<OrderDetailsView> findAllOrderDetailsViewsByStatus(final OrderStatus status) {
        final QOrderDetailsView orderDetailsView = QOrderDetailsView.orderDetailsView;
        JPAQuery<OrderDetailsView> query = new JPAQuery<OrderDetailsView>(entityManager)
                .select(orderDetailsView)
                .from(orderDetailsView)
                .orderBy(orderDetailsView.orderDate.desc());
        if (status != null) {
            query = query.where(orderDetailsView.status.eq(status));
        }
        return query.fetch();
    }
}