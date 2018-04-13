import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import Router from './router';
import './todo.css';
import AppView from './views/app';
import todos from './collections/todos';

$(() => {
  const router = new Router();
  const view = new AppView({
    collection: todos,
    appRouter: router
  });
  Backbone.history.start();
});