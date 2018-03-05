/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./scripts/main */ \"./src/js/scripts/main.js\");\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/scripts/dbhelper.js":
/*!************************************!*\
  !*** ./src/js/scripts/dbhelper.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * Common database helper functions.\r\n */\nvar DBHelper = function () {\n  function DBHelper() {\n    _classCallCheck(this, DBHelper);\n  }\n\n  _createClass(DBHelper, null, [{\n    key: 'fetchRestaurants',\n\n\n    /**\r\n     * Fetch all restaurants.\r\n     */\n    value: function fetchRestaurants(callback) {\n      var xhr = new XMLHttpRequest();\n      xhr.open('GET', DBHelper.DATABASE_URL);\n      xhr.onload = function () {\n        if (xhr.status === 200) {\n          // Got a success response from server!\n          var json = JSON.parse(xhr.responseText);\n          var restaurants = json.restaurants;\n          callback(null, restaurants);\n        } else {\n          // Oops!. Got an error from server.\n          var error = 'Request failed. Returned status of ' + xhr.status;\n          callback(error, null);\n        }\n      };\n      xhr.send();\n    }\n\n    /**\r\n     * Fetch a restaurant by its ID.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantById',\n    value: function fetchRestaurantById(id, callback) {\n      // fetch all restaurants with proper error handling.\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var restaurant = restaurants.find(function (r) {\n            return r.id === id;\n          });\n          if (restaurant) {\n            // Got the restaurant\n            callback(null, restaurant);\n          } else {\n            // Restaurant does not exist in the database\n            callback('Restaurant does not exist', null);\n          }\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine type with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisine',\n    value: function fetchRestaurantByCuisine(cuisine, callback) {\n      // Fetch all restaurants  with proper error handling\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given cuisine type\n          var results = restaurants.filter(function (r) {\n            return r.cuisine_type === cuisine;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByNeighborhood',\n    value: function fetchRestaurantByNeighborhood(neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given neighborhood\n          var results = restaurants.filter(function (r) {\n            return r.neighborhood === neighborhood;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisineAndNeighborhood',\n    value: function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var results = restaurants;\n          if (cuisine !== 'all') {\n            // filter by cuisine\n            results = results.filter(function (r) {\n              return r.cuisine_type === cuisine;\n            });\n          }\n          if (neighborhood !== 'all') {\n            // filter by neighborhood\n            results = results.filter(function (r) {\n              return r.neighborhood === neighborhood;\n            });\n          }\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all neighborhoods with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchNeighborhoods',\n    value: function fetchNeighborhoods(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all neighborhoods from all restaurants\n          var neighborhoods = restaurants.map(function (v, i) {\n            return restaurants[i].neighborhood;\n          });\n          // Remove duplicates from neighborhoods\n          var uniqueNeighborhoods = neighborhoods.filter(function (v, i) {\n            return neighborhoods.indexOf(v) === i;\n          });\n          callback(null, uniqueNeighborhoods);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all cuisines with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchCuisines',\n    value: function fetchCuisines(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all cuisines from all restaurants\n          var cuisines = restaurants.map(function (v, i) {\n            return restaurants[i].cuisine_type;\n          });\n          // Remove duplicates from cuisines\n          var uniqueCuisines = cuisines.filter(function (v, i) {\n            return cuisines.indexOf(v) === i;\n          });\n          callback(null, uniqueCuisines);\n        }\n      });\n    }\n\n    /**\r\n     * Restaurant page URL.\r\n     */\n\n  }, {\n    key: 'urlForRestaurant',\n    value: function urlForRestaurant(restaurant) {\n      return './restaurant.html?id=' + restaurant.id;\n    }\n\n    /**\r\n     * Restaurant image URL.\r\n     */\n\n  }, {\n    key: 'imageUrlForRestaurant',\n    value: function imageUrlForRestaurant(restaurant) {\n      return '/img/' + restaurant.photograph;\n    }\n\n    /**\r\n     * Map marker for a restaurant.\r\n     */\n\n  }, {\n    key: 'mapMarkerForRestaurant',\n    value: function mapMarkerForRestaurant(restaurant, map) {\n      var marker = new google.maps.Marker({\n        position: restaurant.latlng,\n        title: restaurant.name,\n        url: DBHelper.urlForRestaurant(restaurant),\n        map: map,\n        animation: google.maps.Animation.DROP\n      });\n\n      return marker;\n    }\n  }, {\n    key: 'DATABASE_URL',\n\n\n    /**\r\n     * Database URL.\r\n     * Change this to restaurants.json file location on your server.\r\n     */\n    get: function get() {\n      var port = 8000; // Change this to your server port\n      return 'http://localhost:' + port + '/data/restaurants.json';\n    }\n  }]);\n\n  return DBHelper;\n}();\n\nexports.default = DBHelper;\n\n//# sourceURL=webpack:///./src/js/scripts/dbhelper.js?");

/***/ }),

/***/ "./src/js/scripts/main.js":
/*!********************************!*\
  !*** ./src/js/scripts/main.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _dbhelper = __webpack_require__(/*! ./dbhelper */ \"./src/js/scripts/dbhelper.js\");\n\nvar _dbhelper2 = _interopRequireDefault(_dbhelper);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar restaurants = void 0;\nvar neighborhoods = void 0;\nvar cuisines = void 0;\nvar map = void 0;\nvar markers = [];\n\n/**\r\n * Fetch neighborhoods and cuisines as soon as the page is loaded.\r\n */\ndocument.addEventListener('DOMContentLoaded', function () {\n  fetchNeighborhoods();\n  fetchCuisines();\n});\n\n/**\r\n * Fetch all neighborhoods and set their HTML.\r\n */\nvar fetchNeighborhoods = function fetchNeighborhoods() {\n  _dbhelper2.default.fetchNeighborhoods(function (error, neighborhoods) {\n    if (error) {\n      // Got an error\n      console.error(error);\n    } else {\n      self.neighborhoods = neighborhoods;\n      fillNeighborhoodsHTML();\n    }\n  });\n};\n\n/**\r\n * Set neighborhoods HTML.\r\n */\nvar fillNeighborhoodsHTML = function fillNeighborhoodsHTML() {\n  var neighborhoods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.neighborhoods;\n\n  var select = document.getElementById('neighborhoods-select');\n  neighborhoods.forEach(function (neighborhood) {\n    var option = document.createElement('option');\n    option.innerHTML = neighborhood;\n    option.value = neighborhood;\n    select.append(option);\n  });\n};\n\n/**\r\n * Fetch all cuisines and set their HTML.\r\n */\nvar fetchCuisines = function fetchCuisines() {\n  _dbhelper2.default.fetchCuisines(function (error, cuisines) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      self.cuisines = cuisines;\n      fillCuisinesHTML();\n    }\n  });\n};\n\n/**\r\n * Set cuisines HTML.\r\n */\nvar fillCuisinesHTML = function fillCuisinesHTML() {\n  var cuisines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.cuisines;\n\n  var select = document.getElementById('cuisines-select');\n\n  cuisines.forEach(function (cuisine) {\n    var option = document.createElement('option');\n    option.innerHTML = cuisine;\n    option.value = cuisine;\n    select.append(option);\n  });\n};\n\n/**\r\n * Initialize Google map, called from HTML.\r\n */\nwindow.initMap = function () {\n  var loc = {\n    lat: 40.722216,\n    lng: -73.987501\n  };\n\n  self.map = new google.maps.Map(document.getElementById('map'), {\n    zoom: 12,\n    center: loc,\n    scrollwheel: false\n  });\n  updateRestaurants();\n};\n\n/**\r\n * Update page and map for current restaurants.\r\n */\nvar updateRestaurants = function updateRestaurants() {\n  var cSelect = document.getElementById('cuisines-select');\n  var nSelect = document.getElementById('neighborhoods-select');\n\n  var cIndex = cSelect.selectedIndex;\n  var nIndex = nSelect.selectedIndex;\n\n  var cuisine = cSelect[cIndex].value;\n  var neighborhood = nSelect[nIndex].value;\n\n  _dbhelper2.default.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, function (error, restaurants) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      resetRestaurants(restaurants);\n      fillRestaurantsHTML();\n    }\n  });\n};\n\n/**\r\n * Clear current restaurants, their HTML and remove their map markers.\r\n */\nvar resetRestaurants = function resetRestaurants(restaurants) {\n  // Remove all restaurants\n  self.restaurants = [];\n  var ul = document.getElementById('restaurants-list');\n  ul.innerHTML = '';\n\n  // Remove all map markers\n  markers.forEach(function (m) {\n    return m.setMap(null);\n  });\n  markers = [];\n  self.restaurants = restaurants;\n};\n\n/**\r\n * Create all restaurants HTML and add them to the webpage.\r\n */\nvar fillRestaurantsHTML = function fillRestaurantsHTML() {\n  var restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurants;\n\n  var ul = document.getElementById('restaurants-list');\n  restaurants.forEach(function (restaurant) {\n    ul.append(createRestaurantHTML(restaurant));\n  });\n  addMarkersToMap();\n};\n\n/**\r\n * Create restaurant HTML.\r\n */\nvar createRestaurantHTML = function createRestaurantHTML(restaurant) {\n  var li = document.createElement('li');\n\n  var image = document.createElement('img');\n  image.className = 'restaurant-img';\n  image.src = _dbhelper2.default.imageUrlForRestaurant(restaurant);\n  li.append(image);\n\n  var name = document.createElement('h1');\n  name.innerHTML = restaurant.name;\n  li.append(name);\n\n  var neighborhood = document.createElement('p');\n  neighborhood.innerHTML = restaurant.neighborhood;\n  li.append(neighborhood);\n\n  var address = document.createElement('p');\n  address.innerHTML = restaurant.address;\n  li.append(address);\n\n  var more = document.createElement('a');\n  more.innerHTML = 'View Details';\n  more.href = _dbhelper2.default.urlForRestaurant(restaurant);\n  li.append(more);\n\n  return li;\n};\n\n/**\r\n * Add markers for current restaurants to the map.\r\n */\nvar addMarkersToMap = function addMarkersToMap() {\n  var restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurants;\n\n  restaurants.forEach(function (restaurant) {\n    // Add marker to the map\n    var marker = _dbhelper2.default.mapMarkerForRestaurant(restaurant, self.map);\n    google.maps.event.addListener(marker, 'click', function () {\n      window.location.href = marker.url;\n    });\n    markers.push(marker);\n  });\n};\n\n//# sourceURL=webpack:///./src/js/scripts/main.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./src/js/index.js ./src/scss/main.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/js/index.js */\"./src/js/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/scss/main.scss */\"./src/scss/main.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/js/index.js_./src/scss/main.scss?");

/***/ })

/******/ });