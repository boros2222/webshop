package eu.borostack.rest;

import eu.borostack.dao.CategoryDao;
import eu.borostack.dao.ProductDao;
import eu.borostack.entity.Category;
import eu.borostack.entity.Product;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("product")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProductRest {

    @Inject
    ProductDao productDao;

    @Path("list")
    @GET
    public List<Product> getAllProducts() {
        return productDao.findAll();
    }

    @Path("{id}")
    @GET
    public Product getProduct(@PathParam("id") Long id) {
        return productDao.findById(id);
    }

}
