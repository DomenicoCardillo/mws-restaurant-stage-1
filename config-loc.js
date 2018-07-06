const CONFIG = {
  HOST: 'http://localhost:1337/',
  // ... some other local variables
};

if (typeof module !== 'undefined') {
  module.exports = CONFIG;
} else {
  self.CONFIG = CONFIG;
}