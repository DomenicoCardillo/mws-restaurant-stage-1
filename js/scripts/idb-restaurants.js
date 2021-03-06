import idb from 'idb';

class IDBRestaurant {
  /**
   * Open the database and return a promise
   * @returns {Promise}
   */
  static openIDB() {
    if (!navigator.serviceWorker) {
      return Promise.resolve();
    }
    
    return idb.open('mws-restaurant', 1, function(upgradeDb) {
      const store = upgradeDb.createObjectStore('restaurants', {
        keyPath: 'id'
      });
    });
  }
  
  static saveRestaurants(restaurants) {
    this.openIDB().then((db) => {
      if (!db) return;
      
      const tx = db.transaction('restaurants', 'readwrite');
      const store = tx.objectStore('restaurants');
      restaurants.forEach((restaurant) => {
        store.put(restaurant);
      });
  
      return tx.complete;
    }).then(() => {
      console.log('Restaurant added');
    });
  }
  
  static getRestaurants() {
    return this.openIDB().then((db) => {
      if (!db) return;
      const tx = db.transaction('restaurants');
      const store = tx.objectStore('restaurants');
      return store.getAll();
    });
  }
  
  static getRestaurant(id) {
    return this.openIDB().then((db) => {
      if (!db) return;
      const tx = db.transaction('restaurants');
      const store = tx.objectStore('restaurants');
      return store.get(parseInt(id));
    });
  }
  
  static updateRestaurantFavorite(id, is_favorite) {
    this.openIDB().then((db) => {
      if (!db) return;
      const tx = db.transaction('restaurants', 'readwrite');
      const store = tx.objectStore('restaurants');
      return store.openCursor();
    }).then(function cursorIterate(cursor) {
      if (!cursor) return;
    
      if (cursor.value.id === id) {
        const data = cursor.value;
        data.is_favorite = is_favorite;
        return cursor.update(data);
      }
    
      return cursor.continue().then(cursorIterate);
    })
  }
  
  static updateRestaurantReviews(id, reviews) {
    this.openIDB().then((db) => {
      if (!db) return;
      const tx = db.transaction('restaurants', 'readwrite');
      const store = tx.objectStore('restaurants');
      return store.openCursor();
    }).then(function cursorIterate(cursor) {
      if (!cursor) return;
      
      if (cursor.value.id === id) {
        const data = cursor.value;
        data.reviews = reviews;
        return cursor.update(data);
      }
      
      return cursor.continue().then(cursorIterate);
    })
  }
}

export default IDBRestaurant;