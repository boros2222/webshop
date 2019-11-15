package eu.borostack.service;

import eu.borostack.Util;
import eu.borostack.dao.AddressDao;
import eu.borostack.dao.UserAccountDao;
import eu.borostack.entity.*;
import org.mindrot.jbcrypt.BCrypt;
import org.postgresql.util.PSQLException;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import javax.xml.registry.infomodel.User;
import java.util.List;
import java.util.Set;

@Transactional
public class UserAccountService {

    @Inject
    private UserAccountDao userAccountDao;

    @Inject
    private AddressService addressService;

    public Response registerUser(UserAccount userAccount) {
        Response response = validateUser(userAccount);

        if (response == null) {
            try {
                UserAccount savedUserAccount = createUser(userAccount);
                if (savedUserAccount != null) {
                    response = Response.ok(new ResponseJson("Sikeres regisztráció!", false)).build();
                }
            } catch (Exception exception) {
                response = Response.ok(new ResponseJson(exception.getMessage(), true)).status(500).build();
            }
        }
        return response;
    }

    private Response validateUser(UserAccount userAccount) {
        Response response = null;

        Set<ConstraintViolation<UserAccount>> fails = Util.validate(userAccount);
        if(fails.isEmpty()) {
            UserAccount existingUserAccount = userAccountDao.findByEmail(userAccount.getEmail());
            if (existingUserAccount != null) {
                response = Response.ok(new ResponseJson("A felhasználó már létezik!", true)).status(400).build();
            }
        } else {
            String message = fails.iterator().next().getMessage();
            response = Response.ok(new ResponseJson(message, true)).status(400).build();
        }
        return response;
    }

    private UserAccount createUser(UserAccount userAccount) {
        handlePassword(userAccount);
        handleRole(userAccount);
        handleAddresses(userAccount);
        return userAccountDao.create(userAccount);
    }

    private UserAccount handlePassword(UserAccount userAccount) {
        String salt = BCrypt.gensalt(12);
        String hashed = BCrypt.hashpw(userAccount.getPassword(), salt);
        userAccount.setPassword(" ");
        userAccount.setSalt(salt);
        userAccount.setHash(hashed);
        return userAccount;
    }

    private UserAccount handleRole(UserAccount userAccount) {
        UserRole userRole = new UserRole();
        userRole.setUserAccount(userAccount);
        userRole.setRole(Role.USER);
        userAccount.getUserRoles().add(userRole);
        return userAccount;
    }

    private UserAccount handleAddresses(UserAccount userAccount) {
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
