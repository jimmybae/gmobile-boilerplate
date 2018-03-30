import TodoModel from '../src/models/todo';
import TodoView from '../src/views/todo';

const body = $('body').append('<ul class="list-group list-group-flush" id="list">');
const todo = new TodoModel({
  completed: false,
  order: 1,
  title: "dummy"
});
todo.url = "/dummy";

const todoView = new TodoView({ model: todo }).render();
body.find('#list').append(todoView.el);

describe('[TodoView]', () => {
  it('init', () => {
    expect(body.html()).toMatchSnapshot();
  });

  it('model set - [event] change', () => {
    todo.set('title', 'dummy-change');
    expect(todoView.$el.html()).toMatchSnapshot();
  });

  it('model toggle - [event] toggle', () => {
    todo.toggle();
    expect(todoView.$el.html()).toMatchSnapshot();
  });

  it('[ui] title click', () => {
    todoView.$el.find('.view.title').click();
    expect(todoView.$el.html()).toMatchSnapshot();
  });

  it('[ui] edit button click', () => {
    todoView.$el.find('#edit').click();
    expect(todoView.$el.html()).toMatchSnapshot();
  });

  it('[ui] comfirm button click', () => {
    todoView.$el.find('#edit-title').val('dummy-confirm');
    todoView.$el.find('#confirm').click();
    expect(todoView.$el.find('.title').text()).toMatch('dummy-confirm');
    expect(todoView.$el.html()).toMatchSnapshot();
  });

  it('[ui] edit - keypress event', async () => {
    // event는 전달 되는데 왜 값은 변경되지 않는걸까?
    todoView.$el.find('#edit').click();
    const e = $.Event("keypress");
    e.which = 65;
    todoView.$el.find('#edit-title').focus().trigger(e);

    e.which = 13;
    todoView.$el.find('#edit-title').focus().trigger(e);
    expect(todoView.$el.html()).toMatchSnapshot();
  });

  it('[ui] delete button click', () => {
    todoView.$el.find('#delete').click();
    expect(body.html()).toMatchSnapshot();
  });
});