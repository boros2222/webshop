package eu.borostack.rest;

import eu.borostack.annotation.CheckUserId;
import eu.borostack.annotation.LoggedIn;
import eu.borostack.annotation.LoggedOut;
import eu.borostack.entity.UserAccount;
import eu.borostack.service.UserAccountService;

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
    public Response delete(@CheckUserId @PathParam("id") Long userAccountId, UserAccount userAccount) {
        return userAccountService.deleteUser(userAccountId, userAccount);
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
}
