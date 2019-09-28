package eu.borostack.rest;

import eu.borostack.dao.CategoryDao;
import eu.borostack.entity.Category;
import eu.borostack.entity.Todo;
import eu.borostack.service.TodoService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("category")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CategoryRest {

    @Inject
    CategoryDao categoryDao;

    @Path("list")
    @GET
    public List<Category> getAllCategories() {
        return categoryDao.findAll();
    }

}
