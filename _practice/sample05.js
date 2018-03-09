const Backbone = require('backbone');
const _ = require('underscore');
const $ = require('jquery');
var TodoView = Backbone.View.extend({

  tagName:  'li',

  // 단인 항목에 대한 템플릿 함수를 캐쉬한다.
  todoTpl: _.template( $('#item-template').html() ),

  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit':   'close'
  },

  // 할일 항목의 제목을 다시 그린다.
  render: function() {
    this.$el.html( this.todoTpl( this.model.toJSON() ) );
    this.input = this.$('.edit');
    return this;
  },

  edit: function() {
    // 할일의 제목을 더블 클릭했을 때 수행된다
  },

  close: function() {
    // 할일이 포커스를 잃었을 때 수행된다.
  },

  updateOnEnter: function( e ) {
    // 할일이 편집 모드에서 키가 눌릴 때 마다 수행된다
    // 하지만 우리는 동작을 위해 엔터를 기다릴 것이다
  }
});

var todoView = new TodoView();

// 뷰 인스턴스에 대응되는 DOM 요소의 레퍼런스를 출력한다.
console.log(todoView.el);