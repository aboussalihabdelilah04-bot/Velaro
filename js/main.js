/* ============================================
   VelaroCar - Main JavaScript
   Navbar, Scroll, Animations, Loader, Search, Favorites, Notifications
   ============================================ */

(function() {
    'use strict';

    /* ============================================
       LOADER
       ============================================ */
    var loader = document.querySelector('.loader-overlay');
    if (loader) {
        document.body.classList.add('no-scroll');
        function hideLoader() {
            loader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', hideLoader);
        } else {
            hideLoader();
        }
    }

    /* ============================================
       NAVBAR
       ============================================ */
    var navbar = document.querySelector('.navbar');
    var navbarToggle = document.querySelector('.navbar-toggle');
    var navbarNav = document.querySelector('.navbar-nav');

    // Scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Check on page load
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    }

    // Mobile toggle
    if (navbarToggle && navbarNav) {
        navbarToggle.addEventListener('click', function() {
            navbarToggle.classList.toggle('active');
            navbarNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close on link click
        navbarNav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navbarToggle.classList.remove('active');
                navbarNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    /* ============================================
       ACTIVE NAV LINK
       ============================================ */
    function setActiveNavLink() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.navbar-nav a').forEach(function(link) {
            var href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    setActiveNavLink();

    /* ============================================
       SCROLL REVEAL ANIMATIONS
       ============================================ */
    function initScrollReveal() {
        var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
        if (!reveals.length) return;

        // Browsers/WebViews without IntersectionObserver (e.g. Safari < 12.1,
        // old Android WebViews) would leave every .reveal element at opacity:0.
        // Fall back to showing everything so content is never permanently hidden.
        if (typeof IntersectionObserver === 'undefined') {
            reveals.forEach(function(el) {
                el.classList.add('revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(function(el) {
            // Reveal content already inside the initial viewport synchronously.
            // The observer callback is async, so waiting on it keeps above-the-fold
            // product cards invisible for an extra frame + full stagger transition.
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('revealed');
            } else {
                observer.observe(el);
            }
        });
    }
    initScrollReveal();

    /* ============================================
       FAQ ACCORDION
       ============================================ */
    function initFAQ() {
        var faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(function(item) {
            var question = item.querySelector('.faq-question');
            var answer = item.querySelector('.faq-answer');
            var content = item.querySelector('.faq-answer-content');

            if (question && answer && content) {
                question.addEventListener('click', function() {
                    var isActive = item.classList.contains('active');

                    // Close all
                    faqItems.forEach(function(otherItem) {
                        otherItem.classList.remove('active');
                        var otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) otherAnswer.style.maxHeight = '0';
                    });

                    // Toggle current
                    if (!isActive) {
                        item.classList.add('active');
                        answer.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            }
        });
    }
    initFAQ();

    /* ============================================
       SEARCH OVERLAY
       ============================================ */
    var searchOverlay = document.querySelector('.search-overlay');
    var searchBtns = document.querySelectorAll('.navbar-search-btn, .search-trigger');
    var searchClose = document.querySelector('.search-close');
    var searchInput = document.querySelector('.search-input');
    var searchResults = document.querySelector('.search-results');

    function openSearch() {
        if (searchOverlay) {
            searchOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
            if (searchInput) {
                setTimeout(function() { searchInput.focus(); }, 300);
            }
        }
    }

    function closeSearch() {
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            if (searchInput) searchInput.value = '';
            if (searchResults) searchResults.innerHTML = '';
        }
    }

    searchBtns.forEach(function(btn) {
        btn.addEventListener('click', openSearch);
    });

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) closeSearch();
        });
    }

    // Search logic
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var query = this.value.trim().toLowerCase();
            if (query.length < 2) {
                if (searchResults) searchResults.innerHTML = '';
                return;
            }

            var allItems = [];
            if (typeof CARS !== 'undefined') {
                CARS.forEach(function(item) {
                    allItems.push({
                        type: 'Voiture',
                        page: 'cars.html',
                        name: item.name + ' ' + item.brand,
                        detail: item.year + ' · ' + item.fuel + ' · ' + formatPrice(item.pricePerDay) + '/jour',
                        image: item.image,
                        price: formatPrice(item.pricePerDay)
                    });
                });
            }
            if (typeof MOTOS !== 'undefined') {
                MOTOS.forEach(function(item) {
                    allItems.push({
                        type: 'Moto',
                        page: 'motos.html',
                        name: item.name,
                        detail: item.engine + ' · ' + item.type + ' · ' + formatPrice(item.pricePerDay) + '/jour',
                        image: item.image,
                        price: formatPrice(item.pricePerDay)
                    });
                });
            }
            if (typeof HOUSES !== 'undefined') {
                HOUSES.forEach(function(item) {
                    allItems.push({
                        type: 'Maison',
                        page: 'houses.html',
                        name: item.name,
                        detail: item.location + ' · ' + item.bedrooms + ' ch. · ' + formatPrice(item.pricePerNight) + '/nuit',
                        image: item.image,
                        price: formatPrice(item.pricePerNight)
                    });
                });
            }
            if (typeof EXCURSIONS !== 'undefined') {
                EXCURSIONS.forEach(function(item) {
                    allItems.push({
                        type: 'Excursion',
                        page: 'excursions.html',
                        name: item.name,
                        detail: item.city + ' · ' + item.duration + ' · ' + formatPrice(item.price),
                        image: item.image,
                        price: formatPrice(item.price)
                    });
                });
            }
            if (typeof TRANSFERS !== 'undefined') {
                TRANSFERS.forEach(function(item) {
                    allItems.push({
                        type: 'Transfert',
                        page: 'excursions.html',
                        name: item.name,
                        detail: item.city + ' · ' + item.duration + ' · ' + formatPrice(item.price),
                        image: item.image,
                        price: formatPrice(item.price)
                    });
                });
            }

            var results = allItems.filter(function(item) {
                return item.name.toLowerCase().includes(query) ||
                       item.type.toLowerCase().includes(query) ||
                       item.detail.toLowerCase().includes(query);
            }).slice(0, 8);

            if (searchResults) {
                if (results.length === 0) {
                    searchResults.innerHTML = '<div style="padding: 2rem; text-align: center; color: #64748b;">Aucun résultat trouvé</div>';
                } else {
                    searchResults.innerHTML = results.map(function(item) {
                        return '<a href="' + item.page + '" class="search-result-item">' +
                            '<img src="' + item.image + '" alt="' + item.name + '" title="' + item.name + ' - VelaroCar Marrakech" loading="lazy">' +
                            '<div class="search-result-info">' +
                                '<h4>' + item.name + '</h4>' +
                                '<p>' + item.detail + '</p>' +
                            '</div>' +
                            '<span class="search-result-price">' + item.price + '</span>' +
                        '</a>';
                    }).join('');
                }
            }
        });
    }

    // ESC to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearch();
            var modalOverlay = document.querySelector('.modal-overlay.active');
            if (modalOverlay) modalOverlay.classList.remove('active');
        }
    });

    /* ============================================
       FAVORITES
       ============================================ */
    function updateFavCount() {
        if (typeof getFavorites !== 'function') return;
        var favs = getFavorites();
        var favCounts = document.querySelectorAll('.fav-count');
        favCounts.forEach(function(el) {
            el.textContent = favs.length;
            el.style.display = favs.length > 0 ? 'flex' : 'none';
        });
    }

    function toggleFavorite(id) {
        if (typeof getFavorites !== 'function' || typeof saveFavorites !== 'function') return;
        var favs = getFavorites();
        var index = favs.indexOf(id);
        if (index > -1) {
            favs.splice(index, 1);
        } else {
            favs.push(id);
        }
        saveFavorites(favs);
        updateFavCount();

        // Toggle visual state
        document.querySelectorAll('.product-card-fav').forEach(function(btn) {
            if (btn.dataset.id === id) {
                btn.classList.toggle('active', favs.indexOf(id) > -1);
                btn.innerHTML = favs.indexOf(id) > -1 ? '❤️' : '🤍';
            }
        });
    }

    // Init fav buttons
    document.querySelectorAll('.product-card-fav').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(this.dataset.id);
        });
    });

    updateFavCount();

    /* ============================================
       TOAST NOTIFICATIONS
       ============================================ */
    function showToast(type, title, message, duration) {
        duration = duration || 4000;
        var container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        var icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };

        var toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.innerHTML =
            '<i class="fas ' + (icons[type] || icons.info) + ' toast-icon"></i>' +
            '<div class="toast-message">' +
                '<div class="toast-title">' + title + '</div>' +
                '<div class="toast-text">' + message + '</div>' +
            '</div>' +
            '<button class="toast-close" onclick="this.parentElement.remove()">' +
                '<i class="fas fa-times"></i>' +
            '</button>';

        container.appendChild(toast);

        // Animate in
        setTimeout(function() { toast.classList.add('show'); }, 10);

        // Auto remove
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() { toast.remove(); }, 500);
        }, duration);
    }

    /* ============================================
       SMOOTH SCROLL FOR ANCHORS
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    /* ============================================
       COUNTER ANIMATION
       ============================================ */
    function animateCounters() {
        var counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        // Old engines without IntersectionObserver: just set the final value.
        if (typeof IntersectionObserver === 'undefined') {
            counters.forEach(function(el) {
                var target = parseInt(el.dataset.count);
                el.textContent = (el.dataset.prefix || '') + target + (el.dataset.suffix || '');
            });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.dataset.count);
                    var suffix = el.dataset.suffix || '';
                    var prefix = el.dataset.prefix || '';
                    var duration = 2000;
                    var start = 0;
                    var increment = target / (duration / 16);

                    function updateCounter() {
                        start += increment;
                        if (start < target) {
                            el.textContent = prefix + Math.floor(start) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.textContent = prefix + target + suffix;
                        }
                    }
                    updateCounter();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function(el) { observer.observe(el); });
    }
    animateCounters();

    /* ============================================
       BACK TO TOP
       ============================================ */
    var backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================
       EXPOSE GLOBALLY
       ============================================ */
    window.VelaroCar = {
        showToast: showToast,
        toggleFavorite: toggleFavorite,
        openSearch: openSearch,
        closeSearch: closeSearch
    };

})();
