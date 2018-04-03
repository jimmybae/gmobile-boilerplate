import TodoModel from '../src/models/todo';

const todo = new TodoModel({
  completed: false,
  order: 1,
  title: 'dummy'
});
todo.url = '/dummy';

describe('[TodoModel]', () => {
  it('init', () => {
    expect(todo).toMatchSnapshot();
  });

  it('title set', () => {
    todo.set('title', 'set-dummy');
    expect(todo).toMatchSnapshot();
  });

  it('title save', () => {
    todo.save({
      'title': 'save-dummy'
    });
    expect(todo).toMatchSnapshot();
  });

  it('clear', () => {
    todo.clear();
    expect(todo).toMatchSnapshot();
  });
});