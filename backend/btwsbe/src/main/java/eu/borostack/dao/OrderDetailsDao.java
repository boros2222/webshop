package eu.borostack.dao;

import eu.borostack.entity.OrderDetails;

import javax.transaction.Transactional;

@Transactional
public class OrderDetailsDao extends GenericDao<Long, OrderDetails> {

    public OrderDetailsDao() {
        super(OrderDetails.class);
    }
}