package eu.borostack.dao;

import eu.borostack.entity.Payment;

import javax.transaction.Transactional;

@Transactional
public class PaymentDao extends GenericDao<Long, Payment> {

    public PaymentDao() {
        super(Payment.class);
    }
}