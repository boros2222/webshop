package eu.borostack.dao;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public abstract class GenericDao<K, E> {

    protected Class<E> entityClass;

    @PersistenceContext
    protected EntityManager entityManager;

    protected GenericDao(Class<E> entityClass) {
        this.entityClass = entityClass;
    }

    public E create(E entity) {
        entityManager.persist(entity);

        return entity;
    }

    public E update(E entity) {
        entityManager.merge(entity);

        return entity;
    }

    public E remove(E entity) {
        entityManager.remove(entity);

        return entity;
    }

    public E findById(K id) {
        return entityManager.find(entityClass, id);
    }

    public List<E> findAll() {
        return entityManager.createQuery("SELECT e from " + entityClass.getSimpleName() + " e", entityClass)
                .getResultList();
    }

}