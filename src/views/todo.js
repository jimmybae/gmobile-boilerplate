import common from '../common';
import todoTemplate from '../templates/todo.html';

const TodoView = Backbone.View.extend({
  events: {
    'click #completed': 'clickToggle',
    'click .view.title': 'clickToggle',
    'click #delete': 'clickDelete',
    'click #edit': 'clickEdit',
    'click #confirm': 'clickConfirm',
    'click #cancel': 'clickEdit',
    'keypress #edit-title': 'keypressEditTitle'
  },
  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },
  tagName: 'li',
  template: _.template(todoTemplate),
  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$title = this.$('.title');
    this.toggleVisible();
    this.$title.toggleClass('completed', this.model.get('completed'));
    
    this.$view = this.$('.view');
    this.$editTitle = this.$('#edit-title');
    this.$el.addClass('list-group-item p-2');

    return this;
  },
  toggleVisible() {
    this.$el.toggleClass('hidden', this.isHidden());
  },
  isHidden() {
    const isCompleted = this.model.get('completed');
    return (
      (!isCompleted && common.todosFilter === 'completed') ||
      (isCompleted && common.todosFilter === 'notcompleted')
    );
  },
  clickToggle() {
    this.$title.toggleClass('completed', !this.model.get('completed'));
    this.model.toggle();
  },
  clickDelete() {
    this.model.destroy();
  },
  clickEdit() {
    this.$view.toggleClass('hidden');
    this.$editTitle.val('').focus().val(this.model.get('title'));
  },
  clickConfirm() {
    this.model.save('title', this.$('#edit-title').val());
  },
  keypressEditTitle(e) {
    if (e.which !== 13) {
      return;
    }
    this.clickConfirm();
  }
});
export default TodoView;
