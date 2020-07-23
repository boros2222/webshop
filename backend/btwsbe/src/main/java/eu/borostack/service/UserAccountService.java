package eu.borostack.service;

import com.fasterxml.uuid.Generators;
import eu.borostack.dao.UserAccountDao;
import eu.borostack.entity.Role;
import eu.borostack.entity.UserAccount;
import eu.borostack.exception.RestProcessException;
import eu.borostack.util.ResponseFactory;
import eu.borostack.util.ValidationUtil;
import org.apache.commons.lang3.BooleanUtils;
import org.mindrot.jbcrypt.BCrypt;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.ws.rs.core.NewCookie;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Stateless
@Transactional
public class UserAccountService {

    @Inject
    private UserAccountDao userAccountDao;

    @Inject
    private AddressService addressService;

    @Inject
    private AuthenticationService authenticationService;

    @Inject
    private MailService mailService;

    public UserAccount getCurrentUser() throws RestProcessException {
        UserAccount currentUser = authenticationService.getLoggedInUser();
        if (currentUser != null) {
            return currentUser;
        } else {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs felhasználó bejelentkezve!", true, 401));
        }
    }

    public NewCookie loginUser(final UserAccount loginUser) throws RestProcessException {
        validateUser(loginUser);
        UserAccount existingUser = userAccountDao.findByEmail(loginUser.getEmail());
        if (existingUser == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Hibás email cím vagy jelszó!", true, 400));
        }
        NewCookie authCookie = authenticationService.authenticate(loginUser, existingUser);
        if (authCookie == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Hibás email cím vagy jelszó!", true, 400));
        }
        if (!existingUser.getActive()) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A felhasználó nem aktív", true, 400));
        }
        return authCookie;
    }

    public void registerUser(final UserAccount userAccount) throws RestProcessException {
        validateUser(userAccount);
        UserAccount existingUser = userAccountDao.findByEmail(userAccount.getEmail());
        if (existingUser != null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A felhasználó már létezik!", true, 400));
        }
        UserAccount savedUser = createUser(userAccount);
        if (savedUser == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Sikertelen regisztráció!", true, 500));
        }
    }

    private void validateUser(final UserAccount userAccount) throws RestProcessException {
        if (userAccount == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs felhasználó megadva!", true, 400));
        }
        Set<ConstraintViolation<UserAccount>> fails = ValidationUtil.validate(userAccount);
        if(!fails.isEmpty()) {
            String message = fails.iterator().next().getMessage();
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    message, true, 400));
        }
        if (userAccount.getPassword() == null || userAccount.getPassword().isBlank()) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Jelszót kötelező megadni!", true, 400));
        }
    }

    private UserAccount createUser(final UserAccount userAccount) {
        createHash(userAccount);
        createAddresses(userAccount);
        userAccount.setActivateCode(Generators.timeBasedGenerator().generate().toString());
        final UserAccount savedUser = userAccountDao.create(userAccount);
        mailService.sendActivateMail(savedUser);
        return savedUser;
    }

    private UserAccount createHash(final UserAccount userAccount) {
        String salt = BCrypt.gensalt(12);
        String hashed = BCrypt.hashpw(userAccount.getPassword(), salt);
        userAccount.setPassword(null);
        userAccount.setSalt(salt);
        userAccount.setHash(hashed);
        return userAccount;
    }

    private void createAddresses(final UserAccount userAccount) {
        updateAddresses(userAccount, userAccount);
    }

    private void updateAddresses(final UserAccount updatedUserAccount, final UserAccount userAccount) {
        userAccount.setInvoiceAddress(addressService.save(updatedUserAccount.getInvoiceAddress()));
        userAccount.setShippingAddress(addressService.save(updatedUserAccount.getShippingAddress()));
    }

    public void deleteUser(final Long userAccountId) throws RestProcessException {
        if (Role.ADMIN.equals(authenticationService.getLoggedInUser().getRole())) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("Nincs jogosultság a megtekintéshez!", true, 400));
        }
        if (userAccountId == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megadva felhasználó!", true, 400));
        }
        final UserAccount userAccount = userAccountDao.findById(userAccountId);
        if (userAccount == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A felhasználó nem található!", true, 400));
        }
        if (userAccount.isAdmin()) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A felhasználó nem törölhető!", true, 400));
        }
        userAccount.setDeleted(true);
        userAccountDao.save(userAccount);
    }

    public void updateUser(Long userAccountId, UserAccount updatedUserAccount) throws RestProcessException {
        if (Role.ADMIN.equals(authenticationService.getLoggedInUser().getRole())) {
            throw new RestProcessException(ResponseFactory.createMessageResponse("Nincs jogosultság a megtekintéshez!", true, 400));
        }
        if (!userAccountId.equals(updatedUserAccount.getId())) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Felhasználó módosítása sikertelen!", true, 400));
        }
        if (updatedUserAccount.getInvoiceAddress() != null && !updatedUserAccount.getInvoiceAddress().isValid()) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Számlázási cím nem teljes!", true, 400));
        }
        if (updatedUserAccount.getShippingAddress() != null && !updatedUserAccount.getShippingAddress().isValid()) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Szállítási cím nem teljes!", true, 400));
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
    }

    public void editUserRole(Long userAccoutId, Role role) throws RestProcessException {
        if (role == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A megadott jogosultság helytelen", true, 400));
        }
        if (role == Role.SUPERADMIN) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Szuper Adminisztrátor jogosultság nem adható", true, 400));
        }
        final UserAccount userAccount = userAccountDao.findById(userAccoutId);
        if (userAccount == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A felhasználó nem található", true, 400));
        }
        if (Role.SUPERADMIN.equals(userAccount.getRole())) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A felhasználó jogosultsága nem módosítható", true, 400));
        }
        userAccount.setRole(role);
        userAccountDao.save(userAccount);
    }

    public void editUserActive(Long userAccoutId, Boolean isActive) throws RestProcessException {
        if (isActive == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megadva érték", true, 400));
        }
        final UserAccount userAccount = userAccountDao.findById(userAccoutId);
        if (userAccount == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A felhasználó nem található", true, 400));
        }
        userAccount.setActive(isActive);
        userAccountDao.save(userAccount);
    }

    public void activateUser(final String activateCode) throws RestProcessException {
        if (activateCode == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megadva aktiváló kód", true, 400));
        }

        final UserAccount userAccount = userAccountDao.findByActivateCode(activateCode);
        if (userAccount == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Hibás aktiváló kód", true, 400));
        }
        userAccount.setActive(true);
        userAccount.setActivateCode(null);
        userAccountDao.save(userAccount);
    }

    public void forgotPassword(final String email) throws RestProcessException {
        if (email == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megadva email cím", true, 400));
        }

        final UserAccount userAccount = userAccountDao.findByEmail(email);
        if (userAccount == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs ilyen felhasználó", true, 400));
        }
        if (BooleanUtils.isNotTrue(userAccount.getActive())) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "A megadott felhasználó nincs aktiválva", true, 400));
        }
        userAccount.setNewPasswordCode(Generators.timeBasedGenerator().generate().toString());
        userAccount.setNewPasswordCodeValid(LocalDateTime.now().plusHours(24));
        final UserAccount savedUser = userAccountDao.save(userAccount);
        mailService.sendNewPasswordMail(savedUser);
    }

    public UserAccount checkNewPasswordCode(final String newPasswordCode) throws RestProcessException {
        if (newPasswordCode == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megadva jelszó-visszaállító kód", true, 400));
        }

        final UserAccount userAccount = userAccountDao.findByNewPasswordCode(newPasswordCode);
        if (userAccount == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Hibás jelszó-visszaállító kód", true, 400));
        }
        return userAccount;
    }

    public void setNewPassword(final String newPasswordCode, final UserAccount user) throws RestProcessException {
        if (newPasswordCode == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megadva a jelszó-visszaállító kód", true, 400));
        }

        final UserAccount existingUser = userAccountDao.findByNewPasswordCode(newPasswordCode);
        if (existingUser == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Hibás a jelszó-visszaállító kód", true, 400));
        }
        if (user.getPassword() == null) {
            throw new RestProcessException(ResponseFactory.createMessageResponse(
                    "Nincs megadva új jelszó", true, 400));
        }
        existingUser.setNewPasswordCode(null);
        existingUser.setNewPasswordCodeValid(null);
        existingUser.setPassword(user.getPassword());
        userAccountDao.save(createHash(existingUser));
    }

    public long countAll() {
        return userAccountDao.countAll();
    }

    public List<UserAccount> findAllWithOffsetAndLimit(final Long offset, final Long limit) {
        return userAccountDao.findAllWithOffsetAndLimit(offset, limit);
    }
}
