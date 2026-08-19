/* ============================================
   VelaroCar - Public API Client
   Fetches product data from the backend API
   ============================================ */
(function() {
  'use strict';

  var BASE = '/api/public';

  function get(type) {
    return fetch(BASE + '/' + type)
      .then(function(r) {
        if (!r.ok) throw new Error('API ' + r.status);
        return r.json();
      });
  }

  function getSingle(type, id) {
    return fetch(BASE + '/' + type + '/' + id)
      .then(function(r) {
        if (!r.ok) throw new Error('API ' + r.status);
        return r.json();
      });
  }

  window.VelaroAPI = {
    getCars: function() { return get('cars'); },
    getCar: function(id) { return getSingle('cars', id); },
    getMotorcycles: function() { return get('motorcycles'); },
    getMotorcycle: function(id) { return getSingle('motorcycles', id); },
    getVillas: function() { return get('villas'); },
    getVilla: function(id) { return getSingle('villas', id); },
    getExcursions: function() { return get('excursions'); },
    getExcursion: function(id) { return getSingle('excursions', id); },
    getTransfers: function() { return get('transfers'); },
    getTransfer: function(id) { return getSingle('transfers', id); },
    getPacks: function() { return get('packs'); },
    getPack: function(id) { return getSingle('packs', id); },
    getReviews: function() { return get('reviews'); },
    getSettings: function() { return get('settings'); },
    getContent: function(category) {
      var url = BASE + '/content';
      if (category) url += '?category=' + encodeURIComponent(category);
      return fetch(url).then(function(r) { if (!r.ok) throw new Error('API ' + r.status); return r.json(); });
    },
    getLanguages: function() { return get('languages'); }
  };

})();
