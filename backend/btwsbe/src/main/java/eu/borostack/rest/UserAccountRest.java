package eu.borostack.rest;

import eu.borostack.annotation.CheckUserId;
import eu.borostack.annotation.LoggedIn;
import eu.borostack.annotation.LoggedOut;
import eu.borostack.entity.Role;
import eu.borostack.entity.UserAccount;
import eu.borostack.exception.RestProcessException;
import eu.borostack.service.UserAccountService;
import eu.borostack.util.ResponseFactory;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

@Path("users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Stateless
public class UserAccountRest {

    @Inject
    private UserAccountService userAccountService;

    @POST
    @LoggedOut
    public Response register(UserAccount userAccount) {
        try {
            userAccountService.registerUser(userAccount);
            return ResponseFactory.createMessageResponse("Sikeres regisztráció! A megerősítő üzenetet elküldtük a megadott email címre.", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("session")
    @POST
    @LoggedOut
    public Response login(UserAccount userAccount) {
        try {
            final NewCookie authCookie = userAccountService.loginUser(userAccount);
            return ResponseFactory.createMessageResponse("Sikeres bejelentkezés!", false, authCookie);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("{id}")
    @DELETE
    @LoggedIn
    public Response delete(@CheckUserId @PathParam("id") Long userAccountId) {
        try {
            userAccountService.deleteUser(userAccountId);
            return ResponseFactory.createMessageResponse("Felhasználó sikeresen törölve!", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("{id}")
    @PUT
    @LoggedIn
    public Response update(@CheckUserId @PathParam("id") Long userAccountId, UserAccount userAccount) {
        try {
            userAccountService.updateUser(userAccountId, userAccount);
            return ResponseFactory.createMessageResponse("Felhasználó sikeresen módosítva!", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("current")
    @GET
    public Response currentUser() {
        try {
            return ResponseFactory.createResponse(userAccountService.getCurrentUser());
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("offset/{offset}/limit/{limit}")
    @GET
    @LoggedIn(roles = { Role.SUPERADMIN })
    public Response getAllUsers(@PathParam("offset") Long offset,
                                @PathParam("limit") Long limit) {
        return ResponseFactory.createResponse(userAccountService.findAllWithOffsetAndLimit(offset, limit));
    }

    @Path("quantity")
    @GET
    @LoggedIn(roles = { Role.SUPERADMIN })
    public Response countAllUsers() {
        return ResponseFactory.createResponse(userAccountService.countAll());
    }

    @Path("role-options")
    @GET
    @LoggedIn(roles = { Role.SUPERADMIN })
    public Response getAllRoles() {
        return ResponseFactory.createResponse(Role.values());
    }

    @Path("{id}/role/{role}")
    @PUT
    @LoggedIn(roles = { Role.SUPERADMIN })
    public Response editUserRole(@PathParam("id") Long userAccountId, @PathParam("role") String role) {
        try {
            userAccountService.editUserRole(userAccountId, Role.getByString(role));
            return ResponseFactory.createMessageResponse("A felhasználó jogosultsága sikeresen módosítva", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("{id}/active/{isActive}")
    @PUT
    @LoggedIn(roles = { Role.SUPERADMIN })
    public Response editUserActive(@PathParam("id") Long userAccountId, @PathParam("isActive") Boolean isActive) {
        try {
            userAccountService.editUserActive(userAccountId, isActive);
            return ResponseFactory.createMessageResponse("A felhasználó aktív értéke sikeresen módosítva", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("{activate-code}/active")
    @PUT
    @LoggedOut
    public Response activateUser(@PathParam("activate-code") String activateCode) {
        try {
            userAccountService.activateUser(activateCode);
            return ResponseFactory.createMessageResponse("A felhasználó sikeresen aktiválásra került. Most már bejelentkezhet!", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("{email}/new-password-code")
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

    @Path("new-password-code/{new-password-code}")
    @GET
    @LoggedOut
    public Response checkNewPasswordCode(@PathParam("new-password-code") String newPasswordCode) {
        try {
            final UserAccount user = userAccountService.checkNewPasswordCode(newPasswordCode);
            return ResponseFactory.createMessageResponse("Az új jelszót megadhatja! Felhasználó: " + user.getEmail(), false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }

    @Path("{new-password-code}/password")
    @PUT
    @LoggedOut
    public Response setNewPassword(@PathParam("new-password-code") String newPasswordCode, UserAccount user) {
        try {
            userAccountService.setNewPassword(newPasswordCode, user);
            return ResponseFactory.createMessageResponse("Az új jelszó sikeresen beállítva!", false);
        } catch (RestProcessException exception) {
            return exception.getResponse();
        }
    }
}
