/* ============================================
   VelaroCar - EmailJS Service (Fixed)
   ============================================ */

(function() {
    'use strict';

    /* ============================================
       CONFIGURATION
       ============================================ */
    var CONFIG = {
        publicKey: 'MJrKimUrLGqMUGpZk',
        serviceID: 'service_wmxz33b',
        reservationTemplateID: 'template_ejeiwhj',
        contactTemplateID: 'template_0yjbe1m',
        recipientEmail: 'velarocars26@gmail.com'
    };

    /* --- Initialize EmailJS once --- */
    var initialized = false;
    function initEmailJS() {
        if (initialized) return;
        if (typeof emailjs === 'undefined') {
            console.error('[VelaroCar Email] EmailJS SDK non chargé. Vérifiez la connexion internet.');
            return;
        }
        try {
            emailjs.init({ publicKey: CONFIG.publicKey });
            initialized = true;
            console.log('[VelaroCar Email] Initialisé avec succès. Public Key:', CONFIG.publicKey);
        } catch (err) {
            console.error('[VelaroCar Email] Erreur initialisation:', err);
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEmailJS);
    } else {
        initEmailJS();
    }

    /* --- Calculate days between dates --- */
    function calculateDays(start, end) {
        var s = new Date(start);
        var e = new Date(end);
        var diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
    }

    /* --- Prevent double send --- */
    var sending = { reservation: false, contact: false };

    /* --- Send reservation email --- */
    function sendReservation(reservation, onSuccess, onError) {
        console.log('[VelaroCar Email] sendReservation called:', reservation.id);

        if (!initialized) {
            console.error('[VelaroCar Email] Non initialisé. Tentative de ré-init...');
            initEmailJS();
            if (!initialized) {
                console.error('[VelaroCar Email] Échec initialisation. Envoi annulé.');
                if (onError) onError('SDK non initialisé');
                return;
            }
        }

        if (sending.reservation) {
            console.warn('[VelaroCar Email] Envoi déjà en cours, ignoré.');
            return;
        }
        sending.reservation = true;

        var typeLabels = { voiture: 'Voiture', moto: 'Moto', maison: 'Maison', excursion: 'Excursion', transfer: 'Transfert', chauffeur: 'Chauffeur Privé', pack: 'Pack Exclusif' };
        var days = calculateDays(reservation.startDate, reservation.endDate);
        var total = reservation.pricePerDay * days;

        var params = {
            to_email: CONFIG.recipientEmail,
            reservation_id: reservation.id,
            type: typeLabels[reservation.type] || reservation.type,
            product_name: reservation.productName,
            first_name: reservation.firstName,
            last_name: reservation.lastName,
            phone: reservation.phone,
            email: reservation.email,
            start_date: reservation.startDate,
            end_date: reservation.endDate,
            days: String(days),
            price_per_day: String(Math.round(reservation.pricePerDay / 10.2)),
            total: String(Math.round(total / 10.2)),
            currency: '€',
            price_per_day_formatted: typeof formatPrice === 'function' ? formatPrice(reservation.pricePerDay) : String(reservation.pricePerDay),
            total_formatted: typeof formatPrice === 'function' ? formatPrice(total) : String(total),
            message: reservation.message || 'Aucun message',
            created_at: new Date(reservation.createdAt).toLocaleDateString('fr-FR')
        };

        console.log('[VelaroCar Email] Sending reservation with params:', params);
        console.log('[VelaroCar Email] Service:', CONFIG.serviceID, '| Template:', CONFIG.reservationTemplateID);

        emailjs.send(CONFIG.serviceID, CONFIG.reservationTemplateID, params)
            .then(function(response) {
                console.log('[VelaroCar Email] Reservation envoyée avec succès:', response.status, response.text);
                sending.reservation = false;
                if (onSuccess) onSuccess(response);
            })
            .catch(function(err) {
                console.error('[VelaroCar Email] Erreur envoi réservation:', err);
                if (err.status) console.error('[VelaroCar Email] Status HTTP:', err.status);
                if (err.text) console.error('[VelaroCar Email] Réponse:', err.text);
                sending.reservation = false;
                if (onError) onError(err);
            });
    }

    /* --- Send contact email --- */
    function sendContact(data, onSuccess, onError) {
        console.log('[VelaroCar Email] sendContact called:', data.name, data.email);

        if (!initialized) {
            console.error('[VelaroCar Email] Non initialisé. Tentative de ré-init...');
            initEmailJS();
            if (!initialized) {
                console.error('[VelaroCar Email] Échec initialisation. Envoi annulé.');
                if (onError) onError('SDK non initialisé');
                return;
            }
        }

        if (sending.contact) {
            console.warn('[VelaroCar Email] Envoi contact déjà en cours, ignoré.');
            return;
        }
        sending.contact = true;

        var params = {
            to_email: CONFIG.recipientEmail,
            from_name: data.name,
            from_email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
            sent_at: new Date().toLocaleDateString('fr-FR')
        };

        console.log('[VelaroCar Email] Sending contact with params:', params);
        console.log('[VelaroCar Email] Service:', CONFIG.serviceID, '| Template:', CONFIG.contactTemplateID);

        emailjs.send(CONFIG.serviceID, CONFIG.contactTemplateID, params)
            .then(function(response) {
                console.log('[VelaroCar Email] Contact envoyé avec succès:', response.status, response.text);
                sending.contact = false;
                if (onSuccess) onSuccess(response);
            })
            .catch(function(err) {
                console.error('[VelaroCar Email] Erreur envoi contact:', err);
                if (err.status) console.error('[VelaroCar Email] Status HTTP:', err.status);
                if (err.text) console.error('[VelaroCar Email] Réponse:', err.text);
                sending.contact = false;
                if (onError) onError(err);
            });
    }

    /* --- Expose globally --- */
    window.VelaroCarEmail = {
        sendReservation: sendReservation,
        sendContact: sendContact,
        config: CONFIG
    };

})();/* ============================================
   MOTOS
   ============================================ */
