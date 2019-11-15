package eu.borostack.service;

import eu.borostack.dao.CategoryDao;
import eu.borostack.entity.Category;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class CategoryService {

    @Inject
    private CategoryDao categoryDao;

    public Category createCategory(Category category) {
        return categoryDao.create(category);
    }

    public Category updateCategory(Category category) {
        return categoryDao.update(category);
    }

    public Category findCategoryById(Long id) {
        return categoryDao.findById(id);
    }

    public List<Category> findCategories() {
        return categoryDao.findAll();
    }
}
