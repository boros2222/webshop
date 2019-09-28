package eu.borostack.dao;

import eu.borostack.entity.Todo;

import javax.transaction.Transactional;

@Transactional
public class TodoDao extends GenericDao<Long, Todo> {

    public TodoDao() {
        super(Todo.class);
    }
}