const MOTOS = [
    
    {
        id: "moto-004",
        name: "Honda X-ADV",
        brand: "Honda",
        year: 2025,
        engine: "689cc",
        type: "Trail",
        pricePerDay: 800,
        image: "images/motos/honda-x-adv/main.webp",
        images: [
            "images/motos/honda-x-adv/main.webp",
            "images/motos/honda-x-adv/1.png",
            "images/motos/honda-x-adv/2.png",
            "images/motos/honda-x-adv/3.png",
            "images/motos/honda-x-adv/4.png"
        ],
        features: ["ABS", "GPS", "USB", "Crochet sacoches"],
        available: true,
        rating: 4.8,
        reviews: 270
    },
    
    {
        id: "moto-005",
        name: "Yamaha T-max",
        brand: "Yamaha",
        year: 2025,
        engine: "1868cc",
        type: "trail",
        pricePerDay: 800,
        image: "images/motos/yamaha-timax-560/main.webp",
        images: [
            "images/motos/yamaha-timax-560/main.webp",
            "images/motos/yamaha-timax-560/1.png",
            "images/motos/yamaha-timax-560/2.png",
            "images/motos/yamaha-timax-560/3.png",
            "images/motos/yamaha-timax-560/4.png"
        ],
        features: ["ABS", "GPS", "Son premium", "Cruise Control", "Top case"],
        available: true,
        rating: 5.0,
        reviews: 400
    },
    {
        id: "moto-006",
        name: "Honda SH",
        brand: "Honda",
        year: 2025,
        engine: "SH350i",
        type: "trail",
        pricePerDay: 400,
        image: "images/motos/Honda-sh-350/main.webp",
        images: [
            "images/motos/Honda-sh-350/main.webp",
            "images/motos/Honda-sh-350/1.png",
            "images/motos/Honda-sh-350/2.png",
            "images/motos/Honda-sh-350/3.png",
            "images/motos/Honda-sh-350/4.png"
        ],
        features: ["ABS", "GPS", "Son premium", "Cruise Control", "Top case"],
        available: true,
        rating: 4.9,
        reviews: 330
    }
];

