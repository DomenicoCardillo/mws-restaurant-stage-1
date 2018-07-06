import idb from 'idb';

class IDBPendingReviews {
  /**
   * Open the database and return a promise
   * @returns {Promise}
   */
  static openIDB() {
    if (!navigator.serviceWorker) {
      return Promise.resolve();
    }
    
    return idb.open('mws-pending-reviews', 1, function(upgradeDb) {
      const store = upgradeDb.createObjectStore('pending-reviews', {
        keyPath: 'restaurant_id'
      });
    });
  }
  
  static addPendingReview(review, callback) {
    this.openIDB().then((db) => {
      if (!db) return;
      
      const tx = db.transaction('pending-reviews', 'readwrite');
      const store = tx.objectStore('pending-reviews');
      store.put(review);
  
      return tx.complete;
    }).then(() => {
      if (typeof callback === 'function') {
        callback();
      }
      
      console.log('Pending Review added');
    });
  }
}

export default IDBPendingReviews;