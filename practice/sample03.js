const Backbone = require('backbone');
var Todo = Backbone.Model.extend({
  default: {
    title: '',
    completed: false
  },
  validate: function(attribs) {
    console.log('validate');
    if(attribs.title === undefined) {
      return 'Error title';
    }
  },
  initialize: function() {
    console.log('This model initialized.');
    this.on('change', function() {
      console.log('Value changed');
    });
    this.on('change:title', function(model, title) {
      console.log('Value changed title: ' + title);
    });
    this.on('change:completed', function(model, completed) {
      console.log('Value changed completed: ' + completed);
    });
    this.on('error', function(model, error){
        console.log(error);
    });
  },
  setTitle: function(newTitle) {
    this.set({title: newTitle});
  }
});

var todo = new Todo();
todo.set('title', 'Set Title');
todo.setTitle('abcd');
todo.set({
  title: 'Set Title1',
  completed: true
});
console.log('Title has changed: '+ todo.get('title'));
console.log('-----------');
todo.set('completed', false);

