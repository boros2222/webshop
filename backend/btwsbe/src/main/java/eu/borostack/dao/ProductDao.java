package eu.borostack.dao;

import com.querydsl.jpa.impl.JPAQuery;
import eu.borostack.entity.Product;
import eu.borostack.entity.QProduct;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class ProductDao extends GenericDao<Long, Product> {

    public ProductDao() {
        super(Product.class);
    }

    public List<Product> findAllWithOffsetAndLimit(Long offset, Long limit) {
        QProduct product = QProduct.product;
        return new JPAQuery<Product>(entityManager)
                .select(product)
                .from(product)
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public List<Product> findAllBySearchWithOffsetAndLimit(String searchTerm, Long offset, Long limit) {
        QProduct product = QProduct.product;
        return new JPAQuery<Product>(entityManager)
                .select(product)
                .from(product)
                .where(product.name.containsIgnoreCase(searchTerm)
                        .or(product.description.containsIgnoreCase(searchTerm))
                        .or(product.category.name.containsIgnoreCase(searchTerm)))
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public List<Product> findAllByCategoryIdWithOffsetAndLimit(Long categoryId, Long offset, Long limit) {
        QProduct product = QProduct.product;
        return new JPAQuery<Product>(entityManager)
                .select(product)
                .from(product)
                .where(product.category.id.eq(categoryId))
                .offset(offset)
                .limit(limit)
                .fetch();
    }
}