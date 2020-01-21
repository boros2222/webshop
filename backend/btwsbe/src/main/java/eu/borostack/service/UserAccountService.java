package eu.borostack.service;

import eu.borostack.dao.UserAccountDao;
import eu.borostack.entity.Role;
import eu.borostack.entity.UserAccount;
import eu.borostack.entity.UserRole;
import eu.borostack.util.ResponseFactory;
import eu.borostack.util.ValidationUtil;
import org.mindrot.jbcrypt.BCrypt;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Set;

@Transactional
public class UserAccountService {

    @Inject
    private UserAccountDao userAccountDao;

    @Inject
    private AddressService addressService;

    @Inject
    private AuthenticationService authenticationService;

    public Response getCurrentUser() {
        UserAccount currentUser = authenticationService.checkLoggedInUser();
        if (currentUser != null) {
            return ResponseFactory.createResponse(currentUser);
        } else {
            return ResponseFactory.createMessageResponse("Nincs felhasználó bejelentkezve!", true, 401);
        }
    }

    public Response loginUser(final UserAccount loginUser) {
        Response response = validateUser(loginUser);

        if (response == null) {
            UserAccount existingUser = userAccountDao.findByEmail(loginUser.getEmail());
            if (existingUser == null) {
                response = ResponseFactory.createMessageResponse("A felhasználó nem létezik!", true, 400);
            } else {
                NewCookie authCookie = authenticationService.authenticate(loginUser, existingUser);
                if (authCookie != null) {
                    response = ResponseFactory.createMessageResponse("Sikeres bejelentkezés!", false, authCookie);
                } else {
                    response = ResponseFactory.createMessageResponse("Hibás jelszó!", true, 400);
                }
            }
        }
        return response;
    }

    public Response registerUser(final UserAccount userAccount) {
        Response response = validateUser(userAccount);

        if (response == null) {
            UserAccount existingUser = userAccountDao.findByEmail(userAccount.getEmail());
            if (existingUser != null) {
                response = ResponseFactory.createMessageResponse("A felhasználó már létezik!", true, 400);
            }
            else {
                UserAccount savedUser = createUser(userAccount);
                if (savedUser != null) {
                    response = ResponseFactory.createMessageResponse("Sikeres regisztráció!", false);
                } else {
                    response = ResponseFactory.createMessageResponse("Sikertelen regisztráció!", true, 500);
                }
            }
        }
        return response;
    }

    private Response validateUser(final UserAccount userAccount) {
        Response response = null;
        if (userAccount != null) {
            Set<ConstraintViolation<UserAccount>> fails = ValidationUtil.validate(userAccount);
            if(!fails.isEmpty()) {
                String message = fails.iterator().next().getMessage();
                response = ResponseFactory.createMessageResponse(message, true, 400);
            }
        } else {
            response = ResponseFactory.createMessageResponse("Nincs felhasználó megadva!", true, 400);
        }
        return response;
    }

    private UserAccount createUser(final UserAccount userAccount) {
        createHash(userAccount);
        createDefaultRole(userAccount);
        createAddresses(userAccount);
        return userAccountDao.create(userAccount);
    }

    private UserAccount createHash(final UserAccount userAccount) {
        String salt = BCrypt.gensalt(12);
        String hashed = BCrypt.hashpw(userAccount.getPassword(), salt);
        userAccount.setPassword(" ");
        userAccount.setSalt(salt);
        userAccount.setHash(hashed);
        return userAccount;
    }

    private UserAccount createDefaultRole(final UserAccount userAccount) {
        UserRole userRole = new UserRole();
        userRole.setUserAccount(userAccount);
        userRole.setRole(Role.USER);
        userAccount.getUserRoles().add(userRole);
        return userAccount;
    }

    private UserAccount createAddresses(final UserAccount userAccount) {
        userAccount.setInvoiceAddress(addressService.create(userAccount.getInvoiceAddress()));
        userAccount.setShippingAddress(addressService.create(userAccount.getShippingAddress()));
        return userAccount;
    }

    public UserAccount update(UserAccount userAccount) {
        return userAccountDao.update(userAccount);
    }

    public UserAccount findById(Long id) {
        return userAccountDao.findById(id);
    }

    public List<UserAccount> findAll() {
        return userAccountDao.findAll();
    }
}
