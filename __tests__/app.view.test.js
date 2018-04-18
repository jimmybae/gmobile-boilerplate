import 'bootstrap';
import Router from '../src/router';
import AppView from '../src/views/app';
import todos from '../src/collections/todos';
import common from '../src/common';
import TodoView from '../src/views/todo';
import headerTemplate from '../src/templates/header.html';
import appTemplate from '../src/templates/app.html';

const body = $('body').append('<div id="app"></div>');

const router = new Router();
const view = new AppView({
  collection: todos,
  appRouter: router
});
Backbone.history.start();

describe('[AppView]', () => {
  it('init', () => {
    expect(view.$el.html()).toMatchSnapshot();
  });

  it('[ui] add button click', () => {
    view.$el.find('#title').val('dummy-add');
    view.$el.find('#add').click();
    expect(view.$el.find('#list').html()).toMatchSnapshot();
  });

  it('[ui] add - keypress event', () => {
    // event는 전달 되는데 왜 값은 변경되지 않는걸까?
    const e = $.Event("keypress");
    // e.which = 65;
    // view.$el.find('#title').focus().trigger(e);

    view.$el.find('#title').val('dummy-keypress');
    e.which = 13;
    view.$el.find('#title').focus().trigger(e);
    expect(view.$el.find('.view.title').length).toBe(2);
  });

  jest.useFakeTimers();
  it('[ui] add - keypress event non value', () => {
    const e = $.Event("keypress");
    e.which = 65;
    view.$el.find('#title').focus().trigger(e);

    e.which = 13;
    view.$el.find('#title').focus().trigger(e);

    //jest.runAllTimers();
    jest.runOnlyPendingTimers();

    expect(view.$el.find('.view.title:not(.completed)').length).toBe(2);
  });

  it('[ui] all-toggle button click', () => {
    view.$el.find('.all-toggle.icon-btn').click();
    // expect(view.$el.find('#list').html()).toMatchSnapshot();
    expect(view.$el.find('.view.title.completed').length).toBe(2);
  });

  it('[ui] notcompleted link click', () => {
    // view.$el.find('a#notcompleted').click(); // doesn't working
    router.navigate('#notcompleted', { trigger: true });
    // expect(view.$el.find('#list').html()).toMatchSnapshot();
    expect(view.$el.find('li.hidden').length).toBe(2);
  });

  it('[ui] completed link click', () => {
    router.navigate('#completed', { trigger: true });
    // expect(view.$el.find('#list').html()).toMatchSnapshot();
    expect(view.$el.find('li:not(.hidden)').length).toBe(2);
  });
  
  it('[ui] all-toggle button click', () => {
    view.$el.find('.all-toggle.icon-btn').click();
    // expect(view.$el.find('#list').html()).toMatchSnapshot();
    expect(view.$el.find('li.hidden').length).toBe(2);
  });

  it('[ui] all link click', () => {
    router.navigate('#all', { trigger: true });
    // expect(view.$el.find('#list').html()).toMatchSnapshot();
    expect(view.$el.find('.view.title:not(.completed)').length).toBe(2);
  });

  it('[ui] completed-del button click', () => {
    view.$el.find('.view.title')[0].click();
    view.$el.find('#completed-del').click();
    // expect(view.$el.find('#list').html()).toMatchSnapshot();
    expect(view.$el.find('.view.title:not(.completed)').length).toBe(1);
  });
});