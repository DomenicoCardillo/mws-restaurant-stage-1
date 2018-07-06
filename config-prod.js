const CONFIG = {
  HOST: 'https://restaurant-reviews-app-server.herokuapp.com/',
  // ... some other prod variables
};

if (typeof module !== 'undefined') {
  module.exports = CONFIG;
} else {
  self.CONFIG = CONFIG;
}