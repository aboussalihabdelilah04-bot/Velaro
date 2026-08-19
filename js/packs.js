/* ============================================
   VelaroCar - Packs Page Logic
   Packs render + details gallery + reservation (reuses shared system)
   ============================================ */

(function() {
    'use strict';

    if (typeof formatPrice !== 'function' || typeof getReservationData !== 'function') {
        return;
    }

    var PACKS_DATA = [];

    var grid = document.getElementById('packs-grid');
    var modal = document.getElementById('reservation-modal');
    var detailModal = document.getElementById('pack-detail-modal');
    var resForm = document.getElementById('reservation-form');

    function cardHtml(p, index) {
        var imgAttrs = index < 3 ? 'loading="eager" decoding="async" fetchpriority="high"' : 'loading="lazy" decoding="async"';
        var includesHtml = p.includes.map(function(inc) {
            return '<li><i class="fas ' + inc.icon + '"></i><span>' + inc.label + '</span></li>';
        }).join('');
        return '<div class="product-card pack-card" data-id="' + p.id + '">' +
            '<div class="product-card-image">' +
                '<img src="' + p.image + '" alt="' + p.name + ' - Marrakech" title="' + p.name + ' - pack séjour Marrakech" width="800" height="533" ' + imgAttrs + '>' +
                '<span class="product-card-badge">' + p.emoji + ' ' + p.badge + '</span>' +
            '</div>' +
            '<div class="product-card-body">' +
                '<div class="product-card-location"><i class="fas fa-gem"></i> Marrakech \u00b7 Pack Exclusif</div>' +
                '<h3 class="product-card-title">' + p.emoji + ' ' + p.name + '</h3>' +
                '<p style="font-size:0.85rem;color:var(--gray-500);margin-bottom:1rem;line-height:1.5;">' + p.tagline + '</p>' +
                '<div class="pack-meta">' +
                    '<span class="product-feature-tag"><i class="fas fa-clock"></i> ' + p.duration + '</span>' +
                    '<span class="product-card-rating"><i class="fas fa-star"></i> ' + p.rating + ' <span>(' + p.reviews + ')</span></span>' +
                '</div>' +
                '<ul class="pack-includes">' + includesHtml + '</ul>' +
                '<div class="product-card-footer">' +
                    '<div class="product-card-price"><span class="pack-price-from">\u00c0 partir de</span>' + formatPrice(p.price) + ' <span>/ pack</span></div>' +
                '</div>' +
                '<div class="product-card-actions">' +
                    '<button class="btn btn-outline-dark btn-sm detail-btn" data-id="' + p.id + '"><i class="fas fa-eye"></i> D\u00e9tails</button>' +
                    '<button class="btn btn-primary btn-sm reserve-btn" data-id="' + p.id + '"><i class="fas fa-calendar-check"></i> R\u00e9server</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function renderPacks() {
        if (!grid) return;
        grid.innerHTML = PACKS_DATA.map(function(p, index) {
            return cardHtml(p, index);
        }).join('');
        initGridEvents();
    }

    function findPack(id) {
        return PACKS_DATA.find(function(p) { return p.id === id; }) || null;
    }

    /* --- Detail modal with gallery --- */
    function showDetailModal(p) {
        if (!detailModal) return;
        detailModal.querySelector('.detail-name').textContent = p.emoji + ' ' + p.name;
        detailModal.querySelector('.detail-city').innerHTML = '<i class="fas fa-map-marker-alt"></i> Marrakech \u00b7 Pack Exclusif';
        detailModal.querySelector('.detail-image').src = p.image;
        detailModal.querySelector('.detail-image').alt = p.name;
        detailModal.querySelector('.detail-image').title = p.name + ' - pack séjour Marrakech';
        detailModal.querySelector('.detail-price').textContent = '\u00c0 partir de ' + formatPrice(p.price) + ' / pack';
        detailModal.querySelector('.detail-description').textContent = p.description;
        detailModal.querySelector('.detail-duration').innerHTML = '<i class="fas fa-clock"></i> ' + p.duration;
        detailModal.querySelector('.detail-rating').innerHTML = '<i class="fas fa-star" style="color:var(--gold);"></i> ' + p.rating + ' (' + p.reviews + ' avis)';
        detailModal.querySelector('.detail-vehicle').textContent = p.vehicle;
        detailModal.querySelector('.detail-accommodation').textContent = p.accommodation;
        detailModal.querySelector('.detail-included').innerHTML = p.includes.map(function(inc) {
            return '<li style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;"><i class="fas ' + inc.icon + '" style="width:18px;color:var(--accent);"></i> ' + inc.label + '</li>';
        }).join('');

        var body = detailModal.querySelector('.modal-body');
        var oldGallery = body.querySelector('.detail-gallery');
        if (oldGallery) oldGallery.remove();
        var imgs = p.images && p.images.length > 1 ? p.images : null;
        if (imgs) {
            var gal = document.createElement('div');
            gal.className = 'detail-gallery';
            gal.style.cssText = 'display:flex;gap:0.5rem;overflow-x:auto;margin-bottom:1rem;padding-bottom:0.5rem;';
            imgs.forEach(function(src, i) {
                var thumb = document.createElement('img');
                thumb.src = src;
                thumb.alt = p.name + ' ' + (i + 1);
                thumb.loading = 'lazy';
                thumb.decoding = 'async';
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

        var reserveBtn = detailModal.querySelector('.detail-reserve-btn');
        reserveBtn.dataset.id = p.id;
        reserveBtn.innerHTML = '<i class="fas fa-calendar-check"></i> R\u00e9server ce pack';
        detailModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    /* --- Reservation --- */
    function openPackReservation(p) {
        if (typeof openGlobalReservationModal !== 'function') return;
        openGlobalReservationModal(p, 'pack');
        var titleEl = document.querySelector('.reservation-modal-title');
        if (titleEl) titleEl.textContent = 'R\u00e9server ce pack';
        var startInput = modal.querySelector('input[name="startDate"]');
        var endInput = modal.querySelector('input[name="endDate"]');
        var endGroup = endInput ? endInput.closest('.form-group') : null;
        if (endGroup) endGroup.style.display = 'none';
        if (resForm) resForm.dataset.packMode = '1';
        if (startInput && endInput) {
            endInput.value = startInput.value || '';
        }
    }

    function restorePackMode() {
        if (!modal) return;
        var endInput = modal.querySelector('input[name="endDate"]');
        var endGroup = endInput ? endInput.closest('.form-group') : null;
        if (endGroup) endGroup.style.display = '';
        if (resForm) delete resForm.dataset.packMode;
    }

    function initGridEvents() {
        if (!grid || grid.__packsEventsBound) return;
        grid.__packsEventsBound = true;
        grid.addEventListener('click', function(e) {
            var target = e.target;
            if (!target || !target.closest) return;
            var detailBtn = target.closest('.detail-btn');
            if (detailBtn) {
                e.preventDefault();
                var p = findPack(detailBtn.dataset.id);
                if (p) showDetailModal(p);
                return;
            }
            var reserveBtn = target.closest('.reserve-btn');
            if (reserveBtn) {
                e.preventDefault();
                var pk = findPack(reserveBtn.dataset.id);
                if (pk) openPackReservation(pk);
            }
        });
    }

    /* --- Detail modal reserve button --- */
    if (detailModal) {
        var detailReserveBtn = detailModal.querySelector('.detail-reserve-btn');
        if (detailReserveBtn && !detailReserveBtn.__packsReserveBound) {
            detailReserveBtn.__packsReserveBound = true;
            detailReserveBtn.addEventListener('click', function() {
                detailModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
                var p = findPack(this.dataset.id);
                if (p) openPackReservation(p);
            });
        }
    }

    /* --- Modal close handlers --- */
    [detailModal, modal].forEach(function(m) {
        if (m) {
            var closeBtn = m.querySelector('.modal-close');
            if (closeBtn) closeBtn.addEventListener('click', function() {
                m.classList.remove('active');
                document.body.classList.remove('no-scroll');
                restorePackMode();
            });
            m.addEventListener('click', function(e) {
                if (e.target === m) {
                    m.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                    restorePackMode();
                }
            });
        }
    });

    /* --- Pack mode : departure date follows arrival date --- */
    if (modal && resForm) {
        var startInput = modal.querySelector('input[name="startDate"]');
        var endInput = modal.querySelector('input[name="endDate"]');
        if (startInput && endInput) {
            startInput.addEventListener('change', function() {
                if (resForm.dataset.packMode === '1') {
                    endInput.value = startInput.value;
                }
            });
        }
    }

    /* --- Form submit --- */
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

            var product = findPack(data.productId);
            if (resForm.dataset.packMode === '1') {
                data.endDate = data.startDate;
            }

            var reservation = {
                id: generateId(),
                type: data.productType || 'pack',
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
                pricePerDay: product ? product.price : 0
            };

            VelaroCarEmail.sendReservation(reservation, function() {}, function() {});

            submitBooking(reservation, function(serverBooking) {
                var displayId = serverBooking.id || serverBooking._id || reservation.id;
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
                restorePackMode();
                VelaroCar.showToast('success', 'R\u00e9servation envoy\u00e9e !', 'Votre r\u00e9servation #' + displayId + ' a \u00e9t\u00e9 enregistr\u00e9e.');
                setTimeout(function() {
                    window.location.href = 'confirmation.html?id=' + displayId;
                }, 1500);
            }, function(err) {
                modal.classList.remove('active');
                document.body.classList.remove('no-scroll');
                restorePackMode();
                VelaroCar.showToast('error', 'Erreur', 'Impossible d\'enregistrer la r\u00e9servation. ' + (err && err.message ? err.message : 'Veuillez r\u00e9essayer.'));
            });
        });
    }

    /* --- FAQ accordion is handled globally in js/main.js --- */

    function loadFromAPI() {
        if (!grid) return;
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;"><i class="fas fa-spinner fa-spin" style="font-size:1.5rem;color:var(--accent);"></i><p style="margin-top:0.5rem;color:var(--gray-500);">Chargement des packs...</p></div>';

        VelaroAPI.getPacks()
            .then(function(packs) {
                PACKS_DATA = packs.sort(function(a, b) { return b.rating - a.rating; });
                renderPacks();
            })
            .catch(function() {
                grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--danger);"><i class="fas fa-exclamation-triangle"></i> Erreur de chargement des packs.</div>';
            });
    }

    loadFromAPI();
})();
