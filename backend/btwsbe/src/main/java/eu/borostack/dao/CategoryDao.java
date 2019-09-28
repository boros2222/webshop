package eu.borostack.dao;

import eu.borostack.entity.Category;

import javax.transaction.Transactional;

@Transactional
public class CategoryDao extends GenericDao<Long, Category> {

    public CategoryDao() {
        super(Category.class);
    }
}