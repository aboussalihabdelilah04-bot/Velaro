/* ============================================
   VelaroCar - Excursions & Transferts Page Logic
   ============================================ */

(function() {
    'use strict';

    var grid = document.getElementById('excursions-grid');
    var countEl = document.getElementById('excursions-count');
    var transfersGrid = document.getElementById('transfers-grid');
    var transfersCountEl = document.getElementById('transfers-count');
    var detailModal = document.getElementById('excursion-detail-modal');

    var allExcursions = EXCURSIONS.slice().sort(function(a, b) { return b.rating - a.rating; });
    var allTransfers = (typeof TRANSFERS !== 'undefined') ? TRANSFERS.slice().sort(function(a, b) { return b.rating - a.rating; }) : [];

    var detailImage = detailModal ? detailModal.querySelector('.detail-image') : null;
    var resImage = document.getElementById('reservation-modal');
    resImage = resImage ? resImage.querySelector('.modal-product-image') : null;
    if (detailImage) detailImage.decoding = 'async';
    if (resImage) resImage.decoding = 'async';

    function isTransfer(id) {
        return (typeof TRANSFERS !== 'undefined') && TRANSFERS.some(function(t) { return t.id === id; });
    }

    function findProduct(id) {
        var p = EXCURSIONS.find(function(x) { return x.id === id; });
        if (p) return p;
        if (typeof TRANSFERS !== 'undefined') {
            p = TRANSFERS.find(function(x) { return x.id === id; });
        }
        return p || null;
    }

    function getItemConfig(id) {
        if (isTransfer(id)) {
            return {
                type: 'transfer',
                cardUnit: '/ transfert',
                modalUnit: '/ transfert',
                reserveText: 'R\u00e9server ce transfert'
            };
        }
        return {
            type: 'excursion',
            cardUnit: '/ pers.',
            modalUnit: '/ personne',
            reserveText: 'R\u00e9server cette excursion'
        };
    }

    function cardHtml(item, index, priceUnit) {
        var favs = getFavorites();
        var isFav = favs.indexOf(item.id) > -1;
        var imgAttrs = index < 3 ? 'loading="eager" decoding="async" fetchpriority="high"' : 'loading="lazy" decoding="async"';
        return '<div class="product-card" data-id="' + item.id + '">' +
            '<div class="product-card-image">' +
                '<img src="' + item.image + '" alt="' + item.name + '" width="800" height="533" ' + imgAttrs + '>' +
                '<span class="product-card-badge">' + item.city + '</span>' +
                '<button class="product-card-fav ' + (isFav ? 'active' : '') + '" data-id="' + item.id + '">' + (isFav ? '\u2764\uFE0F' : '\uD83E\uDD1D') + '</button>' +
            '</div>' +
            '<div class="product-card-body">' +
                '<div class="product-card-location"><i class="fas fa-map-marker-alt"></i> ' + item.city + '</div>' +
                '<h3 class="product-card-title">' + item.name + '</h3>' +
                '<p style="font-size:0.85rem;color:var(--gray-500);margin-bottom:1rem;line-height:1.5;">' + item.description.substring(0, 100) + '...</p>' +
                '<div class="product-card-features">' +
                    '<span class="product-feature-tag"><i class="fas fa-clock"></i> ' + item.duration + '</span>' +
                    '<span class="product-feature-tag"><i class="fas fa-signal"></i> ' + item.difficulty + '</span>' +
                    '<span class="product-feature-tag"><i class="fas fa-users"></i> ' + item.included.length + ' inclus</span>' +
                '</div>' +
                '<div class="product-card-footer">' +
                    '<div class="product-card-price">' + formatPrice(item.price) + ' <span>' + priceUnit + '</span></div>' +
                    '<div style="display:flex;gap:0.5rem;">' +
                        '<button class="btn btn-outline-dark btn-sm detail-btn" data-id="' + item.id + '"><i class="fas fa-eye"></i> D\u00e9tails</button>' +
                        '<button class="btn btn-primary btn-sm reserve-btn" data-id="' + item.id + '"><i class="fas fa-calendar-check"></i> R\u00e9server</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function renderExcursions() {
        if (!grid) return;
        if (countEl) countEl.textContent = allExcursions.length;
        grid.innerHTML = allExcursions.map(function(exc, index) {
            return cardHtml(exc, index, '/ pers.');
        }).join('');
        bindGridEvents(grid);
    }

    function renderTransfers() {
        if (!transfersGrid) return;
        if (transfersCountEl) transfersCountEl.textContent = allTransfers.length;
        transfersGrid.innerHTML = allTransfers.map(function(trf, index) {
            return cardHtml(trf, index, '/ transfert');
        }).join('');
        bindGridEvents(transfersGrid);
    }

    function bindGridEvents(el) {
        if (!el || el.__gridEventsBound) return;
        el.__gridEventsBound = true;
        el.addEventListener('click', function(e) {
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
                document.querySelectorAll('.fav-count').forEach(function(el2) {
                    el2.textContent = favs.length;
                    el2.style.display = favs.length > 0 ? 'flex' : 'none';
                });
                document.querySelectorAll('.product-card-fav[data-id="' + id + '"]').forEach(function(b) {
                    var isF = favs.indexOf(id) > -1;
                    b.classList.toggle('active', isF);
                    b.innerHTML = isF ? '\u2764\uFE0F' : '\uD83E\uDD1D';
                });
                return;
            }
            var detailBtn = target.closest('.detail-btn');
            if (detailBtn) {
                e.preventDefault();
                var item = findProduct(detailBtn.dataset.id);
                if (item) showDetailModal(item);
                return;
            }
            var reserveBtn = target.closest('.reserve-btn');
            if (reserveBtn) {
                e.preventDefault();
                var p = findProduct(reserveBtn.dataset.id);
                if (p) openReservationModal(p);
            }
        });
    }

    function initModalReserveButton() {
        var detailReserve = detailModal ? detailModal.querySelector('.detail-reserve-btn') : null;
        if (detailReserve && !detailReserve.__reserveBound) {
            detailReserve.__reserveBound = true;
            detailReserve.addEventListener('click', function() {
                detailModal.classList.remove('active');
                var item = findProduct(this.dataset.id);
                if (item) openReservationModal(item);
            });
        }
    }

    function showDetailModal(item) {
        if (!detailModal) return;
        var cfg = getItemConfig(item.id);
        detailModal.querySelector('.detail-name').textContent = item.name;
        detailModal.querySelector('.detail-city').innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + item.city;
        detailModal.querySelector('.detail-image').src = item.image;
        detailModal.querySelector('.detail-image').alt = item.name;
        detailModal.querySelector('.detail-price').textContent = formatPrice(item.price) + ' ' + cfg.modalUnit;
        detailModal.querySelector('.detail-description').textContent = item.description;
        detailModal.querySelector('.detail-duration').innerHTML = '<i class="fas fa-clock"></i> ' + item.duration;
        detailModal.querySelector('.detail-difficulty').innerHTML = '<i class="fas fa-signal"></i> ' + item.difficulty;

        var body = detailModal.querySelector('.modal-body');
        var oldGallery = body.querySelector('.detail-gallery');
        if (oldGallery) oldGallery.remove();
        var imgs = item.images && item.images.length > 1 ? item.images : null;
        if (imgs) {
            var gal = document.createElement('div');
            gal.className = 'detail-gallery';
            gal.style.cssText = 'display:flex;gap:0.5rem;overflow-x:auto;margin-bottom:1rem;padding-bottom:0.5rem;';
            imgs.forEach(function(src, i) {
                var thumb = document.createElement('img');
                thumb.src = src;
                thumb.alt = item.name + ' ' + (i + 1);
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

        var programHtml = item.program.map(function(p) {
            return '<div style="display:flex;gap:1rem;margin-bottom:0.75rem;">' +
                '<span style="font-weight:600;color:var(--accent);white-space:nowrap;min-width:60px;">' + p.time + '</span>' +
                '<span>' + p.activity + '</span></div>';
        }).join('');
        detailModal.querySelector('.detail-program').innerHTML = programHtml;

        detailModal.querySelector('.detail-included').innerHTML = item.included.map(function(i) {
            return '<li style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;"><i class="fas fa-check-circle" style="color:var(--success);"></i> ' + i + '</li>';
        }).join('');
        detailModal.querySelector('.detail-not-included').innerHTML = item.notIncluded.map(function(i) {
            return '<li style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;"><i class="fas fa-times-circle" style="color:var(--danger);"></i> ' + i + '</li>';
        }).join('');

        detailModal.querySelector('.detail-reserve-btn').dataset.id = item.id;
        detailModal.querySelector('.detail-reserve-btn').innerHTML = '<i class="fas fa-calendar-check"></i> ' + cfg.reserveText;
        detailModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function openReservationModal(item) {
        var modal = document.getElementById('reservation-modal');
        if (!modal) return;
        var cfg = getItemConfig(item.id);
        modal.querySelector('.modal-product-name').textContent = item.name;
        modal.querySelector('.modal-product-image').src = item.image;
        modal.querySelector('.modal-product-price').textContent = formatPrice(item.price) + ' ' + cfg.modalUnit;
        modal.querySelector('.modal-product-type').value = cfg.type;
        modal.querySelector('.modal-product-id').value = item.id;
        modal.querySelector('.modal-product-name-input').value = item.name;
        var titleEl = modal.querySelector('.reservation-modal-title');
        if (titleEl) titleEl.textContent = cfg.reserveText;
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    renderExcursions();
    renderTransfers();

    initModalReserveButton();

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

            var product = EXCURSIONS.find(function(x) { return x.id === data.productId; });
            if (!product && typeof TRANSFERS !== 'undefined') {
                product = TRANSFERS.find(function(x) { return x.id === data.productId; });
            }
            var reservation = {
                id: generateId(),
                type: data.productType || 'excursion',
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
