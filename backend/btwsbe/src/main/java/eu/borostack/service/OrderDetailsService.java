package eu.borostack.service;

import eu.borostack.dao.OrderDetailsDao;
import eu.borostack.dao.OrderedProductDao;
import eu.borostack.dao.ProductDao;
import eu.borostack.entity.*;
import eu.borostack.exception.RestProcessException;
import eu.borostack.util.ResponseFactory;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Stateless
@Transactional
public class OrderDetailsService {

    @Inject
    private OrderDetailsDao orderDetailsDao;

    @Inject
    private OrderedProductDao orderedProductDao;

    @Inject
    private ProductDao productDao;

    @Inject
    private AddressService addressService;

    @Inject
    private MailService mailService;

    @Inject
    private AuthenticationService authenticationService;

    public void newOrder(OrderDetails incomingOrder) throws RestProcessException {
        if (incomingOrder == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs rendelés!", true, 400));
        }
        if (incomingOrder.getUserAccount() == null || incomingOrder.getUserAccount().getId() == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megadva felhasználó!", true, 400));
        }
        UserAccount currentUser = authenticationService.getLoggedInUser();
        if (!currentUser.getId().equals(incomingOrder.getUserAccount().getId())) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("Nincs jogosultság a megtekintéshez!", true, 400));
        }
        if (incomingOrder.getInvoiceName() == null || incomingOrder.getInvoiceName().isBlank()) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megadva számlázási név!", true, 400));
        }
        if (incomingOrder.getInvoiceAddress() == null || !incomingOrder.getInvoiceAddress().isValid()) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs teljes számlázási cím!", true, 400));
        }
        if (incomingOrder.getShippingAddress() == null || !incomingOrder.getShippingAddress().isValid()) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs teljes szállítási cím!", true, 400));
        }
        if (incomingOrder.getOrderedProducts() == null || incomingOrder.getOrderedProducts().isEmpty() ||
                incomingOrder.getOrderedProducts().stream().anyMatch(orderedProduct -> !orderedProduct.isValid())) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megrendelendő termék megadva!", true, 400));
        }

        final OrderDetails order = new OrderDetails();
        order.setUserAccount(currentUser);
        order.setShippingAddress(addressService.save(incomingOrder.getShippingAddress()));
        order.setInvoiceAddress(addressService.save(incomingOrder.getInvoiceAddress()));
        order.setInvoiceName(incomingOrder.getInvoiceName());
        final OrderDetails savedOrder = orderDetailsDao.save(order);
        final List<OrderedProduct> orderedProducts = new ArrayList<>();
        incomingOrder.getOrderedProducts().forEach(incomingOrderedProduct -> {
            final Product product = productDao.findById(incomingOrderedProduct.getProduct().getId());
            if (product != null && !product.getDeleted()) {
                final OrderedProduct orderedProduct = new OrderedProduct();
                orderedProduct.setOrderDetails(savedOrder);
                orderedProduct.setProduct(product);
                orderedProduct.setPrice(product.getPrice());
                orderedProduct.setQuantity(incomingOrderedProduct.getQuantity());
                orderedProducts.add(orderedProductDao.save(orderedProduct));
            }
        });

        mailService.sendOrderMail(currentUser, savedOrder, orderedProducts);
    }

    public List<OrderDetailsView> getOrdersByUserAccountIdAndStatus(final Long userAccountId, final OrderStatus status) {
        return orderDetailsDao.findAllOrderDetailsViewsByUserAccountIdAndStatus(userAccountId, status);
    }

    public List<OrderDetailsView> getOrdersByStatus(final OrderStatus status) {
        return orderDetailsDao.findAllOrderDetailsViewsByStatus(status);
    }

    public void editOrderStatus(final Long orderDetailsId, final OrderStatus status) throws RestProcessException {
        if (status == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A megadott státusz helytelen", true, 400));
        }
        final OrderDetails orderDetails = orderDetailsDao.findById(orderDetailsId);
        if (orderDetails == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A rendelés nem található", true, 400));
        }
        orderDetails.setStatus(status);
        final OrderDetails savedOrder = orderDetailsDao.save(orderDetails);
        mailService.sendOrderStatusMail(savedOrder.getUserAccount(), savedOrder);
    }
}
