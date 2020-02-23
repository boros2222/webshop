package eu.borostack.rest;

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
    private ProductService productService;

    @Path("list")
    @GET
    public Response getAllProducts() {
        return ResponseFactory.createResponse(productService.findAll());
    }

    @Path("{id}")
    @GET
    //@LoggedIn(roles = {Role.USER})
    public Response getProduct(@PathParam("id") Long id) {
        return ResponseFactory.createResponse(productService.findById(id));
    }

    @Path("{offset}/{limit}")
    @GET
    public Response getProduct(@PathParam("offset") Long offset, @PathParam("limit") Long limit) {
        return ResponseFactory.createResponse(productService.findAllWithOffsetAndLimit(offset, limit));
    }

    @Path("{search}/{offset}/{limit}")
    @GET
    public Response getProduct(@PathParam("search") String searchTerm, @PathParam("offset") Long offset, @PathParam("limit") Long limit) {
        return ResponseFactory.createResponse(productService.findAllBySearchWithOffsetAndLimit(searchTerm, offset, limit));
    }

    @Path("/category/{categoryId}/{offset}/{limit}")
    @GET
    public Response getProduct(@PathParam("categoryId") Long categoryId, @PathParam("offset") Long offset, @PathParam("limit") Long limit) {
        return ResponseFactory.createResponse(productService.findAllByCategoryIdWithOffsetAndLimit(categoryId, offset, limit));
    }
}
