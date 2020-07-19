package eu.borostack.service;

import eu.borostack.dao.AddressDao;
import eu.borostack.entity.Address;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@Transactional
@ApplicationScoped
public class AddressService {

    @Inject
    private AddressDao addressDao;

    public Address save(Address address) {
        Address savedAddress = null;
        if (address != null && address.isValid()) {
            savedAddress = addressDao.findByAddress(address);
            if (savedAddress == null) {
                savedAddress = addressDao.create(address);
            }
        }
        return savedAddress;
    }
}
