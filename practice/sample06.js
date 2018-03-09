const Backbone = require('backbone');
const _ = require('underscore');

var TodosCollection = new Backbone.Collection();

TodosCollection.on("change:title", function(model) {
    console.log("Changed my mind where I should go, " + model.get('title'));
});

TodosCollection.add([
  { title: 'go to Jamaica.', completed: false, id: 3 },
]);

var myTodo = TodosCollection.get(3);

myTodo.set('title', 'go fishing');