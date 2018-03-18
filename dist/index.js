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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./scripts/main */ \"./js/scripts/main.js\");\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./js/scripts/dbhelper.js":
/*!********************************!*\
  !*** ./js/scripts/dbhelper.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Common database helper functions.\n */\nvar DBHelper = function () {\n  function DBHelper() {\n    _classCallCheck(this, DBHelper);\n  }\n\n  _createClass(DBHelper, null, [{\n    key: 'fetchRestaurants',\n\n\n    /**\n     * Fetch all restaurants.\n     */\n    value: function fetchRestaurants(callback) {\n      var xhr = new XMLHttpRequest();\n      xhr.open('GET', DBHelper.DATABASE_URL);\n      xhr.onload = function () {\n        if (xhr.status === 200) {\n          // Got a success response from server!\n          var json = JSON.parse(xhr.responseText);\n          var restaurants = json.restaurants;\n          callback(null, restaurants);\n        } else {\n          // Oops!. Got an error from server.\n          var error = 'Request failed. Returned status of ' + xhr.status;\n          callback(error, null);\n        }\n      };\n      xhr.send();\n    }\n\n    /**\n     * Fetch a restaurant by its ID.\n     */\n\n  }, {\n    key: 'fetchRestaurantById',\n    value: function fetchRestaurantById(id, callback) {\n      // fetch all restaurants with proper error handling.\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var restaurant = restaurants.find(function (r) {\n            return r.id === id;\n          });\n          if (restaurant) {\n            // Got the restaurant\n            callback(null, restaurant);\n          } else {\n            // Restaurant does not exist in the database\n            callback('Restaurant does not exist', null);\n          }\n        }\n      });\n    }\n\n    /**\n     * Fetch restaurants by a cuisine type with proper error handling.\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisine',\n    value: function fetchRestaurantByCuisine(cuisine, callback) {\n      // Fetch all restaurants  with proper error handling\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given cuisine type\n          var results = restaurants.filter(function (r) {\n            return r.cuisine_type === cuisine;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\n     * Fetch restaurants by a neighborhood with proper error handling.\n     */\n\n  }, {\n    key: 'fetchRestaurantByNeighborhood',\n    value: function fetchRestaurantByNeighborhood(neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given neighborhood\n          var results = restaurants.filter(function (r) {\n            return r.neighborhood === neighborhood;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\n     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisineAndNeighborhood',\n    value: function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var results = restaurants;\n          if (cuisine !== 'all') {\n            // filter by cuisine\n            results = results.filter(function (r) {\n              return r.cuisine_type === cuisine;\n            });\n          }\n          if (neighborhood !== 'all') {\n            // filter by neighborhood\n            results = results.filter(function (r) {\n              return r.neighborhood === neighborhood;\n            });\n          }\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\n     * Fetch all neighborhoods with proper error handling.\n     */\n\n  }, {\n    key: 'fetchNeighborhoods',\n    value: function fetchNeighborhoods(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all neighborhoods from all restaurants\n          var neighborhoods = restaurants.map(function (v, i) {\n            return restaurants[i].neighborhood;\n          });\n          // Remove duplicates from neighborhoods\n          var uniqueNeighborhoods = neighborhoods.filter(function (v, i) {\n            return neighborhoods.indexOf(v) === i;\n          });\n          callback(null, uniqueNeighborhoods);\n        }\n      });\n    }\n\n    /**\n     * Fetch all cuisines with proper error handling.\n     */\n\n  }, {\n    key: 'fetchCuisines',\n    value: function fetchCuisines(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all cuisines from all restaurants\n          var cuisines = restaurants.map(function (v, i) {\n            return restaurants[i].cuisine_type;\n          });\n          // Remove duplicates from cuisines\n          var uniqueCuisines = cuisines.filter(function (v, i) {\n            return cuisines.indexOf(v) === i;\n          });\n          callback(null, uniqueCuisines);\n        }\n      });\n    }\n\n    /**\n     * Restaurant page URL.\n     */\n\n  }, {\n    key: 'urlForRestaurant',\n    value: function urlForRestaurant(restaurant) {\n      return './restaurant.html?id=' + restaurant.id;\n    }\n\n    /**\n     * Restaurant image URL.\n     */\n\n  }, {\n    key: 'imageUrlForRestaurant',\n    value: function imageUrlForRestaurant(restaurant) {\n      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'original';\n\n      return '/img/' + size + '/' + restaurant.photograph;\n    }\n\n    /**\n     * Get Picture from restaurant and sizes\n     */\n\n  }, {\n    key: 'sizedPictureForRestaurant',\n    value: function sizedPictureForRestaurant(restaurant) {\n      var imgSizes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n\n      var picture = document.createElement('picture');\n\n      var source = null;\n      imgSizes.forEach(function (imgSize) {\n        // WepP\n        source = document.createElement('source');\n        source.media = '(min-width: ' + imgSize.minWidth + 'px)';\n        source.type = 'image/webp';\n        source.dataset.srcset = DBHelper.imageUrlForRestaurant(restaurant, imgSize.size) + '.webp';\n        picture.appendChild(source);\n\n        // Jpg fallback\n        source = document.createElement('source');\n        source.media = '(min-width: ' + imgSize.minWidth + 'px)';\n        source.type = 'image/jpeg';\n        source.dataset.srcset = DBHelper.imageUrlForRestaurant(restaurant, imgSize.size);\n        picture.appendChild(source);\n      });\n\n      var img = document.createElement('img');\n      img.dataset.src = DBHelper.imageUrlForRestaurant(restaurant);\n      img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';\n      img.className = 'b-lazy';\n      img.alt = 'Restaurant photo';\n      picture.appendChild(img);\n\n      return picture;\n    }\n\n    /**\n     * Map marker for a restaurant.\n     */\n\n  }, {\n    key: 'mapMarkerForRestaurant',\n    value: function mapMarkerForRestaurant(restaurant, map) {\n      return new google.maps.Marker({\n        position: restaurant.latlng,\n        title: restaurant.name,\n        url: DBHelper.urlForRestaurant(restaurant),\n        map: map,\n        animation: google.maps.Animation.DROP\n      });\n    }\n  }, {\n    key: 'DATABASE_URL',\n\n\n    /**\n     * Database URL.\n     * Change this to restaurants.json file location on your server.\n     */\n    get: function get() {\n      return \"http://localhost:8000/\" + 'data/restaurants.json';\n    }\n  }]);\n\n  return DBHelper;\n}();\n\nexports.default = DBHelper;\n\n//# sourceURL=webpack:///./js/scripts/dbhelper.js?");

/***/ }),

/***/ "./js/scripts/google-map.js":
/*!**********************************!*\
  !*** ./js/scripts/google-map.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar loadGoogleMaps = function loadGoogleMaps() {\n  var googleMapScript = document.createElement('script');\n\n  googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCJxh3F1ux9cd7ewAaVK_wwJTGc2O2iVc8&libraries=places&callback=initMap';\n  googleMapScript.async = '';\n  googleMapScript.defer = '';\n  googleMapScript.type = 'text/javascript';\n\n  document.body.appendChild(googleMapScript);\n};\n\nexports.default = loadGoogleMaps;\n\n//# sourceURL=webpack:///./js/scripts/google-map.js?");

/***/ }),

/***/ "./js/scripts/main.js":
/*!****************************!*\
  !*** ./js/scripts/main.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _blazy = __webpack_require__(/*! blazy */ \"./node_modules/blazy/blazy.js\");\n\nvar _blazy2 = _interopRequireDefault(_blazy);\n\nvar _dbhelper = __webpack_require__(/*! ./dbhelper */ \"./js/scripts/dbhelper.js\");\n\nvar _dbhelper2 = _interopRequireDefault(_dbhelper);\n\nvar _googleMap = __webpack_require__(/*! ./google-map */ \"./js/scripts/google-map.js\");\n\nvar _googleMap2 = _interopRequireDefault(_googleMap);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(0, _googleMap2.default)();\n\nvar restaurants = void 0;\nvar neighborhoods = void 0;\nvar cuisines = void 0;\nvar map = void 0;\nvar markers = [];\n\n/**\n * Fetch neighborhoods and cuisines as soon as the page is loaded.\n */\ndocument.addEventListener('DOMContentLoaded', function () {\n  fetchNeighborhoods();\n  fetchCuisines();\n  updateRestaurants();\n});\n\n/**\n * Fetch all neighborhoods and set their HTML.\n */\nvar fetchNeighborhoods = function fetchNeighborhoods() {\n  _dbhelper2.default.fetchNeighborhoods(function (error, neighborhoods) {\n    if (error) {\n      // Got an error\n      console.error(error);\n    } else {\n      self.neighborhoods = neighborhoods;\n      fillNeighborhoodsHTML();\n    }\n  });\n};\n\n/**\n * Set neighborhoods HTML.\n */\nvar fillNeighborhoodsHTML = function fillNeighborhoodsHTML() {\n  var neighborhoods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.neighborhoods;\n\n  var select = document.getElementById('neighborhoods-select');\n  neighborhoods.forEach(function (neighborhood) {\n    var option = document.createElement('option');\n    option.innerHTML = neighborhood;\n    option.value = neighborhood;\n    select.appendChild(option);\n  });\n};\n\n/**\n * Fetch all cuisines and set their HTML.\n */\nvar fetchCuisines = function fetchCuisines() {\n  _dbhelper2.default.fetchCuisines(function (error, cuisines) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      self.cuisines = cuisines;\n      fillCuisinesHTML();\n    }\n  });\n};\n\n/**\n * Set cuisines HTML.\n */\nvar fillCuisinesHTML = function fillCuisinesHTML() {\n  var cuisines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.cuisines;\n\n  var select = document.getElementById('cuisines-select');\n\n  cuisines.forEach(function (cuisine) {\n    var option = document.createElement('option');\n    option.innerHTML = cuisine;\n    option.value = cuisine;\n    select.appendChild(option);\n  });\n};\n\n/**\n * Initialize Google map, called from HTML.\n */\nwindow.initMap = function () {\n  var loc = {\n    lat: 40.722216,\n    lng: -73.987501\n  };\n\n  self.map = new google.maps.Map(document.getElementById('map'), {\n    zoom: 12,\n    center: loc,\n    scrollwheel: false\n  });\n\n  var mainContent = document.getElementById('maincontent');\n  mainContent.classList.remove('c-main--hide-map');\n\n  google.maps.event.addListenerOnce(self.map, 'tilesloaded', function () {\n    document.querySelector('#map iframe').title = 'Google Maps';\n  });\n\n  updateRestaurants();\n};\n\n/**\n * Update page and map for current restaurants.\n */\nwindow.updateRestaurants = function () {\n  var cSelect = document.getElementById('cuisines-select');\n  var nSelect = document.getElementById('neighborhoods-select');\n\n  var cIndex = cSelect.selectedIndex;\n  var nIndex = nSelect.selectedIndex;\n\n  var cuisine = cSelect[cIndex].value;\n  var neighborhood = nSelect[nIndex].value;\n\n  _dbhelper2.default.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, function (error, restaurants) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      resetRestaurants(restaurants);\n      fillRestaurantsHTML();\n    }\n  });\n};\n\n/**\n * Clear current restaurants, their HTML and remove their map markers.\n */\nvar resetRestaurants = function resetRestaurants(restaurants) {\n  // Remove all restaurants\n  self.restaurants = [];\n  var ul = document.getElementById('restaurants-list');\n  ul.innerHTML = '';\n\n  // Remove all map markers\n  markers.forEach(function (m) {\n    return m.setMap(null);\n  });\n  markers = [];\n  self.restaurants = restaurants;\n};\n\n/**\n * Create all restaurants HTML and add them to the webpage.\n */\nvar fillRestaurantsHTML = function fillRestaurantsHTML() {\n  var restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurants;\n\n  var restaurantList = document.getElementById('restaurants-list');\n  if (restaurants.length > 0) {\n    restaurantList.classList.remove('c-restaurants--not-found');\n    restaurants.forEach(function (restaurant) {\n      restaurantList.appendChild(createRestaurantHTML(restaurant));\n    });\n  } else {\n    restaurantList.classList.add('c-restaurants--not-found');\n    var notFound = document.createElement('article');\n    notFound.innerHTML = 'No restaurant found, try with other filter!';\n    notFound.className = 'c-restaurants__not-found';\n    restaurantList.appendChild(notFound);\n  }\n\n  // Lazy load images\n  new _blazy2.default({\n    offset: 0\n  });\n\n  // Set markers only if google is defined\n  if (typeof google !== 'undefined') {\n    addMarkersToMap();\n  }\n};\n\n/**\n * Create restaurant HTML.\n */\nvar createRestaurantHTML = function createRestaurantHTML(restaurant) {\n  var restaurantItem = document.createElement('article');\n  restaurantItem.className = 'c-restaurant';\n\n  var imgSizes = [{\n    size: 'original',\n    minWidth: 670\n  }, {\n    size: 670,\n    minWidth: 570\n  }, {\n    size: 570,\n    minWidth: 470\n  }, {\n    size: 470,\n    minWidth: 320\n  }];\n\n  var picture = _dbhelper2.default.sizedPictureForRestaurant(restaurant, imgSizes);\n  picture.className = 'c-restaurant__picture';\n  restaurantItem.appendChild(picture);\n\n  var content = document.createElement('div');\n  content.className = 'c-restaurant__content';\n\n  var name = document.createElement('h3');\n  name.innerHTML = restaurant.name;\n  content.appendChild(name);\n\n  var neighborhood = document.createElement('p');\n  neighborhood.innerHTML = restaurant.neighborhood;\n  content.appendChild(neighborhood);\n\n  var address = document.createElement('p');\n  address.className = 'c-restaurant__address';\n  address.innerHTML = restaurant.address;\n  content.appendChild(address);\n\n  var more = document.createElement('a');\n  more.innerHTML = 'View Details';\n  more.href = _dbhelper2.default.urlForRestaurant(restaurant);\n  content.appendChild(more);\n\n  /* Append content to the li element */\n  restaurantItem.appendChild(content);\n\n  return restaurantItem;\n};\n\n/**\n * Add markers for current restaurants to the map.\n */\nvar addMarkersToMap = function addMarkersToMap() {\n  var restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurants;\n\n  restaurants.forEach(function (restaurant) {\n    // Add marker to the map\n    var marker = _dbhelper2.default.mapMarkerForRestaurant(restaurant, self.map);\n    google.maps.event.addListener(marker, 'click', function () {\n      window.location.href = marker.url;\n    });\n    markers.push(marker);\n  });\n};\n\n//# sourceURL=webpack:///./js/scripts/main.js?");

/***/ }),

