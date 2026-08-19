/* ============================================
   VelaroCar - Data Layer
   Configuration, helpers, and non-database content.
   Product data (cars, motos, villas, excursions, transfers, packs, reviews)
   is served exclusively from MongoDB via /api/public/* routes.
   ============================================ */

/* --- ES5 compatibility polyfills ---
   Some devices/WebViews run engines without ES6 methods (Array.prototype.find,
   String.prototype.includes/repeat, Element.closest, NodeList.forEach).
   These small ES5 fallbacks keep the site working on those browsers. */
if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        for (var i = 0; i < this.length; i++) {
            if (predicate(this[i], i, this)) return this[i];
        }
        return undefined;
    };
}

if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') start = 0;
        return this.indexOf(search, start) !== -1;
    };
}

if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
        if (count < 1) return '';
        var result = '';
        for (var i = 0; i < count; i++) result += this;
        return result;
    };
}

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(selector) {
        var el = this;
        while (el && el.nodeType === 1) {
            if (matchesSelector(el, selector)) return el;
            el = el.parentNode;
        }
        return null;
    };
}

function matchesSelector(el, selector) {
    var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    if (matches) return matches.call(el, selector);
    return false;
}

var SITE_CONFIG = {
    name: "VelaroCar",
    tagline: "Location Premium à Marrakech",
    slogan: "Découvrez Marrakech avec Style",
    description: "Location de voitures, motos, maisons et excursions touristiques à Marrakech et dans tout le Maroc.",
    phone: "+212 681 11 71 95",
    whatsapp: "+212681117195",
    email: "velarocars26@gmail.com",
    address: "Avenue Al Mhamid, Marrakech 40000, Maroc",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.123456789!2d-8.008!3d31.629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ0LjQiTiA4wrAwMCc0OC4wIlc!5e0!3m2!1sfr!2sma!4v1234567890",
    social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        youtube: "#",
        tiktok: "#"
    }
};

/* ============================================
   FAQ
   ============================================ */
var FAQ = [
    {
        question: "Quels documents sont nécessaires pour louer un véhicule ?",
        answer: "Vous devez présenter un permis de conduire valide, une pièce d'identité ou un passeport, et une carte bancaire pour la caution."
    },
    {
        question: "La livraison à l'hôtel est-elle possible ?",
        answer: "Oui, nous offrons la livraison et le retrait gratuits à votre hôtel, riad ou à l'aéroport de Marrakech."
    },
    {
        question: "Quelle est la politique d'annulation ?",
        answer: "Annulation gratuite jusqu'à 48h avant la date de réservation. Au-delà, des frais de 30% seront appliqués."
    },
    {
        question: "Les véhicules sont-ils assurés ?",
        answer: "Oui, tous nos véhicules sont couverts par une assurance tous risques avec franchise. Une assurance premium sans franchise est disponible en option."
    },
    {
        question: "Puis-je louer un véhicule pour plusieurs villes ?",
        answer: "Absolument ! Nous proposons des forfaits multi-villes avec des tarifs avantageux. Contactez-nous pour un devis personnalisé."
    },
    {
        question: "Comment fonctionne le paiement ?",
        answer: "Nous acceptons les cartes bancaires, les virements et le paiement en espèces. Un acompte de 30% est requis à la réservation."
    },
    {
        question: "Les excursions incluent-elles le transport ?",
        answer: "La plupart de nos excursions incluent le transport A/R depuis votre hébergement à Marrakech. Vérifiez les détails de chaque excursion."
    },
    {
        question: "Puis-je modifier ma réservation ?",
        answer: "Oui, vous pouvez modifier votre réservation jusqu'à 24h avant la date prévue, sous réserve de disponibilité."
    }
];

/* ============================================
   HELPER FUNCTIONS
   ============================================ */
function formatPrice(price) {
    return Math.round(price / 10.2).toLocaleString('fr-FR') + ' \u20ac';
}

function generateId() {
    return 'RES-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function getStars(rating) {
    var full = Math.floor(rating);
    var half = rating % 1 >= 0.5 ? 1 : 0;
    var empty = 5 - full - half;
    return '\u2605'.repeat(full) + (half ? '\u00BD' : '') + '\u2606'.repeat(empty);
}

function calculateNights(checkIn, checkOut) {
    var start = new Date(checkIn);
    var end = new Date(checkOut);
    var diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
}

function calculateDays(start, end) {
    var s = new Date(start);
    var e = new Date(end);
    var diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
}

function getReservationData() {
    var data = localStorage.getItem('velarocar_reservations');
    return data ? JSON.parse(data) : [];
}

function saveReservationData(data) {
    localStorage.setItem('velarocar_reservations', JSON.stringify(data));
}

function getFavorites() {
    var data = localStorage.getItem('velarocar_favorites');
    return data ? JSON.parse(data) : [];
}

function saveFavorites(favs) {
    localStorage.setItem('velarocar_favorites', JSON.stringify(favs));
}

function getUserData() {
    var data = localStorage.getItem('velarocar_user');
    return data ? JSON.parse(data) : null;
}

function saveUserData(data) {
    localStorage.setItem('velarocar_user', JSON.stringify(data));
}
