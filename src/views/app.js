import common from '../common';
import TodoView from './todo';
import appTemplate from '../templates/app.html';

const AppView = Backbone.View.extend({
  events: {
    'click #add': 'addTodo',
    'keypress #title': 'addTodoEnter',
    'click #all-toggle': 'allToggle',
    'click #completed-del': 'completedDel'
  },
  initialize(options) {
    this.$router = options.appRouter;
    this.$list = this.$('#list');
    this.$headerAll = this.$('#header #all');
    this.$headerCompleted = this.$('#header #completed');
    this.$headerNotCompleted = this.$('#header #notcompleted');
    this.$title = this.$('#title');
    this.$all = this.$('#all-toggle').get(0);

    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'remove', this.remove);
    this.listenTo(this.collection, 'all', this.render);
    this.listenTo(this.collection, 'filter', this.filterAll);
    this.listenTo(this.collection, 'change:completed', this.filterOne);
    this.collection.fetch({
      reset: true,
    });
  },
  el: '#app',
  remove() {
    if (this.collection.length === 0 && common.todosFilter !== 'all') {
      this.$router.navigate('#all', true);
    }
  },
  render() {
    const completed = this.collection.completed().length;
    const notCompleted = this.collection.notcompleted().length;
    this.$headerAll.html(appTemplate({
      filter: 'all',
      cnt: this.collection.length,
      current: common.todosFilter
    }));
    this.$headerNotCompleted.html(appTemplate({
      filter: 'notcompleted',
      cnt: notCompleted,
      current: common.todosFilter
    }));
    this.$headerCompleted.html(appTemplate({
      filter: 'completed',
      cnt: completed,
      current: common.todosFilter
    }));
    return this;
  },
  addOne(todo) {
    const view = new TodoView({ model: todo });
    this.$list.append(view.render().el);
  },
  addAll() {
    this.$list.html('');
    this.collection.each(this.addOne, this);
  },
  addTodoEnter(e) {
    if (e.which !== 13) {
      return;
    }
    this.addTodo();
  },
  addTodo() {
    if (!this.$title.val().trim()) {
      return;
    }
    const val = this.$title.val().trim();
    this.collection.create({
      title: val,
      order: this.collection.nextOrder(),
      completed: false,
    });
    this.$title.val('');
    this.$title.focus();
  },
  filterOne(todo) {
    todo.trigger('visible');
  },
  filterAll() {
    if (common.todosFilter === 'completed') {
      this.$all.checked = true;
    } else {
      this.$all.checked = false;
    }
    this.collection.each(this.filterOne, this);
  },
  completedDel() {
    _.invoke(this.collection.completed(), 'destroy');
    return false;
  },
  allToggle() {
    const completed = this.$all.checked;
    this.collection.each((todo) => {
      todo.save('completed', completed);
    });
  }
});
export default AppView;
