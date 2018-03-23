import common from '../common';
import TodoView from './todo';
import headerTemplate from '../templates/header.html';
import appTemplate from '../templates/app.html';

const AppView = Backbone.View.extend({
  events: {
    'click #add': 'clickAdd',
    'keypress #title': 'keypressTitle',
    'click .all-toggle': 'clickAllToggle',
    'click #completed-del': 'clickCompletedDel'
  },
  initialize(options) {
    this.$router = options.appRouter;
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'all', this.header);
    this.listenTo(this.collection, 'filter', this.filterAll);
    this.listenTo(this.collection, 'change:completed', this.filterOne);
    this.render(); 
    this.collection.fetch({
      reset: true,
    });
  },
  el: '#app',
  render() {
    this.$el.html(appTemplate());
    this.$list = this.$('#list');
    this.$headerNav = this.$('.header-nav');
    this.$headerCompleted = this.$('.header-nav #completed');
    this.$headerNotCompleted = this.$('.header-nav #notcompleted');
    this.$title = this.$('#title');
    this.$all = this.$('#all-toggle');
    this.$title.popover({
      title: 'Warning!',
      content: 'No title.',
      placement: 'bottom',
      trigger: 'manual'
    });
    return this;
  },
  header(e) {
    const completed = this.collection.completed().length;
    const notCompleted = this.collection.notcompleted().length;
    this.$headerNav.html(headerTemplate({
      cnt1: this.collection.length,
      cnt2: notCompleted,
      cnt3: completed,
      current: common.todosFilter || 'all'
    }));
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
    this.collection.each(this.filterOne, this);
  },
  filterOne(todo) {
    todo.trigger('visible');
  },
  clickAdd() {
    if (!this.$title.val().trim()) {
      this.$title.popover('show');
      setTimeout(() => {
        this.$title.popover('hide');
      }, 1000);
      this.$title.focus();
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
    const completed = this.$all.text() === 'check_box' ? false : true;
    const checkBox = completed ? 'check_box' : 'check_box_outline_blank';
    this.$all.text(checkBox);
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
