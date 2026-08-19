/* ============================================
   VelaroCar - Houses Page Logic
   ============================================ */

(function() {
    'use strict';

    if (typeof formatPrice !== 'function') return;

    var grid = document.getElementById('houses-grid');
    var countEl = document.getElementById('houses-count');
    var detailModal = document.getElementById('house-detail-modal');
    var allHouses = [];

    function renderHouses() {
        if (!grid) return;
        if (countEl) countEl.textContent = allHouses.length;

        var favs = getFavorites();
        grid.innerHTML = allHouses.map(function(h, index) {
            var isFav = favs.indexOf(h.id) > -1;
            var imgAttrs = index < 3 ? 'loading="eager" decoding="async" fetchpriority="high"' : 'loading="lazy" decoding="async"';
            return '<div class="product-card" data-id="' + h.id + '">' +
                '<div class="product-card-image">' +
                    '<img src="' + h.image + '" alt="' + h.name + '" title="' + h.name + ' - location villa ou appartement Marrakech" width="800" height="533" ' + imgAttrs + '>' +
                    '<span class="product-card-badge">' + h.location + '</span>' +
                    '<button class="product-card-fav ' + (isFav ? 'active' : '') + '" data-id="' + h.id + '">' + (isFav ? '❤️' : '🤍') + '</button>' +
                '</div>' +
                '<div class="product-card-body">' +
                    '<div class="product-card-location"><i class="fas fa-map-marker-alt"></i> ' + h.location + '</div>' +
                    '<h3 class="product-card-title">' + h.name + '</h3>' +
                    '<p style="font-size:0.85rem;color:var(--gray-500);margin-bottom:1rem;line-height:1.5;">' + h.description.substring(0, 100) + '...</p>' +
                    '<div class="product-card-features">' +
                        '<span class="product-feature-tag"><i class="fas fa-bed"></i> ' + h.bedrooms + ' ch.</span>' +
                        '<span class="product-feature-tag"><i class="fas fa-bath"></i> ' + h.bathrooms + ' sdb</span>' +
                        '<span class="product-feature-tag"><i class="fas fa-user-friends"></i> ' + h.maxGuests + ' pers.</span>' +
                        (h.pool ? '<span class="product-feature-tag"><i class="fas fa-swimming-pool"></i> Piscine</span>' : '') +
                        (h.wifi ? '<span class="product-feature-tag"><i class="fas fa-wifi"></i> WiFi</span>' : '') +
                        (h.ac ? '<span class="product-feature-tag"><i class="fas fa-snowflake"></i> Clim</span>' : '') +
                        (h.parking ? '<span class="product-feature-tag"><i class="fas fa-parking"></i> Parking</span>' : '') +
                        (h.tv ? '<span class="product-feature-tag"><i class="fas fa-tv"></i> TV</span>' : '') +
                        (h.elevator ? '<span class="product-feature-tag"><i class="fas fa-elevator"></i> Ascenseur</span>' : '') +
                        (h.terrace ? '<span class="product-feature-tag"><i class="fas fa-cloud-sun"></i> Terrasse</span>' : '') +
                        (h.kitchen ? '<span class="product-feature-tag"><i class="fas fa-utensils"></i> Cuisine</span>' : '') +
                        (h.garden ? '<span class="product-feature-tag"><i class="fas fa-tree"></i> Jardin</span>' : '') +
                    '</div>' +
                    '<div class="product-card-footer">' +
                        '<div class="product-card-price">' + formatPrice(h.pricePerNight) + ' <span>/ nuit</span></div>' +
                        '<div style="display:flex;gap:0.5rem;">' +
                            '<button class="btn btn-outline-dark btn-sm detail-btn" data-id="' + h.id + '"><i class="fas fa-eye"></i> Détails</button>' +
                            '<button class="btn btn-primary btn-sm reserve-btn" data-id="' + h.id + '"><i class="fas fa-calendar-check"></i> Réserver</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        initFavButtons();
        initDetailButtons();
        initReserveButtons();
    }

    function initFavButtons() {
        document.querySelectorAll('.product-card-fav').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var id = this.dataset.id;
                var favs = getFavorites();
                var idx = favs.indexOf(id);
                if (idx > -1) favs.splice(idx, 1); else favs.push(id);
                saveFavorites(favs);
                document.querySelectorAll('.fav-count').forEach(function(el) {
                    el.textContent = favs.length;
                    el.style.display = favs.length > 0 ? 'flex' : 'none';
                });
                document.querySelectorAll('.product-card-fav[data-id="' + id + '"]').forEach(function(b) {
                    var isF = favs.indexOf(id) > -1;
                    b.classList.toggle('active', isF);
                    b.innerHTML = isF ? '❤️' : '🤍';
                });
            });
        });
    }

    function initDetailButtons() {
        document.querySelectorAll('.detail-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var house = allHouses.find(function(h) { return h.id === btn.dataset.id; });
                if (house) showHouseDetail(house);
            });
        });
    }

    function showHouseDetail(house) {
        if (!detailModal) return;
        detailModal.querySelector('.detail-name').textContent = house.name;
        detailModal.querySelector('.detail-location').innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + house.location;
        detailModal.querySelector('.detail-image').src = house.image;
        detailModal.querySelector('.detail-image').alt = house.name;
        detailModal.querySelector('.detail-image').title = house.name + ' - location villa Marrakech';
        detailModal.querySelector('.detail-price').textContent = formatPrice(house.pricePerNight) + ' / nuit';
        detailModal.querySelector('.detail-description').textContent = house.description;

        var body = detailModal.querySelector('.modal-body');
        var oldGallery = body.querySelector('.detail-gallery');
        if (oldGallery) oldGallery.remove();
        var imgs = house.images && house.images.length > 1 ? house.images : null;
        if (imgs) {
            var gal = document.createElement('div');
            gal.className = 'detail-gallery';
            gal.style.cssText = 'display:flex;gap:0.5rem;overflow-x:auto;margin-bottom:1rem;padding-bottom:0.5rem;';
            imgs.forEach(function(src, i) {
                var thumb = document.createElement('img');
                thumb.src = src;
                thumb.alt = house.name + ' ' + (i + 1);
                thumb.style.cssText = 'width:80px;height:60px;object-fit:cover;border-radius:8px;cursor:pointer;flex-shrink:0;opacity:' + (i === 0 ? '1' : '0.6') + ';border:2px solid ' + (i === 0 ? 'var(--accent)' : 'transparent') + ';transition:all 0.2s;';
                thumb.addEventListener('click', function() {
                    detailModal.querySelector('.detail-image').src = src;
                    gal.querySelectorAll('img').forEach(function(t) { t.style.opacity = '0.5'; t.style.borderColor = 'transparent'; });
                    thumb.style.opacity = '1';
                    thumb.style.borderColor = 'var(--accent)';
                });
                gal.appendChild(thumb);
            });
            body.insertBefore(gal, body.querySelector('.detail-location'));
        }

        var featuresHtml = '';
        if (house.features && house.features.length) {
            var iconMap = {
                'ascenseur': 'fa-elevator', 'elevator': 'fa-elevator',
                'chambre': 'fa-bed', 'chambres': 'fa-bed',
                'salon': 'fa-couch', 'moderne': 'fa-star',
                'marocain': 'fa-moon', 'terrasse': 'fa-cloud-sun',
                'piscine': 'fa-swimming-pool', 'vue': 'fa-eye',
                'climatisation': 'fa-snowflake', 'clim': 'fa-snowflake',
                'wi-fi': 'fa-wifi', 'wifi': 'fa-wifi',
                'parking': 'fa-parking', 'parking privé': 'fa-parking',
                'cuisine': 'fa-utensils', 'équipée': 'fa-utensils',
                'jardin': 'fa-tree', 'luxe': 'fa-gem',
                'télévision': 'fa-tv', 'tv': 'fa-tv'
            };
            house.features.forEach(function(f) {
                var icon = 'fa-check-circle';
                var fl = f.toLowerCase();
                for (var key in iconMap) {
                    if (fl.indexOf(key) !== -1) { icon = iconMap[key]; break; }
                }
                featuresHtml += '<span class="product-feature-tag"><i class="fas ' + icon + '"></i> ' + f + '</span>';
            });
        } else {
            if (house.pool) featuresHtml += '<span class="product-feature-tag"><i class="fas fa-swimming-pool"></i> Piscine</span>';
            if (house.wifi) featuresHtml += '<span class="product-feature-tag"><i class="fas fa-wifi"></i> WiFi</span>';
            if (house.ac) featuresHtml += '<span class="product-feature-tag"><i class="fas fa-snowflake"></i> Climatisation</span>';
            if (house.kitchen) featuresHtml += '<span class="product-feature-tag"><i class="fas fa-utensils"></i> Cuisine</span>';
            if (house.garden) featuresHtml += '<span class="product-feature-tag"><i class="fas fa-tree"></i> Jardin</span>';
            if (house.parking) featuresHtml += '<span class="product-feature-tag"><i class="fas fa-parking"></i> Parking</span>';
            if (house.tv) featuresHtml += '<span class="product-feature-tag"><i class="fas fa-tv"></i> Télévision</span>';
            if (house.elevator) featuresHtml += '<span class="product-feature-tag"><i class="fas fa-elevator"></i> Ascenseur</span>';
            if (house.terrace) featuresHtml += '<span class="product-feature-tag"><i class="fas fa-cloud-sun"></i> Terrasse</span>';
        }
        detailModal.querySelector('.detail-features').innerHTML = featuresHtml;

        detailModal.querySelector('.detail-specs').innerHTML =
            '<div style="display:flex;gap:2rem;flex-wrap:wrap;margin-top:1rem;">' +
                '<div><strong style="font-size:1.5rem;color:var(--accent);">' + house.bedrooms + '</strong><br><span style="font-size:0.85rem;color:var(--gray-500);">Chambres</span></div>' +
                '<div><strong style="font-size:1.5rem;color:var(--accent);">' + house.bathrooms + '</strong><br><span style="font-size:0.85rem;color:var(--gray-500);">Salle de bain</span></div>' +
                '<div><strong style="font-size:1.5rem;color:var(--accent);">' + house.maxGuests + '</strong><br><span style="font-size:0.85rem;color:var(--gray-500);">Voyageurs</span></div>' +
                (house.floors ? '<div><strong style="font-size:1.5rem;color:var(--accent);">' + house.floors + '</strong><br><span style="font-size:0.85rem;color:var(--gray-500);">Étage(s)</span></div>' : '') +
            '</div>';

        detailModal.querySelector('.detail-reserve-btn').dataset.id = house.id;
        detailModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function initReserveButtons() {
        document.querySelectorAll('.reserve-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var house = allHouses.find(function(h) { return h.id === btn.dataset.id; });
                if (house) openReservationModal(house);
            });
        });

        var detailReserve = detailModal ? detailModal.querySelector('.detail-reserve-btn') : null;
        if (detailReserve && !detailReserve.__bound) {
            detailReserve.__bound = true;
            detailReserve.addEventListener('click', function() {
                detailModal.classList.remove('active');
                var house = allHouses.find(function(h) { return h.id === this.dataset.id; });
                if (house) openReservationModal(house);
            });
        }
    }

    function openReservationModal(house) {
        var modal = document.getElementById('reservation-modal');
        if (!modal) return;
        modal.querySelector('.modal-product-name').textContent = house.name;
        modal.querySelector('.modal-product-image').src = house.image;
        modal.querySelector('.modal-product-image').alt = house.name;
        modal.querySelector('.modal-product-image').title = house.name;
        modal.querySelector('.modal-product-price').textContent = formatPrice(house.pricePerNight) + ' / nuit';
        modal.querySelector('.modal-product-type').value = 'maison';
        modal.querySelector('.modal-product-id').value = house.id;
        modal.querySelector('.modal-product-name-input').value = house.name;
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    [detailModal, document.getElementById('reservation-modal')].forEach(function(modal) {
        if (modal) {
            var closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) closeBtn.addEventListener('click', function() { modal.classList.remove('active'); document.body.classList.remove('no-scroll'); });
            modal.addEventListener('click', function(e) { if (e.target === modal) { modal.classList.remove('active'); document.body.classList.remove('no-scroll'); } });
        }
    });

    var resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var fd = new FormData(resForm);
            var data = {};
            fd.forEach(function(v, k) { data[k] = v; });

            if (!data.firstName || !data.lastName || !data.phone || !data.email || !data.startDate || !data.endDate) {
                VelaroCar.showToast('error', 'Erreur', 'Veuillez remplir tous les champs obligatoires.');
                return;
            }

            var house = allHouses.find(function(h) { return h.id === data.productId; });
            var reservation = {
                id: generateId(),
                type: 'maison',
                productId: data.productId,
                productName: data.productName,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
                startDate: data.startDate,
                endDate: data.endDate,
                message: data.message || '',
                status: 'pending',
                createdAt: new Date().toISOString(),
                pricePerDay: house ? house.pricePerNight : 0
            };

            var reservations = getReservationData();
            reservations.push(reservation);
            saveReservationData(reservations);

            var userData = getUserData() || { reservations: [] };
            if (!userData.reservations) userData.reservations = [];
            userData.reservations.push(reservation);
            saveUserData(userData);

            VelaroCarEmail.sendReservation(reservation, function() {}, function() {});

            submitBooking(reservation, function(serverBooking) {
                var displayId = serverBooking.id || serverBooking._id || reservation.id;
                document.getElementById('reservation-modal').classList.remove('active');
                document.body.classList.remove('no-scroll');
                VelaroCar.showToast('success', 'Réservation envoyée !', 'Votre réservation #' + displayId + ' a été enregistrée.');
                setTimeout(function() { window.location.href = 'confirmation.html?id=' + displayId; }, 1500);
            }, function() {
                document.getElementById('reservation-modal').classList.remove('active');
                document.body.classList.remove('no-scroll');
                VelaroCar.showToast('success', 'Réservation envoyée !', 'Votre réservation #' + reservation.id + ' a été enregistrée.');
                setTimeout(function() { window.location.href = 'confirmation.html?id=' + reservation.id; }, 1500);
            });
        });
    }

    function loadFromAPI() {
        if (!grid) return;
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;"><i class="fas fa-spinner fa-spin" style="font-size:1.5rem;color:var(--accent);"></i><p style="margin-top:0.5rem;color:var(--gray-500);">Chargement des hébergements...</p></div>';

        VelaroAPI.getVillas()
            .then(function(houses) {
                allHouses = houses.sort(function(a, b) { return b.rating - a.rating; });
                renderHouses();
            })
            .catch(function() {
                grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--danger);"><i class="fas fa-exclamation-triangle"></i> Erreur de chargement des hébergements.</div>';
            });
    }

    loadFromAPI();
})();
