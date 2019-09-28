package eu.borostack.service;

import eu.borostack.dao.TodoDao;
import eu.borostack.entity.Todo;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class TodoService {

    @Inject
    TodoDao todoDao;

    public Todo createTodo (Todo todo) {
        return todoDao.create(todo);
    }

    public Todo updateTodo (Todo todo) {
        return todoDao.update(todo);
    }

    public Todo findTodoById(Long id) {
        return todoDao.findById(id);
    }

    public List<Todo> getTodos() {
        return todoDao.findAll();
    }
}
