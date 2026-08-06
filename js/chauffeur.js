/* ============================================
   VelaroCar - Chauffeur Privé Page Logic
   Packages render + reservation (reuses shared system)
   ============================================ */

(function() {
    'use strict';

    var CHAUFFEUR_PACKAGES = [
        {
            id: 'chf-001',
            name: 'Essential',
            badge: '4 Heures',
            duration: '4 Heures',
            price: 1200,
            image: 'images/chauffeur/essential/main.png',
            stars: 1,
            includes: [
                'Mercedes Vito Premium',
                'Chauffeur professionnel',
                'Jusqu\u2019\u00e0 80 km inclus',
                'Eau min\u00e9rale offerte'
            ]
        },
        {
            id: 'chf-002',
            name: 'Business',
            badge: '8 Heures',
            duration: '8 Heures',
            price: 2000,
            image: 'images/chauffeur/business/main.png',
            stars: 2,
            includes: [
                'Mercedes Vito Premium',
                'Chauffeur priv\u00e9',
                'Jusqu\u2019\u00e0 180 km inclus',
                'Attente et d\u00e9placements illimit\u00e9s dans Marrakech'
            ]
        },
        {
            id: 'chf-003',
            name: 'Executive',
            badge: '12 Heures',
            duration: '12 Heures',
            price: 2800,
            image: 'images/chauffeur/executive/main.png',
            stars: 3,
            includes: [
                'V\u00e9hicule haut de gamme',
                'Chauffeur d\u00e9di\u00e9',
                'Jusqu\u2019\u00e0 300 km inclus',
                'Service id\u00e9al pour \u00e9v\u00e9nements, visites et d\u00e9placements professionnels'
            ]
        },
        {
            id: 'chf-004',
            name: 'Premium Day',
            badge: 'Journ\u00e9e compl\u00e8te',
            duration: 'Journ\u00e9e compl\u00e8te',
            price: 3500,
            image: 'images/chauffeur/premium-day/main.png',
            stars: 4,
            includes: [
                'Journ\u00e9e compl\u00e8te avec chauffeur',
                'Kilom\u00e9trage adapt\u00e9 selon le programme',
                'Service VIP personnalis\u00e9',
                'Assistance et flexibilit\u00e9 totale'
            ]
        }
    ];

    var grid = document.getElementById('chauffeur-grid');
    var modal = document.getElementById('reservation-modal');

    function starsHtml(count) {
        var html = '';
        for (var i = 0; i < count; i++) {
            html += '<i class="fas fa-star" style="color:var(--gold);font-size:0.85rem;"></i>';
        }
        return html;
    }

    function cardHtml(p, index) {
        var imgAttrs = index < 2 ? 'loading="eager" decoding="async" fetchpriority="high"' : 'loading="lazy" decoding="async"';
        var includesHtml = p.includes.map(function(inc) {
            return '<li style="display:flex;align-items:flex-start;gap:0.5rem;"><i class="fas fa-check" style="color:var(--success);margin-top:4px;flex-shrink:0;"></i><span>' + inc + '</span></li>';
        }).join('');
        return '<div class="product-card" data-id="' + p.id + '">' +
            '<div class="product-card-image">' +
                '<img src="' + p.image + '" alt="' + p.name + ' - Mercedes Vito Premium" title="' + p.name + ' - chauffeur privé Marrakech" width="800" height="533" ' + imgAttrs + '>' +
                '<span class="product-card-badge">' + p.badge + '</span>' +
            '</div>' +
            '<div class="product-card-body">' +
                '<div class="product-card-location"><i class="fas fa-user-tie"></i> Chauffeur Priv\u00e9</div>' +
                '<h3 class="product-card-title">' + p.name + '</h3>' +
                '<div style="color:var(--gold);margin-bottom:0.75rem;letter-spacing:2px;">' + starsHtml(p.stars) + '</div>' +
                '<div class="product-card-price">' + formatPrice(p.price) + ' <span>/ forfait</span></div>' +
                '<ul style="list-style:none;padding:0;margin:1rem 0;font-size:0.85rem;color:var(--gray-600);line-height:1.9;">' + includesHtml + '</ul>' +
                '<button class="btn btn-primary btn-sm reserve-btn" data-id="' + p.id + '" style="width:100%;"><i class="fas fa-calendar-check"></i> R\u00e9server</button>' +
            '</div>' +
        '</div>';
    }

    function renderPackages() {
        if (!grid) return;
        grid.innerHTML = CHAUFFEUR_PACKAGES.map(function(p, index) {
            return cardHtml(p, index);
        }).join('');
        initGridEvents();
    }

    function findPackage(id) {
        return CHAUFFEUR_PACKAGES.find(function(p) { return p.id === id; }) || null;
    }

    function openChauffeurReservation(p) {
        if (typeof openGlobalReservationModal !== 'function') return;
        openGlobalReservationModal(p, 'chauffeur');
        var titleEl = document.querySelector('.reservation-modal-title');
        if (titleEl) titleEl.textContent = 'R\u00e9server ce forfait';
    }

    function initGridEvents() {
        if (!grid || grid.__chauffeurEventsBound) return;
        grid.__chauffeurEventsBound = true;
        grid.addEventListener('click', function(e) {
            var target = e.target;
            if (!target || !target.closest) return;
            var reserveBtn = target.closest('.reserve-btn');
            if (reserveBtn) {
                e.preventDefault();
                var p = findPackage(reserveBtn.dataset.id);
                if (p) openChauffeurReservation(p);
            }
        });
    }

    renderPackages();

    if (modal) {
        var closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.addEventListener('click', function() { modal.classList.remove('active'); document.body.classList.remove('no-scroll'); });
        modal.addEventListener('click', function(e) { if (e.target === modal) { modal.classList.remove('active'); document.body.classList.remove('no-scroll'); } });
    }

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

            var product = findPackage(data.productId);
            var reservation = {
                id: generateId(),
                type: data.productType || 'chauffeur',
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

            VelaroCar.showToast('success', 'R\u00e9servation envoy\u00e9e !', 'Votre r\u00e9servation #' + reservation.id + ' a \u00e9t\u00e9 enregistr\u00e9e.');

            setTimeout(function() {
                window.location.href = 'confirmation.html?id=' + reservation.id;
            }, 1500);
        });
    }

})();
