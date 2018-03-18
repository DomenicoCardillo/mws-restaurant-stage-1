import LazyLoad from 'vanilla-lazyload';
import DBHelper from './dbhelper';

let restaurants;
let neighborhoods;
let cuisines;
let map;
let markers = [];

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  fetchNeighborhoods();
  fetchCuisines();
  updateRestaurants();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
const fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
};

/**
 * Set neighborhoods HTML.
 */
const fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.appendChild(option);
  });
};

/**
 * Fetch all cuisines and set their HTML.
 */
const fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
};

/**
 * Set cuisines HTML.
 */
const fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.appendChild(option);
  });
};

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501,
  };
  
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false,
  });
  
  const mainContent = document.getElementById('maincontent');
  mainContent.classList.remove('c-main--hide-map');
  
  google.maps.event.addListenerOnce(self.map, 'tilesloaded', () => {
      document.querySelector('#map iframe').title = 'Google Maps';
    }
  );
  
  updateRestaurants();
};

/**
 * Update page and map for current restaurants.
 */
window.updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
};

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
const resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  markers.forEach(m => m.setMap(null));
  markers = [];
  self.restaurants = restaurants;
};

/**
 * Create all restaurants HTML and add them to the webpage.
 */
const fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  if (restaurants.length > 0) {
    ul.classList.remove('c-restaurants--not-found');
    restaurants.forEach(restaurant => {
      ul.appendChild(createRestaurantHTML(restaurant));
    });
  } else {
    ul.classList.add('c-restaurants--not-found');
    const notFound = document.createElement('li');
    notFound.innerHTML = 'No restaurant found, try with other filter!';
    notFound.className = 'c-restaurants__not-found';
    ul.appendChild(notFound);
  }
  
  // Lazy load images
  new LazyLoad({
    threshold: 0,
  });
  
  // Set markers only if google is defined
  if (typeof google !== 'undefined') {
    addMarkersToMap();
  }
};

/**
 * Create restaurant HTML.
 */
const createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');
  li.className = 'c-restaurant';
  
  const imgSizes = [{
    size: 'original',
    minWidth: 670,
  }, {
    size: 670,
    minWidth: 570,
  }, {
    size: 570,
    minWidth: 470,
  }, {
    size: 470,
    minWidth: 320,
  }];
  
  const picture = DBHelper.sizedPictureForRestaurant(restaurant, imgSizes);
  picture.className = 'c-restaurant__picture';
  li.appendChild(picture);
  
  const content = document.createElement('div');
  content.className = 'c-restaurant__content';

  const name = document.createElement('h3');
  name.innerHTML = restaurant.name;
  content.appendChild(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  content.appendChild(neighborhood);

  const address = document.createElement('p');
  address.className = 'c-restaurant__address';
  address.innerHTML = restaurant.address;
  content.appendChild(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  content.appendChild(more);
  
  /* Append content to the li element */
  li.appendChild(content);
  
  return li;
};

/**
 * Add markers for current restaurants to the map.
 */
const addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    markers.push(marker);
  });
};
