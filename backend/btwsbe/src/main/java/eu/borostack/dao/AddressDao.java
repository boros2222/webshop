package eu.borostack.dao;

import com.querydsl.jpa.impl.JPAQuery;
import eu.borostack.entity.Address;
import eu.borostack.entity.QAddress;

import javax.ejb.Stateless;
import javax.transaction.Transactional;

@Stateless
@Transactional
public class AddressDao extends GenericDao<Long, Address> {

    public AddressDao() {
        super(Address.class);
    }

    public Address findByAddress(Address addr) {
        QAddress address = QAddress.address;
        return new JPAQuery<Address>(entityManager)
                .select(address)
                .from(address)
                .where(address.postalCode.eq(addr.getPostalCode())
                        .and(address.city.eq(addr.getCity()))
                        .and(address.street.eq(addr.getStreet()))
                        .and(address.houseNumber.eq(addr.getHouseNumber())))
                .fetchFirst();
    }
}