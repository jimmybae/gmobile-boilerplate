module.exports = {
  "rules": {
    "no-console": "off",
    "no-unused-vars": "off",
    "spaced-comment": "off"
  },
  "globals": {
    "$": "true",
    "_": "true",
    "Backbone": "true"
  },
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  "env": {
    "browser": true
  }
};
