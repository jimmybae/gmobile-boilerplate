import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

global.$ = global.jQuery = $;
global._ = _;
global.Backbone = Backbone;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;