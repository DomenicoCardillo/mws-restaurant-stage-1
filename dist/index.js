!function(e){var n={};function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=4)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();var a=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return r(e,null,[{key:"fetchRestaurants",value:function(n){var t=new XMLHttpRequest;t.open("GET",e.DATABASE_URL),t.onload=function(){if(200===t.status){var e=JSON.parse(t.responseText).restaurants;n(null,e)}else{var r="Request failed. Returned status of "+t.status;n(r,null)}},t.send()}},{key:"fetchRestaurantById",value:function(n,t){e.fetchRestaurants(function(e,r){if(e)t(e,null);else{var a=r.find(function(e){return e.id===n});a?t(null,a):t("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(n,t){e.fetchRestaurants(function(e,r){if(e)t(e,null);else{var a=r.filter(function(e){return e.cuisine_type===n});t(null,a)}})}},{key:"fetchRestaurantByNeighborhood",value:function(n,t){e.fetchRestaurants(function(e,r){if(e)t(e,null);else{var a=r.filter(function(e){return e.neighborhood===n});t(null,a)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(n,t,r){e.fetchRestaurants(function(e,a){if(e)r(e,null);else{var u=a;"all"!==n&&(u=u.filter(function(e){return e.cuisine_type===n})),"all"!==t&&(u=u.filter(function(e){return e.neighborhood===t})),r(null,u)}})}},{key:"fetchNeighborhoods",value:function(n){e.fetchRestaurants(function(e,t){if(e)n(e,null);else{var r=t.map(function(e,n){return t[n].neighborhood}),a=r.filter(function(e,n){return r.indexOf(e)===n});n(null,a)}})}},{key:"fetchCuisines",value:function(n){e.fetchRestaurants(function(e,t){if(e)n(e,null);else{var r=t.map(function(e,n){return t[n].cuisine_type}),a=r.filter(function(e,n){return r.indexOf(e)===n});n(null,a)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return"/img/"+(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"original")+"/"+e.photograph}},{key:"sizedPictureForRestaurant",value:function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=document.createElement("picture"),a=null;t.forEach(function(t){(a=document.createElement("source")).media="(min-width: "+t.minWidth+"px)",a.srcset=e.imageUrlForRestaurant(n,t.size),a.srcset+=".webp",r.appendChild(a),(a=document.createElement("source")).media="(min-width: "+t.minWidth+"px)",a.srcset=e.imageUrlForRestaurant(n,t.size),r.appendChild(a)});var u=document.createElement("img");return u.src=e.imageUrlForRestaurant(n),u.alt="Restaurant photo",r.appendChild(u),r}},{key:"mapMarkerForRestaurant",value:function(n,t){return new google.maps.Marker({position:n.latlng,title:n.name,url:e.urlForRestaurant(n),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"https://mws-restaurant-1519596698262.firebaseapp.com/data/restaurants.json"}}]),e}();n.default=a},,,function(e,n,t){"use strict";var r,a=t(0),u=(r=a)&&r.__esModule?r:{default:r};var o=[];document.addEventListener("DOMContentLoaded",function(){i(),l()});var i=function(){u.default.fetchNeighborhoods(function(e,n){e?console.error(e):(self.neighborhoods=n,s())})},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.neighborhoods,n=document.getElementById("neighborhoods-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.appendChild(t)})},l=function(){u.default.fetchCuisines(function(e,n){e?console.error(e):(self.cuisines=n,c())})},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.cuisines,n=document.getElementById("cuisines-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.appendChild(t)})};window.initMap=function(){self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants()},window.updateRestaurants=function(){var e=document.getElementById("cuisines-select"),n=document.getElementById("neighborhoods-select"),t=e.selectedIndex,r=n.selectedIndex,a=e[t].value,o=n[r].value;u.default.fetchRestaurantByCuisineAndNeighborhood(a,o,function(e,n){e?console.error(e):(f(n),d())})};var f=function(e){self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",o.forEach(function(e){return e.setMap(null)}),o=[],self.restaurants=e},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurants,n=document.getElementById("restaurants-list");if(e.length>0)n.classList.remove("c-restaurants--not-found"),e.forEach(function(e){n.appendChild(h(e))});else{n.classList.add("c-restaurants--not-found");var t=document.createElement("li");t.innerHTML="No restaurant found, try with other filter!",t.className="c-restaurants__not-found",n.appendChild(t)}m()},h=function(e){var n=document.createElement("li");n.className="c-restaurant";var t=u.default.sizedPictureForRestaurant(e,[{size:670,minWidth:570},{size:570,minWidth:470},{size:470,minWidth:320}]);t.className="c-restaurant__picture",n.appendChild(t);var r=document.createElement("div");r.className="c-restaurant__content";var a=document.createElement("h3");a.innerHTML=e.name,r.appendChild(a);var o=document.createElement("p");o.innerHTML=e.neighborhood,r.appendChild(o);var i=document.createElement("p");i.className="c-restaurant__address",i.innerHTML=e.address,r.appendChild(i);var s=document.createElement("a");return s.innerHTML="View Details",s.href=u.default.urlForRestaurant(e),r.appendChild(s),n.appendChild(r),n},m=function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurants).forEach(function(e){var n=u.default.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(n,"click",function(){window.location.href=n.url}),o.push(n)})}},function(e,n,t){"use strict";t(3)}]);