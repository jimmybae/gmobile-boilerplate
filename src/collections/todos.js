import { LocalStorage } from 'backbone.localstorage';
import TodoModel from '../models/todo';

const TodoCollection = Backbone.Collection.extend({
  initialize() {
  },
  model: TodoModel,
  localStorage: new LocalStorage('todos'),
  nextOrder() {
    return this.length ? this.last().get('order') + 1 : 1;
  },
  completed() {
    return this.where({ completed: true });
  },
  notcompleted() {
    return this.where({ completed: false });
  },
  comparator: 'order'
});

export default new TodoCollection();
