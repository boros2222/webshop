package eu.borostack.dao;

import eu.borostack.entity.GenericEntity;
import org.hibernate.Session;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public abstract class GenericDao<K, E extends GenericEntity> {

    private Class<E> entityClass;

    @PersistenceContext
    protected EntityManager entityManager;

    protected GenericDao(Class<E> entityClass) {
        this.entityClass = entityClass;
    }

    public void flush() {
        entityManager.flush();
    }

    public E save(E entity) {
        if (entity.isNew()) {
            return create(entity);
        } else {
            return update(entity);
        }
    }

    public E create(E entity) {
        entityManager.persist(entity);
        return entity;
    }

    public E update(E entity) {
        return entityManager.merge(entity);
    }

    public void remove(E entity) {
        entityManager.remove(entity);
    }

    public E findById(K id) {
        return entityManager.find(entityClass, id);
    }

    public List<E> findAll() {
        return entityManager.createQuery("SELECT e from " + entityClass.getSimpleName() + " e", entityClass)
                .getResultList();
    }

}