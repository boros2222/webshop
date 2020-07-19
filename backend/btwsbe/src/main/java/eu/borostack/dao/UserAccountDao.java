package eu.borostack.dao;

import com.querydsl.jpa.impl.JPAQuery;
import eu.borostack.entity.QUserAccount;
import eu.borostack.entity.UserAccount;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Transactional
@ApplicationScoped
public class UserAccountDao extends GenericDao<Long, UserAccount> {

    public UserAccountDao() {
        super(UserAccount.class);
    }

    @Override
    public UserAccount findById(Long id) {
        QUserAccount userAccount = QUserAccount.userAccount;
        return new JPAQuery<UserAccount>(entityManager)
                .select(userAccount)
                .from(userAccount)
                .where(userAccount.id.eq(id)
                        .and(userAccount.deleted.isFalse().or(userAccount.deleted.isNull())))
                .fetchOne();
    }

    @Override
    public List<UserAccount> findAll() {
        QUserAccount userAccount = QUserAccount.userAccount;
        return new JPAQuery<UserAccount>(entityManager)
                .select(userAccount)
                .from(userAccount)
                .where(userAccount.deleted.isFalse().or(userAccount.deleted.isNull()))
                .fetch();
    }

    public List<UserAccount> findAllWithOffsetAndLimit(final Long offset, final Long limit) {
        QUserAccount userAccount = QUserAccount.userAccount;
        return new JPAQuery<UserAccount>(entityManager)
                .select(userAccount)
                .from(userAccount)
                .where(userAccount.deleted.isFalse().or(userAccount.deleted.isNull()))
                .orderBy(userAccount.registrationDate.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public long countAll() {
        QUserAccount userAccount = QUserAccount.userAccount;
        return new JPAQuery<UserAccount>(entityManager)
                .select(userAccount)
                .from(userAccount)
                .where(userAccount.deleted.isFalse().or(userAccount.deleted.isNull()))
                .fetchCount();
    }

    public UserAccount findByEmail(String email) {
        QUserAccount userAccount = QUserAccount.userAccount;
        return new JPAQuery<UserAccount>(entityManager)
                .select(userAccount)
                .from(userAccount)
                .where(userAccount.email.eq(email)
                        .and(userAccount.deleted.isFalse().or(userAccount.deleted.isNull())))
                .fetchFirst();
    }

    public UserAccount findByActivateCode(String activateCode) {
        QUserAccount userAccount = QUserAccount.userAccount;
        return new JPAQuery<UserAccount>(entityManager)
                .select(userAccount)
                .from(userAccount)
                .where(userAccount.activateCode.eq(activateCode)
                        .and(userAccount.active.isFalse().or(userAccount.active.isNull()))
                        .and(userAccount.deleted.isFalse().or(userAccount.deleted.isNull())))
                .fetchFirst();
    }

    public UserAccount findByNewPasswordCode(String newPasswordCode) {
        QUserAccount userAccount = QUserAccount.userAccount;
        return new JPAQuery<UserAccount>(entityManager)
                .select(userAccount)
                .from(userAccount)
                .where(userAccount.newPasswordCode.eq(newPasswordCode)
                        .and(userAccount.newPasswordCodeValid.after(LocalDateTime.now()))
                        .and(userAccount.active.isTrue())
                        .and(userAccount.deleted.isFalse().or(userAccount.deleted.isNull())))
                .fetchFirst();
    }
}