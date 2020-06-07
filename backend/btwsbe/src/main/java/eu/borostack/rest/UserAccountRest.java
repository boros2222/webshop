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

    @Path("active/edit/{id}/{isActive}")
    @POST
    @LoggedIn(roles = { Role.ADMIN, Role.SUPERADMIN })
    public Response editUserActive(@PathParam("id") Long userAccountId, @PathParam("isActive") Boolean isActive) {
        try {
            userAccountService.editUserActive(userAccountId, isActive);
            return ResponseFactory.createMessageResponse("A felhasználó aktív értéke sikeresen módosítva", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("activate/{code}")
    @POST
    @LoggedOut
    public Response activateUser(@PathParam("code") String activateCode) {
        try {
            userAccountService.activateUser(activateCode);
            return ResponseFactory.createMessageResponse("A felhasználó sikeresen aktiválásra került. Most már bejelentkezhet!", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("forgot-password/{email}")
    @POST
    @LoggedOut
    public Response forgotPassword(@PathParam("email") String email) {
        try {
            userAccountService.forgotPassword(email);
            return ResponseFactory.createMessageResponse("Új jelszó sikeresen megigényelve. A további teendőket elküldtük a megadott email címre.", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("check-new-password-code/{code}")
    @POST
    @LoggedOut
    public Response checkNewPasswordCode(@PathParam("code") String code) {
        try {
            final UserAccount user = userAccountService.checkNewPasswordCode(code);
            return ResponseFactory.createMessageResponse("Az új jelszót megadhatja! Felhasználó: " + user.getEmail(), false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("set-new-password/{code}")
    @POST
    @LoggedOut
    public Response setNewPassword(@PathParam("code") String code, UserAccount user) {
        try {
            userAccountService.setNewPassword(code, user);
            return ResponseFactory.createMessageResponse("Az új jelszó sikeresen beállítva!", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }
}
