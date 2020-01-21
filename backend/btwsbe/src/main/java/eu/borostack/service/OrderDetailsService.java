package eu.borostack.service;

import eu.borostack.dao.OrderDetailsDao;
import eu.borostack.entity.OrderDetails;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class OrderDetailsService {

    @Inject
    private OrderDetailsDao orderDetailsDao;

    public OrderDetails save(OrderDetails orderDetails) {
        return orderDetailsDao.save(orderDetails);
    }

    public OrderDetails create(OrderDetails orderDetails) {
        return orderDetailsDao.create(orderDetails);
    }

    public OrderDetails update(OrderDetails orderDetails) {
        return orderDetailsDao.update(orderDetails);
    }

    public OrderDetails findById(Long id) {
        return orderDetailsDao.findById(id);
    }

    public List<OrderDetails> findAll() {
        return orderDetailsDao.findAll();
    }
}
