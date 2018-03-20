import common from '../common';
import TodoView from './todo';
import appTemplate from '../templates/app.html';

const AppView = Backbone.View.extend({
  events: {
    'click #add': 'clickAdd',
    'keypress #title': 'keypressTitle',
    'click #all-toggle': 'clickAllToggle',
    'click #completed-del': 'clickCompletedDel'
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
    this.listenTo(this.collection, 'all', this.render);
    this.listenTo(this.collection, 'filter', this.filterAll);
    this.listenTo(this.collection, 'change:completed', this.filterOne);
    this.collection.fetch({
      reset: true,
    });
  },
  el: '#app',
  render() {
    const completed = this.collection.completed().length;
    const notCompleted = this.collection.notcompleted().length;
    this.$headerAll.html(appTemplate({
      cnt1: this.collection.length,
      cnt2: notCompleted,
      cnt3: completed,
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
  filterAll() {
    if (common.todosFilter === 'completed') {
      this.$all.checked = true;
    } else {
      this.$all.checked = false;
    }
    this.collection.each(this.filterOne, this);
  },
  filterOne(todo) {
    todo.trigger('visible');
  },
  clickAdd() {
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
  keypressTitle(e) {
    if (e.which !== 13) {
      return;
    }
    this.clickAdd();
  },
  clickAllToggle() {
    const completed = this.$all.checked;
    this.collection.each((todo) => {
      todo.save('completed', completed);
    });
  },
  clickCompletedDel() {
    _.invoke(this.collection.completed(), 'destroy');
    return false;
  }
});
export default AppView;
