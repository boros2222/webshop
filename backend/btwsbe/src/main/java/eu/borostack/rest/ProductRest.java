package eu.borostack.rest;

import eu.borostack.entity.Product;
import eu.borostack.service.ProductService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("product")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProductRest {

    @Inject
    ProductService productService;

    @Path("list")
    @GET
    public List<Product> getAllProducts() {
        return productService.findProducts();
    }

    @Path("{id}")
    @GET
    public Product getProduct(@PathParam("id") Long id) {
        return productService.findProductById(id);
    }

}
