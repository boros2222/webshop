package eu.borostack.rest;

import eu.borostack.annotation.CheckUserId;
import eu.borostack.annotation.LoggedIn;
import eu.borostack.annotation.LoggedOut;
import eu.borostack.entity.Role;
import eu.borostack.entity.UserAccount;
import eu.borostack.exception.RestProcessException;
import eu.borostack.service.UserAccountService;
import eu.borostack.util.ResponseFactory;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserAccountRest {

    @Inject
    private UserAccountService userAccountService;

    @Path("register")
    @POST
    @LoggedOut
    public Response register(UserAccount userAccount) {
        return userAccountService.registerUser(userAccount);
    }

    @Path("login")
    @POST
    @LoggedOut
    public Response login(UserAccount userAccount) {
        return userAccountService.loginUser(userAccount);
    }

    @Path("delete/{id}")
    @POST
    @LoggedIn
    public Response delete(@CheckUserId @PathParam("id") Long userAccountId) {
        return userAccountService.deleteUser(userAccountId);
    }

    @Path("update/{id}")
    @POST
    @LoggedIn
    public Response update(@CheckUserId @PathParam("id") Long userAccountId, UserAccount userAccount) {
        return userAccountService.updateUser(userAccountId, userAccount);
    }

    @Path("current")
    @GET
    public Response currentUser() {
        return userAccountService.getCurrentUser();
    }

    @Path("list/{offset}/{limit}")
    @GET
    @LoggedIn(roles = { Role.SUPERADMIN })
    public Response getAllUsers(@PathParam("offset") Long offset,
                                @PathParam("limit") Long limit) {
        return ResponseFactory.createResponse(userAccountService.findAllWithOffsetAndLimit(offset, limit));
    }

    @Path("count")
    @GET
    @LoggedIn(roles = { Role.SUPERADMIN })
    public Response countAllUsers() {
        return ResponseFactory.createResponse(userAccountService.countAll());
    }

    @Path("list/role")
    @GET
    public Response getAllRoles() {
        return ResponseFactory.createResponse(Role.values());
    }

    @Path("role/edit/{id}/{role}")
    @POST
    @LoggedIn(roles = { Role.SUPERADMIN })
    public Response editUserRole(@PathParam("id") Long userAccountId, @PathParam("role") String role) {
        try {
            userAccountService.editUserRole(userAccountId, Role.getByString(role));
            return ResponseFactory.createMessageResponse("A felhasználó jogosultsága sikeresen módosítva", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }
}
