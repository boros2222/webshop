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
            if (userAccount.getPassword() == null || userAccount.getPassword().isBlank()) {
                response = ResponseFactory.createMessageResponse("Jelszót kötelező megadni!", true, 400);
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
        return updateAddresses(userAccount, userAccount);
    }

    private UserAccount updateAddresses(final UserAccount updatedUserAccount, final UserAccount userAccount) {
        userAccount.setInvoiceAddress(addressService.save(updatedUserAccount.getInvoiceAddress()));
        userAccount.setShippingAddress(addressService.save(updatedUserAccount.getShippingAddress()));
        return userAccount;
    }

    public Response deleteUser(final Long userAccountId) {
        if (userAccountId == null) {
            return ResponseFactory.createMessageResponse("Nincs megadva felhasználó!", true, 400);
        }
        final UserAccount userAccount = userAccountDao.findById(userAccountId);
        if (userAccount == null) {
            return ResponseFactory.createMessageResponse("A felhasználó nem található!", true, 400);
        }
        userAccount.setDeleted(true);
        userAccountDao.save(userAccount);
        return ResponseFactory.createMessageResponse("Felhasználó sikeresen törölve!", false);
    }

    public Response updateUser(Long userAccountId, UserAccount updatedUserAccount) {
        if (userAccountId.equals(updatedUserAccount.getId())) {
            if (updatedUserAccount.getInvoiceAddress() != null && !updatedUserAccount.getInvoiceAddress().isValid()) {
                return ResponseFactory.createMessageResponse("Számlázási cím nem teljes!", true, 400);
            }
            if (updatedUserAccount.getShippingAddress() != null && !updatedUserAccount.getShippingAddress().isValid()) {
                return ResponseFactory.createMessageResponse("Szállítási cím nem teljes!", true, 400);
            }

            final UserAccount userAccount = userAccountDao.findById(userAccountId);
            if (updatedUserAccount.getPassword() != null && !updatedUserAccount.getPassword().isBlank()) {
                userAccount.setPassword(updatedUserAccount.getPassword());
                createHash(userAccount);
            }
            updateAddresses(updatedUserAccount, userAccount);
            if (updatedUserAccount.getName() != null) {
                userAccount.setName(updatedUserAccount.getName());
            }
            userAccountDao.save(userAccount);
            return ResponseFactory.createMessageResponse("Felhasználó sikeresen módosítva!", false);
        } else {
            return ResponseFactory.createMessageResponse("Felhasználó módosítása sikertelen!", true, 400);
        }
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
