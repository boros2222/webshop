package eu.borostack.service;

import eu.borostack.dao.ProductDao;
import eu.borostack.entity.Product;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class ProductService {

    @Inject
    private ProductDao productDao;

    public Product create(Product product) {
        return productDao.create(product);
    }

    public Product update(Product product) {
        return productDao.update(product);
    }

    public Product findById(Long id) {
        return productDao.findById(id);
    }

    public List<Product> findAll() {
        return productDao.findAll();
    }

    public List<Product> findAllWithOffsetAndLimit(Long offset, Long limit) {
        return productDao.findAllWithOffsetAndLimit(offset, limit);
    }

    public List<Product> findAllBySearchWithOffsetAndLimit(String searchTerm, Long offset, Long limit) {
        return productDao.findAllBySearchWithOffsetAndLimit(searchTerm, offset, limit);
    }

    public List<Product> findAllByCategoryIdWithOffsetAndLimit(Long categoryId, Long offset, Long limit) {
        return productDao.findAllByCategoryIdWithOffsetAndLimit(categoryId, offset, limit);
    }
}
