import TodoCollection from '../src/collections/todos';
import TodoModel from '../src/models/todo';

describe('[TodoCollection]', () => {
  it('init', () => {
    expect(TodoCollection).toMatchSnapshot();
  });

  it('create', () => {
    TodoCollection.add(new TodoModel({
      title: 'todo1',
      order: TodoCollection.nextOrder(),
      completed: false,
    }));
    TodoCollection.add(new TodoModel({
      title: 'todo2',
      order: TodoCollection.nextOrder(),
      completed: true,
    }));
    expect(TodoCollection.length).toBe(2);
  });

  it('completed', () => {
    expect(TodoCollection.completed().length).toBe(1);
  });
  
  it('notcompleted', () => {
    expect(TodoCollection.notcompleted().length).toBe(1);
  });
});