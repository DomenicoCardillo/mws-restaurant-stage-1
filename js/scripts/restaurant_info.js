import Blazy from 'blazy';
import DBHelper from './dbhelper';
import IDBPendingReviews from './idb-pending-reviews';
import loadGoogleMaps from './google-map';

let restaurant;
let map;
const monthNames = ['January', 'February', 'March',
  'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'];

/**
 * Fetch restaurant as soon as the page is loaded.
 */
window.addEventListener('load', () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      // Defer load of google maps into DOMContentLoad
      // for avoiding call fetchRestaurant more than one time
      loadGoogleMaps();
      fillBreadcrumb();
      
      // Set listener to add a new review
      document.getElementById('add-review').addEventListener('click', sendReview);
  
      // Set listener for favorite toggle
      document.getElementById('add-to-favorites').addEventListener('click', toggleFavorites);
    }
  });
});

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: self.restaurant.latlng,
    scrollwheel: false,
  });
  
  const mainContent = document.getElementById('maincontent');
  mainContent.classList.remove('c-main--hide-map');
  
  google.maps.event.addListenerOnce(self.map, 'tilesloaded', () => {
    document.querySelector('#map iframe').title = 'Google Maps';
  });
  
  DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
};

const sendReview = () => {
  const rating = document.getElementById('review-rating').value;
  const name = document.getElementById('review-name').value;
  const comments = document.getElementById('review-comments').value;
  
  if (!rating || !name || !comments) return;
  if (name.length < 2 || comments.length < 10) return;
  
  const review = {
    restaurant_id: self.restaurant.id,
    rating: parseInt(rating),
    name,
    comments,
  };
  
  // If user result offline add sync event directly for the review.
  if (navigator.onLine) {
    addReview(review);
  } else {
    syncReview(review);
  }
};

const addReview = (review) => {
  DBHelper.addReview(review, (error, review) => {
    const reviewTitle = document.getElementById('add-review-title');
    const reviewForm = document.getElementById('add-review-form');
    reviewForm.className = 'u-hidden';
    document.getElementById('add-review').removeEventListener('click', null);
    
    if (error) {
      // Show error and sync review
      reviewTitle.className = 'c-reviews__sent c-reviews__sent--error';
      reviewTitle.innerHTML = 'An error occurred, your reviews has been saved and will be sent when you will be back online!';
      syncReview(review);
      return;
    }
    
    // Hide form
    reviewTitle.className = 'c-reviews__sent c-reviews__sent--success';
    reviewTitle.innerHTML = 'Review has sent!';
    DBHelper.fetchReviewsByRestaurantId(self.restaurant.id, fillReviewsHTML);
  });
};

const syncReview = (review) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if ('sync' in registration) {
        IDBPendingReviews.addPendingReview(review, () => {
          return registration.sync.register('pending-reviews').then(() => {
            const reviewTitle = document.getElementById('add-review-title');
            const reviewForm = document.getElementById('add-review-form');
            reviewForm.className = 'u-hidden';
            document.getElementById('add-review').removeEventListener('click', null);
            
            reviewTitle.className = 'c-reviews__sent c-reviews__sent--success';
            reviewTitle.innerHTML = 'You seem offline, the review has been saved and will be added when you will be back online! Thank you!';
          });
        })
      }
    });
  }
};

/**
 * Get current restaurant from page URL.
 */
const fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    if (typeof callback === 'function') {
      callback(null, self.restaurant);
      return;
    }
  }
  
  const id = parseInt(getParameterByName('id'));
  
  if (!id) { // no id found in URL
    const error = 'No restaurant id in URL';
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      
      if (!restaurant) {
        console.error(error);
        return;
      }
      
      createRestaurantHTML();
      
      if (typeof callback === 'function') {
        callback(null, restaurant);
      }
    });
  }
};

/**
 * Create restaurant HTML and add it to the webpage
 */
