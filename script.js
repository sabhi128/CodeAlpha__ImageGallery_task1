document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxMeta = document.getElementById('lightbox-meta');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const overlay = document.querySelector('.lightbox-overlay');

    // State Variables
    let activeCards = Array.from(galleryCards);
    let currentCardIndex = 0;

    // --- Image Loaded Opacity Fade-in Trigger ---
    const gridImages = document.querySelectorAll('.image-wrapper img');
    gridImages.forEach(img => {
        // Add loading class initially
        img.classList.add('img-loading');

        // Check if image is already cached/complete
        if (img.complete) {
            img.classList.remove('img-loading');
            img.classList.add('img-loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.remove('img-loading');
                img.classList.add('img-loaded');
            });
        }
    });

    // --- Initial Staggered Entrance on Load ---
    activeCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
        card.classList.add('show');
    });

    // --- Category Filtering with Staggered Delays ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) return;

            // 1. Swap active filter button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // 2. Fade out all currently visible cards instantly
            const visibleCards = activeCards;
            visibleCards.forEach(card => {
                card.style.transitionDelay = '0s'; // reset delay for fast exit
                card.classList.remove('show');
            });

            // 3. Wait for exit transition (250ms) to update layout
            setTimeout(() => {
                // Toggle card display
                galleryCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });

                // Update active cards array for lightbox navigation
                activeCards = Array.from(document.querySelectorAll('.gallery-card:not(.hide)'));

                // 4. Stagger fade-in the new active cards after a tiny paint frame delay
                setTimeout(() => {
                    activeCards.forEach((card, index) => {
                        card.style.transitionDelay = `${index * 0.04}s`;
                        card.classList.add('show');
                    });
                }, 30);
            }, 250);
        });
    });

    // --- Lightbox Operations ---

    // Open Lightbox
    const openLightbox = (card) => {
        currentCardIndex = activeCards.indexOf(card);
        const cardImg = card.querySelector('img');
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardCategory = card.querySelector('.category-tag').textContent;
        const cardMeta = card.querySelector('.card-meta').textContent;

        lightboxImg.style.animation = 'none'; // reset slide animations
        lightboxImg.src = cardImg.src;
        lightboxImg.alt = cardImg.alt;
        lightboxTitle.textContent = cardTitle;
        lightboxCategory.textContent = cardCategory;
        lightboxMeta.textContent = cardMeta;
        lightboxCounter.textContent = `${currentCardIndex + 1} of ${activeCards.length}`;

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent page scroll
        lightbox.focus();
    };

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Re-enable scroll
        
        // Clear content after animation completes to avoid flashing on re-open
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxImg.alt = '';
            lightboxTitle.textContent = '';
            lightboxCategory.textContent = '';
            lightboxMeta.textContent = '';
            lightboxCounter.textContent = '';
        }, 300);
    };

    // Update Lightbox Image with Slide Transition
    const updateLightboxImage = (index, direction = 'next') => {
        if (activeCards.length === 0) return;
        
        const nextCard = activeCards[index];
        const nextImg = nextCard.querySelector('img');
        const nextTitle = nextCard.querySelector('.card-title').textContent;
        const nextCategory = nextCard.querySelector('.category-tag').textContent;
        const nextMeta = nextCard.querySelector('.card-meta').textContent;

        const outAnim = direction === 'next' ? 'slide-left-out' : 'slide-right-out';
        const inAnim = direction === 'next' ? 'slide-left-in' : 'slide-right-in';

        // Apply exit slide-out animation to the image
        lightboxImg.style.animation = `${outAnim} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards`;

        setTimeout(() => {
            lightboxImg.src = nextImg.src;
            lightboxImg.alt = nextImg.alt;
            lightboxTitle.textContent = nextTitle;
            lightboxCategory.textContent = nextCategory;
            lightboxMeta.textContent = nextMeta;
            lightboxCounter.textContent = `${index + 1} of ${activeCards.length}`;

            // When loaded, trigger entrance slide-in animation
            lightboxImg.onload = () => {
                lightboxImg.style.animation = `${inAnim} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
            };
        }, 250);
    };

    // Next Image
    const nextImage = () => {
        currentCardIndex = (currentCardIndex + 1) % activeCards.length;
        updateLightboxImage(currentCardIndex, 'next');
    };

    // Previous Image
    const prevImage = () => {
        currentCardIndex = (currentCardIndex - 1 + activeCards.length) % activeCards.length;
        updateLightboxImage(currentCardIndex, 'prev');
    };

    // --- Event Listeners ---

    // Open lightbox when card is clicked
    galleryCards.forEach(card => {
        card.addEventListener('click', () => openLightbox(card));
    });

    // Close button click
    closeBtn.addEventListener('click', closeLightbox);

    // Overlay backdrop click to close
    overlay.addEventListener('click', closeLightbox);

    // Navigation buttons
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });
});
