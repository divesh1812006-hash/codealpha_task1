document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.image-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentImages = Array.from(galleryItems);
    let currentIndex = 0;

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter images
            currentImages = Array.from(galleryItems).filter(item => {
                const category = item.getAttribute('data-category');
                const isVisible = filterValue === 'all' || category === filterValue;
                item.style.display = isVisible ? 'block' : 'none';
                item.style.opacity = isVisible ? '1' : '0';
                return isVisible;
            });
            // Reset index to 0 when filtering
            currentIndex = 0;
        });
    });

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const visibleItems = Array.from(document.querySelectorAll('.image-item[style*="block"]'));
            currentIndex = visibleItems.indexOf(item);
            
            if (currentIndex !== -1) {
                lightbox.style.display = 'flex';
                lightboxImage.src = item.querySelector('img').src;
                lightboxImage.alt = item.querySelector('img').alt;
            }
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Navigation function
    function navigate(direction) {
        if (currentImages.length === 0) return;
        
        currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
        const newImageSrc = currentImages[currentIndex].querySelector('img').src;
        const newImageAlt = currentImages[currentIndex].querySelector('img').alt;
        
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = newImageSrc;
            lightboxImage.alt = newImageAlt;
            lightboxImage.style.opacity = '1';
        }, 300); // Wait for the fade out to complete
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(-1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                navigate(1);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        }
    });
});