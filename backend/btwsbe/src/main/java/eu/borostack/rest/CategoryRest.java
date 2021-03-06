package eu.borostack.rest;

import eu.borostack.service.CategoryService;
import eu.borostack.util.ResponseFactory;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("categories")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Stateless
public class CategoryRest {

    @Inject
    private CategoryService categoryService;

    @GET
    public Response getAllCategories(@Context HttpHeaders httpHeaders) {
        return ResponseFactory.createResponse(categoryService.findAll());
    }
}
