package eu.borostack.rest;

import eu.borostack.service.CategoryService;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("category")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CategoryRest {

    @Inject
    CategoryService categoryService;

    @Path("list")
    @GET
    public Response getAllCategories(@Context HttpHeaders httpHeaders) {
        return ResponseFactory.createResponse(categoryService.findCategories());
    }
}
