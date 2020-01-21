package eu.borostack.service;

import eu.borostack.dao.AddressDao;
import eu.borostack.entity.Address;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class AddressService {

    @Inject
    private AddressDao addressDao;

    public Address save(Address address) {
        if (address.isNew()) {
            return create(address);
        } else {
            return update(address);
        }
    }

    public Address create(Address address) {
        Address savedAddress = null;
        if (address != null) {
            savedAddress = addressDao.findByAddress(address);
            if (savedAddress == null) {
                savedAddress = addressDao.create(address);
            }
        }
        return savedAddress;
    }

    public Address update(Address address) {
        return addressDao.update(address);
    }

    public Address findById(Long id) {
        return addressDao.findById(id);
    }

    public List<Address> findAll() {
        return addressDao.findAll();
    }
}
