package eu.borostack.dao;

import eu.borostack.entity.Category;

import javax.ejb.Stateless;
import javax.transaction.Transactional;

@Stateless
@Transactional
public class CategoryDao extends GenericDao<Long, Category> {

    public CategoryDao() {
        super(Category.class);
    }
}