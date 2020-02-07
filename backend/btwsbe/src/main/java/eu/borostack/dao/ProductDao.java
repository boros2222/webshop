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

    public List<Product> findByIdList(List<Long> idList) {
        QProduct product = QProduct.product;
        return new JPAQuery<Product>(entityManager)
                .select(product)
                .from(product)
                .where(product.id.in(idList))
                .fetch();
    }

    public List<Product> findByOffsetAndLimit(Long offset, Long limit) {
        QProduct product = QProduct.product;
        return new JPAQuery<Product>(entityManager)
                .select(product)
                .from(product)
                .offset(offset)
                .limit(limit)
                .fetch();
    }
}