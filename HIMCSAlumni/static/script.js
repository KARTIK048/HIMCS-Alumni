document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // Optional: for hamburger animation
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0'; // Initial state
        observer.observe(el);
    });

    // Active Link Highlighting
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-links a');
    const menuLength = menuItems.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            menuItems[i].className = "active";
        }
    }

    // Directory Search Functionality
    const directorySearch = document.getElementById('directorySearch');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchResults = document.getElementById('searchResults');
    const directoryGrid = document.getElementById('directoryGrid');

    if (directorySearch && directoryGrid) {
        let searchTimeout;

        // Function to perform search
        function performSearch() {
            const searchQuery = directorySearch.value.toLowerCase().trim();
            const alumniCards = directoryGrid.querySelectorAll('.alumni-card');
            let visibleCount = 0;

            alumniCards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                const year = card.getAttribute('data-year').toLowerCase();
                const position = card.getAttribute('data-position').toLowerCase();
                const company = card.getAttribute('data-company').toLowerCase();

                // Search across all fields
                const matchFound = name.includes(searchQuery) ||
                    year.includes(searchQuery) ||
                    position.includes(searchQuery) ||
                    company.includes(searchQuery);

                if (matchFound || searchQuery === '') {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Show/hide clear button
            if (searchQuery) {
                clearSearchBtn.style.display = 'flex';
            } else {
                clearSearchBtn.style.display = 'none';
            }

            // Display search results
            if (searchQuery) {
                searchResults.classList.add('active');
                if (visibleCount === 0) {
                    searchResults.classList.remove('has-results');
                    searchResults.classList.add('no-results');
                    searchResults.innerHTML = '<i class="fas fa-exclamation-circle"></i> No alumni found matching your search.';
                } else {
                    searchResults.classList.remove('no-results');
                    searchResults.classList.add('has-results');
                    searchResults.innerHTML = `<i class="fas fa-check-circle"></i> Found ${visibleCount} alumni matching "${searchQuery}".`;
                }
            } else {
                searchResults.classList.remove('active');
            }
        }

        // Function to clear search
        function clearSearch() {
            directorySearch.value = '';
            clearSearchBtn.style.display = 'none';

            const alumniCards = directoryGrid.querySelectorAll('.alumni-card');
            alumniCards.forEach(card => {
                card.classList.remove('hidden');
            });

            searchResults.classList.remove('active');
            directorySearch.focus();
        }

        // Real-time search with debouncing
        directorySearch.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 300);
        });

        // Clear button click
        clearSearchBtn.addEventListener('click', clearSearch);

        // Search on Enter key
        directorySearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(searchTimeout);
                performSearch();
            }
        });
    }

    // Gallery Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = img.getAttribute('alt');

                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxCaption.innerHTML = caption;
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close functionality
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }

        // Close on clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'block') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
