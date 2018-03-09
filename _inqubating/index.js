import random from 'lodash/random';
import hello from './hello';
import world from './world';
import './common.css';

// var a = 0;

console.log(`${hello}, ${world}!`);
document.write(`${hello}, ${world}!`);
document.write('<br />');
document.write(`Random: ${random(0, 100)}`);
