package eu.borostack.service;

import eu.borostack.Util;
import eu.borostack.dao.UserAccountDao;
import eu.borostack.entity.ResponseJson;
import eu.borostack.entity.Role;
import eu.borostack.entity.UserAccount;
import eu.borostack.entity.UserRole;
import org.mindrot.jbcrypt.BCrypt;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
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

    public Response loginUser(final UserAccount userAccount) {
        Response response = validateUser(userAccount);

        if (response == null) {
            UserAccount existingUserAccount = userAccountDao.findByEmail(userAccount.getEmail());
            if (existingUserAccount == null) {
                response = Response.ok(new ResponseJson("A felhasználó nem létezik!", true))
                        .status(400).build();
            } else {
                if (BCrypt.checkpw(userAccount.getPassword(), existingUserAccount.getHash())) {
                    response = authenticationService.authenticate(existingUserAccount);
                } else {
                    response = Response.ok(new ResponseJson("Hibás jelszó!", true))
                            .status(400).build();
                }
            }
        }
        return response;
    }

    public Response registerUser(final UserAccount userAccount) {
        Response response = validateUser(userAccount);

        if (response == null) {
            UserAccount existingUserAccount = userAccountDao.findByEmail(userAccount.getEmail());
            if (existingUserAccount != null) {
                response = Response.ok(new ResponseJson("A felhasználó már létezik!", true))
                        .status(400).build();
            }
            else {
                UserAccount savedUserAccount = createUser(userAccount);
                if (savedUserAccount != null) {
                    response = Response.ok(new ResponseJson("Sikeres regisztráció!", false)).build();
                }
            }
        }
        return response;
    }

    private Response validateUser(final UserAccount userAccount) {
        Response response = null;
        Set<ConstraintViolation<UserAccount>> fails = Util.validate(userAccount);
        if(!fails.isEmpty()) {
            String message = fails.iterator().next().getMessage();
            response = Response.ok(new ResponseJson(message, true))
                    .status(400).build();
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
        userAccount.setInvoiceAddress(addressService.createAddress(userAccount.getInvoiceAddress()));
        userAccount.setShippingAddress(addressService.createAddress(userAccount.getShippingAddress()));
        return userAccount;
    }

    public UserAccount updateUser(UserAccount userAccount) {
        return userAccountDao.update(userAccount);
    }

    public UserAccount findUserById(Long id) {
        return userAccountDao.findById(id);
    }

    public List<UserAccount> findUsers() {
        return userAccountDao.findAll();
    }
}
