package eu.borostack.dao;

import eu.borostack.entity.UserRole;

import javax.transaction.Transactional;

@Transactional
public class UserRoleDao extends GenericDao<Long, UserRole> {

    public UserRoleDao() {
        super(UserRole.class);
    }
}