package eu.borostack.service;

import eu.borostack.dao.OrderDetailsDao;
import eu.borostack.entity.OrderDetails;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import java.util.List;

@Transactional
public class OrderDetailsService {

    @Inject
    private OrderDetailsDao orderDetailsDao;

    public Response placeOrder(OrderDetails order) {
        OrderDetails savedOrder = create(order);
        if (savedOrder != null) {
            return ResponseFactory.createMessageResponse("A rendelés sikeresen végbement!", false);
        } else {
            return ResponseFactory.createMessageResponse("Hiba történt a rendelés során!", true, 500);
        }
    }

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
