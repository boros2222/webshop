package eu.borostack.service;

import eu.borostack.dao.OrderDetailsDao;
import eu.borostack.dao.OrderedProductDao;
import eu.borostack.entity.OrderDetails;
import eu.borostack.entity.OrderedProduct;
import eu.borostack.entity.UserAccount;
import eu.borostack.exception.RestProcessException;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class OrderedProductService {

    @Inject
    private OrderedProductDao orderedProductDao;

    @Inject
    private OrderDetailsDao orderDetailsDao;

    @Inject
    private AuthenticationService authenticationService;

    public List<OrderedProduct> getOrderedProductsByOrderDetailsId(final Long orderDetailsId) throws RestProcessException {
        final UserAccount loggedInUser = authenticationService.checkLoggedInUser();
        final OrderDetails orderDetails = orderDetailsDao.findById(orderDetailsId);
        if (!loggedInUser.getId().equals(orderDetails.getUserAccount().getId()) && !loggedInUser.isAdmin()) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("Nincs jogosultság a megtekintéshez!", true, 400));
        }
        return orderedProductDao.findAllByOrderDetailsId(orderDetailsId);
    }

    public OrderedProduct save(OrderedProduct orderedProduct) {
        return orderedProductDao.save(orderedProduct);
    }

    public OrderedProduct create(OrderedProduct orderedProduct) {
        return orderedProductDao.create(orderedProduct);
    }

    public OrderedProduct update(OrderedProduct orderedProduct) {
        return orderedProductDao.update(orderedProduct);
    }

    public OrderedProduct findById(Long id) {
        return orderedProductDao.findById(id);
    }

    public List<OrderedProduct> findAll() {
        return orderedProductDao.findAll();
    }
}
