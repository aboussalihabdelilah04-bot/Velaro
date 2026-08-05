/* ============================================
   VelaroCar - Client Dashboard Logic
   Espace personnel: réservations, profil, favoris
   ============================================ */

(function() {
    'use strict';

    var tabBtns = document.querySelectorAll('.dash-tab-btn');
    var tabPanels = document.querySelectorAll('.dash-tab-panel');
    var user = getUserData() || {};
    var currentPage = 'reservations';

    /* --- Tab Navigation --- */
    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var tab = this.dataset.tab;
            currentPage = tab;
            tabBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            tabPanels.forEach(function(p) { p.style.display = 'none'; });
            var panel = document.getElementById('tab-' + tab);
            if (panel) panel.style.display = 'block';
            if (tab === 'reservations') renderReservations();
            if (tab === 'favorites') renderFavorites();
            if (tab === 'profile') renderProfile();
        });
    });

    /* --- Reservations --- */
    function renderReservations() {
        var list = document.getElementById('reservations-list');
        if (!list) return;
        var reservations = getReservationData();

        if (reservations.length === 0) {
            list.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--gray-500);">' +
                '<i class="fas fa-calendar-times" style="font-size:48px;color:var(--gray-300);margin-bottom:1rem;display:block;"></i>' +
                '<h3 style="color:var(--gray-700);margin-bottom:0.5rem;">Aucune réservation</h3>' +
                '<p>Vous n\'avez pas encore de réservation.</p>' +
                '<a href="cars.html" class="btn btn-primary" style="margin-top:1rem;"><i class="fas fa-car"></i> Réserver maintenant</a>' +
            '</div>';
            return;
        }

        var statusClass = { pending: 'warning', confirmed: 'success', cancelled: 'danger' };
        var statusLabel = { pending: 'En attente', confirmed: 'Confirmée', cancelled: 'Annulée' };
        var typeIcon = { voiture: 'fa-car', moto: 'fa-motorcycle', maison: 'fa-home', excursion: 'fa-mountain', transfer: 'fa-van-shuttle', chauffeur: 'fa-car-side', pack: 'fa-gem' };
        var typeLabel = { voiture: 'Voiture', moto: 'Moto', maison: 'Maison', excursion: 'Excursion', transfer: 'Transfert', chauffeur: 'Chauffeur Privé', pack: 'Pack' };

        list.innerHTML = reservations.map(function(r) {
            var days = calculateDays(r.startDate, r.endDate);
            var grandTotal = r.pricePerDay * days;
            return '<div class="product-card" style="margin-bottom:1rem;">' +
                '<div class="product-card-body" style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;">' +
                    '<div style="width:60px;height:60px;border-radius:12px;background:var(--gray-100);display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
                        '<i class="fas ' + (typeIcon[r.type] || 'fa-box') + '" style="font-size:24px;color:var(--accent);"></i>' +
                    '</div>' +
                    '<div style="flex:1;min-width:150px;">' +
                        '<div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">' +
                            '<strong style="font-size:0.95rem;">' + r.productName + '</strong>' +
                            '<span style="background:var(--' + (statusClass[r.status] || 'warning') + ');color:white;padding:2px 10px;border-radius:20px;font-size:0.7rem;font-weight:600;">' + (statusLabel[r.status] || 'En attente') + '</span>' +
                        '</div>' +
                        '<div style="font-size:0.8rem;color:var(--gray-500);">' +
                            '<i class="fas ' + (typeIcon[r.type] || 'fa-box') + '"></i> ' + (typeLabel[r.type] || r.type) +
                            ' &middot; #' + r.id +
                        '</div>' +
                        '<div style="font-size:0.8rem;color:var(--gray-500);margin-top:0.25rem;">' +
                            '<i class="fas fa-calendar"></i> ' + new Date(r.startDate).toLocaleDateString('fr-FR') + ' - ' + new Date(r.endDate).toLocaleDateString('fr-FR') +
                            ' (' + days + ' jour(s))' +
                        '</div>' +
                    '</div>' +
                    '<div style="text-align:right;">' +
                        '<div style="font-size:1.1rem;font-weight:800;color:var(--accent);">' + formatPrice(grandTotal) + '</div>' +
                        '<div style="font-size:0.75rem;color:var(--gray-400);">Prix total</div>' +
                    '</div>' +
                    '<div style="display:flex;gap:0.5rem;">' +
                        '<a href="confirmation.html?id=' + r.id + '" class="btn btn-outline-dark btn-sm"><i class="fas fa-eye"></i></a>' +
                        '<button class="btn btn-sm btn-outline-dark cancel-res-btn" data-id="' + r.id + '" style="' + (r.status === 'cancelled' ? 'display:none;' : '') + '"><i class="fas fa-times"></i></button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        // Cancel buttons
        list.querySelectorAll('.cancel-res-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (!confirm('Voulez-vous vraiment annuler cette réservation ?')) return;
                var reservations = getReservationData();
                var res = reservations.find(function(r) { return r.id === btn.dataset.id; });
                if (res) {
                    res.status = 'cancelled';
                    saveReservationData(reservations);
                    VelaroCar.showToast('info', 'Réservation annulée', 'Votre réservation #' + btn.dataset.id + ' a été annulée.');
                    renderReservations();
                }
            });
        });
    }

    /* --- Favorites --- */
    function renderFavorites() {
        var list = document.getElementById('favorites-list');
        if (!list) return;
        var favs = getFavorites();

        if (favs.length === 0) {
            list.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--gray-500);">' +
                '<i class="fas fa-heart-broken" style="font-size:48px;color:var(--gray-300);margin-bottom:1rem;display:block;"></i>' +
                '<h3 style="color:var(--gray-700);margin-bottom:0.5rem;">Aucun favori</h3>' +
                '<p>Ajoutez des produits à vos favoris pour les retrouver ici.</p>' +
            '</div>';
            return;
        }

        var allItems = [];
        CARS.forEach(function(c) { if (favs.indexOf(c.id) > -1) allItems.push({ item: c, type: 'voiture', page: 'cars.html' }); });
        MOTOS.forEach(function(m) { if (favs.indexOf(m.id) > -1) allItems.push({ item: m, type: 'moto', page: 'motos.html' }); });
        HOUSES.forEach(function(h) { if (favs.indexOf(h.id) > -1) allItems.push({ item: h, type: 'maison', page: 'houses.html' }); });
        EXCURSIONS.forEach(function(e) { if (favs.indexOf(e.id) > -1) allItems.push({ item: e, type: 'excursion', page: 'excursions.html' }); });
        if (typeof TRANSFERS !== 'undefined') {
            TRANSFERS.forEach(function(t) { if (favs.indexOf(t.id) > -1) allItems.push({ item: t, type: 'transfer', page: 'excursions.html' }); });
        }

        var typeIcon = { voiture: 'fa-car', moto: 'fa-motorcycle', maison: 'fa-home', excursion: 'fa-mountain', transfer: 'fa-van-shuttle', chauffeur: 'fa-car-side', pack: 'fa-gem' };
        var typeLabel = { voiture: 'Voiture', moto: 'Moto', maison: 'Maison', excursion: 'Excursion', transfer: 'Transfert', chauffeur: 'Chauffeur Privé', pack: 'Pack' };

        list.innerHTML = allItems.map(function(entry) {
            var price = entry.item.pricePerDay || entry.item.pricePerNight || entry.item.price;
            var priceLabel = entry.type === 'maison' ? '/ nuit' : (entry.type === 'excursion' ? '/ pers.' : (entry.type === 'transfer' ? '/ transfert' : (entry.type === 'chauffeur' ? '/ forfait' : (entry.type === 'pack' ? '/ pack' : '/ jour'))));
            return '<div class="product-card" style="margin-bottom:1rem;">' +
                '<div class="product-card-body" style="display:flex;gap:1rem;align-items:center;">' +
                    '<img src="' + entry.item.image + '" alt="' + entry.item.name + '" style="width:70px;height:70px;border-radius:12px;object-fit:cover;flex-shrink:0;">' +
                    '<div style="flex:1;min-width:150px;">' +
                        '<div style="font-size:0.75rem;color:var(--gray-500);"><i class="fas ' + typeIcon[entry.type] + '"></i> ' + (typeLabel[entry.type] || entry.type) + '</div>' +
                        '<strong style="font-size:0.95rem;">' + entry.item.name + '</strong>' +
                    '</div>' +
                    '<div style="text-align:right;">' +
                        '<div style="font-weight:800;color:var(--accent);">' + formatPrice(price) + ' <span style="font-size:0.75rem;font-weight:400;color:var(--gray-500);">' + priceLabel + '</span></div>' +
                    '</div>' +
                    '<div style="display:flex;gap:0.5rem;">' +
                        '<a href="' + entry.page + '" class="btn btn-outline-dark btn-sm"><i class="fas fa-eye"></i></a>' +
                        '<button class="btn btn-sm remove-fav-btn" data-id="' + entry.item.id + '" style="background:rgba(239,68,68,0.1);color:var(--danger);border:none;"><i class="fas fa-trash"></i></button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        list.querySelectorAll('.remove-fav-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = this.dataset.id;
                var favs = getFavorites();
                var idx = favs.indexOf(id);
                if (idx > -1) favs.splice(idx, 1);
                saveFavorites(favs);
                document.querySelectorAll('.fav-count').forEach(function(el) {
                    el.textContent = favs.length;
                    el.style.display = favs.length > 0 ? 'flex' : 'none';
                });
                VelaroCar.showToast('info', 'Retiré des favoris', 'Le produit a été retiré de vos favoris.');
                renderFavorites();
            });
        });
    }

    /* --- Profile --- */
    function renderProfile() {
        var nameInput = document.getElementById('profile-name');
        var emailInput = document.getElementById('profile-email');
        var phoneInput = document.getElementById('profile-phone');
        var addrInput = document.getElementById('profile-address');

        if (nameInput && user.name) nameInput.value = user.name;
        if (emailInput && user.email) emailInput.value = user.email;
        if (phoneInput && user.phone) phoneInput.value = user.phone;
        if (addrInput && user.address) addrInput.value = user.address;

        var statsEl = document.getElementById('profile-stats');
        if (statsEl) {
            var reservations = getReservationData();
            var favs = getFavorites();
            statsEl.innerHTML =
                '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">' +
                    '<div style="text-align:center;padding:1rem;background:var(--gray-50);border-radius:12px;">' +
                        '<div style="font-size:1.5rem;font-weight:800;color:var(--accent);">' + reservations.length + '</div>' +
                        '<div style="font-size:0.8rem;color:var(--gray-500);">Réservations</div>' +
                    '</div>' +
                    '<div style="text-align:center;padding:1rem;background:var(--gray-50);border-radius:12px;">' +
                        '<div style="font-size:1.5rem;font-weight:800;color:var(--danger);">' + favs.length + '</div>' +
                        '<div style="font-size:0.8rem;color:var(--gray-500);">Favoris</div>' +
                    '</div>' +
                    '<div style="text-align:center;padding:1rem;background:var(--gray-50);border-radius:12px;">' +
                        '<div style="font-size:1.5rem;font-weight:800;color:var(--success);">' + reservations.filter(function(r) { return r.status === 'confirmed'; }).length + '</div>' +
                        '<div style="font-size:0.8rem;color:var(--gray-500);">Confirmées</div>' +
                    '</div>' +
                '</div>';
        }
    }

    /* --- Profile form --- */
    var profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var fd = new FormData(profileForm);
            var data = {};
            fd.forEach(function(v, k) { data[k] = v; });
            data.reservations = user.reservations || [];
            saveUserData(data);
            VelaroCar.showToast('success', 'Profil mis à jour', 'Vos informations ont été sauvegardées.');
        });
    }

    /* --- Clear profile --- */
    var clearBtn = document.getElementById('clear-profile-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (!confirm('Voulez-vous vraiment supprimer votre profil et toutes vos données ?')) return;
            localStorage.removeItem('velarocar_user');
            localStorage.removeItem('velarocar_reservations');
            localStorage.removeItem('velarocar_favorites');
            VelaroCar.showToast('info', 'Données supprimées', 'Votre profil a été supprimé.');
            setTimeout(function() { window.location.reload(); }, 1000);
        });
    }

    /* --- Init default tab --- */
    renderReservations();

})();
