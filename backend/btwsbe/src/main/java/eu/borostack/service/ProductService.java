package eu.borostack.service;

import eu.borostack.dao.ProductDao;
import eu.borostack.entity.Product;
import eu.borostack.entity.SortOrder;

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

    public List<Product> findAllWithOffsetAndLimit(final Long offset, final Long limit, final SortOrder sortOrder) {
        return productDao.findAllWithOffsetAndLimit(offset, limit, sortOrder);
    }

    public List<Product> findAllBySearchWithOffsetAndLimit(final String searchTerm, final Long offset,
                                                           final Long limit, final SortOrder sortOrder) {
        return productDao.findAllBySearchWithOffsetAndLimit(searchTerm, offset, limit, sortOrder);
    }

    public List<Product> findAllByCategoryIdWithOffsetAndLimit(final Long categoryId, final Long offset,
                                                               final Long limit, final SortOrder sortOrder) {
        return productDao.findAllByCategoryIdWithOffsetAndLimit(categoryId, offset, limit, sortOrder);
    }
}
