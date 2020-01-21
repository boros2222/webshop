package eu.borostack.service;

import eu.borostack.dao.OrderedProductDao;
import eu.borostack.entity.OrderedProduct;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class OrderedProductService {

    @Inject
    private OrderedProductDao orderedProductDao;

    public OrderedProduct save(OrderedProduct orderedProduct) {
        return orderedProductDao.save(orderedProduct);
    }

    public OrderedProduct create(OrderedProduct orderedProduct) {
        return orderedProductDao.create(orderedProduct);
    }

    public OrderedProduct update(OrderedProduct orderedProduct) {
        return orderedProductDao.update(orderedProduct);
    }

    public OrderedProduct findById(Long id) {
        return orderedProductDao.findById(id);
    }

    public List<OrderedProduct> findAll() {
        return orderedProductDao.findAll();
    }
}
