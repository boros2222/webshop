package eu.borostack.dao;

import com.querydsl.jpa.impl.JPAQuery;
import eu.borostack.entity.OrderDetails;
import eu.borostack.entity.OrderDetailsView;
import eu.borostack.entity.QOrderDetailsView;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class OrderDetailsDao extends GenericDao<Long, OrderDetails> {

    public OrderDetailsDao() {
        super(OrderDetails.class);
    }

    public List<OrderDetailsView> findAllOrderDetailsViewByUserAccountId(final Long userAccountId) {
        final QOrderDetailsView orderDetailsView = QOrderDetailsView.orderDetailsView;
        return new JPAQuery<OrderDetailsView>(entityManager)
                .select(orderDetailsView)
                .from(orderDetailsView)
                .where(orderDetailsView.userAccountId.eq(userAccountId))
                .orderBy(orderDetailsView.orderDate.desc())
                .fetch();
    }
}