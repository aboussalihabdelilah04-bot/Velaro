/* ============================================
   VelaroCar - Reservation System (Shared)
   Modal management, form validation, payment methods
   ============================================ */

(function() {
    'use strict';

    /* --- Global reservation modal open/close --- */
    window.openGlobalReservationModal = function(item, type) {
        var modal = document.getElementById('reservation-modal');
        if (!modal) return;

        var price = item.pricePerDay || item.pricePerNight || item.price;
        var priceUnit = type === 'maison' ? '/ nuit' : (type === 'excursion' ? '/ personne' : (type === 'transfer' ? '/ transfert' : (type === 'chauffeur' ? '/ forfait' : (type === 'pack' ? '/ pack' : '/ jour'))));

        modal.querySelector('.modal-product-name').textContent = item.name;
        modal.querySelector('.modal-product-image').src = item.image;
        modal.querySelector('.modal-product-image').alt = item.name;
        modal.querySelector('.modal-product-image').title = item.name;
        modal.querySelector('.modal-product-price').textContent = formatPrice(price) + ' ' + priceUnit;
        modal.querySelector('.modal-product-type').value = type;
        modal.querySelector('.modal-product-id').value = item.id;
        modal.querySelector('.modal-product-name-input').value = item.name;

        // Set min dates
        var today = new Date().toISOString().split('T')[0];
        var startInput = modal.querySelector('input[name="startDate"]');
        var endInput = modal.querySelector('input[name="endDate"]');
        if (startInput) startInput.min = today;
        if (endInput) endInput.min = today;

        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    window.closeGlobalReservationModal = function() {
        var modal = document.getElementById('reservation-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    };

    /* --- Payment Method Selection --- */
    var paymentMethods = document.querySelectorAll('.payment-method');
    if (paymentMethods.length) {
        paymentMethods.forEach(function(method) {
            method.addEventListener('click', function() {
                paymentMethods.forEach(function(m) { m.classList.remove('active'); });
                this.classList.add('active');
                var radio = this.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            });
        });
    }

    /* --- Date validation: end must be after start --- */
    document.querySelectorAll('input[name="startDate"]').forEach(function(startInput) {
        startInput.addEventListener('change', function() {
            var endInput = this.closest('form') ? this.closest('form').querySelector('input[name="endDate"]') : null;
            if (endInput) {
                endInput.min = this.value;
                if (endInput.value && endInput.value <= this.value) {
                    endInput.value = '';
                }
            }
        });
    });

    /* --- Phone number formatting --- */
    document.querySelectorAll('input[type="tel"]').forEach(function(input) {
        input.addEventListener('input', function() {
            var val = this.value.replace(/[^0-9+\s-]/g, '');
            this.value = val;
        });
    });

    /* --- Email validation --- */
    window.validateEmail = function(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    /* --- Phone validation --- */
    window.validatePhone = function(phone) {
        var cleaned = phone.replace(/[\s\-+()]/g, '');
        return cleaned.length >= 9 && cleaned.length <= 15;
    };

    /* --- Calculate days/nights display --- */
    window.updateDurationDisplay = function(form) {
        var startInput = form.querySelector('input[name="startDate"]');
        var endInput = form.querySelector('input[name="endDate"]');
        var durationEl = form.querySelector('.duration-display');
        if (!startInput || !endInput || !durationEl) return;

        function update() {
            if (startInput.value && endInput.value) {
                var days = calculateDays(startInput.value, endInput.value);
                durationEl.textContent = days + ' jour(s)';
                durationEl.style.display = 'block';
            } else {
                durationEl.style.display = 'none';
            }
        }

        startInput.addEventListener('change', update);
        endInput.addEventListener('change', update);
    };

    /* --- Init duration displays --- */
    document.querySelectorAll('#reservation-form').forEach(function(form) {
        updateDurationDisplay(form);
    });

    /* --- Notification system for reservation confirmation --- */
    window.sendReservationNotification = function(reservation) {
        // In a real app, this would send an email/SMS
        // For now, we just show a toast and log it
        console.log('Notification sent for reservation:', reservation.id);

        // Store notification
        var notifications = JSON.parse(localStorage.getItem('velarocar_notifications') || '[]');
        notifications.push({
            id: generateId(),
            reservationId: reservation.id,
            type: 'reservation_confirmed',
            title: 'Réservation #' + reservation.id,
            message: 'Votre réservation pour ' + reservation.productName + ' a été enregistrée.',
            createdAt: new Date().toISOString(),
            read: false
        });
        localStorage.setItem('velarocar_notifications', JSON.stringify(notifications));
    };

    /* --- Format date helper --- */
    window.formatDate = function(dateStr) {
        return new Date(dateStr).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    /* --- Format datetime helper --- */
    window.formatDateTime = function(dateStr) {
        return new Date(dateStr).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

})();
