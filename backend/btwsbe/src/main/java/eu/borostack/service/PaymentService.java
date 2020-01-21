package eu.borostack.service;

import eu.borostack.dao.PaymentDao;
import eu.borostack.entity.Payment;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class PaymentService {

    @Inject
    private PaymentDao paymentDao;

    public Payment save(Payment payment) {
        return paymentDao.save(payment);
    }

    public Payment create(Payment payment) {
        return paymentDao.create(payment);
    }

    public Payment update(Payment payment) {
        return paymentDao.update(payment);
    }

    public Payment findById(Long id) {
        return paymentDao.findById(id);
    }

    public List<Payment> findAll() {
        return paymentDao.findAll();
    }
}
