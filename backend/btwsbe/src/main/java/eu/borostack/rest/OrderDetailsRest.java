package eu.borostack.rest;

import eu.borostack.annotation.CheckUserId;
import eu.borostack.annotation.LoggedIn;
import eu.borostack.entity.OrderDetails;
import eu.borostack.entity.UserAccount;
import eu.borostack.service.OrderDetailsService;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("order")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class OrderDetailsRest {

    @Inject
    private OrderDetailsService orderDetailsService;

    @Path("new")
    @POST
    @LoggedIn
    public Response placeOrder(OrderDetails order) {
        return orderDetailsService.placeOrder(order);
    }

    @Path("list/{userAccountId}")
    @GET
    @LoggedIn
    public Response getOrders(@CheckUserId @PathParam("userAccountId") Long userAccountId) {
        return ResponseFactory.createResponse(orderDetailsService.getOrdersByUserAccountId(userAccountId));
    }

}
