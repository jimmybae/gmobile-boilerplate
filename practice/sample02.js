const Backbone = require('backbone');
const LocalStorage = require('backbone.localstorage').LocalStorage;

const Todo = Backbone.Model.extend({
  // Todo에 대한 기본 속성
  defaults: {
    title: '',
    completed: false
  }
});

const Todos = Backbone.Collection.extend({
  model: Todo,
  
  // 책의 첫번째 부분동안 localStorage를 간단히 사용할 것이다.
  // `"todos-backbone"` 네임스페이스에 모든 todo 항목을 저장한다.
  localStorage: new LocalStorage('todos-backbone')
  
  // 서버와 REST API로 동작할 때, 여기에 적당히
  // 작성할 것이다:
  // url: "/todos"
  
});

const firstTodo = new Todo({
  title: 'First TODO'
});
const todos = new Todos([firstTodo]);
console.log(todos.length);

todos.create({
  title: 'Second TODO'
});
console.log(todos.length);

