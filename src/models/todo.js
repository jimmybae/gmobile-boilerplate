const TodoModel = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },
  toggle() {
    this.save({
      completed: !this.get('completed')
    });
  }
});

export default TodoModel;
