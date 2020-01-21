package eu.borostack.dao;

import eu.borostack.entity.OrderedProduct;

import javax.transaction.Transactional;

@Transactional
public class OrderedProductDao extends GenericDao<Long, OrderedProduct> {

    public OrderedProductDao() {
        super(OrderedProduct.class);
    }
}