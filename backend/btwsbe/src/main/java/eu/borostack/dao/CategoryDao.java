package eu.borostack.dao;

import eu.borostack.entity.Category;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Transactional
@ApplicationScoped
public class CategoryDao extends GenericDao<Long, Category> {

    public CategoryDao() {
        super(Category.class);
    }
}