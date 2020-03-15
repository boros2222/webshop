package eu.borostack.service;

import eu.borostack.dao.OrderDetailsDao;
import eu.borostack.dao.OrderedProductDao;
import eu.borostack.dao.ProductDao;
import eu.borostack.dao.UserAccountDao;
import eu.borostack.entity.*;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import java.util.List;

@Transactional
public class OrderDetailsService {

    @Inject
    private OrderDetailsDao orderDetailsDao;

    @Inject
    private OrderedProductDao orderedProductDao;

    @Inject
    private UserAccountDao userAccountDao;

    @Inject
    private ProductDao productDao;

    @Inject
    private AddressService addressService;

    public Response placeOrder(OrderDetails incomingOrder) {
        if (incomingOrder != null) {
            if (incomingOrder.getUserAccount() == null || incomingOrder.getUserAccount().getId() == null) {
                return ResponseFactory.createMessageResponse("Nincs megadva felhasználó!", true, 400);
            }
            if (incomingOrder.getInvoiceName() == null || incomingOrder.getInvoiceName().isBlank()) {
                return ResponseFactory.createMessageResponse("Nincs megadva számlázási név!", true, 400);
            }
            if (incomingOrder.getInvoiceAddress() == null || !incomingOrder.getInvoiceAddress().isValid()) {
                return ResponseFactory.createMessageResponse("Nincs teljes számlázási cím!", true, 400);
            }
            if (incomingOrder.getShippingAddress() == null || !incomingOrder.getShippingAddress().isValid()) {
                return ResponseFactory.createMessageResponse("Nincs teljes szállítási cím!", true, 400);
            }
            if (incomingOrder.getOrderedProducts() == null || incomingOrder.getOrderedProducts().isEmpty() ||
                    incomingOrder.getOrderedProducts().stream().anyMatch(orderedProduct -> !orderedProduct.isValid())) {
                return ResponseFactory.createMessageResponse("Nincs megrendelendő termék megadva!", true, 400);
            }

            final UserAccount userAccount = userAccountDao.findById(incomingOrder.getUserAccount().getId());
            if (userAccount == null) {
                return ResponseFactory.createMessageResponse("Nem létezik a felhasználó!", true, 400);
            }

            final OrderDetails order = new OrderDetails();
            order.setUserAccount(userAccount);
            order.setShippingAddress(addressService.save(incomingOrder.getShippingAddress()));
            order.setInvoiceAddress(addressService.save(incomingOrder.getInvoiceAddress()));
            order.setInvoiceName(incomingOrder.getInvoiceName());
            final OrderDetails savedOrder = orderDetailsDao.save(order);

            incomingOrder.getOrderedProducts().forEach(incomingOrderedProduct -> {
                final Product product = productDao.findById(incomingOrderedProduct.getProduct().getId());
                if (product != null) {
                    final OrderedProduct orderedProduct = new OrderedProduct();
                    orderedProduct.setOrderDetails(savedOrder);
                    orderedProduct.setProduct(product);
                    orderedProduct.setQuantity(incomingOrderedProduct.getQuantity());
                    orderedProductDao.save(orderedProduct);
                }
            });

            return ResponseFactory.createMessageResponse("A rendelés sikeresen végbement!", false);
        } else {
            return ResponseFactory.createMessageResponse("Hiba történt a rendelés során!", true, 500);
        }
    }

    public List<OrderDetailsView> getOrdersByUserAccountId(final Long userAccountId) {
        return orderDetailsDao.findAllOrderDetailsViewByUserAccountId(userAccountId);
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
