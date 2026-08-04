/* ============================================
   VelaroCar - Excursions Page Logic
   ============================================ */

(function() {
    'use strict';

    var grid = document.getElementById('excursions-grid');
    var countEl = document.getElementById('excursions-count');
    var detailModal = document.getElementById('excursion-detail-modal');

    var allExcursions = EXCURSIONS.slice().sort(function(a, b) { return b.rating - a.rating; });

    function renderExcursions() {
        if (!grid) return;
        if (countEl) countEl.textContent = allExcursions.length;

        var favs = getFavorites();
        grid.innerHTML = allExcursions.map(function(exc) {
            var isFav = favs.indexOf(exc.id) > -1;
            return '<div class="product-card" data-id="' + exc.id + '">' +
                '<div class="product-card-image">' +
                    '<img src="' + exc.image + '" alt="' + exc.name + '" loading="lazy">' +
                    '<span class="product-card-badge">' + exc.city + '</span>' +
                    '<button class="product-card-fav ' + (isFav ? 'active' : '') + '" data-id="' + exc.id + '">' + (isFav ? '\u2764\uFE0F' : '\uD83E\uDD1D') + '</button>' +
                '</div>' +
                '<div class="product-card-body">' +
                    '<div class="product-card-location"><i class="fas fa-map-marker-alt"></i> ' + exc.city + '</div>' +
                    '<h3 class="product-card-title">' + exc.name + '</h3>' +
                    '<p style="font-size:0.85rem;color:var(--gray-500);margin-bottom:1rem;line-height:1.5;">' + exc.description.substring(0, 100) + '...</p>' +
                    '<div class="product-card-features">' +
                        '<span class="product-feature-tag"><i class="fas fa-clock"></i> ' + exc.duration + '</span>' +
                        '<span class="product-feature-tag"><i class="fas fa-signal"></i> ' + exc.difficulty + '</span>' +
                        '<span class="product-feature-tag"><i class="fas fa-users"></i> ' + exc.included.length + ' inclus</span>' +
                    '</div>' +
                    '<div class="product-card-footer">' +
                        '<div class="product-card-price">' + formatPrice(exc.price) + ' <span>/ pers.</span></div>' +
                        '<div style="display:flex;gap:0.5rem;">' +
                            '<button class="btn btn-outline-dark btn-sm detail-btn" data-id="' + exc.id + '"><i class="fas fa-eye"></i> D\u00e9tails</button>' +
                            '<button class="btn btn-primary btn-sm reserve-btn" data-id="' + exc.id + '"><i class="fas fa-calendar-check"></i> R\u00e9server</button>' +
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
                    b.innerHTML = isF ? '\u2764\uFE0F' : '\uD83E\uDD1D';
                });
            });
        });
    }

    function initDetailButtons() {
        document.querySelectorAll('.detail-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var exc = EXCURSIONS.find(function(x) { return x.id === btn.dataset.id; });
                if (exc) showExcursionDetail(exc);
            });
        });
    }

    function showExcursionDetail(exc) {
        if (!detailModal) return;
        detailModal.querySelector('.detail-name').textContent = exc.name;
        detailModal.querySelector('.detail-city').innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + exc.city;
        detailModal.querySelector('.detail-image').src = exc.image;
        detailModal.querySelector('.detail-image').alt = exc.name;
        detailModal.querySelector('.detail-price').textContent = formatPrice(exc.price) + ' / personne';
        detailModal.querySelector('.detail-description').textContent = exc.description;
        detailModal.querySelector('.detail-duration').innerHTML = '<i class="fas fa-clock"></i> ' + exc.duration;
        detailModal.querySelector('.detail-difficulty').innerHTML = '<i class="fas fa-signal"></i> ' + exc.difficulty;

        var body = detailModal.querySelector('.modal-body');
        var oldGallery = body.querySelector('.detail-gallery');
        if (oldGallery) oldGallery.remove();
        var imgs = exc.images && exc.images.length > 1 ? exc.images : null;
        if (imgs) {
            var gal = document.createElement('div');
            gal.className = 'detail-gallery';
            gal.style.cssText = 'display:flex;gap:0.5rem;overflow-x:auto;margin-bottom:1rem;padding-bottom:0.5rem;';
            imgs.forEach(function(src, i) {
                var thumb = document.createElement('img');
                thumb.src = src;
                thumb.alt = exc.name + ' ' + (i + 1);
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

        var programHtml = exc.program.map(function(p) {
            return '<div style="display:flex;gap:1rem;margin-bottom:0.75rem;">' +
                '<span style="font-weight:600;color:var(--accent);white-space:nowrap;min-width:60px;">' + p.time + '</span>' +
                '<span>' + p.activity + '</span></div>';
        }).join('');
        detailModal.querySelector('.detail-program').innerHTML = programHtml;

        detailModal.querySelector('.detail-included').innerHTML = exc.included.map(function(i) {
            return '<li style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;"><i class="fas fa-check-circle" style="color:var(--success);"></i> ' + i + '</li>';
        }).join('');
        detailModal.querySelector('.detail-not-included').innerHTML = exc.notIncluded.map(function(i) {
            return '<li style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;"><i class="fas fa-times-circle" style="color:var(--danger);"></i> ' + i + '</li>';
        }).join('');

        detailModal.querySelector('.detail-reserve-btn').dataset.id = exc.id;
        detailModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function initReserveButtons() {
        document.querySelectorAll('.reserve-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var exc = EXCURSIONS.find(function(x) { return x.id === btn.dataset.id; });
                if (exc) openReservationModal(exc);
            });
        });
        var detailReserve = detailModal ? detailModal.querySelector('.detail-reserve-btn') : null;
        if (detailReserve) {
            detailReserve.addEventListener('click', function() {
                detailModal.classList.remove('active');
                var exc = EXCURSIONS.find(function(x) { return x.id === this.dataset.id; });
                if (exc) openReservationModal(exc);
            });
        }
    }

    function openReservationModal(exc) {
        var modal = document.getElementById('reservation-modal');
        if (!modal) return;
        modal.querySelector('.modal-product-name').textContent = exc.name;
        modal.querySelector('.modal-product-image').src = exc.image;
        modal.querySelector('.modal-product-price').textContent = formatPrice(exc.price) + ' / personne';
        modal.querySelector('.modal-product-type').value = 'excursion';
        modal.querySelector('.modal-product-id').value = exc.id;
        modal.querySelector('.modal-product-name-input').value = exc.name;
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    renderExcursions();

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

            var exc = EXCURSIONS.find(function(x) { return x.id === data.productId; });
            var reservation = {
                id: generateId(),
                type: 'excursion',
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
                pricePerDay: exc ? exc.price : 0
            };

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
            VelaroCar.showToast('success', 'R\u00e9servation envoy\u00e9e !', 'Votre r\u00e9servation #' + reservation.id + ' a \u00e9t\u00e9 enregistr\u00e9e.');
            setTimeout(function() { window.location.href = 'confirmation.html?id=' + reservation.id; }, 1500);
        });
    }

})();
