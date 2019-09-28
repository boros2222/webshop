package eu.borostack.dao;

import eu.borostack.entity.Product;

import javax.transaction.Transactional;

@Transactional
public class ProductDao extends GenericDao<Long, Product> {

    public ProductDao() {
        super(Product.class);
    }

}