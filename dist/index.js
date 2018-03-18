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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * Common database helper functions.\r\n */\nvar DBHelper = function () {\n  function DBHelper() {\n    _classCallCheck(this, DBHelper);\n  }\n\n  _createClass(DBHelper, null, [{\n    key: 'fetchRestaurants',\n\n\n    /**\r\n     * Fetch all restaurants.\r\n     */\n    value: function fetchRestaurants(callback) {\n      var xhr = new XMLHttpRequest();\n      xhr.open('GET', DBHelper.DATABASE_URL);\n      xhr.onload = function () {\n        if (xhr.status === 200) {\n          // Got a success response from server!\n          var json = JSON.parse(xhr.responseText);\n          var restaurants = json.restaurants;\n          callback(null, restaurants);\n        } else {\n          // Oops!. Got an error from server.\n          var error = 'Request failed. Returned status of ' + xhr.status;\n          callback(error, null);\n        }\n      };\n      xhr.send();\n    }\n\n    /**\r\n     * Fetch a restaurant by its ID.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantById',\n    value: function fetchRestaurantById(id, callback) {\n      // fetch all restaurants with proper error handling.\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var restaurant = restaurants.find(function (r) {\n            return r.id === id;\n          });\n          if (restaurant) {\n            // Got the restaurant\n            callback(null, restaurant);\n          } else {\n            // Restaurant does not exist in the database\n            callback('Restaurant does not exist', null);\n          }\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine type with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisine',\n    value: function fetchRestaurantByCuisine(cuisine, callback) {\n      // Fetch all restaurants  with proper error handling\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given cuisine type\n          var results = restaurants.filter(function (r) {\n            return r.cuisine_type === cuisine;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByNeighborhood',\n    value: function fetchRestaurantByNeighborhood(neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given neighborhood\n          var results = restaurants.filter(function (r) {\n            return r.neighborhood === neighborhood;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisineAndNeighborhood',\n    value: function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var results = restaurants;\n          if (cuisine !== 'all') {\n            // filter by cuisine\n            results = results.filter(function (r) {\n              return r.cuisine_type === cuisine;\n            });\n          }\n          if (neighborhood !== 'all') {\n            // filter by neighborhood\n            results = results.filter(function (r) {\n              return r.neighborhood === neighborhood;\n            });\n          }\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all neighborhoods with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchNeighborhoods',\n    value: function fetchNeighborhoods(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all neighborhoods from all restaurants\n          var neighborhoods = restaurants.map(function (v, i) {\n            return restaurants[i].neighborhood;\n          });\n          // Remove duplicates from neighborhoods\n          var uniqueNeighborhoods = neighborhoods.filter(function (v, i) {\n            return neighborhoods.indexOf(v) === i;\n          });\n          callback(null, uniqueNeighborhoods);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all cuisines with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchCuisines',\n    value: function fetchCuisines(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all cuisines from all restaurants\n          var cuisines = restaurants.map(function (v, i) {\n            return restaurants[i].cuisine_type;\n          });\n          // Remove duplicates from cuisines\n          var uniqueCuisines = cuisines.filter(function (v, i) {\n            return cuisines.indexOf(v) === i;\n          });\n          callback(null, uniqueCuisines);\n        }\n      });\n    }\n\n    /**\r\n     * Restaurant page URL.\r\n     */\n\n  }, {\n    key: 'urlForRestaurant',\n    value: function urlForRestaurant(restaurant) {\n      return './restaurant.html?id=' + restaurant.id;\n    }\n\n    /**\r\n     * Restaurant image URL.\r\n     */\n\n  }, {\n    key: 'imageUrlForRestaurant',\n    value: function imageUrlForRestaurant(restaurant) {\n      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'original';\n\n      return '/img/' + size + '/' + restaurant.photograph;\n    }\n\n    /**\r\n     * Get Picture from restaurant and sizes\r\n     */\n\n  }, {\n    key: 'sizedPictureForRestaurant',\n    value: function sizedPictureForRestaurant(restaurant) {\n      var imgSizes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n\n      var picture = document.createElement('picture');\n\n      var source = null;\n      imgSizes.forEach(function (imgSize) {\n        // WepP\n        source = document.createElement('source');\n        source.media = '(min-width: ' + imgSize.minWidth + 'px)';\n        source.dataset.srcset = DBHelper.imageUrlForRestaurant(restaurant, imgSize.size) + '.webp';\n        picture.appendChild(source);\n\n        // Jpg fallback\n        source = document.createElement('source');\n        source.media = '(min-width: ' + imgSize.minWidth + 'px)';\n        source.dataset.srcset = DBHelper.imageUrlForRestaurant(restaurant, imgSize.size);\n        picture.appendChild(source);\n      });\n\n      var img = document.createElement('img');\n      img.dataset.src = DBHelper.imageUrlForRestaurant(restaurant);\n      img.alt = 'Restaurant photo';\n      picture.appendChild(img);\n\n      return picture;\n    }\n\n    /**\r\n     * Map marker for a restaurant.\r\n     */\n\n  }, {\n    key: 'mapMarkerForRestaurant',\n    value: function mapMarkerForRestaurant(restaurant, map) {\n      return new google.maps.Marker({\n        position: restaurant.latlng,\n        title: restaurant.name,\n        url: DBHelper.urlForRestaurant(restaurant),\n        map: map,\n        animation: google.maps.Animation.DROP\n      });\n    }\n  }, {\n    key: 'DATABASE_URL',\n\n\n    /**\r\n     * Database URL.\r\n     * Change this to restaurants.json file location on your server.\r\n     */\n    get: function get() {\n      return \"http://localhost:8000/\" + 'data/restaurants.json';\n    }\n  }]);\n\n  return DBHelper;\n}();\n\nexports.default = DBHelper;\n\n//# sourceURL=webpack:///./js/scripts/dbhelper.js?");

/***/ }),

/***/ "./js/scripts/main.js":
/*!****************************!*\
  !*** ./js/scripts/main.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _vanillaLazyload = __webpack_require__(/*! vanilla-lazyload */ \"./node_modules/vanilla-lazyload/dist/lazyload.min.js\");\n\nvar _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);\n\nvar _dbhelper = __webpack_require__(/*! ./dbhelper */ \"./js/scripts/dbhelper.js\");\n\nvar _dbhelper2 = _interopRequireDefault(_dbhelper);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar restaurants = void 0;\nvar neighborhoods = void 0;\nvar cuisines = void 0;\nvar map = void 0;\nvar markers = [];\n\n/**\r\n * Fetch neighborhoods and cuisines as soon as the page is loaded.\r\n */\ndocument.addEventListener('DOMContentLoaded', function () {\n  fetchNeighborhoods();\n  fetchCuisines();\n  updateRestaurants();\n});\n\n/**\r\n * Fetch all neighborhoods and set their HTML.\r\n */\nvar fetchNeighborhoods = function fetchNeighborhoods() {\n  _dbhelper2.default.fetchNeighborhoods(function (error, neighborhoods) {\n    if (error) {\n      // Got an error\n      console.error(error);\n    } else {\n      self.neighborhoods = neighborhoods;\n      fillNeighborhoodsHTML();\n    }\n  });\n};\n\n/**\r\n * Set neighborhoods HTML.\r\n */\nvar fillNeighborhoodsHTML = function fillNeighborhoodsHTML() {\n  var neighborhoods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.neighborhoods;\n\n  var select = document.getElementById('neighborhoods-select');\n  neighborhoods.forEach(function (neighborhood) {\n    var option = document.createElement('option');\n    option.innerHTML = neighborhood;\n    option.value = neighborhood;\n    select.appendChild(option);\n  });\n};\n\n/**\r\n * Fetch all cuisines and set their HTML.\r\n */\nvar fetchCuisines = function fetchCuisines() {\n  _dbhelper2.default.fetchCuisines(function (error, cuisines) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      self.cuisines = cuisines;\n      fillCuisinesHTML();\n    }\n  });\n};\n\n/**\r\n * Set cuisines HTML.\r\n */\nvar fillCuisinesHTML = function fillCuisinesHTML() {\n  var cuisines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.cuisines;\n\n  var select = document.getElementById('cuisines-select');\n\n  cuisines.forEach(function (cuisine) {\n    var option = document.createElement('option');\n    option.innerHTML = cuisine;\n    option.value = cuisine;\n    select.appendChild(option);\n  });\n};\n\n/**\r\n * Initialize Google map, called from HTML.\r\n */\nwindow.initMap = function () {\n  var loc = {\n    lat: 40.722216,\n    lng: -73.987501\n  };\n\n  self.map = new google.maps.Map(document.getElementById('map'), {\n    zoom: 12,\n    center: loc,\n    scrollwheel: false\n  });\n\n  var mainContent = document.getElementById('maincontent');\n  mainContent.classList.remove('c-main--hide-map');\n\n  google.maps.event.addListenerOnce(self.map, 'tilesloaded', function () {\n    document.querySelector('#map iframe').title = 'Google Maps';\n  });\n\n  updateRestaurants();\n};\n\n/**\r\n * Update page and map for current restaurants.\r\n */\nwindow.updateRestaurants = function () {\n  var cSelect = document.getElementById('cuisines-select');\n  var nSelect = document.getElementById('neighborhoods-select');\n\n  var cIndex = cSelect.selectedIndex;\n  var nIndex = nSelect.selectedIndex;\n\n  var cuisine = cSelect[cIndex].value;\n  var neighborhood = nSelect[nIndex].value;\n\n  _dbhelper2.default.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, function (error, restaurants) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      resetRestaurants(restaurants);\n      fillRestaurantsHTML();\n    }\n  });\n};\n\n/**\r\n * Clear current restaurants, their HTML and remove their map markers.\r\n */\nvar resetRestaurants = function resetRestaurants(restaurants) {\n  // Remove all restaurants\n  self.restaurants = [];\n  var ul = document.getElementById('restaurants-list');\n  ul.innerHTML = '';\n\n  // Remove all map markers\n  markers.forEach(function (m) {\n    return m.setMap(null);\n  });\n  markers = [];\n  self.restaurants = restaurants;\n};\n\n/**\r\n * Create all restaurants HTML and add them to the webpage.\r\n */\nvar fillRestaurantsHTML = function fillRestaurantsHTML() {\n  var restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurants;\n\n  var ul = document.getElementById('restaurants-list');\n  if (restaurants.length > 0) {\n    ul.classList.remove('c-restaurants--not-found');\n    restaurants.forEach(function (restaurant) {\n      ul.appendChild(createRestaurantHTML(restaurant));\n    });\n  } else {\n    ul.classList.add('c-restaurants--not-found');\n    var notFound = document.createElement('li');\n    notFound.innerHTML = 'No restaurant found, try with other filter!';\n    notFound.className = 'c-restaurants__not-found';\n    ul.appendChild(notFound);\n  }\n\n  // Lazy load images\n  new _vanillaLazyload2.default({\n    threshold: 0\n  });\n\n  // Set markers only if google is defined\n  if (typeof google !== 'undefined') {\n    addMarkersToMap();\n  }\n};\n\n/**\r\n * Create restaurant HTML.\r\n */\nvar createRestaurantHTML = function createRestaurantHTML(restaurant) {\n  var li = document.createElement('li');\n  li.className = 'c-restaurant';\n\n  var imgSizes = [{\n    size: 'original',\n    minWidth: 670\n  }, {\n    size: 670,\n    minWidth: 570\n  }, {\n    size: 570,\n    minWidth: 470\n  }, {\n    size: 470,\n    minWidth: 320\n  }];\n\n  var picture = _dbhelper2.default.sizedPictureForRestaurant(restaurant, imgSizes);\n  picture.className = 'c-restaurant__picture';\n  li.appendChild(picture);\n\n  var content = document.createElement('div');\n  content.className = 'c-restaurant__content';\n\n  var name = document.createElement('h3');\n  name.innerHTML = restaurant.name;\n  content.appendChild(name);\n\n  var neighborhood = document.createElement('p');\n  neighborhood.innerHTML = restaurant.neighborhood;\n  content.appendChild(neighborhood);\n\n  var address = document.createElement('p');\n  address.className = 'c-restaurant__address';\n  address.innerHTML = restaurant.address;\n  content.appendChild(address);\n\n  var more = document.createElement('a');\n  more.innerHTML = 'View Details';\n  more.href = _dbhelper2.default.urlForRestaurant(restaurant);\n  content.appendChild(more);\n\n  /* Append content to the li element */\n  li.appendChild(content);\n\n  return li;\n};\n\n/**\r\n * Add markers for current restaurants to the map.\r\n */\nvar addMarkersToMap = function addMarkersToMap() {\n  var restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurants;\n\n  restaurants.forEach(function (restaurant) {\n    // Add marker to the map\n    var marker = _dbhelper2.default.mapMarkerForRestaurant(restaurant, self.map);\n    google.maps.event.addListener(marker, 'click', function () {\n      window.location.href = marker.url;\n    });\n    markers.push(marker);\n  });\n};\n\n//# sourceURL=webpack:///./js/scripts/main.js?");

/***/ }),

/***/ "./node_modules/vanilla-lazyload/dist/lazyload.min.js":
/*!************************************************************!*\
  !*** ./node_modules/vanilla-lazyload/dist/lazyload.min.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_typeof=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e};!function(e,t){\"object\"===( false?undefined:_typeof(exports))&&\"undefined\"!=typeof module?module.exports=t(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined}(this,function(){\"use strict\";var e={elements_selector:\"img\",container:document,threshold:300,data_src:\"src\",data_srcset:\"srcset\",class_loading:\"loading\",class_loaded:\"loaded\",class_error:\"error\",callback_load:null,callback_error:null,callback_set:null,callback_enter:null},t=function(e,t){return e.getAttribute(\"data-\"+t)},n=function(e,t,n){return e.setAttribute(\"data-\"+t,n)},r=function(e){return e.filter(function(e){return!t(e,\"was-processed\")})},s=function(e,t){var n,r=new e(t);try{n=new CustomEvent(\"LazyLoad::Initialized\",{detail:{instance:r}})}catch(e){(n=document.createEvent(\"CustomEvent\")).initCustomEvent(\"LazyLoad::Initialized\",!1,!1,{instance:r})}window.dispatchEvent(n)},o=function(e,n){var r=n.data_srcset,s=e.parentNode;if(\"PICTURE\"===s.tagName)for(var o,a=0;o=s.children[a];a+=1)if(\"SOURCE\"===o.tagName){var i=t(o,r);i&&o.setAttribute(\"srcset\",i)}},a=function(e,n){var r=n.data_src,s=n.data_srcset,a=e.tagName,i=t(e,r);if(\"IMG\"===a){o(e,n);var c=t(e,s);return c&&e.setAttribute(\"srcset\",c),void(i&&e.setAttribute(\"src\",i))}\"IFRAME\"!==a?i&&(e.style.backgroundImage='url(\"'+i+'\")'):i&&e.setAttribute(\"src\",i)},i=\"classList\"in document.createElement(\"p\"),c=function(e,t){i?e.classList.add(t):e.className+=(e.className?\" \":\"\")+t},l=function(e,t){i?e.classList.remove(t):e.className=e.className.replace(new RegExp(\"(^|\\\\s+)\"+t+\"(\\\\s+|$)\"),\" \").replace(/^\\s+/,\"\").replace(/\\s+$/,\"\")},u=function(e,t){e&&e(t)},d=function(e,t,n){e.removeEventListener(\"load\",t),e.removeEventListener(\"error\",n)},f=function(e,t){var n=function n(s){_(s,!0,t),d(e,n,r)},r=function r(s){_(s,!1,t),d(e,n,r)};e.addEventListener(\"load\",n),e.addEventListener(\"error\",r)},_=function(e,t,n){var r=e.target;l(r,n.class_loading),c(r,t?n.class_loaded:n.class_error),u(t?n.callback_load:n.callback_error,r)},v=function(e,t){u(t.callback_enter,e),[\"IMG\",\"IFRAME\"].indexOf(e.tagName)>-1&&(f(e,t),c(e,t.class_loading)),a(e,t),n(e,\"was-processed\",!0),u(t.callback_set,e)},m=function(t,n){this._settings=_extends({},e,t),this._setObserver(),this.update(n)};m.prototype={_setObserver:function(){var e=this;if(\"IntersectionObserver\"in window){var t=this._settings;this._observer=new IntersectionObserver(function(n){n.forEach(function(n){if(n.isIntersecting||n.intersectionRatio>0){var r=n.target;v(r,t),e._observer.unobserve(r)}}),e._elements=r(e._elements)},{root:t.container===document?null:t.container,rootMargin:t.threshold+\"px\"})}},update:function(e){var t=this,n=this._settings,s=e||n.container.querySelectorAll(n.elements_selector);this._elements=r(Array.prototype.slice.call(s)),this._observer?this._elements.forEach(function(e){t._observer.observe(e)}):(this._elements.forEach(function(e){v(e,n)}),this._elements=r(this._elements))},destroy:function(){var e=this;this._observer&&(r(this._elements).forEach(function(t){e._observer.unobserve(t)}),this._observer=null),this._elements=null,this._settings=null}};var b=window.lazyLoadOptions;return b&&function(e,t){if(t.length)for(var n,r=0;n=t[r];r+=1)s(e,n);else s(e,t)}(m,b),m});\n\n//# sourceURL=webpack:///./node_modules/vanilla-lazyload/dist/lazyload.min.js?");

/***/ })

/******/ });