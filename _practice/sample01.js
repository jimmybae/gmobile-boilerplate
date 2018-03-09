const Backbone = require('backbone');

const Todo = Backbone.Model.extend({
  // Todo에 대한 기본 속성
  defaults: {
    title: '',
    completed: false
  }
});

// 기본 속성으로 todo 객체를 생성한다.
const firstTodo = new Todo();

console.log("Todo's default title: " + firstTodo.get('title')); // ""
console.log("Todo's default status: " + firstTodo.get('completed')); // false

firstTodo.set('title', 'First TODO');
firstTodo.set('completed', true);

console.log("Todo's default title: " + firstTodo.get('title')); // ""
console.log("Todo's default status: " + firstTodo.get('completed')); // false

const secondTodo = new Todo({
  'title': 'Second TODO',
  'completed': true
});

console.log("Todo's default title: " + secondTodo.get('title')); // ""
console.log("Todo's default status: " + secondTodo.get('completed')); // false