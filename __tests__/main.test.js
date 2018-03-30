import 'bootstrap';
import Router from '../src/router';
import AppView from '../src/views/app';
import todos from '../src/collections/todos';

const body = $('body').append('<div id="app"></div>');

describe('[main]', () => {
  it('init', () => {
    const router = new Router();
    const view = new AppView({
      collection: todos,
      appRouter: router
    });
    
    expect(view.$el.html()).toMatchSnapshot();
  });
});