/***/ "./node_modules/blazy/blazy.js":
/*!*************************************!*\
  !*** ./node_modules/blazy/blazy.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/*!\n  hey, [be]Lazy.js - v1.8.2 - 2016.10.25\n  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)\n  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy\n*/\n;\n(function (root, blazy) {\n    if (true) {\n        // AMD. Register bLazy as an anonymous module\n        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (blazy),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n    } else {}\n})(undefined, function () {\n    'use strict';\n\n    //private vars\n\n    var _source,\n        _viewport,\n        _isRetina,\n        _supportClosest,\n        _attrSrc = 'src',\n        _attrSrcset = 'srcset';\n\n    // constructor\n    return function Blazy(options) {\n        //IE7- fallback for missing querySelectorAll support\n        if (!document.querySelectorAll) {\n            var s = document.createStyleSheet();\n            document.querySelectorAll = function (r, c, i, j, a) {\n                a = document.all, c = [], r = r.replace(/\\[for\\b/gi, '[htmlFor').split(',');\n                for (i = r.length; i--;) {\n                    s.addRule(r[i], 'k:v');\n                    for (j = a.length; j--;) {\n                        a[j].currentStyle.k && c.push(a[j]);\n                    }s.removeRule(0);\n                }\n                return c;\n            };\n        }\n\n        //options and helper vars\n        var scope = this;\n        var util = scope._util = {};\n        util.elements = [];\n        util.destroyed = true;\n        scope.options = options || {};\n        scope.options.error = scope.options.error || false;\n        scope.options.offset = scope.options.offset || 100;\n        scope.options.root = scope.options.root || document;\n        scope.options.success = scope.options.success || false;\n        scope.options.selector = scope.options.selector || '.b-lazy';\n        scope.options.separator = scope.options.separator || '|';\n        scope.options.containerClass = scope.options.container;\n        scope.options.container = scope.options.containerClass ? document.querySelectorAll(scope.options.containerClass) : false;\n        scope.options.errorClass = scope.options.errorClass || 'b-error';\n        scope.options.breakpoints = scope.options.breakpoints || false;\n        scope.options.loadInvisible = scope.options.loadInvisible || false;\n        scope.options.successClass = scope.options.successClass || 'b-loaded';\n        scope.options.validateDelay = scope.options.validateDelay || 25;\n        scope.options.saveViewportOffsetDelay = scope.options.saveViewportOffsetDelay || 50;\n        scope.options.srcset = scope.options.srcset || 'data-srcset';\n        scope.options.src = _source = scope.options.src || 'data-src';\n        _supportClosest = Element.prototype.closest;\n        _isRetina = window.devicePixelRatio > 1;\n        _viewport = {};\n        _viewport.top = 0 - scope.options.offset;\n        _viewport.left = 0 - scope.options.offset;\n\n        /* public functions\n         ************************************/\n        scope.revalidate = function () {\n            initialize(scope);\n        };\n        scope.load = function (elements, force) {\n            var opt = this.options;\n            if (elements && elements.length === undefined) {\n                loadElement(elements, force, opt);\n            } else {\n                each(elements, function (element) {\n                    loadElement(element, force, opt);\n                });\n            }\n        };\n        scope.destroy = function () {\n            var util = scope._util;\n            if (scope.options.container) {\n                each(scope.options.container, function (object) {\n                    unbindEvent(object, 'scroll', util.validateT);\n                });\n            }\n            unbindEvent(window, 'scroll', util.validateT);\n            unbindEvent(window, 'resize', util.validateT);\n            unbindEvent(window, 'resize', util.saveViewportOffsetT);\n            util.count = 0;\n            util.elements.length = 0;\n            util.destroyed = true;\n        };\n\n        //throttle, ensures that we don't call the functions too often\n        util.validateT = throttle(function () {\n            validate(scope);\n        }, scope.options.validateDelay, scope);\n        util.saveViewportOffsetT = throttle(function () {\n            saveViewportOffset(scope.options.offset);\n        }, scope.options.saveViewportOffsetDelay, scope);\n        saveViewportOffset(scope.options.offset);\n\n        //handle multi-served image src (obsolete)\n        each(scope.options.breakpoints, function (object) {\n            if (object.width >= window.screen.width) {\n                _source = object.src;\n                return false;\n            }\n        });\n\n        // start lazy load\n        setTimeout(function () {\n            initialize(scope);\n        }); // \"dom ready\" fix\n    };\n\n    /* Private helper functions\n     ************************************/\n    function initialize(self) {\n        var util = self._util;\n        // First we create an array of elements to lazy load\n        util.elements = toArray(self.options);\n        util.count = util.elements.length;\n        // Then we bind resize and scroll events if not already binded\n        if (util.destroyed) {\n            util.destroyed = false;\n            if (self.options.container) {\n                each(self.options.container, function (object) {\n                    bindEvent(object, 'scroll', util.validateT);\n                });\n            }\n            bindEvent(window, 'resize', util.saveViewportOffsetT);\n            bindEvent(window, 'resize', util.validateT);\n            bindEvent(window, 'scroll', util.validateT);\n        }\n        // And finally, we start to lazy load.\n        validate(self);\n    }\n\n    function validate(self) {\n        var util = self._util;\n        for (var i = 0; i < util.count; i++) {\n            var element = util.elements[i];\n            if (elementInView(element, self.options) || hasClass(element, self.options.successClass)) {\n                self.load(element);\n                util.elements.splice(i, 1);\n                util.count--;\n                i--;\n            }\n        }\n        if (util.count === 0) {\n            self.destroy();\n        }\n    }\n\n    function elementInView(ele, options) {\n        var rect = ele.getBoundingClientRect();\n\n        if (options.container && _supportClosest) {\n            // Is element inside a container?\n            var elementContainer = ele.closest(options.containerClass);\n            if (elementContainer) {\n                var containerRect = elementContainer.getBoundingClientRect();\n                // Is container in view?\n                if (inView(containerRect, _viewport)) {\n                    var top = containerRect.top - options.offset;\n                    var right = containerRect.right + options.offset;\n                    var bottom = containerRect.bottom + options.offset;\n                    var left = containerRect.left - options.offset;\n                    var containerRectWithOffset = {\n                        top: top > _viewport.top ? top : _viewport.top,\n                        right: right < _viewport.right ? right : _viewport.right,\n                        bottom: bottom < _viewport.bottom ? bottom : _viewport.bottom,\n                        left: left > _viewport.left ? left : _viewport.left\n                    };\n                    // Is element in view of container?\n                    return inView(rect, containerRectWithOffset);\n                } else {\n                    return false;\n                }\n            }\n        }\n        return inView(rect, _viewport);\n    }\n\n    function inView(rect, viewport) {\n        // Intersection\n        return rect.right >= viewport.left && rect.bottom >= viewport.top && rect.left <= viewport.right && rect.top <= viewport.bottom;\n    }\n\n    function loadElement(ele, force, options) {\n        // if element is visible, not loaded or forced\n        if (!hasClass(ele, options.successClass) && (force || options.loadInvisible || ele.offsetWidth > 0 && ele.offsetHeight > 0)) {\n            var dataSrc = getAttr(ele, _source) || getAttr(ele, options.src); // fallback to default 'data-src'\n            if (dataSrc) {\n                var dataSrcSplitted = dataSrc.split(options.separator);\n                var src = dataSrcSplitted[_isRetina && dataSrcSplitted.length > 1 ? 1 : 0];\n                var srcset = getAttr(ele, options.srcset);\n                var isImage = equal(ele, 'img');\n                var parent = ele.parentNode;\n                var isPicture = parent && equal(parent, 'picture');\n                // Image or background image\n                if (isImage || ele.src === undefined) {\n                    var img = new Image();\n                    // using EventListener instead of onerror and onload\n                    // due to bug introduced in chrome v50 \n                    // (https://productforums.google.com/forum/#!topic/chrome/p51Lk7vnP2o)\n                    var onErrorHandler = function onErrorHandler() {\n                        if (options.error) options.error(ele, \"invalid\");\n                        addClass(ele, options.errorClass);\n                        unbindEvent(img, 'error', onErrorHandler);\n                        unbindEvent(img, 'load', onLoadHandler);\n                    };\n                    var onLoadHandler = function onLoadHandler() {\n                        // Is element an image\n                        if (isImage) {\n                            if (!isPicture) {\n                                handleSources(ele, src, srcset);\n                            }\n                            // or background-image\n                        } else {\n                            ele.style.backgroundImage = 'url(\"' + src + '\")';\n                        }\n                        itemLoaded(ele, options);\n                        unbindEvent(img, 'load', onLoadHandler);\n                        unbindEvent(img, 'error', onErrorHandler);\n                    };\n\n                    // Picture element\n                    if (isPicture) {\n                        img = ele; // Image tag inside picture element wont get preloaded\n                        each(parent.getElementsByTagName('source'), function (source) {\n                            handleSource(source, _attrSrcset, options.srcset);\n                        });\n                    }\n                    bindEvent(img, 'error', onErrorHandler);\n                    bindEvent(img, 'load', onLoadHandler);\n                    handleSources(img, src, srcset); // Preload\n                } else {\n                    // An item with src like iframe, unity games, simpel video etc\n                    ele.src = src;\n                    itemLoaded(ele, options);\n                }\n            } else {\n                // video with child source\n                if (equal(ele, 'video')) {\n                    each(ele.getElementsByTagName('source'), function (source) {\n                        handleSource(source, _attrSrc, options.src);\n                    });\n                    ele.load();\n                    itemLoaded(ele, options);\n                } else {\n                    if (options.error) options.error(ele, \"missing\");\n                    addClass(ele, options.errorClass);\n                }\n            }\n        }\n    }\n\n    function itemLoaded(ele, options) {\n        addClass(ele, options.successClass);\n        if (options.success) options.success(ele);\n        // cleanup markup, remove data source attributes\n        removeAttr(ele, options.src);\n        removeAttr(ele, options.srcset);\n        each(options.breakpoints, function (object) {\n            removeAttr(ele, object.src);\n        });\n    }\n\n    function handleSource(ele, attr, dataAttr) {\n        var dataSrc = getAttr(ele, dataAttr);\n        if (dataSrc) {\n            setAttr(ele, attr, dataSrc);\n            removeAttr(ele, dataAttr);\n        }\n    }\n\n    function handleSources(ele, src, srcset) {\n        if (srcset) {\n            setAttr(ele, _attrSrcset, srcset); //srcset\n        }\n        ele.src = src; //src \n    }\n\n    function setAttr(ele, attr, value) {\n        ele.setAttribute(attr, value);\n    }\n\n    function getAttr(ele, attr) {\n        return ele.getAttribute(attr);\n    }\n\n    function removeAttr(ele, attr) {\n        ele.removeAttribute(attr);\n    }\n\n    function equal(ele, str) {\n        return ele.nodeName.toLowerCase() === str;\n    }\n\n    function hasClass(ele, className) {\n        return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') !== -1;\n    }\n\n    function addClass(ele, className) {\n        if (!hasClass(ele, className)) {\n            ele.className += ' ' + className;\n        }\n    }\n\n    function toArray(options) {\n        var array = [];\n        var nodelist = options.root.querySelectorAll(options.selector);\n        for (var i = nodelist.length; i--; array.unshift(nodelist[i])) {}\n        return array;\n    }\n\n    function saveViewportOffset(offset) {\n        _viewport.bottom = (window.innerHeight || document.documentElement.clientHeight) + offset;\n        _viewport.right = (window.innerWidth || document.documentElement.clientWidth) + offset;\n    }\n\n    function bindEvent(ele, type, fn) {\n        if (ele.attachEvent) {\n            ele.attachEvent && ele.attachEvent('on' + type, fn);\n        } else {\n            ele.addEventListener(type, fn, { capture: false, passive: true });\n        }\n    }\n\n    function unbindEvent(ele, type, fn) {\n        if (ele.detachEvent) {\n            ele.detachEvent && ele.detachEvent('on' + type, fn);\n        } else {\n            ele.removeEventListener(type, fn, { capture: false, passive: true });\n        }\n    }\n\n    function each(object, fn) {\n        if (object && fn) {\n            var l = object.length;\n            for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}\n        }\n    }\n\n    function throttle(fn, minDelay, scope) {\n        var lastCall = 0;\n        return function () {\n            var now = +new Date();\n            if (now - lastCall < minDelay) {\n                return;\n            }\n            lastCall = now;\n            fn.apply(scope, arguments);\n        };\n    }\n});\n\n//# sourceURL=webpack:///./node_modules/blazy/blazy.js?");

/***/ })

/******/ });