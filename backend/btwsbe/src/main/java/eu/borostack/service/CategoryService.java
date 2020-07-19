package eu.borostack.service;

import eu.borostack.dao.CategoryDao;
import eu.borostack.entity.Category;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@ApplicationScoped
public class CategoryService {

    @Inject
    private CategoryDao categoryDao;

    public List<Category> findAll() {
        return categoryDao.findAll();
    }
}
