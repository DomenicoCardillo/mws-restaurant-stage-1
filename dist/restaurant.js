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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * Common database helper functions.\r\n */\nvar DBHelper = function () {\n  function DBHelper() {\n    _classCallCheck(this, DBHelper);\n  }\n\n  _createClass(DBHelper, null, [{\n    key: 'fetchRestaurants',\n\n\n    /**\r\n     * Fetch all restaurants.\r\n     */\n    value: function fetchRestaurants(callback) {\n      var xhr = new XMLHttpRequest();\n      xhr.open('GET', DBHelper.DATABASE_URL);\n      xhr.onload = function () {\n        if (xhr.status === 200) {\n          // Got a success response from server!\n          var json = JSON.parse(xhr.responseText);\n          var restaurants = json.restaurants;\n          callback(null, restaurants);\n        } else {\n          // Oops!. Got an error from server.\n          var error = 'Request failed. Returned status of ' + xhr.status;\n          callback(error, null);\n        }\n      };\n      xhr.send();\n    }\n\n    /**\r\n     * Fetch a restaurant by its ID.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantById',\n    value: function fetchRestaurantById(id, callback) {\n      // fetch all restaurants with proper error handling.\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var restaurant = restaurants.find(function (r) {\n            return r.id === id;\n          });\n          if (restaurant) {\n            // Got the restaurant\n            callback(null, restaurant);\n          } else {\n            // Restaurant does not exist in the database\n            callback('Restaurant does not exist', null);\n          }\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine type with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisine',\n    value: function fetchRestaurantByCuisine(cuisine, callback) {\n      // Fetch all restaurants  with proper error handling\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given cuisine type\n          var results = restaurants.filter(function (r) {\n            return r.cuisine_type === cuisine;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByNeighborhood',\n    value: function fetchRestaurantByNeighborhood(neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given neighborhood\n          var results = restaurants.filter(function (r) {\n            return r.neighborhood === neighborhood;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisineAndNeighborhood',\n    value: function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var results = restaurants;\n          if (cuisine !== 'all') {\n            // filter by cuisine\n            results = results.filter(function (r) {\n              return r.cuisine_type === cuisine;\n            });\n          }\n          if (neighborhood !== 'all') {\n            // filter by neighborhood\n            results = results.filter(function (r) {\n              return r.neighborhood === neighborhood;\n            });\n          }\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all neighborhoods with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchNeighborhoods',\n    value: function fetchNeighborhoods(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all neighborhoods from all restaurants\n          var neighborhoods = restaurants.map(function (v, i) {\n            return restaurants[i].neighborhood;\n          });\n          // Remove duplicates from neighborhoods\n          var uniqueNeighborhoods = neighborhoods.filter(function (v, i) {\n            return neighborhoods.indexOf(v) === i;\n          });\n          callback(null, uniqueNeighborhoods);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all cuisines with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchCuisines',\n    value: function fetchCuisines(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all cuisines from all restaurants\n          var cuisines = restaurants.map(function (v, i) {\n            return restaurants[i].cuisine_type;\n          });\n          // Remove duplicates from cuisines\n          var uniqueCuisines = cuisines.filter(function (v, i) {\n            return cuisines.indexOf(v) === i;\n          });\n          callback(null, uniqueCuisines);\n        }\n      });\n    }\n\n    /**\r\n     * Restaurant page URL.\r\n     */\n\n  }, {\n    key: 'urlForRestaurant',\n    value: function urlForRestaurant(restaurant) {\n      return './restaurant.html?id=' + restaurant.id;\n    }\n\n    /**\r\n     * Restaurant image URL.\r\n     */\n\n  }, {\n    key: 'imageUrlForRestaurant',\n    value: function imageUrlForRestaurant(restaurant) {\n      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'original';\n\n      return '/img/' + size + '/' + restaurant.photograph;\n    }\n\n    /**\r\n     * Get Picture from restaurant and sizes\r\n     */\n\n  }, {\n    key: 'sizedPictureForRestaurant',\n    value: function sizedPictureForRestaurant(restaurant) {\n      var imgSizes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n\n      var picture = document.createElement('picture');\n\n      var source = null;\n      imgSizes.forEach(function (imgSize) {\n        // WepP\n        source = document.createElement('source');\n        source.media = '(min-width: ' + imgSize.minWidth + 'px)';\n        source.dataset.srcset = DBHelper.imageUrlForRestaurant(restaurant, imgSize.size) + '.webp';\n        picture.appendChild(source);\n\n        // Jpg fallback\n        source = document.createElement('source');\n        source.media = '(min-width: ' + imgSize.minWidth + 'px)';\n        source.dataset.srcset = DBHelper.imageUrlForRestaurant(restaurant, imgSize.size);\n        picture.appendChild(source);\n      });\n\n      var img = document.createElement('img');\n      img.dataset.src = DBHelper.imageUrlForRestaurant(restaurant);\n      img.alt = 'Restaurant photo';\n      picture.appendChild(img);\n\n      return picture;\n    }\n\n    /**\r\n     * Map marker for a restaurant.\r\n     */\n\n  }, {\n    key: 'mapMarkerForRestaurant',\n    value: function mapMarkerForRestaurant(restaurant, map) {\n      return new google.maps.Marker({\n        position: restaurant.latlng,\n        title: restaurant.name,\n        url: DBHelper.urlForRestaurant(restaurant),\n        map: map,\n        animation: google.maps.Animation.DROP\n      });\n    }\n  }, {\n    key: 'DATABASE_URL',\n\n\n    /**\r\n     * Database URL.\r\n     * Change this to restaurants.json file location on your server.\r\n     */\n    get: function get() {\n      return \"http://localhost:8000/\" + 'data/restaurants.json';\n    }\n  }]);\n\n  return DBHelper;\n}();\n\nexports.default = DBHelper;\n\n//# sourceURL=webpack:///./js/scripts/dbhelper.js?");

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

/***/ "./js/scripts/restaurant_info.js":
/*!***************************************!*\
  !*** ./js/scripts/restaurant_info.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _vanillaLazyload = __webpack_require__(/*! vanilla-lazyload */ \"./node_modules/vanilla-lazyload/dist/lazyload.min.js\");\n\nvar _vanillaLazyload2 = _interopRequireDefault(_vanillaLazyload);\n\nvar _dbhelper = __webpack_require__(/*! ./dbhelper */ \"./js/scripts/dbhelper.js\");\n\nvar _dbhelper2 = _interopRequireDefault(_dbhelper);\n\nvar _googleMap = __webpack_require__(/*! ./google-map */ \"./js/scripts/google-map.js\");\n\nvar _googleMap2 = _interopRequireDefault(_googleMap);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar restaurant = void 0;\nvar map = void 0;\n\n/**\n * Fetch restaurant as soon as the page is loaded.\n */\ndocument.addEventListener('DOMContentLoaded', function () {\n  fetchRestaurantFromURL(function (error, restaurant) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      // Defer load of google maps into DOMContentLoad\n      // for avoiding call fetchRestaurant more than one time\n      (0, _googleMap2.default)();\n      fillBreadcrumb();\n    }\n  });\n});\n\n/**\n * Initialize Google map, called from HTML.\n */\nwindow.initMap = function () {\n  self.map = new google.maps.Map(document.getElementById('map'), {\n    zoom: 16,\n    center: self.restaurant.latlng,\n    scrollwheel: false\n  });\n\n  var mainContent = document.getElementById('maincontent');\n  mainContent.classList.remove('c-main--hide-map');\n\n  google.maps.event.addListenerOnce(self.map, 'tilesloaded', function () {\n    document.querySelector('#map iframe').title = 'Google Maps';\n  });\n\n  _dbhelper2.default.mapMarkerForRestaurant(self.restaurant, self.map);\n};\n\n/**\n * Get current restaurant from page URL.\n */\nvar fetchRestaurantFromURL = function fetchRestaurantFromURL(callback) {\n  if (self.restaurant) {\n    // restaurant already fetched!\n    if (typeof callback === 'function') {\n      callback(null, self.restaurant);\n      return;\n    }\n  }\n\n  var id = parseInt(getParameterByName('id'));\n  if (!id) {\n    // no id found in URL\n    var error = 'No restaurant id in URL';\n    callback(error, null);\n  } else {\n    _dbhelper2.default.fetchRestaurantById(id, function (error, restaurant) {\n      self.restaurant = restaurant;\n\n      if (!restaurant) {\n        console.error(error);\n        return;\n      }\n      createRestaurantHTML();\n\n      if (typeof callback === 'function') {\n        callback(null, restaurant);\n      }\n    });\n  }\n};\n\n/**\n * Create restaurant HTML and add it to the webpage\n */\nvar createRestaurantHTML = function createRestaurantHTML() {\n  var restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant;\n\n  var restaurantContainer = document.getElementById('restaurant-container');\n\n  var name = document.createElement('h2');\n  name.className = 'c-restaurant-details__name';\n  name.innerHTML = restaurant.name;\n  restaurantContainer.appendChild(name);\n\n  var imgSizes = [{\n    size: 'original',\n    minWidth: 670\n  }, {\n    size: 670,\n    minWidth: 570\n  }, {\n    size: 570,\n    minWidth: 470\n  }, {\n    size: 470,\n    minWidth: 320\n  }];\n\n  var picture = _dbhelper2.default.sizedPictureForRestaurant(restaurant, imgSizes);\n  picture.className = 'c-restaurant-details__picture';\n  restaurantContainer.appendChild(picture);\n\n  var cuisine = document.createElement('p');\n  cuisine.className = 'c-restaurant-details__cuisine';\n  cuisine.innerHTML = restaurant.cuisine_type;\n  restaurantContainer.appendChild(cuisine);\n\n  var address = document.createElement('p');\n  address.className = 'c-restaurant-details__address';\n  address.innerHTML = restaurant.address;\n  restaurantContainer.appendChild(address);\n\n  // fill operating hours\n  if (restaurant.operating_hours) {\n    restaurantContainer.appendChild(fillRestaurantHoursHTML());\n  }\n\n  // Lazy load images\n  new _vanillaLazyload2.default({\n    threshold: 0\n  });\n\n  // fill reviews\n  fillReviewsHTML();\n};\n\n/**\n * Create restaurant operating hours HTML table and add it to the webpage.\n */\nvar fillRestaurantHoursHTML = function fillRestaurantHoursHTML() {\n  var operatingHours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant.operating_hours;\n\n  var hours = document.createElement('table');\n  hours.className = 'c-restaurant-details__hours';\n\n  for (var key in operatingHours) {\n    var row = document.createElement('tr');\n    var day = document.createElement('td');\n\n    day.innerHTML = key;\n    row.appendChild(day);\n\n    var time = document.createElement('td');\n    time.innerHTML = operatingHours[key];\n\n    row.appendChild(time);\n    hours.appendChild(row);\n  }\n\n  return hours;\n};\n\n/**\n * Create all reviews HTML and add them to the webpage.\n */\nvar fillReviewsHTML = function fillReviewsHTML() {\n  var reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant.reviews;\n\n  var container = document.getElementById('reviews-container');\n  var title = document.createElement('h3');\n  title.innerHTML = 'Reviews';\n  container.appendChild(title);\n\n  if (!reviews) {\n    var noReviews = document.createElement('p');\n    noReviews.className = 'c-reviews__not-found';\n    noReviews.innerHTML = 'No reviews yet!';\n    container.appendChild(noReviews);\n    return;\n  }\n\n  var ul = document.getElementById('reviews-list');\n  reviews.forEach(function (review) {\n    ul.appendChild(createReviewHTML(review));\n  });\n\n  container.appendChild(ul);\n};\n\n/**\n * Create review HTML and add it to the webpage.\n */\nvar createReviewHTML = function createReviewHTML(review) {\n  var li = document.createElement('li');\n  li.className = 'c-review';\n\n  var header = document.createElement('div');\n  header.className = 'c-review__header';\n\n  var name = document.createElement('span');\n  name.innerHTML = review.name;\n  header.appendChild(name);\n\n  var date = document.createElement('span');\n  date.innerHTML = review.date;\n  header.appendChild(date);\n\n  li.appendChild(header);\n\n  var content = document.createElement('div');\n  content.className = 'c-review__content';\n\n  var rating = document.createElement('span');\n  rating.className = 'c-review__rate';\n  rating.innerHTML = 'Rating: ' + review.rating;\n  content.appendChild(rating);\n\n  var comments = document.createElement('p');\n  comments.className = 'c-review__comments';\n  comments.innerHTML = review.comments;\n  content.appendChild(comments);\n\n  li.appendChild(content);\n\n  return li;\n};\n\n/**\n * Add restaurant name to the breadcrumb navigation menu\n */\nvar fillBreadcrumb = function fillBreadcrumb() {\n  var restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurant;\n\n  var breadcrumb = document.getElementById('breadcrumb');\n  var li = document.createElement('li');\n  li.innerHTML = restaurant.name;\n  breadcrumb.appendChild(li);\n};\n\n/**\n * Get a parameter by name from page URL.\n */\nvar getParameterByName = function getParameterByName(name, url) {\n  if (!url) url = window.location.href;\n  name = name.replace(/[\\[\\]]/g, '\\\\$&');\n  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),\n      results = regex.exec(url);\n  if (!results) return null;\n  if (!results[2]) return '';\n  return decodeURIComponent(results[2].replace(/\\+/g, ' '));\n};\n\n//# sourceURL=webpack:///./js/scripts/restaurant_info.js?");

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