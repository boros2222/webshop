package eu.borostack.dao;

import com.querydsl.jpa.impl.JPAQuery;
import eu.borostack.entity.QUserAccount;
import eu.borostack.entity.UserAccount;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
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

    public UserAccount findByEmail(String email) {
        QUserAccount userAccount = QUserAccount.userAccount;
        return new JPAQuery<UserAccount>(entityManager)
                .select(userAccount)
                .from(userAccount)
                .where(userAccount.email.eq(email)
                        .and(userAccount.deleted.isFalse().or(userAccount.deleted.isNull())))
                .fetchFirst();
    }
}