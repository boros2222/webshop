package eu.borostack.dao;

import com.querydsl.jpa.impl.JPAQuery;
import eu.borostack.entity.Product;
import eu.borostack.entity.QProduct;
import eu.borostack.entity.SortOrder;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class ProductDao extends GenericDao<Long, Product> {

    public ProductDao() {
        super(Product.class);
    }

    public List<Product> findAllWithOffsetAndLimit(final Long offset, final Long limit, final SortOrder sortOrder) {
        QProduct product = QProduct.product;
        final JPAQuery<Product> query = new JPAQuery<Product>(entityManager)
                .select(product)
                .from(product);
        return addSorting(query, sortOrder)
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public List<Product> findAllBySearchWithOffsetAndLimit(final String searchTerm, final Long offset,
                                                           final Long limit, final SortOrder sortOrder) {
        QProduct product = QProduct.product;
        final JPAQuery<Product> query = new JPAQuery<Product>(entityManager)
                .select(product)
                .from(product)
                .where(product.name.containsIgnoreCase(searchTerm)
                        .or(product.description.containsIgnoreCase(searchTerm))
                        .or(product.category.name.containsIgnoreCase(searchTerm)));
        return addSorting(query, sortOrder)
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public List<Product> findAllByCategoryIdWithOffsetAndLimit(final Long categoryId, final Long offset,
                                                               final Long limit, final SortOrder sortOrder) {
        QProduct product = QProduct.product;
        final JPAQuery<Product> query = new JPAQuery<Product>(entityManager)
                .select(product)
                .from(product)
                .where(product.category.id.eq(categoryId));
        return addSorting(query, sortOrder)
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    private JPAQuery<Product> addSorting(final JPAQuery<Product> query, final SortOrder sortOrder) {
        QProduct product = QProduct.product;
        if (SortOrder.PRICE_ASC.equals(sortOrder)) {
            return query.orderBy(product.price.asc());
        } else if (SortOrder.PRICE_DESC.equals(sortOrder)) {
            return query.orderBy(product.price.desc());
        }
        return query;
    }
}