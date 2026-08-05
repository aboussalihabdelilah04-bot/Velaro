/* ============================================
   VelaroCar - Admin Dashboard Logic
   Gestion des réservations, produits, statistiques
   ============================================ */

(function() {
    'use strict';

    var tabBtns = document.querySelectorAll('.dash-tab-btn');
    var tabPanels = document.querySelectorAll('.dash-tab-panel');
    var isLoggedIn = false;

    /* --- Login --- */
    var loginBtn = document.getElementById('admin-login-btn');
    var loginForm = document.getElementById('admin-login-form');
    var loginPanel = document.getElementById('login-panel');
    var dashPanel = document.getElementById('dashboard-panel');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = document.getElementById('login-email').value;
            var password = document.getElementById('login-password').value;
            if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
                isLoggedIn = true;
                loginPanel.style.display = 'none';
                dashPanel.style.display = 'block';
                VelaroCar.showToast('success', 'Bienvenue !', 'Connexion réussie, ' + DEFAULT_ADMIN.name);
                initDashboard();
            } else {
                VelaroCar.showToast('error', 'Erreur', 'Email ou mot de passe incorrect.');
            }
        });
    }

    /* --- Tab Navigation --- */
    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var tab = this.dataset.tab;
            tabBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            tabPanels.forEach(function(p) { p.style.display = 'none'; });
            var panel = document.getElementById('tab-' + tab);
            if (panel) panel.style.display = 'block';
            if (tab === 'reservations') renderAdminReservations();
            if (tab === 'products') renderAdminProducts();
            if (tab === 'stats') renderStats();
            if (tab === 'contacts') renderContacts();
        });
    });

    /* --- Init Dashboard --- */
    function initDashboard() {
        renderStats();
        renderAdminReservations();
        updateDashCounts();
    }

    function updateDashCounts() {
        var reservations = getReservationData();
        var pending = reservations.filter(function(r) { return r.status === 'pending'; }).length;
        var confirmed = reservations.filter(function(r) { return r.status === 'confirmed'; }).length;
        var totalRevenue = reservations.filter(function(r) { return r.status === 'confirmed'; }).reduce(function(sum, r) {
            var days = calculateDays(r.startDate, r.endDate);
            return sum + (r.pricePerDay * days);
        }, 0);

        var statEls = document.querySelectorAll('.stat-value');
        if (statEls[0]) statEls[0].textContent = reservations.length;
        if (statEls[1]) statEls[1].textContent = pending;
        if (statEls[2]) statEls[2].textContent = confirmed;
        if (statEls[3]) statEls[3].textContent = formatPrice(totalRevenue);
    }

    /* --- Stats --- */
    function renderStats() {
        var el = document.getElementById('stats-content');
        if (!el) return;
        var reservations = getReservationData();
        var carsCount = CARS.length;
        var motosCount = MOTOS.length;
        var housesCount = HOUSES.length;
        var excursionsCount = EXCURSIONS.length;

        var typeCounts = { voiture: 0, moto: 0, maison: 0, excursion: 0 };
        reservations.forEach(function(r) {
            if (typeCounts[r.type] !== undefined) typeCounts[r.type]++;
        });

        el.innerHTML =
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem;">' +
                '<div style="background:var(--white);border:1px solid var(--gray-100);border-radius:16px;padding:1.5rem;">' +
                    '<div style="font-size:0.8rem;color:var(--gray-500);text-transform:uppercase;margin-bottom:0.5rem;">Catalogue Voitures</div>' +
                    '<div style="font-size:2rem;font-weight:800;color:var(--accent);">' + carsCount + '</div>' +
                '</div>' +
                '<div style="background:var(--white);border:1px solid var(--gray-100);border-radius:16px;padding:1.5rem;">' +
                    '<div style="font-size:0.8rem;color:var(--gray-500);text-transform:uppercase;margin-bottom:0.5rem;">Catalogue Motos</div>' +
                    '<div style="font-size:2rem;font-weight:800;color:var(--accent);">' + motosCount + '</div>' +
                '</div>' +
                '<div style="background:var(--white);border:1px solid var(--gray-100);border-radius:16px;padding:1.5rem;">' +
                    '<div style="font-size:0.8rem;color:var(--gray-500);text-transform:uppercase;margin-bottom:0.5rem;">Catalogue Maisons</div>' +
                    '<div style="font-size:2rem;font-weight:800;color:var(--accent);">' + housesCount + '</div>' +
                '</div>' +
                '<div style="background:var(--white);border:1px solid var(--gray-100);border-radius:16px;padding:1.5rem;">' +
                    '<div style="font-size:0.8rem;color:var(--gray-500);text-transform:uppercase;margin-bottom:0.5rem;">Catalogue Excursions</div>' +
                    '<div style="font-size:2rem;font-weight:800;color:var(--accent);">' + excursionsCount + '</div>' +
                '</div>' +
            '</div>' +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;">' +
                '<div style="background:var(--primary);color:white;border-radius:16px;padding:1.5rem;">' +
                    '<div style="font-size:0.8rem;opacity:0.7;text-transform:uppercase;margin-bottom:0.5rem;">Réservations</div>' +
                    '<div style="font-size:2rem;font-weight:800;">' + reservations.length + '</div>' +
                '</div>' +
                '<div style="background:var(--warning);color:white;border-radius:16px;padding:1.5rem;">' +
                    '<div style="font-size:0.8rem;opacity:0.8;text-transform:uppercase;margin-bottom:0.5rem;">En attente</div>' +
                    '<div style="font-size:2rem;font-weight:800;">' + reservations.filter(function(r){return r.status==='pending';}).length + '</div>' +
                '</div>' +
                '<div style="background:var(--success);color:white;border-radius:16px;padding:1.5rem;">' +
                    '<div style="font-size:0.8rem;opacity:0.8;text-transform:uppercase;margin-bottom:0.5rem;">Confirmées</div>' +
                    '<div style="font-size:2rem;font-weight:800;">' + reservations.filter(function(r){return r.status==='confirmed';}).length + '</div>' +
                '</div>' +
                '<div style="background:var(--danger);color:white;border-radius:16px;padding:1.5rem;">' +
                    '<div style="font-size:0.8rem;opacity:0.8;text-transform:uppercase;margin-bottom:0.5rem;">Annulées</div>' +
                    '<div style="font-size:2rem;font-weight:800;">' + reservations.filter(function(r){return r.status==='cancelled';}).length + '</div>' +
                '</div>' +
            '</div>';
    }

    /* --- Reservations Management --- */
    function renderAdminReservations() {
        var list = document.getElementById('admin-res-list');
        if (!list) return;
        var reservations = getReservationData();
        var statusFilter = document.getElementById('admin-status-filter');
        var typeFilter = document.getElementById('admin-type-filter');

        var filtered = reservations.filter(function(r) {
            if (statusFilter && statusFilter.value && r.status !== statusFilter.value) return false;
            if (typeFilter && typeFilter.value && r.type !== typeFilter.value) return false;
            return true;
        });

        if (filtered.length === 0) {
            list.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--gray-500);">' +
                '<i class="fas fa-calendar-times" style="font-size:48px;color:var(--gray-300);margin-bottom:1rem;display:block;"></i>' +
                '<h3 style="color:var(--gray-700);">Aucune réservation</h3></div>';
            return;
        }

        var statusClass = { pending: 'warning', confirmed: 'success', cancelled: 'danger' };
        var statusLabel = { pending: 'En attente', confirmed: 'Confirmée', cancelled: 'Annulée' };
        var typeIcon = { voiture: 'fa-car', moto: 'fa-motorcycle', maison: 'fa-home', excursion: 'fa-mountain', transfer: 'fa-van-shuttle', chauffeur: 'fa-car-side', pack: 'fa-gem' };

        list.innerHTML = filtered.map(function(r) {
            var days = calculateDays(r.startDate, r.endDate);
            var total = r.pricePerDay * days;
            return '<div class="product-card" style="margin-bottom:0.75rem;">' +
                '<div class="product-card-body" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;">' +
                    '<div style="width:50px;height:50px;border-radius:12px;background:var(--gray-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                        '<i class="fas ' + (typeIcon[r.type] || 'fa-box') + '" style="font-size:20px;color:var(--accent);"></i>' +
                    '</div>' +
                    '<div style="flex:1;min-width:200px;">' +
                        '<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">' +
                            '<strong style="font-size:0.9rem;">#' + r.id + '</strong>' +
                            '<span style="background:var(--' + (statusClass[r.status] || 'warning') + ');color:white;padding:2px 8px;border-radius:12px;font-size:0.7rem;font-weight:600;">' + (statusLabel[r.status] || 'En attente') + '</span>' +
                        '</div>' +
                        '<div style="font-size:0.8rem;color:var(--gray-600);">' + r.firstName + ' ' + r.lastName + ' &middot; ' + r.email + '</div>' +
                        '<div style="font-size:0.8rem;color:var(--gray-500);">' + r.productName + ' &middot; ' + new Date(r.startDate).toLocaleDateString('fr-FR') + ' - ' + new Date(r.endDate).toLocaleDateString('fr-FR') + ' (' + days + 'j)</div>' +
                    '</div>' +
                    '<div style="text-align:right;">' +
                        '<div style="font-weight:700;color:var(--accent);">' + formatPrice(total) + '</div>' +
                    '</div>' +
                    '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">' +
                        '<button class="btn btn-sm btn-outline-dark confirm-res" data-id="' + r.id + '" style="' + (r.status === 'confirmed' ? 'display:none;' : '') + '"><i class="fas fa-check"></i></button>' +
                        '<button class="btn btn-sm" data-id="' + r.id + '" style="background:rgba(239,68,68,0.1);color:var(--danger);border:none;" onclick="adminCancel(\'' + r.id + '\')"><i class="fas fa-times"></i></button>' +
                        '<a href="confirmation.html?id=' + r.id + '" class="btn btn-sm btn-outline-dark"><i class="fas fa-eye"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        // Confirm buttons
        list.querySelectorAll('.confirm-res').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var reservations = getReservationData();
                var res = reservations.find(function(r) { return r.id === btn.dataset.id; });
                if (res) {
                    res.status = 'confirmed';
                    saveReservationData(reservations);
                    VelaroCar.showToast('success', 'Confirmée', 'Réservation #' + btn.dataset.id + ' confirmée.');
                    renderAdminReservations();
                    updateDashCounts();
                }
            });
        });
    }

    window.adminCancel = function(id) {
        if (!confirm('Annuler cette réservation ?')) return;
        var reservations = getReservationData();
        var res = reservations.find(function(r) { return r.id === id; });
        if (res) {
            res.status = 'cancelled';
            saveReservationData(reservations);
            VelaroCar.showToast('info', 'Annulée', 'Réservation #' + id + ' annulée.');
            renderAdminReservations();
            updateDashCounts();
        }
    };

    /* --- Products Management --- */
    function renderAdminProducts() {
        var list = document.getElementById('admin-products-list');
        if (!list) return;
        var typeFilter = document.getElementById('admin-product-type');
        var type = typeFilter ? typeFilter.value : 'cars';

        var items = [];
        if (type === 'cars') items = CARS;
        else if (type === 'motos') items = MOTOS;
        else if (type === 'houses') items = HOUSES;
        else if (type === 'excursions') items = EXCURSIONS;
        else if (type === 'transfers') items = (typeof TRANSFERS !== 'undefined') ? TRANSFERS : [];

        list.innerHTML = items.map(function(item) {
            var price = item.pricePerDay || item.pricePerNight || item.price;
            return '<div style="display:flex;align-items:center;gap:1rem;padding:1rem;border-bottom:1px solid var(--gray-100);">' +
                '<img src="' + item.image + '" alt="' + item.name + '" style="width:60px;height:60px;border-radius:10px;object-fit:cover;flex-shrink:0;">' +
                '<div style="flex:1;">' +
                    '<strong style="font-size:0.9rem;">' + item.name + '</strong>' +
                    '<div style="font-size:0.8rem;color:var(--gray-500);">' + (item.brand || item.city || item.location || '') + '</div>' +
                '</div>' +
                '<div style="text-align:right;">' +
                    '<div style="font-weight:700;color:var(--accent);">' + formatPrice(price) + '</div>' +
                    '<div style="font-size:0.75rem;color:var(--gray-400);">' + (item.rating || 0) + ' <i class="fas fa-star" style="color:var(--gold);"></i></div>' +
                '</div>' +
            '</div>';
        }).join('');
    }

    /* --- Contacts --- */
    function renderContacts() {
        var list = document.getElementById('admin-contacts-list');
        if (!list) return;
        var contacts = JSON.parse(localStorage.getItem('velarocar_contacts') || '[]');

        if (contacts.length === 0) {
            list.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--gray-500);"><i class="fas fa-inbox" style="font-size:48px;color:var(--gray-300);margin-bottom:1rem;display:block;"></i><h3 style="color:var(--gray-700);">Aucun message</h3></div>';
            return;
        }

        list.innerHTML = contacts.slice().reverse().map(function(c) {
            return '<div style="padding:1rem;border-bottom:1px solid var(--gray-100);">' +
                '<div style="display:flex;justify-content:space-between;margin-bottom:0.25rem;">' +
                    '<strong style="font-size:0.9rem;">' + c.name + '</strong>' +
                    '<span style="font-size:0.75rem;color:var(--gray-400);">' + new Date(c.createdAt).toLocaleDateString('fr-FR') + '</span>' +
                '</div>' +
                '<div style="font-size:0.8rem;color:var(--gray-500);margin-bottom:0.25rem;">' + c.email + ' &middot; ' + c.phone + ' &middot; ' + c.subject + '</div>' +
                '<p style="font-size:0.85rem;color:var(--gray-600);line-height:1.5;">' + c.message + '</p>' +
            '</div>';
        }).join('');
    }

    /* --- Filters --- */
    var statusFilter = document.getElementById('admin-status-filter');
    var typeFilter = document.getElementById('admin-type-filter');
    var productTypeFilter = document.getElementById('admin-product-type');

    if (statusFilter) statusFilter.addEventListener('change', renderAdminReservations);
    if (typeFilter) typeFilter.addEventListener('change', renderAdminReservations);
    if (productTypeFilter) productTypeFilter.addEventListener('change', renderAdminProducts);

    /* --- Logout --- */
    var logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            isLoggedIn = false;
            loginPanel.style.display = 'block';
            dashPanel.style.display = 'none';
            VelaroCar.showToast('info', 'Déconnexion', 'Vous êtes déconnecté.');
        });
    }

})();
