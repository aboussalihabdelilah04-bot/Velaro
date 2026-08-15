/* ============================================
   VelaroCar - Packs Page Logic
   Packs render + details gallery + reservation (reuses shared system)
   ============================================ */

(function() {
    'use strict';

    /* --- If data.js failed to load, skip rendering instead of throwing --- */
    if (typeof formatPrice !== 'function' || typeof getReservationData !== 'function') {
        return;
    }

    var PACKS = [
        {
            id: 'pck-01',
            name: 'Pack City Escape',
            badge: 'Best-seller',
            tagline: 'Parfait pour un court s\u00e9jour.',
            description: 'Id\u00e9al pour un week-end ou un court s\u00e9jour \u00e0 Marrakech : votre voiture, votre appartement confortable et votre transfert a\u00e9roport aller / retour, le tout sans aucune organisation.',
            duration: '3 jours / 2 nuits',
            durationDays: 3,
            price: 2490,
            vehicle: 'Renault Clio 5',
            accommodation: 'Appartement confortable',
            image: 'images/packs/city-escape/main.webp',
            images: ['images/packs/city-escape/main.webp'],
            rating: 4.9,
            reviews: 320,
            includes: [
                { icon: 'fa-car', label: 'Renault Clio 5' },
                { icon: 'fa-home', label: 'Appartement confortable' },
                { icon: 'fa-plane-arrival', label: 'Transfert a\u00e9roport aller / retour' },
                { icon: 'fa-headset', label: 'Assistance 24h/24' }
            ]
        },
        {
            id: 'pck-02',
            name: 'Pack D\u00e9couverte',
            badge: 'Populaire',
            tagline: 'D\u00e9couvrez Marrakech en toute libert\u00e9.',
            description: 'Explorez Marrakech et ses environs \u00e0 votre rythme avec un appartement premium, votre voiture et une excursion dans le d\u00e9sert d\u2019Agafay ou la Palmeraie.',
            duration: '5 jours / 4 nuits',
            durationDays: 5,
            price: 4490,
            vehicle: 'Renault Clio 5',
            accommodation: 'Appartement Premium',
            image: 'images/packs/decouverte/main.webp',
            images: ['images/packs/decouverte/main.webp'],
            rating: 4.8,
            reviews: 410,
            includes: [
                { icon: 'fa-car', label: 'Renault Clio 5' },
                { icon: 'fa-building', label: 'Appartement Premium' },
                { icon: 'fa-plane-arrival', label: 'Transfert aller / retour' },
                { icon: 'fa-mountain', label: 'Excursion Agafay ou Palmeraie' },
                { icon: 'fa-headset', label: 'Assistance 24h/24' }
            ]
        },
        {
            id: 'pck-03',
            name: 'Pack Famille',
            badge: 'Familles',
            tagline: 'Le meilleur choix pour les familles.',
            description: 'Tout est pr\u00e9vu pour voyager sereinement en famille : un SUV spacieux, un appartement familial confortable, le transfert a\u00e9roport et un si\u00e8ge b\u00e9b\u00e9 sur demande.',
            duration: '7 jours / 6 nuits',
            durationDays: 7,
            price: 6490,
            vehicle: 'Dacia Duster ou SUV',
            accommodation: 'Appartement Familial',
            image: 'images/packs/famille/main.webp',
            images: ['images/packs/famille/main.webp'],
            rating: 4.9,
            reviews: 265,
            includes: [
                { icon: 'fa-car', label: 'Dacia Duster ou SUV' },
                { icon: 'fa-users', label: 'Appartement Familial' },
                { icon: 'fa-plane-arrival', label: 'Transfert a\u00e9roport' },
                { icon: 'fa-child', label: 'Si\u00e8ge b\u00e9b\u00e9 (sur demande)' }
            ]
        },
        {
            id: 'pck-04',
            name: 'Pack Premium',
            badge: 'Confort',
            tagline: 'Confort et \u00e9l\u00e9gance.',
            description: 'Une exp\u00e9rience raffin\u00e9e : une Renault Arkana Hybride, un appartement haut standing, un accueil VIP \u00e0 l\u2019a\u00e9roport et la livraison de votre v\u00e9hicule directement \u00e0 votre h\u00e9bergement.',
            duration: '5 jours',
            durationDays: 5,
            price: 7490,
            vehicle: 'Renault Arkana Hybride',
            accommodation: 'Appartement Haut Standing',
            image: 'images/packs/premium/main.webp',
            images: ['images/packs/premium/main.webp'],
            rating: 4.9,
            reviews: 198,
            includes: [
                { icon: 'fa-car', label: 'Renault Arkana Hybride' },
                { icon: 'fa-building', label: 'Appartement Haut Standing' },
                { icon: 'fa-star', label: 'Accueil VIP' },
                { icon: 'fa-truck-front', label: 'Livraison du v\u00e9hicule' },
                { icon: 'fa-headset', label: 'Assistance Premium' }
            ]
        },
        {
            id: 'pck-05',
            name: 'Pack Villa Prestige',
            badge: 'Piscine priv\u00e9e',
            tagline: 'Pour un s\u00e9jour d\u2019exception.',
            description: 'Le luxe absolu : un SUV ou une Mercedes Vito, une villa avec piscine priv\u00e9e, le transfert a\u00e9roport, le m\u00e9nage r\u00e9gulier et une assistance premium d\u00e9di\u00e9e.',
            duration: '5 jours',
            durationDays: 5,
            price: 12990,
            vehicle: 'SUV ou Mercedes Vito',
            accommodation: 'Villa avec piscine priv\u00e9e',
            image: 'images/packs/villa-prestige/main.webp',
            images: ['images/packs/villa-prestige/main.webp'],
            rating: 5.0,
            reviews: 124,
            includes: [
                { icon: 'fa-car', label: 'SUV ou Mercedes Vito' },
                { icon: 'fa-water-ladder', label: 'Villa avec piscine priv\u00e9e' },
                { icon: 'fa-plane-arrival', label: 'Transfert a\u00e9roport' },
                { icon: 'fa-broom', label: 'M\u00e9nage' },
                { icon: 'fa-headset', label: 'Assistance Premium' }
            ]
        },
        {
            id: 'pck-06',
            name: 'Pack VIP Marrakech',
            badge: 'Signature',
            tagline: 'Une exp\u00e9rience compl\u00e8te.',
            description: 'Le summum du raffinement : v\u00e9hicule premium, villa de luxe, accueil VIP, deux excursions au choix, r\u00e9servations dans les meilleurs restaurants et assistance 24h/24.',
            duration: '7 jours',
            durationDays: 7,
            price: 18990,
            vehicle: 'V\u00e9hicule Premium',
            accommodation: 'Villa de Luxe',
            image: 'images/packs/vip-marrakech/main.webp',
            images: ['images/packs/vip-marrakech/main.webp'],
            rating: 5.0,
            reviews: 87,
            includes: [
                { icon: 'fa-car-side', label: 'V\u00e9hicule Premium' },
                { icon: 'fa-crown', label: 'Villa de Luxe' },
                { icon: 'fa-star', label: 'Accueil VIP' },
                { icon: 'fa-mountain', label: 'Deux excursions au choix' },
                { icon: 'fa-utensils', label: 'R\u00e9servation restaurants' },
                { icon: 'fa-headset', label: 'Assistance 24h/24' }
            ]
        },
        {
            id: 'pck-07',
            name: 'Pack Honeymoon',
            badge: 'Romantique',
            tagline: 'Id\u00e9al pour les couples.',
            description: 'Un s\u00e9jour pens\u00e9 pour deux : une Renault Clio 5 Automatique, un appartement romantique, le transfert a\u00e9roport et une d\u00e9coration romantique \u00e0 votre arriv\u00e9e.',
            duration: '4 jours',
            durationDays: 4,
            price: 4990,
            vehicle: 'Renault Clio 5 Automatique',
            accommodation: 'Appartement Romantique',
            image: 'images/packs/honeymoon/main.webp',
            images: ['images/packs/honeymoon/main.webp'],
            rating: 4.9,
            reviews: 156,
            includes: [
                { icon: 'fa-car', label: 'Renault Clio 5 Automatique' },
                { icon: 'fa-heart', label: 'Appartement Romantique' },
                { icon: 'fa-plane-arrival', label: 'Transfert a\u00e9roport' },
                { icon: 'fa-rose', label: 'D\u00e9coration romantique' }
            ]
        }
    ];

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
        grid.innerHTML = PACKS.map(function(p, index) {
            return cardHtml(p, index);
        }).join('');
        initGridEvents();
    }

    function findPack(id) {
        return PACKS.find(function(p) { return p.id === id; }) || null;
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

            var reservations = getReservationData();
            reservations.push(reservation);
            saveReservationData(reservations);

            var userData = getUserData() || { reservations: [] };
            if (!userData.reservations) userData.reservations = [];
            userData.reservations.push(reservation);
            saveUserData(userData);

            VelaroCarEmail.sendReservation(reservation, function() {}, function() {});

            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            restorePackMode();

            VelaroCar.showToast('success', 'R\u00e9servation envoy\u00e9e !', 'Votre r\u00e9servation #' + reservation.id + ' a \u00e9t\u00e9 enregistr\u00e9e.');

            setTimeout(function() {
                window.location.href = 'confirmation.html?id=' + reservation.id;
            }, 1500);
        });
    }

    /* --- FAQ accordion is handled globally in js/main.js --- */

    renderPacks();
})();
