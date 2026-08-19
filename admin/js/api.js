var AdminAPI = (function() {
  var BASE = window.location.origin + '/api';

  function getToken() { return localStorage.getItem('velarocar_admin_token'); }
  function setToken(t) { localStorage.setItem('velarocar_admin_token', t); }
  function getRefresh() { return localStorage.getItem('velarocar_admin_refresh'); }
  function setRefresh(t) { localStorage.setItem('velarocar_admin_refresh', t); }
  function getUser() { var u = localStorage.getItem('velarocar_admin_user'); return u ? JSON.parse(u) : null; }
  function setUser(u) { localStorage.setItem('velarocar_admin_user', JSON.stringify(u)); }
  function clearAuth() { localStorage.removeItem('velarocar_admin_token'); localStorage.removeItem('velarocar_admin_refresh'); localStorage.removeItem('velarocar_admin_user'); }
  function isAuthenticated() { return !!getToken(); }

  async function request(method, path, body) {
    var url = BASE + path;
    var opts = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    var token = getToken();
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    if (body && method !== 'GET') opts.body = JSON.stringify(body);
    
    try {
      var res = await fetch(url, opts);
      if (res.status === 401 && !path.includes('/auth/')) {
        var refreshed = await tryRefresh();
        if (refreshed) {
          opts.headers['Authorization'] = 'Bearer ' + getToken();
          res = await fetch(url, opts);
        } else {
          clearAuth();
          window.location.hash = '#/login';
          throw new Error('Session expiree');
        }
      }
      var raw = await res.text();
      if (!raw) {
        throw new Error('Reponse vide du serveur (status ' + res.status + '). Verifiez que le serveur est demarre.');
      }
      var data;
      try { data = JSON.parse(raw); } catch (parseErr) {
        throw new Error('Reponse invalide du serveur (status ' + res.status + '). Le serveur ne retourne pas du JSON.');
      }
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');
      return data;
    } catch (err) {
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        throw new Error('Impossible de contacter le serveur. Verifiez que le serveur est demarre sur ' + BASE);
      }
      throw err;
    }
  }

  async function tryRefresh() {
    var rt = getRefresh();
    if (!rt) return false;
    try {
      var res = await fetch(BASE + '/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: rt })
      });
      if (!res.ok) return false;
      var raw = await res.text();
      if (!raw) return false;
      var data;
      try { data = JSON.parse(raw); } catch (e) { return false; }
      if (!data.accessToken) return false;
      setToken(data.accessToken);
      setRefresh(data.refreshToken);
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    getToken: getToken, setToken: setToken, getRefresh: getRefresh, setRefresh: setRefresh,
    getUser: getUser, setUser: setUser, clearAuth: clearAuth, isAuthenticated: isAuthenticated,

    // Auth
    login: function(email, password) {
      return request('POST', '/auth/login', { email: email, password: password });
    },
    logout: function() {
      var rt = getRefresh();
      return request('POST', '/auth/logout', { refreshToken: rt }).finally(function() { clearAuth(); });
    },
    getMe: function() { return request('GET', '/auth/me'); },
    changePassword: function(currentPassword, newPassword) {
      return request('POST', '/auth/change-password', { currentPassword: currentPassword, newPassword: newPassword });
    },

    // Dashboard/Stats
    getBookingStats: function() { return request('GET', '/bookings/stats'); },
    getBookingChart: function(period) { return request('GET', '/bookings/chart?period=' + (period || '30d')); },
    getBookingByType: function() { return request('GET', '/bookings/by-type'); },
    getRecentBookings: function() { return request('GET', '/bookings/recent'); },

    // Bookings
    getBookings: function(params) { return request('GET', '/bookings?' + params); },
    getBooking: function(id) { return request('GET', '/bookings/' + id); },
    updateBookingStatus: function(id, status, reason) { return request('PUT', '/bookings/' + id + '/status', { status: status, cancellationReason: reason || '' }); },
    updateBooking: function(id, data) { return request('PUT', '/bookings/' + id, data); },
    deleteBooking: function(id) { return request('DELETE', '/bookings/' + id); },

    // Cars
    getCars: function(params) { return request('GET', '/cars?' + (params || '')); },
    getAllCars: function() { return request('GET', '/cars/all'); },
    getCar: function(id) { return request('GET', '/cars/' + id); },
    createCar: function(data) { return request('POST', '/cars', data); },
    updateCar: function(id, data) { return request('PUT', '/cars/' + id, data); },
    deleteCar: function(id) { return request('DELETE', '/cars/' + id); },

    // Motorcycles
    getMotorcycles: function(params) { return request('GET', '/motorcycles?' + (params || '')); },
    getAllMotorcycles: function() { return request('GET', '/motorcycles/all'); },
    getMotorcycle: function(id) { return request('GET', '/motorcycles/' + id); },
    createMotorcycle: function(data) { return request('POST', '/motorcycles', data); },
    updateMotorcycle: function(id, data) { return request('PUT', '/motorcycles/' + id, data); },
    deleteMotorcycle: function(id) { return request('DELETE', '/motorcycles/' + id); },

    // Villas
    getVillas: function(params) { return request('GET', '/villas?' + (params || '')); },
    getAllVillas: function() { return request('GET', '/villas/all'); },
    getVilla: function(id) { return request('GET', '/villas/' + id); },
    createVilla: function(data) { return request('POST', '/villas', data); },
    updateVilla: function(id, data) { return request('PUT', '/villas/' + id, data); },
    deleteVilla: function(id) { return request('DELETE', '/villas/' + id); },

    // Excursions
    getExcursions: function(params) { return request('GET', '/excursions?' + (params || '')); },
    getExcursion: function(id) { return request('GET', '/excursions/' + id); },
    createExcursion: function(data) { return request('POST', '/excursions', data); },
    updateExcursion: function(id, data) { return request('PUT', '/excursions/' + id, data); },
    deleteExcursion: function(id) { return request('DELETE', '/excursions/' + id); },

    // Transfers
    getTransfers: function(params) { return request('GET', '/transfers?' + (params || '')); },
    getTransfer: function(id) { return request('GET', '/transfers/' + id); },
    createTransfer: function(data) { return request('POST', '/transfers', data); },
    updateTransfer: function(id, data) { return request('PUT', '/transfers/' + id, data); },
    deleteTransfer: function(id) { return request('DELETE', '/transfers/' + id); },

    // Packs
    getPacks: function(params) { return request('GET', '/packs?' + (params || '')); },
    getPack: function(id) { return request('GET', '/packs/' + id); },
    createPack: function(data) { return request('POST', '/packs', data); },
    updatePack: function(id, data) { return request('PUT', '/packs/' + id, data); },
    deletePack: function(id) { return request('DELETE', '/packs/' + id); },

    // Clients
    getClients: function(params) { return request('GET', '/clients?' + (params || '')); },
    getClient: function(id) { return request('GET', '/clients/' + id); },
    getClientBookings: function(id) { return request('GET', '/clients/' + id + '/bookings'); },
    getClientStats: function() { return request('GET', '/clients/stats'); },

    // Messages
    getMessages: function(params) { return request('GET', '/messages?' + (params || '')); },
    getMessage: function(id) { return request('GET', '/messages/' + id); },
    markRead: function(id) { return request('PUT', '/messages/' + id + '/read'); },
    markUnread: function(id) { return request('PUT', '/messages/' + id + '/unread'); },
    replyMessage: function(id, reply) { return request('PUT', '/messages/' + id + '/reply', { reply: reply }); },
    deleteMessage: function(id) { return request('DELETE', '/messages/' + id); },

    // Reviews
    getReviews: function(params) { return request('GET', '/reviews?' + (params || '')); },
    updateReviewStatus: function(id, status) { return request('PUT', '/reviews/' + id + '/status', { status: status }); },
    updateReviewFeatured: function(id, featured) { return request('PUT', '/reviews/' + id + '/featured', { featured: featured }); },
    deleteReview: function(id) { return request('DELETE', '/reviews/' + id); },

    // Gallery
    getGallery: function(params) { return request('GET', '/gallery?' + (params || '')); },
    addGalleryImage: function(data) { return request('POST', '/gallery', data); },
    updateGalleryImage: function(id, data) { return request('PUT', '/gallery/' + id, data); },
    deleteGalleryImage: function(id) { return request('DELETE', '/gallery/' + id); },

    // Finance
    getFinanceOverview: function() { return request('GET', '/finance/overview'); },
    getFinanceMonthly: function() { return request('GET', '/finance/monthly'); },

    // Analytics
    getAnalyticsOverview: function() { return request('GET', '/analytics/overview'); },

    // Settings
    getSettings: function(cat) { return request('GET', '/settings' + (cat ? '?category=' + cat : '')); },
    saveSettings: function(settings) { return request('PUT', '/settings', { settings: settings }); },

    // Content
    getContent: function(cat) { return request('GET', '/content' + (cat ? '?category=' + cat : '')); },
    saveContent: function(items) { return request('PUT', '/content', { items: items }); },

    // Languages
    getLanguages: function() { return request('GET', '/languages'); },
    saveLanguages: function(languages) { return request('PUT', '/languages', { languages: languages }); },

    // Admin Users
    getUsers: function() { return request('GET', '/admin/users'); },
    createUser: function(data) { return request('POST', '/admin/users', data); },
    updateUser: function(id, data) { return request('PUT', '/admin/users/' + id, data); },
    deleteUser: function(id) { return request('DELETE', '/admin/users/' + id); },
    updateProfile: function(data) { return request('PUT', '/admin/profile', data); },

    // Activity Logs
    getActivityLogs: function(params) { return request('GET', '/activity-logs?' + (params || '')); },

    // Email Logs
    getEmailLogs: function(params) { return request('GET', '/emails?' + (params || '')); }
  };
})();
