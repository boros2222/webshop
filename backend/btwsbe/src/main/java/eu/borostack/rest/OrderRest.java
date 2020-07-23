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

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("orders")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Stateless
public class OrderRest {

    @Inject
    private OrderDetailsService orderDetailsService;

    @Inject
    private OrderedProductService orderedProductService;

    @Path("status-options")
    @GET
    public Response getAllOrderStatusOptions() {
        return ResponseFactory.createResponse(OrderStatus.values());
    }

    @POST
    @LoggedIn(roles = { Role.USER })
    public Response newOrder(OrderDetails order) {
        try {
            orderDetailsService.newOrder(order);
            return ResponseFactory.createMessageResponse("Rendelés sikeresen végbement! A visszaigazoló üzenetet elküldtük az email címére.", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("user/{userAccountId}/status/{status}")
    @GET
    @LoggedIn
    public Response getAllOrdersByUserAccount(@CheckUserId @PathParam("userAccountId") Long userAccountId,
                                              @PathParam("status") String status) {
        return ResponseFactory.createResponse(
                orderDetailsService.getOrdersByUserAccountIdAndStatus(userAccountId, OrderStatus.getByString(status)));
    }

    @Path("status/{status}")
    @GET
    @LoggedIn(roles = { Role.ADMIN, Role.SUPERADMIN })
    public Response getAllOrders(@PathParam("status") String status) {
        return ResponseFactory.createResponse(orderDetailsService.getOrdersByStatus(OrderStatus.getByString(status)));
    }

    @Path("{orderDetailsId}/products")
    @GET
    @LoggedIn
    public Response getAllOrderedProducts(@PathParam("orderDetailsId") Long orderDetailsId) {
        try {
            return ResponseFactory.createResponse(orderedProductService.getOrderedProductsByOrderDetailsId(orderDetailsId));
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("{orderDetailsId}/status/{status}")
    @PUT
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
