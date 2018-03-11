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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/restaurant.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/restaurant.js":
/*!**************************!*\
  !*** ./js/restaurant.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./scripts/restaurant_info */ \"./js/scripts/restaurant_info.js\");\n\n//# sourceURL=webpack:///./js/restaurant.js?");

/***/ }),

/***/ "./js/scripts/dbhelper.js":
/*!********************************!*\
  !*** ./js/scripts/dbhelper.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * Common database helper functions.\r\n */\nvar DBHelper = function () {\n  function DBHelper() {\n    _classCallCheck(this, DBHelper);\n  }\n\n  _createClass(DBHelper, null, [{\n    key: 'fetchRestaurants',\n\n\n    /**\r\n     * Fetch all restaurants.\r\n     */\n    value: function fetchRestaurants(callback) {\n      var xhr = new XMLHttpRequest();\n      xhr.open('GET', DBHelper.DATABASE_URL);\n      xhr.onload = function () {\n        if (xhr.status === 200) {\n          // Got a success response from server!\n          var json = JSON.parse(xhr.responseText);\n          var restaurants = json.restaurants;\n          callback(null, restaurants);\n        } else {\n          // Oops!. Got an error from server.\n          var error = 'Request failed. Returned status of ' + xhr.status;\n          callback(error, null);\n        }\n      };\n      xhr.send();\n    }\n\n    /**\r\n     * Fetch a restaurant by its ID.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantById',\n    value: function fetchRestaurantById(id, callback) {\n      // fetch all restaurants with proper error handling.\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var restaurant = restaurants.find(function (r) {\n            return r.id === id;\n          });\n          if (restaurant) {\n            // Got the restaurant\n            callback(null, restaurant);\n          } else {\n            // Restaurant does not exist in the database\n            callback('Restaurant does not exist', null);\n          }\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine type with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisine',\n    value: function fetchRestaurantByCuisine(cuisine, callback) {\n      // Fetch all restaurants  with proper error handling\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given cuisine type\n          var results = restaurants.filter(function (r) {\n            return r.cuisine_type === cuisine;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByNeighborhood',\n    value: function fetchRestaurantByNeighborhood(neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given neighborhood\n          var results = restaurants.filter(function (r) {\n            return r.neighborhood === neighborhood;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisineAndNeighborhood',\n    value: function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var results = restaurants;\n          if (cuisine !== 'all') {\n            // filter by cuisine\n            results = results.filter(function (r) {\n              return r.cuisine_type === cuisine;\n            });\n          }\n          if (neighborhood !== 'all') {\n            // filter by neighborhood\n            results = results.filter(function (r) {\n              return r.neighborhood === neighborhood;\n            });\n          }\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all neighborhoods with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchNeighborhoods',\n    value: function fetchNeighborhoods(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all neighborhoods from all restaurants\n          var neighborhoods = restaurants.map(function (v, i) {\n            return restaurants[i].neighborhood;\n          });\n          // Remove duplicates from neighborhoods\n          var uniqueNeighborhoods = neighborhoods.filter(function (v, i) {\n            return neighborhoods.indexOf(v) === i;\n          });\n          callback(null, uniqueNeighborhoods);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all cuisines with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchCuisines',\n    value: function fetchCuisines(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all cuisines from all restaurants\n          var cuisines = restaurants.map(function (v, i) {\n            return restaurants[i].cuisine_type;\n          });\n          // Remove duplicates from cuisines\n          var uniqueCuisines = cuisines.filter(function (v, i) {\n            return cuisines.indexOf(v) === i;\n          });\n          callback(null, uniqueCuisines);\n        }\n      });\n    }\n\n    /**\r\n     * Restaurant page URL.\r\n     */\n\n  }, {\n    key: 'urlForRestaurant',\n    value: function urlForRestaurant(restaurant) {\n      return './restaurant.html?id=' + restaurant.id;\n    }\n\n    /**\r\n     * Restaurant image URL.\r\n     */\n\n  }, {\n    key: 'imageUrlForRestaurant',\n    value: function imageUrlForRestaurant(restaurant) {\n      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'original';\n\n      return '/img/' + size + '/' + restaurant.photograph;\n    }\n\n    /**\r\n     * Get Picture from restaurant and sizes\r\n     */\n\n  }, {\n    key: 'sizedPictureForRestaurant',\n    value: function sizedPictureForRestaurant(restaurant) {\n      var imgSizes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n\n      var picture = document.createElement('picture');\n\n      var source = null;\n      imgSizes.forEach(function (imgSize) {\n        source = document.createElement('source');\n        source.media = '(min-width: ' + imgSize.minWidth + 'px)';\n        source.srcset = DBHelper.imageUrlForRestaurant(restaurant, imgSize.size);\n        picture.append(source);\n      });\n\n      var img = document.createElement('img');\n      img.src = DBHelper.imageUrlForRestaurant(restaurant);\n      img.alt = 'Restaurant photo';\n\n      picture.append(img);\n\n      return picture;\n    }\n\n    /**\r\n     * Map marker for a restaurant.\r\n     */\n\n  }, {\n    key: 'mapMarkerForRestaurant',\n    value: function mapMarkerForRestaurant(restaurant, map) {\n      var marker = new google.maps.Marker({\n        position: restaurant.latlng,\n        title: restaurant.name,\n        url: DBHelper.urlForRestaurant(restaurant),\n        map: map,\n        animation: google.maps.Animation.DROP\n      });\n\n      return marker;\n    }\n  }, {\n    key: 'DATABASE_URL',\n\n\n    /**\r\n     * Database URL.\r\n     * Change this to restaurants.json file location on your server.\r\n     */\n    get: function get() {\n      var port = 8000; // Change this to your server port\n      return 'http://localhost:' + port + '/data/restaurants.json';\n    }\n  }]);\n\n  return DBHelper;\n}();\n\nexports.default = DBHelper;\n\n//# sourceURL=webpack:///./js/scripts/dbhelper.js?");

/***/ }),

/***/ "./js/scripts/restaurant_info.js":
/*!***************************************!*\
  !*** ./js/scripts/restaurant_info.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _dbhelper = __webpack_require__(/*! ./dbhelper */ \"./js/scripts/dbhelper.js\");\n\nvar _dbhelper2 = _interopRequireDefault(_dbhelper);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar restaurant = void 0;\nvar map = void 0;\n\n/**\n * Initialize Google map, called from HTML.\n */\nwindow.initMap = function () {\n  fetchRestaurantFromURL(function (error, restaurant) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      self.map = new google.maps.Map(document.getElementById('map'), {\n        zoom: 16,\n        center: restaurant.latlng,\n        scrollwheel: false\n      });\n      fillBreadcrumb();\n      _dbhelper2.default.mapMarkerForRestaurant(self.restaurant, self.map);\n    }\n  });\n};\n\n/**\n * Get current restaurant from page URL.\n */\nvar fetchRestaurantFromURL = function fetchRestaurantFromURL(callback) {\n  if (self.restaurant) {\n    // restaurant already fetched!\n    callback(null, self.restaurant);\n    return;\n  }\n  var id = parseInt(getParameterByName('id'));\n  if (!id) {\n    // no id found in URL\n    var error = 'No restaurant id in URL';\n    callback(error, null);\n  } else {\n    _dbhelper2.default.fetchRestaurantById(id, function (error, restaurant) {\n      self.restaurant = restaurant;\n      if (!restaurant) {\n        console.error(error);\n        return;\n      }\n      fillRestaurantHTML();\n      callback(null, restaurant);\n    });\n  }\n};\n\n/**\n * Create restaurant HTML and add it to the webpage\n */\nvar fillRestaurantHTML = function fillRestaurantHTML() {\n  var restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant;\n\n  var name = document.getElementById('restaurant-name');\n  name.innerHTML = restaurant.name;\n\n  var address = document.getElementById('restaurant-address');\n  address.innerHTML = restaurant.address;\n\n  var imgSizes = [{\n    size: 'original',\n    minWidth: 670\n  }, {\n    size: 670,\n    minWidth: 570\n  }, {\n    size: 570,\n    minWidth: 470\n  }, {\n    size: 470,\n    minWidth: 320\n  }];\n\n  var picture = _dbhelper2.default.sizedPictureForRestaurant(restaurant, imgSizes);\n  var image = document.getElementById('restaurant-img');\n  image.innerHTML = picture.innerHTML;\n\n  var cuisine = document.getElementById('restaurant-cuisine');\n  cuisine.innerHTML = restaurant.cuisine_type;\n\n  // fill operating hours\n  if (restaurant.operating_hours) {\n    fillRestaurantHoursHTML();\n  }\n  // fill reviews\n  fillReviewsHTML();\n};\n\n/**\n * Create restaurant operating hours HTML table and add it to the webpage.\n */\nvar fillRestaurantHoursHTML = function fillRestaurantHoursHTML() {\n  var operatingHours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant.operating_hours;\n\n  var hours = document.getElementById('restaurant-hours');\n  for (var key in operatingHours) {\n    var row = document.createElement('tr');\n    var day = document.createElement('td');\n\n    day.innerHTML = key;\n    row.appendChild(day);\n\n    var time = document.createElement('td');\n    time.innerHTML = operatingHours[key];\n\n    row.appendChild(time);\n    hours.appendChild(row);\n  }\n};\n\n/**\n * Create all reviews HTML and add them to the webpage.\n */\nvar fillReviewsHTML = function fillReviewsHTML() {\n  var reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant.reviews;\n\n  var container = document.getElementById('reviews-container');\n  var title = document.createElement('h3');\n  title.innerHTML = 'Reviews';\n  container.appendChild(title);\n\n  if (!reviews) {\n    var noReviews = document.createElement('p');\n    noReviews.innerHTML = 'No reviews yet!';\n    container.appendChild(noReviews);\n    return;\n  }\n\n  var ul = document.getElementById('reviews-list');\n  reviews.forEach(function (review) {\n    ul.appendChild(createReviewHTML(review));\n  });\n\n  container.appendChild(ul);\n};\n\n/**\n * Create review HTML and add it to the webpage.\n */\nvar createReviewHTML = function createReviewHTML(review) {\n  var li = document.createElement('li');\n  li.className = 'c-review';\n\n  var header = document.createElement('div');\n  header.className = 'c-review__header';\n\n  var name = document.createElement('span');\n  name.innerHTML = review.name;\n  header.appendChild(name);\n\n  var date = document.createElement('span');\n  date.innerHTML = review.date;\n  header.appendChild(date);\n\n  li.appendChild(header);\n\n  var content = document.createElement('div');\n  content.className = 'c-review__content';\n\n  var rating = document.createElement('span');\n  rating.className = 'c-review__rate';\n  rating.innerHTML = 'Rating: ' + review.rating;\n  content.appendChild(rating);\n\n  var comments = document.createElement('p');\n  comments.className = 'c-review__comments';\n  comments.innerHTML = review.comments;\n  content.appendChild(comments);\n\n  li.appendChild(content);\n\n  return li;\n};\n\n/**\n * Add restaurant name to the breadcrumb navigation menu\n */\nvar fillBreadcrumb = function fillBreadcrumb() {\n  var restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant;\n\n  var breadcrumb = document.getElementById('breadcrumb');\n  var li = document.createElement('li');\n  li.innerHTML = restaurant.name;\n  breadcrumb.appendChild(li);\n};\n\n/**\n * Get a parameter by name from page URL.\n */\nvar getParameterByName = function getParameterByName(name, url) {\n  if (!url) url = window.location.href;\n  name = name.replace(/[\\[\\]]/g, '\\\\$&');\n  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),\n      results = regex.exec(url);\n  if (!results) return null;\n  if (!results[2]) return '';\n  return decodeURIComponent(results[2].replace(/\\+/g, ' '));\n};\n\n//# sourceURL=webpack:///./js/scripts/restaurant_info.js?");

/***/ })

/******/ });