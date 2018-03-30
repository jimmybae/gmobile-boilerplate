import PopperJs from 'popper.js';

export default class Popper {
  // static placements = PopperJs.placements;
  constructor() {
    this.placements = PopperJs.placements;

    return {
      destroy: () => {},
      scheduleUpdate: () => {}
    };
  }
}