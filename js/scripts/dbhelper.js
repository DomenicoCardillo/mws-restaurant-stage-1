/**
 * Common database helper functions.
 */
import IDBRestaurant from './idb-restaurants';
let _restaurants = [];

class DBHelper {
  
  static get restaurants() {
    return _restaurants;
  }
  
  static set restaurants(restaurants) {
    _restaurants = restaurants;
  }
  
  /**
   * Restaurant Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DB_RESTAURANT_URL() {
    return `${BASE_URL}restaurants/`;
  }
  
  /**
   * Reviews Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DB_REVIEWS_URL() {
    return `${BASE_URL}reviews/`;
  }
  
  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    if (this.restaurants && this.restaurants.length) {
      callback(null, this.restaurants);
    } else {
      IDBRestaurant.getRestaurants().then((restaurants) => {
        if (restaurants.length) {
          console.log('Return indexedDB data', restaurants);
          this.restaurants = restaurants;
          callback(null, this.restaurants);
        } else {
          console.log('indexedDB empty, fetch restaurants');
          fetch(DBHelper.DB_RESTAURANT_URL)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            IDBRestaurant.saveRestaurants(response);
            this.restaurants = response;
            callback(null, response);
          })
          .catch((error) => {
            const errorMessage = (`Request failed. Returned status of ${error.status}`);
            callback(errorMessage, null);
          });
        }
      });
    }
  }
  
  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    IDBRestaurant.getRestaurant(id).then((restaurant) => {
      if (restaurant) {
        console.log('Return indexedDB data', restaurant);
        callback(null, restaurant);
      } else {
        console.log('indexedDB empty, fetch restaurant by id');
        fetch(`${DBHelper.DB_RESTAURANT_URL}${id}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          callback(null, response);
        })
        .catch(() => {
          const errorMessage = 'Restaurant doesn\'t exist';
          callback(errorMessage, null);
        });
      }
    });
  }
  
  static fetchReviewsByRestaurantId(restaurantId, callback) {
    fetch(`${DBHelper.DB_REVIEWS_URL}?restaurant_id=${restaurantId}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      IDBRestaurant.updateRestaurantReviews(restaurantId, response);
      callback(null, response);
    })
    .catch(() => {
      const errorMessage = 'Reviews for this restaurant doesn\'t exist';
      callback(errorMessage, null);
    });
  }
  
  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  // static fetchRestaurantByCuisine(cuisine, callback) {
  //   // Fetch all restaurants  with proper error handling
  //   DBHelper.fetchRestaurants((error, restaurants) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       // Filter restaurants to have only given cuisine type
  //       const results = restaurants.filter(r => r.cuisine_type === cuisine);
  //       callback(null, results);
  //     }
  //   });
  // }
  
  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  // static fetchRestaurantByNeighborhood(neighborhood, callback) {
  //   // Fetch all restaurants
  //   DBHelper.fetchRestaurants((error, restaurants) => {
  //     if (error) {
  //       callback(error, null);
  //     } else {
  //       // Filter restaurants to have only given neighborhood
  //       const results = restaurants.filter(r => r.neighborhood === neighborhood);
  //       callback(null, results);
  //     }
  //   });
  // }
  
  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants;
        if (cuisine !== 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type === cuisine);
        }
        if (neighborhood !== 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood === neighborhood);
        }
        callback(null, results);
      }
    });
  }
  
  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) === i);
        callback(null, uniqueNeighborhoods);
      }
    });
  }
  
  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) === i);
        callback(null, uniqueCuisines);
      }
    });
  }
  
  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }
  
  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant, size = 'original', ext = 'jpg') {
    return `/img/${size}/${restaurant.photograph}.${ext}`;
  }
  
  /**
   * Get Picture from restaurant and sizes
   */
  static sizedPictureForRestaurant(restaurant, imgSizes = []) {
    let picture = document.createElement('picture');
    
    let source = null;
    imgSizes.forEach((imgSize) => {
      // WepP
      source = document.createElement('source');
      source.media = `(min-width: ${imgSize.minWidth}px)`;
      source.type = 'image/webp';
      source.dataset.srcset = DBHelper.imageUrlForRestaurant(restaurant, imgSize.size, 'webp');
      picture.appendChild(source);
      
      // Jpg fallback
      source = document.createElement('source');
      source.media = `(min-width: ${imgSize.minWidth}px)`;
      source.type = 'image/jpeg';
      source.dataset.srcset = DBHelper.imageUrlForRestaurant(restaurant, imgSize.size);
      picture.appendChild(source);
    });
    
    const img = document.createElement('img');
    img.dataset.src = DBHelper.imageUrlForRestaurant(restaurant);
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    img.className = 'b-lazy';
    img.alt = 'Restaurant photo';
    picture.appendChild(img);
    
    return picture;
  }
  
  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    return new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP
    });
  }
  
  static addReview(review, callback) {
    const config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(review),
    };
    
    fetch(DBHelper.DB_REVIEWS_URL, config)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      callback(null, response);
    })
    .catch((error) => {
      console.log(error);
      callback('There was an error, try again later.', null);
    });
  }
  
  static toggleFavorite(restaurant, callback) {
    IDBRestaurant.updateRestaurantFavorite(restaurant.id, !restaurant.is_favorite);
    restaurant.is_favorite = !restaurant.is_favorite;
    if (typeof callback === 'function') {
      callback(null, restaurant);
    }
  }
}

export default DBHelper;