/* ============================================
   VelaroCar - Motos Page Logic
   ============================================ */

(function() {
    'use strict';

    if (typeof formatPrice !== 'function') return;

    var grid = document.getElementById('motos-grid');
    var countEl = document.getElementById('motos-count');
    var detailModal = document.getElementById('moto-detail-modal');
    var allMotos = [];

    function renderMotos() {
        if (!grid) return;
        if (countEl) countEl.textContent = allMotos.length;

        var favs = getFavorites();
        grid.innerHTML = allMotos.map(function(m, index) {
            var isFav = favs.indexOf(m.id) > -1;
            var imgAttrs = index < 3 ? 'loading="eager" decoding="async" fetchpriority="high"' : 'loading="lazy" decoding="async"';
            return '<div class="product-card" data-id="' + m.id + '">' +
                '<div class="product-card-image">' +
                    '<img src="' + m.image + '" alt="' + m.name + '" title="' + m.name + ' - location de moto Marrakech" width="800" height="533" ' + imgAttrs + '>' +
                    '<span class="product-card-badge">' + m.type + '</span>' +
                    '<button class="product-card-fav ' + (isFav ? 'active' : '') + '" data-id="' + m.id + '">' + (isFav ? '❤️' : '🤍') + '</button>' +
                '</div>' +
                '<div class="product-card-body">' +
                    '<div class="product-card-location"><i class="fas fa-map-marker-alt"></i> Marrakech</div>' +
                    '<h3 class="product-card-title">' + m.name + '</h3>' +
                    '<div class="product-card-features">' +
                        '<span class="product-feature-tag"><i class="fas fa-tachometer-alt"></i> ' + m.engine + '</span>' +
                        '<span class="product-feature-tag"><i class="fas fa-calendar"></i> ' + m.year + '</span>' +
                        '<span class="product-feature-tag"><i class="fas fa-tag"></i> ' + m.brand + '</span>' +
                    '</div>' +
                    '<div class="product-card-footer">' +
                        '<div class="product-card-price">' + formatPrice(m.pricePerDay) + ' <span>/ jour</span></div>' +
                        '<div style="display:flex;gap:0.5rem;">' +
                            '<button class="btn btn-outline-dark btn-sm detail-btn" data-id="' + m.id + '"><i class="fas fa-eye"></i> Détails</button>' +
                            '<button class="btn btn-primary btn-sm reserve-btn" data-id="' + m.id + '"><i class="fas fa-calendar-check"></i> Réserver</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        initFavButtons();
        initReserveButtons();
        initDetailButtons();
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

    function initReserveButtons() {
        document.querySelectorAll('.reserve-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var id = this.dataset.id;
                var moto = allMotos.find(function(m) { return m.id === id; });
                if (moto) openReservationModal(moto);
            });
        });
        var detailReserve = detailModal ? detailModal.querySelector('.detail-reserve-btn') : null;
        if (detailReserve && !detailReserve.__bound) {
            detailReserve.__bound = true;
            detailReserve.addEventListener('click', function() {
                detailModal.classList.remove('active');
                var moto = allMotos.find(function(m) { return m.id === this.dataset.id; });
                if (moto) openReservationModal(moto);
            });
        }
    }

    function initDetailButtons() {
        document.querySelectorAll('.detail-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var moto = allMotos.find(function(m) { return m.id === btn.dataset.id; });
                if (moto) showMotoDetail(moto);
            });
        });
    }

    function showMotoDetail(moto) {
        if (!detailModal) return;
        detailModal.querySelector('.detail-name').textContent = moto.name;
        detailModal.querySelector('.detail-location').innerHTML = '<i class="fas fa-map-marker-alt"></i> Marrakech';
        detailModal.querySelector('.detail-type').textContent = moto.type;
        detailModal.querySelector('.detail-image').src = moto.image;
        detailModal.querySelector('.detail-image').alt = moto.name;
        detailModal.querySelector('.detail-image').title = moto.name + ' - location de moto Marrakech';
        detailModal.querySelector('.detail-price').textContent = formatPrice(moto.pricePerDay) + ' / jour';

        var featuresHtml = '';
        var specItems = [
            { icon: 'fa-tachometer-alt', text: moto.engine },
            { icon: 'fa-calendar', text: moto.year },
            { icon: 'fa-tag', text: moto.brand }
        ];
        specItems.forEach(function(s) {
            featuresHtml += '<span class="product-feature-tag"><i class="fas ' + s.icon + '"></i> ' + s.text + '</span>';
        });
        detailModal.querySelector('.detail-features').innerHTML = featuresHtml;

        var equipHtml = '';
        if (moto.features && moto.features.length) {
            moto.features.forEach(function(f) {
                equipHtml += '<span class="product-feature-tag"><i class="fas fa-check-circle"></i> ' + f + '</span>';
            });
        }
        detailModal.querySelector('.detail-equipment').innerHTML = equipHtml;

        var body = detailModal.querySelector('.modal-body');
        var oldGallery = body.querySelector('.detail-gallery');
        if (oldGallery) oldGallery.remove();
        var imgs = moto.images && moto.images.length > 1 ? moto.images : null;
        if (imgs) {
            var gal = document.createElement('div');
            gal.className = 'detail-gallery';
            gal.style.cssText = 'display:flex;gap:0.5rem;overflow-x:auto;margin-bottom:1rem;padding-bottom:0.5rem;';
            imgs.forEach(function(src, i) {
                var thumb = document.createElement('img');
                thumb.src = src;
                thumb.alt = moto.name + ' ' + (i + 1);
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

        detailModal.querySelector('.detail-reserve-btn').dataset.id = moto.id;
        detailModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function openReservationModal(moto) {
        var modal = document.getElementById('reservation-modal');
        if (!modal) return;
        modal.querySelector('.modal-product-name').textContent = moto.name;
        modal.querySelector('.modal-product-image').src = moto.image;
        modal.querySelector('.modal-product-image').alt = moto.name;
        modal.querySelector('.modal-product-image').title = moto.name;
        modal.querySelector('.modal-product-price').textContent = formatPrice(moto.pricePerDay);
        modal.querySelector('.modal-product-type').value = 'moto';
        modal.querySelector('.modal-product-id').value = moto.id;
        modal.querySelector('.modal-product-name-input').value = moto.name;
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

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
            var fd = new FormData(resForm);
            var data = {};
            fd.forEach(function(v, k) { data[k] = v; });

            if (!data.firstName || !data.lastName || !data.phone || !data.email || !data.startDate || !data.endDate) {
                VelaroCar.showToast('error', 'Erreur', 'Veuillez remplir tous les champs obligatoires.');
                return;
            }

            var moto = allMotos.find(function(m) { return m.id === data.productId; });
            var reservation = {
                id: generateId(),
                type: 'moto',
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
                pricePerDay: moto ? moto.pricePerDay : 0
            };

            VelaroCarEmail.sendReservation(reservation, function() {}, function() {});

            submitBooking(reservation, function(serverBooking) {
                var displayId = serverBooking.id || serverBooking._id || reservation.id;
                var reservationModal = document.getElementById('reservation-modal');
                if (reservationModal) reservationModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
                VelaroCar.showToast('success', 'Réservation envoyée !', 'Votre réservation #' + displayId + ' a été enregistrée.');
                setTimeout(function() { window.location.href = 'confirmation.html?id=' + displayId; }, 1500);
            }, function(err) {
                var reservationModal = document.getElementById('reservation-modal');
                if (reservationModal) reservationModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
                VelaroCar.showToast('error', 'Erreur', 'Impossible d\'enregistrer la réservation. ' + (err && err.message ? err.message : 'Veuillez réessayer.'));
            });
        });
    }

    function loadFromAPI() {
        if (!grid) return;
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;"><i class="fas fa-spinner fa-spin" style="font-size:1.5rem;color:var(--accent);"></i><p style="margin-top:0.5rem;color:var(--gray-500);">Chargement des motos...</p></div>';

        VelaroAPI.getMotorcycles()
            .then(function(motos) {
                allMotos = motos.sort(function(a, b) { return b.rating - a.rating; });
                renderMotos();
            })
            .catch(function() {
                grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--danger);"><i class="fas fa-exclamation-triangle"></i> Erreur de chargement des motos.</div>';
            });
    }

    loadFromAPI();
})();