const createRestaurantHTML = (restaurant = self.restaurant) => {
  const restaurantContainer = document.getElementById('restaurant-container');
  restaurantContainer.innerHTML = '';
  
  const name = document.createElement('h2');
  name.className = 'c-restaurant-details__name';
  name.innerHTML = restaurant.name;
  restaurantContainer.appendChild(name);
  
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
  picture.className = 'c-restaurant-details__picture';
  restaurantContainer.appendChild(picture);
  
  const cuisine = document.createElement('p');
  cuisine.className = 'c-restaurant-details__cuisine';
  cuisine.innerHTML = restaurant.cuisine_type;
  restaurantContainer.appendChild(cuisine);
  
  const address = document.createElement('p');
  address.className = 'c-restaurant-details__address';
  address.innerHTML = restaurant.address;
  restaurantContainer.appendChild(address);
  
  const favorite = document.createElement('span');
  favorite.id = 'add-to-favorites';
  favorite.className = `c-restaurant-details__favorite ${restaurant.is_favorite ? 'is-favorite' : ''}`;
  favorite.innerHTML = restaurant.is_favorite ?  'Remove from favorites' : 'Add to favorites';
  restaurantContainer.appendChild(favorite);
  
  // fill operating hours
  if (restaurant.operating_hours) {
    restaurantContainer.appendChild(fillRestaurantHoursHTML());
  }
  
  // Lazy load images
  new Blazy({
    offset: 0,
  });
  
  // fill reviews
  if (!navigator.onLine && (restaurant.reviews && restaurant.reviews.length > 0)) {
    fillReviewsHTML(null);
  } else {
    DBHelper.fetchReviewsByRestaurantId(restaurant.id, fillReviewsHTML);
  }
};

const toggleFavorites = () => {
  DBHelper.toggleFavorite(self.restaurant, (error, restaurant) => {
    if (error !== null) {
      return;
    }
  
    self.restaurant = restaurant;
    const favorite = document.getElementById('add-to-favorites');
    favorite.innerHTML = restaurant.is_favorite ?  'Remove from favorites' : 'Add to favorites';
    favorite.className = `c-restaurant-details__favorite ${restaurant.is_favorite ? 'is-favorite' : ''}`;
  });
};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
const fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.createElement('table');
  hours.className = 'c-restaurant-details__hours';
  
  for (let key in operatingHours) {
    const row = document.createElement('tr');
    const day = document.createElement('td');
    
    day.innerHTML = key;
    row.appendChild(day);
    
    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    
    row.appendChild(time);
    hours.appendChild(row);
  }
  
  return hours;
};

/**
 * Create all reviews HTML and add them to the webpage.
 */
const fillReviewsHTML = (error, reviews = self.restaurant.reviews) => {
  if (error !== null) return;
  const container = document.getElementById('reviews-container');
  
  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.className = 'c-reviews__not-found';
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  
  const ul = document.getElementById('reviews-list');
  ul.innerHTML = '';
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  
  container.appendChild(ul);
};

/**
 * Create review HTML and add it to the webpage.
 */
const createReviewHTML = (review) => {
  const li = document.createElement('li');
  li.className = 'c-review';
  
  const header = document.createElement('div');
  header.className = 'c-review__header';
  
  const name = document.createElement('span');
  name.innerHTML = review.name;
  header.appendChild(name);
  
  const date = document.createElement('span');
  let createdAt = new Date(review.createdAt);
  date.innerHTML = `${monthNames[createdAt.getMonth()]} ${createdAt.getDate()}, ${createdAt.getFullYear()}`;
  header.appendChild(date);
  
  li.appendChild(header);
  
  const content = document.createElement('div');
  content.className = 'c-review__content';
  
  const rating = document.createElement('span');
  rating.className = 'c-review__rate';
  rating.innerHTML = `Rating: ${review.rating}`;
  content.appendChild(rating);
  
  const comments = document.createElement('p');
  comments.className = 'c-review__comments';
  comments.innerHTML = review.comments;
  content.appendChild(comments);
  
  li.appendChild(content);
  
  return li;
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
const fillBreadcrumb = (restaurant = self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
};

/**
 * Get a parameter by name from page URL.
 */
const getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
      results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};