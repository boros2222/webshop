package eu.borostack.dao;

import com.querydsl.jpa.impl.JPAQuery;
import eu.borostack.entity.QUserAccount;
import eu.borostack.entity.UserAccount;

import javax.transaction.Transactional;

@Transactional
public class UserAccountDao extends GenericDao<Long, UserAccount> {

    public UserAccountDao() {
        super(UserAccount.class);
    }

    public UserAccount findByEmail(String email) {
        QUserAccount userAccount = QUserAccount.userAccount;
        return new JPAQuery<UserAccount>(entityManager)
                .select(userAccount)
                .from(userAccount)
                .where(userAccount.email.eq(email)
                        .and(userAccount.deleted.eq(false).or(userAccount.deleted.isNull())))
                .fetchFirst();
    }
}