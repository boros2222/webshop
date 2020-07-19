package eu.borostack.rest;

import eu.borostack.annotation.LoggedIn;
import eu.borostack.dto.ProductDto;
import eu.borostack.entity.Role;
import eu.borostack.entity.SortOrder;
import eu.borostack.exception.RestProcessException;
import eu.borostack.service.ProductService;
import eu.borostack.util.ResponseFactory;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("products")
@Produces(MediaType.APPLICATION_JSON)
public class ProductRest {

    @Inject
    private ProductService productService;

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllProducts() {
        return ResponseFactory.createResponse(productService.findAll());
    }

    @GET
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getProduct(@PathParam("id") Long id) {
        return ResponseFactory.createResponse(productService.findById(id));
    }

    @GET
    @Path("offset/{offset}/limit/{limit}/sort/{sort}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getProduct(@PathParam("offset") Long offset,
                               @PathParam("limit") Long limit,
                               @PathParam("sort") String sort) {
        return ResponseFactory.createResponse(productService.findAllWithOffsetAndLimit(
                offset, limit, SortOrder.getByString(sort)));
    }

    @GET
    @Path("search/{search}/offset/{offset}/limit/{limit}/sort/{sort}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getProduct(@PathParam("search") String searchTerm,
                               @PathParam("offset") Long offset,
                               @PathParam("limit") Long limit,
                               @PathParam("sort") String sort) {
        return ResponseFactory.createResponse(productService.findAllBySearchWithOffsetAndLimit(
                searchTerm, offset, limit, SortOrder.getByString(sort)));
    }

    @GET
    @Path("/category/{categoryId}/offset/{offset}/limit/{limit}/sort/{sort}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getProduct(@PathParam("categoryId") Long categoryId,
                               @PathParam("offset") Long offset,
                               @PathParam("limit") Long limit,
                               @PathParam("sort") String sort) {
        return ResponseFactory.createResponse(productService.findAllByCategoryIdWithOffsetAndLimit(
                categoryId, offset, limit, SortOrder.getByString(sort)));
    }

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @LoggedIn(roles = { Role.ADMIN, Role.SUPERADMIN })
    public Response create(MultipartFormDataInput multipartData) {
        try {
            productService.addNewProduct(new ProductDto(multipartData));
            return ResponseFactory.createMessageResponse("Új termék sikeresen hozzáadva", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @PUT
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @LoggedIn(roles = { Role.ADMIN, Role.SUPERADMIN })
    public Response edit(MultipartFormDataInput multipartData) {
        try {
            productService.editProduct(new ProductDto(multipartData));
            return ResponseFactory.createMessageResponse("A termék sikeresen mentve", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @DELETE
    @Path("{id}")
    @LoggedIn(roles = { Role.ADMIN, Role.SUPERADMIN })
    public Response delete(@PathParam("id") Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseFactory.createMessageResponse("Termék sikeresen törölve", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }
}
