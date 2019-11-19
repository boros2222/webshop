package eu.borostack.rest;

import eu.borostack.annotation.WithoutAuth;
import eu.borostack.entity.UserAccount;
import eu.borostack.service.UserAccountService;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserAccountRest {

    @Inject
    UserAccountService userAccountService;

    @Path("register")
    @POST
    @WithoutAuth
    public Response register(UserAccount userAccount) {
        return userAccountService.registerUser(userAccount);
    }

    @Path("login")
    @POST
    @WithoutAuth
    public Response login(UserAccount userAccount) {
        return userAccountService.loginUser(userAccount);
    }
}
