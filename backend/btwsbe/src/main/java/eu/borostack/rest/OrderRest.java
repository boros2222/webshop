package eu.borostack.rest;

import eu.borostack.annotation.CheckUserId;
import eu.borostack.annotation.LoggedIn;
import eu.borostack.entity.OrderDetails;
import eu.borostack.entity.OrderStatus;
import eu.borostack.entity.Role;
import eu.borostack.exception.RestProcessException;
import eu.borostack.service.OrderDetailsService;
import eu.borostack.service.OrderedProductService;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("order")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class OrderRest {

    @Inject
    private OrderDetailsService orderDetailsService;

    @Inject
    private OrderedProductService orderedProductService;

    @Path("list/status")
    @GET
    public Response getAllOrderStatus() {
        return ResponseFactory.createResponse(OrderStatus.values());
    }

    @Path("new")
    @POST
    @LoggedIn(roles = { Role.USER })
    public Response placeOrder(OrderDetails order) {
        return orderDetailsService.placeOrder(order);
    }

    @Path("list/{userAccountId}/{status}")
    @GET
    @LoggedIn
    public Response getAllOrdersByUserAccount(@CheckUserId @PathParam("userAccountId") Long userAccountId,
                                              @PathParam("status") String status) {
        return ResponseFactory.createResponse(
                orderDetailsService.getOrdersByUserAccountIdAndStatus(userAccountId, OrderStatus.getByString(status)));
    }

    @Path("list/{status}")
    @GET
    @LoggedIn(roles = { Role.ADMIN, Role.SUPERADMIN })
    public Response getAllOrders(@PathParam("status") String status) {
        return ResponseFactory.createResponse(orderDetailsService.getOrdersByStatus(OrderStatus.getByString(status)));
    }

    @Path("product/list/{orderDetailsId}")
    @GET
    @LoggedIn
    public Response getAllOrderedProducts(@PathParam("orderDetailsId") Long orderDetailsId) {
        try {
            return ResponseFactory.createResponse(orderedProductService.getOrderedProductsByOrderDetailsId(orderDetailsId));
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("status/edit/{orderDetailsId}/{status}")
    @POST
    @LoggedIn(roles = { Role.ADMIN, Role.SUPERADMIN })
    public Response editOrderStatus(@PathParam("orderDetailsId") Long orderDetailsId, @PathParam("status") String status) {
        try {
            orderDetailsService.editOrderStatus(orderDetailsId, OrderStatus.getByString(status));
            return ResponseFactory.createMessageResponse("A rendelés státusza sikeresen módosítva", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }
}
