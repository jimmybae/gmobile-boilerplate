import common from './common';
import todos from './collections/todos';

const Router = Backbone.Router.extend({
  routes: {
    '*filter': 'setFilter'
  },
  setFilter(param) {
    common.todosFilter = param;
    todos.trigger('filter');
  }
});

export default Router;
