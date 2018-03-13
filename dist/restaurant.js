!function(e){var n={};function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=2)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();var a=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return r(e,null,[{key:"fetchRestaurants",value:function(n){var t=new XMLHttpRequest;t.open("GET",e.DATABASE_URL),t.onload=function(){if(200===t.status){var e=JSON.parse(t.responseText).restaurants;n(null,e)}else{var r="Request failed. Returned status of "+t.status;n(r,null)}},t.send()}},{key:"fetchRestaurantById",value:function(n,t){e.fetchRestaurants(function(e,r){if(e)t(e,null);else{var a=r.find(function(e){return e.id===n});a?t(null,a):t("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(n,t){e.fetchRestaurants(function(e,r){if(e)t(e,null);else{var a=r.filter(function(e){return e.cuisine_type===n});t(null,a)}})}},{key:"fetchRestaurantByNeighborhood",value:function(n,t){e.fetchRestaurants(function(e,r){if(e)t(e,null);else{var a=r.filter(function(e){return e.neighborhood===n});t(null,a)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(n,t,r){e.fetchRestaurants(function(e,a){if(e)r(e,null);else{var i=a;"all"!==n&&(i=i.filter(function(e){return e.cuisine_type===n})),"all"!==t&&(i=i.filter(function(e){return e.neighborhood===t})),r(null,i)}})}},{key:"fetchNeighborhoods",value:function(n){e.fetchRestaurants(function(e,t){if(e)n(e,null);else{var r=t.map(function(e,n){return t[n].neighborhood}),a=r.filter(function(e,n){return r.indexOf(e)===n});n(null,a)}})}},{key:"fetchCuisines",value:function(n){e.fetchRestaurants(function(e,t){if(e)n(e,null);else{var r=t.map(function(e,n){return t[n].cuisine_type}),a=r.filter(function(e,n){return r.indexOf(e)===n});n(null,a)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return"/img/"+(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"original")+"/"+e.photograph}},{key:"sizedPictureForRestaurant",value:function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=document.createElement("picture"),a=null;t.forEach(function(t){(a=document.createElement("source")).media="(min-width: "+t.minWidth+"px)",a.srcset=e.imageUrlForRestaurant(n,t.size),a.srcset+=".webp",r.appendChild(a),(a=document.createElement("source")).media="(min-width: "+t.minWidth+"px)",a.srcset=e.imageUrlForRestaurant(n,t.size),r.appendChild(a)});var i=document.createElement("img");return i.src=e.imageUrlForRestaurant(n),i.alt="Restaurant photo",r.appendChild(i),r}},{key:"mapMarkerForRestaurant",value:function(n,t){return new google.maps.Marker({position:n.latlng,title:n.name,url:e.urlForRestaurant(n),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"https://mws-restaurant-1519596698262.firebaseapp.com/data/restaurants.json"}}]),e}();n.default=a},function(e,n,t){"use strict";var r,a=t(0),i=(r=a)&&r.__esModule?r:{default:r};window.initMap=function(){u(function(e,n){e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:n.latlng,scrollwheel:!1}),d(),i.default.mapMarkerForRestaurant(self.restaurant,self.map))})};var u=function(e){if(self.restaurant)e(null,self.restaurant);else{var n=parseInt(f("id"));if(n)i.default.fetchRestaurantById(n,function(n,t){self.restaurant=t,t?(l(),e(null,t)):console.error(n)});else{e("No restaurant id in URL",null)}}},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurant,n=document.getElementById("restaurant-container"),t=document.createElement("h2");t.className="c-restaurant-details__name",t.innerHTML=e.name,n.appendChild(t);var r=i.default.sizedPictureForRestaurant(e,[{size:"original",minWidth:670},{size:670,minWidth:570},{size:570,minWidth:470},{size:470,minWidth:320}]);r.className="c-restaurant-details__picture",n.appendChild(r);var a=document.createElement("p");a.className="c-restaurant-details__cuisine",a.innerHTML=e.cuisine_type,n.appendChild(a);var u=document.createElement("p");u.className="c-restaurant-details__address",u.innerHTML=e.address,n.appendChild(u),e.operating_hours&&n.appendChild(o()),s()},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurant.operating_hours,n=document.createElement("table");for(var t in n.className="c-restaurant-details__hours",e){var r=document.createElement("tr"),a=document.createElement("td");a.innerHTML=t,r.appendChild(a);var i=document.createElement("td");i.innerHTML=e[t],r.appendChild(i),n.appendChild(r)}return n},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurant.reviews,n=document.getElementById("reviews-container"),t=document.createElement("h3");if(t.innerHTML="Reviews",n.appendChild(t),!e){var r=document.createElement("p");return r.className="c-reviews__not-found",r.innerHTML="No reviews yet!",void n.appendChild(r)}var a=document.getElementById("reviews-list");e.forEach(function(e){a.appendChild(c(e))}),n.appendChild(a)},c=function(e){var n=document.createElement("li");n.className="c-review";var t=document.createElement("div");t.className="c-review__header";var r=document.createElement("span");r.innerHTML=e.name,t.appendChild(r);var a=document.createElement("span");a.innerHTML=e.date,t.appendChild(a),n.appendChild(t);var i=document.createElement("div");i.className="c-review__content";var u=document.createElement("span");u.className="c-review__rate",u.innerHTML="Rating: "+e.rating,i.appendChild(u);var l=document.createElement("p");return l.className="c-review__comments",l.innerHTML=e.comments,i.appendChild(l),n.appendChild(i),n},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurant,n=document.getElementById("breadcrumb"),t=document.createElement("li");t.innerHTML=e.name,n.appendChild(t)},f=function(e,n){n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);return t?t[2]?decodeURIComponent(t[2].replace(/\+/g," ")):"":null}},function(e,n,t){"use strict";t(1)}]);