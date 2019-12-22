package eu.borostack.rest;

import eu.borostack.annotation.LoggedIn;
import eu.borostack.entity.Role;
import eu.borostack.service.ProductService;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("product")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProductRest {

    @Inject
    ProductService productService;

    @Path("list")
    @GET
    public Response getAllProducts() {
        return ResponseFactory.createResponse(productService.findProducts());
    }

    @Path("{id}")
    @GET
    @LoggedIn(roles = {Role.USER})
    public Response getProduct(@PathParam("id") Long id) {
        return ResponseFactory.createResponse(productService.findProductById(id));
    }
}
