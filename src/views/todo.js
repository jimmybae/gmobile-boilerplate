import common from '../common';
import todoTemplate from '../templates/todo.html';

const TodoView = Backbone.View.extend({
  events: {
    'click #completed': 'toggle',
    'click #delete': 'delete',
    'click #edit': 'edit',
    'click #confirm': 'confirm',
    'click #cancel': 'edit',
    'keypress #editTitle': 'editTitle'
  },
  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },
  tagName: 'li',
  render() {
    this.$el.html(todoTemplate(this.model.toJSON()));
    this.$title = this.$('.title');
    this.$title.toggleClass('completed', this.model.get('completed'));
    this.$editTitle = this.$('#editTitle');
    this.$view = this.$('.view');
    return this;
  },
  toggle() {
    this.$title.toggleClass('completed', !this.model.get('completed'));
    this.model.toggle();
  },
  delete() {
    this.model.destroy();
  },
  editTitle(e) {
    if (e.which !== 13) {
      return;
    }
    this.confirm();
  },
  edit() {
    this.$view.toggleClass('hidden');
    this.$editTitle.val('').focus().val(this.model.get('title'));
  },
  confirm() {
    this.model.save('title', this.$('#editTitle').val());
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
  }
});
export default TodoView;
