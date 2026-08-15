/* ============================================
   VelaroCar - Cars Page Logic
   ============================================ */

(function() {
    'use strict';

    /* --- If data.js failed to load, skip rendering instead of throwing --- */
    if (typeof CARS === 'undefined' || typeof formatPrice !== 'function') {
        return;
    }

    var grid = document.getElementById('cars-grid');
    var countEl = document.getElementById('cars-count');
    var detailModal = document.getElementById('car-detail-modal');

    var allCars = CARS.slice().sort(function(a, b) { return b.rating - a.rating; });

    var detailImage = detailModal ? detailModal.querySelector('.detail-image') : null;
    var resImage = document.getElementById('reservation-modal');
    resImage = resImage ? resImage.querySelector('.modal-product-image') : null;
    if (detailImage) detailImage.decoding = 'async';
    if (resImage) resImage.decoding = 'async';

    function renderCars() {
        if (!grid) return;
        if (countEl) countEl.textContent = allCars.length;

        var favs = getFavorites();
        grid.innerHTML = allCars.map(function(car, index) {
            var isFav = favs.indexOf(car.id) > -1;
            var imgAttrs = 'loading="lazy" decoding="async"' + (index < 3 ? ' fetchpriority="high"' : '');
            return '<div class="product-card" data-id="' + car.id + '">' +
                '<div class="product-card-image">' +
                    '<img src="' + car.image + '" alt="' + car.name + ' - ' + car.brand + '" title="' + car.name + ' - location de voiture Marrakech" width="800" height="533" ' + imgAttrs + '>' +
                    '<span class="product-card-badge">' + car.category + '</span>' +
                    '<button class="product-card-fav ' + (isFav ? 'active' : '') + '" data-id="' + car.id + '">' + (isFav ? '❤️' : '🤍') + '</button>' +
                '</div>' +
                '<div class="product-card-body">' +
                    '<div class="product-card-location"><i class="fas fa-map-marker-alt"></i> Marrakech</div>' +
                    '<h3 class="product-card-title">' + car.name + '</h3>' +
                    '<div class="product-card-features">' +
                        '<span class="product-feature-tag"><i class="fas fa-calendar"></i> ' + car.year + '</span>' +
                        '<span class="product-feature-tag"><i class="fas fa-gas-pump"></i> ' + car.fuel + '</span>' +
                        '<span class="product-feature-tag"><i class="fas fa-cogs"></i> ' + car.transmission + '</span>' +
                        '<span class="product-feature-tag"><i class="fas fa-users"></i> ' + car.seats + ' places</span>' +
                    '</div>' +
                    '<div class="product-card-footer">' +
                        '<div class="product-card-price">' + formatPrice(car.pricePerDay) + ' <span>/ jour</span></div>' +
                        '<div style="display:flex;gap:0.5rem;">' +
                            '<button class="btn btn-outline-dark btn-sm detail-btn" data-id="' + car.id + '"><i class="fas fa-eye"></i> Détails</button>' +
                            '<button class="btn btn-primary btn-sm reserve-btn" data-id="' + car.id + '" data-type="car"><i class="fas fa-calendar-check"></i> Réserver</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        initGridEvents();
        initModalReserveButton();
    }

    function initGridEvents() {
        if (!grid || grid.__gridEventsBound) return;
        grid.__gridEventsBound = true;
        grid.addEventListener('click', function(e) {
            var target = e.target;
            if (!target || !target.closest) return;
            var favBtn = target.closest('.product-card-fav');
            if (favBtn) {
                e.preventDefault();
                e.stopPropagation();
                var id = favBtn.dataset.id;
                var favs = getFavorites();
                var idx = favs.indexOf(id);
                if (idx > -1) favs.splice(idx, 1); else favs.push(id);
                saveFavorites(favs);
                document.querySelectorAll('.fav-count').forEach(function(el) {
                    el.textContent = favs.length;
                    el.style.display = favs.length > 0 ? 'flex' : 'none';
                });
                document.querySelectorAll('.product-card-fav[data-id="' + id + '"]').forEach(function(b) {
                    var isFav = favs.indexOf(id) > -1;
                    b.classList.toggle('active', isFav);
                    b.innerHTML = isFav ? '❤️' : '🤍';
                });
                return;
            }
            var detailBtn = target.closest('.detail-btn');
            if (detailBtn) {
                e.preventDefault();
                var car = CARS.find(function(c) { return c.id === detailBtn.dataset.id; });
                if (car) showCarDetail(car);
                return;
            }
            var reserveBtn = target.closest('.reserve-btn');
            if (reserveBtn) {
                e.preventDefault();
                var item = CARS.find(function(c) { return c.id === reserveBtn.dataset.id; });
                if (item) openReservationModal(item, 'voiture');
            }
        });
    }

    function initModalReserveButton() {
        var detailReserve = detailModal ? detailModal.querySelector('.detail-reserve-btn') : null;
        if (detailReserve && !detailReserve.__reserveBound) {
            detailReserve.__reserveBound = true;
            detailReserve.addEventListener('click', function() {
                detailModal.classList.remove('active');
                var car = CARS.find(function(c) { return c.id === this.dataset.id; });
                if (car) openReservationModal(car, 'voiture');
            });
        }
    }

    function showCarDetail(car) {
        if (!detailModal) return;
        detailModal.querySelector('.detail-name').textContent = car.name;
        detailModal.querySelector('.detail-location').innerHTML = '<i class="fas fa-map-marker-alt"></i> Marrakech';
        detailModal.querySelector('.detail-category').textContent = car.category;
        detailModal.querySelector('.detail-image').src = car.image;
        detailModal.querySelector('.detail-image').alt = car.name;
        detailModal.querySelector('.detail-image').title = car.name + ' - location de voiture Marrakech';
        detailModal.querySelector('.detail-price').textContent = formatPrice(car.pricePerDay) + ' / jour';

        var featuresHtml = '';
        var specItems = [
            { icon: 'fa-calendar', text: car.year },
            { icon: 'fa-gas-pump', text: car.fuel },
            { icon: 'fa-cogs', text: car.transmission },
            { icon: 'fa-users', text: car.seats + ' places' }
        ];
        specItems.forEach(function(s) {
            featuresHtml += '<span class="product-feature-tag"><i class="fas ' + s.icon + '"></i> ' + s.text + '</span>';
        });
        detailModal.querySelector('.detail-features').innerHTML = featuresHtml;

        var equipHtml = '';
        if (car.features && car.features.length) {
            car.features.forEach(function(f) {
                equipHtml += '<span class="product-feature-tag"><i class="fas fa-check-circle"></i> ' + f + '</span>';
            });
        }
        detailModal.querySelector('.detail-equipment').innerHTML = equipHtml;

        var body = detailModal.querySelector('.modal-body');
        var oldGallery = body.querySelector('.detail-gallery');
        if (oldGallery) oldGallery.remove();
        var imgs = car.images && car.images.length > 1 ? car.images : null;
        if (imgs) {
            var gal = document.createElement('div');
            gal.className = 'detail-gallery';
            gal.style.cssText = 'display:flex;gap:0.5rem;overflow-x:auto;margin-bottom:1rem;padding-bottom:0.5rem;';
            imgs.forEach(function(src, i) {
                var thumb = document.createElement('img');
                thumb.src = src;
                thumb.alt = car.name + ' ' + (i + 1);
                thumb.style.cssText = 'width:80px;height:60px;object-fit:cover;border-radius:8px;cursor:pointer;flex-shrink:0;opacity:' + (i === 0 ? '1' : '0.6') + ';border:2px solid ' + (i === 0 ? 'var(--accent)' : 'transparent') + ';transition:all 0.2s;';
                thumb.addEventListener('click', function() {
                    detailModal.querySelector('.detail-image').src = src;
                    gal.querySelectorAll('img').forEach(function(t) { t.style.opacity = '0.5'; t.style.borderColor = 'transparent'; });
                    thumb.style.opacity = '1';
                    thumb.style.borderColor = 'var(--accent)';
                });
                gal.appendChild(thumb);
            });
            var locEl = body.querySelector('.detail-location');
            body.insertBefore(gal, locEl ? locEl.parentNode : body.firstChild);
        }

        detailModal.querySelector('.detail-reserve-btn').dataset.id = car.id;
        detailModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function openReservationModal(item, type) {
        var modal = document.getElementById('reservation-modal');
        if (!modal) return;
        modal.querySelector('.modal-product-name').textContent = item.name;
        modal.querySelector('.modal-product-image').src = item.image;
        modal.querySelector('.modal-product-image').alt = item.name;
        modal.querySelector('.modal-product-image').title = item.name;
        modal.querySelector('.modal-product-price').textContent = formatPrice(type === 'voiture' || type === 'moto' ? item.pricePerDay : item.pricePerNight || item.price);
        modal.querySelector('.modal-product-type').value = type;
        modal.querySelector('.modal-product-id').value = item.id;
        modal.querySelector('.modal-product-name-input').value = item.name;
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    renderCars();

    [detailModal, document.getElementById('reservation-modal')].forEach(function(m) {
        if (m) {
            var closeBtn = m.querySelector('.modal-close');
            if (closeBtn) closeBtn.addEventListener('click', function() { m.classList.remove('active'); document.body.classList.remove('no-scroll'); });
            m.addEventListener('click', function(e) { if (e.target === m) { m.classList.remove('active'); document.body.classList.remove('no-scroll'); } });
        }
    });

    var resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var formData = new FormData(resForm);
            var data = {};
            formData.forEach(function(val, key) { data[key] = val; });

            if (!data.firstName || !data.lastName || !data.phone || !data.email || !data.startDate || !data.endDate) {
                VelaroCar.showToast('error', 'Erreur', 'Veuillez remplir tous les champs obligatoires.');
                return;
            }

            var reservation = {
                id: generateId(),
                type: data.productType,
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
                pricePerDay: 0
            };

            if (data.productType === 'voiture') {
                var car = CARS.find(function(c) { return c.id === data.productId; });
                if (car) reservation.pricePerDay = car.pricePerDay;
            } else if (data.productType === 'moto') {
                var moto = MOTOS.find(function(m) { return m.id === data.productId; });
                if (moto) reservation.pricePerDay = moto.pricePerDay;
            } else if (data.productType === 'maison') {
                var house = HOUSES.find(function(h) { return h.id === data.productId; });
                if (house) reservation.pricePerDay = house.pricePerNight;
            } else if (data.productType === 'excursion') {
                var exc = EXCURSIONS.find(function(e) { return e.id === data.productId; });
                if (exc) reservation.pricePerDay = exc.price;
            }

            var reservations = getReservationData();
            reservations.push(reservation);
            saveReservationData(reservations);

            var userData = getUserData() || { reservations: [] };
            if (!userData.reservations) userData.reservations = [];
            userData.reservations.push(reservation);
            saveUserData(userData);

            VelaroCarEmail.sendReservation(reservation, function() {}, function() {});

            document.getElementById('reservation-modal').classList.remove('active');
            document.body.classList.remove('no-scroll');

            VelaroCar.showToast('success', 'Réservation envoyée !', 'Votre réservation #' + reservation.id + ' a été enregistrée.');

            setTimeout(function() {
                window.location.href = 'confirmation.html?id=' + reservation.id;
            }, 1500);
        });
    }

})();
