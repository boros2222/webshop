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
}
