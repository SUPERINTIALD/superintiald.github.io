document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: false, //if scroll back up it will animate again
        mirror: false
    });

    // Redirect to Hero section if on root path without a hash
    if (window.location.pathname === "/" && !window.location.hash) {
        scrollToHero();
    }

    /**
     * Scroll to the Hero section smoothly and update the URL hash.
     */
    function scrollToHero() {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
            // Update the URL without affecting the scroll position
            history.replaceState(null, null, '#hero');
        }
    }

    // Scroll-to-Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
        // Reinitialize AOS when scrolling back to the top
        if (window.scrollY === 0) {
            AOS.refresh();
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });



    const scrollToTopBtn1 = document.querySelector(".scroll-to-top-btn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) { // Adjust 300 to control when it appears
        scrollToTopBtn1.classList.add("visible");
        } else {
        scrollToTopBtn1.classList.remove("visible");
        }
    });

    scrollToTopBtn1.addEventListener("click", () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    });
    // Initialize Typed.js
    const typedElementR = document.querySelector('.typed');
    if (typedElementR) {
        const typedStrings = typedElementR.getAttribute('data-typed-items').split(',');
        new Typed('.typed', {
            strings: typedStrings,
            typeSpeed: 70,
            backSpeed: 70,
            backDelay: 2000,
            loop: true,
            loopCount: Infinity,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
  
// Initialize Typed.js - GLITCH
    const typedElement = document.querySelector(".typed-glitch");
    const reflectionElement = document.querySelector(".typed-glitch--reflection");

    if (typedElement && reflectionElement) {
        const typedStrings = typedElement.getAttribute("data-typed-items").split(",");
        
        // Initialize Typed.js
        new Typed(".typed-glitch", {
            strings: typedStrings,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: false,
            onStringTyped: (arrayPos, self) => {
                // Update reflection text with completed string
                reflectionElement.textContent = self.strings[arrayPos];
                reflectionElement.setAttribute("data-text", self.strings[arrayPos]);
            },
            preStringTyped: (arrayPos, self) => {
                reflectionElement.textContent = ""; // Clear reflection
                typedElement.setAttribute("data-text", self.strings[arrayPos]); // Update main text
            }
        }
    
    );
        new Typed(".typed-glitch--reflection", {
            strings: typedStrings,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: false,
            // startDelay: -50, // No delay so it mirrors exactly
        });
    }










    const navmenulinks = document.querySelectorAll('.navmenu a');
    let activeLink = null; // To keep track of the currently active link

    // Function to update active link based on scroll position
    function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 200;
    
    navmenulinks.forEach(link => {
        const section = document.querySelector(link.hash);
        if (section) {
        const { offsetTop, offsetHeight } = section;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeLink !== link) {
            if (activeLink) activeLink.classList.remove('active'); // Remove active class from previous link
            link.classList.add('active'); // Add active class to current link
            activeLink = link; // Update active link reference
            }
        } else {
            link.classList.remove('active');
        }
        }
    });
    }

    // Debounce function to limit the frequency of scrollspy updates
    function debounce(fn, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(fn, delay);
    };
    }

    // Initialize Scrollspy on load and on scroll with debounce
    window.addEventListener('load', updateActiveNavLink);
    document.addEventListener('scroll', debounce(updateActiveNavLink, 15));

    // Select filter buttons, portfolio grid, and portfolio items
    // Portfolio
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioGrid = document.querySelector(".portfolio-grid");
    const portfolioItemsF = Array.from(portfolioGrid.children);
    let isHovering = false;
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: false, // Ensures animations trigger each time
    });
    // Initially display all items with the "show" class
    portfolioItemsF.forEach(item => {
        item.classList.add("show");
        item.style.display = "block";
        item.classList.add("aos-animate");
    });
    portfolioItemsF.forEach(item => {
        item.addEventListener("mouseenter", () => {
          isHovering = true;  // Set flag to true when hovering
        });
        item.addEventListener("mouseleave", () => {
          isHovering = false; // Reset flag when not hovering
        });
      });
    // Filtering Functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // Update active class for buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter items with a smooth transition
            // portfolioItemsF.forEach(item => {
            //     if (filter === "*" || item.classList.contains(filter.substring(1))) {
            //         item.classList.add("show");
            //         item.style.display = "block"; // Ensures item is in the layout
            //         setTimeout(() => item.style.opacity = "1", 10); // Smooth fade-in
            //     } else {
            //         item.style.opacity = "0"; // Smooth fade-out
            //         setTimeout(() => {
            //             item.classList.remove("show");
            //             item.style.display = "none"; // Removes item from layout
            //         }, 300); // Delay matches CSS transition duration
            //     }
            // });
            portfolioItemsF.forEach(item => {
                if (filter === "*" || item.classList.contains(filter.substring(1))) {
                item.classList.remove("hidden");
                //   setTimeout(() => item.classList.add("show"), 10);
                setTimeout(() => item.classList.add("show"), 50); // Smooth fade-in
                // item.classList.remove("hide");
                item.style.display = "block"; // Make it visible
                // item.classList.add("aos-animate"); // Add AOS animation

                } else {
                  item.classList.remove("show");
                  item.classList.add("hidden");
                  setTimeout(() => item.style.display = "none", 400); // Smooth fade-out delay
                //   item.classList.remove("aos-animate"); // Remove AOS animation
                // setTimeout(() => item.style.display = "none", 400); // Slightly delay for smoother transition

                }
            });
        });
    });




        // Shuffling Function with AOS
    // Define possible AOS animation effects
    const animationClasses = ["fade-in", "zoom-in", "slide-up"]; // List of animation classes

    function shuffleItems() {
        if (isHovering) return; // Prevent shuffling when hovering over items

        const visibleItems = portfolioItemsF.filter(item => item.classList.contains("show"));

        // Shuffle the visible items array
        for (let i = visibleItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [visibleItems[i], visibleItems[j]] = [visibleItems[j], visibleItems[i]];
        }

        visibleItems.forEach(item => {
            // Assign a random animation class
            const randomAnimation = animationClasses[Math.floor(Math.random() * animationClasses.length)];
            item.classList.add(randomAnimation);

            // Remove the animation class after animation ends
            item.addEventListener("animationend", () => {
                item.classList.remove(randomAnimation);
            });

            // Append item back to the grid
            portfolioGrid.appendChild(item);
        });
    }

    // Shuffle items every 10 seconds
    setInterval(shuffleItems, 5000); // Adjust time as needed


    // Initialize Isotope
    // const iso = new Isotope('.portfolio-grid', {
    //     itemSelector: '.portfolio-item',
    //     layoutMode: 'fitRows'
    // });

    // // Shuffling function
    // function shuffleItems() {
    //     iso.shuffle(); // Isotope's shuffle method
    // }

    // // Shuffle items every 10 seconds
    // setInterval(shuffleItems, 10000);














    // GALLERYOVERLAY
    // JavaScript code to handle the opening and closing of the gallery overlay

    const galleryOverlays = Array.from(document.querySelectorAll(".gallery-overlay"));
    let currentGalleryId = null;
    let slideInterval;

    // Function to open a specific gallery by ID and start the slideshow
    function openGallery(galleryId) {
        closeAllGalleries(); // Close any open galleries first
        currentGalleryId = galleryId;
        document.getElementById(galleryId).style.display = "flex";
        
        startSlideshow(); // Start the slideshow when gallery is opened
    }

    // Function to close the currently open gallery and stop the slideshow
    function closeGallery() {
        if (currentGalleryId) {
            document.getElementById(currentGalleryId).style.display = "none";
            stopSlideshow(); // Stop the slideshow when gallery is closed
            currentGalleryId = null;
        }
    }

    // Function to close all galleries
    function closeAllGalleries() {
        galleryOverlays.forEach(overlay => overlay.style.display = "none");
    }

    // Slideshow control functions
    // function startSlideshow() {
    //     stopSlideshow(); // Clear any existing intervals
    //     slideInterval = setInterval(navigateRight, 3000); // Advance every 3 seconds
    // }

    // function stopSlideshow() {
    //     clearInterval(slideInterval);
    // }

    // Navigation functions
    function navigateLeft() {
        const currentIndex = galleryOverlays.findIndex(overlay => overlay.id === currentGalleryId);
        const prevIndex = (currentIndex - 1 + galleryOverlays.length) % galleryOverlays.length;
        openGallery(galleryOverlays[prevIndex].id);
    }

    function navigateRight() {
        const currentIndex = galleryOverlays.findIndex(overlay => overlay.id === currentGalleryId);
        const nextIndex = (currentIndex + 1) % galleryOverlays.length;
        openGallery(galleryOverlays[nextIndex].id);
    }

    // Event listener for arrow key navigation
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            navigateLeft();
        } else if (event.key === "ArrowRight") {
            navigateRight();
        }
    });

    // Pause the slideshow on hover over the gallery container
    // const galleryContainer = document.querySelector('.gallery-images'); // Adjust selector if needed
    // if (galleryContainer) {
    //     galleryContainer.addEventListener('mouseenter', stopSlideshow);
    //     galleryContainer.addEventListener('mouseleave', startSlideshow);
    // }

    // Function to close the gallery when clicking outside of gallery content
    document.querySelectorAll('.gallery-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            if (!event.target.closest('.gallery-content')) {
                closeGallery();
            }
        });
    });

    // Expose functions to the global scope
    window.openGallery = openGallery;
    window.closeGallery = closeGallery;
    window.navigateLeft = navigateLeft;
    window.navigateRight = navigateRight;
    
    // document.querySelectorAll('.image-container').forEach(container => {
    //     container.addEventListener('mouseenter', () => {
    //         const description = container.querySelector('.description');
    //         description.style.opacity = '1';
    //         description.style.left = '100%';
    //         description.style.zIndex = '10';
    //     });
    
    //     container.addEventListener('mouseleave', () => {
    //         const description = container.querySelector('.description');
    //         description.style.opacity = '0';
    //         description.style.left = '100%';
    //         description.style.zIndex = '1';
    //     });
    // });
    document.querySelectorAll('.image-container').forEach(container => {
        const img = container.querySelector('img');
        const description = container.querySelector('.description');
    
        const setDescriptionHeight = () => {
            description.style.height = `${img.clientHeight}px`;
        };
    
        // Use ResizeObserver to handle resizing dynamically
        const resizeObserver = new ResizeObserver(() => {
            setDescriptionHeight();
        });
        resizeObserver.observe(img);
    
        // Initialize height
        if (img.complete) {
            setDescriptionHeight();
        } else {
            img.onload = setDescriptionHeight;
        }
    });
    window.addEventListener('resize', () => {
        document.querySelectorAll('.image-container').forEach(container => {
            const img = container.querySelector('img');
            const description = container.querySelector('.description');
            description.style.height = `${img.clientHeight}px`;
        });
    });
    
    
    // Ensure these functions are in the global scope
    // const portfolioItems = Array.from(document.querySelectorAll(".portfolio-item"));
    // const galleryOverlay = document.querySelector(".gallery-overlay");
    // const galleryContent = document.querySelector(".gallery-content");
    // const galleryImagesContainer = document.querySelector(".gallery-images");
    // const galleryTitle = document.querySelector(".gallery-content h3");
    // const galleryDescription = document.querySelector(".gallery-content p");

    // let currentCategory = "*"; // Default to "All"
    // let currentIndex = 0;

    // // Open Gallery Function
    // function openGallery(category, index) {
    //     currentCategory = category;
    //     currentIndex = index;
    //     displayGalleryItem(currentCategory, currentIndex);
    //     galleryOverlay.style.display = "flex";
    // }

    // // Display the specific project in the gallery
    // function displayGalleryItem(category, index) {
    //     // Filter items based on category
    //     const items = category === "*" ? portfolioItems : portfolioItems.filter(item => item.classList.contains(category));

    //     // Get the project data
    //     const selectedItem = items[index];
    //     const title = selectedItem.querySelector(".overlay h4").textContent;
    //     const description = selectedItem.querySelector(".overlay p").textContent;
    //     const imagePaths = Array.from(selectedItem.querySelectorAll("img")).map(img => img.src);

    //     // Set the gallery content
    //     galleryTitle.textContent = title;
    //     galleryDescription.textContent = description;
    //     galleryImagesContainer.innerHTML = ""; // Clear previous images
    //     imagePaths.forEach(path => {
    //         const img = document.createElement("img");
    //         img.src = path;
    //         img.classList.add("grid-item--small");
    //         galleryImagesContainer.appendChild(img);
    //     });
    // }

    // // Close Gallery
    // function closeGallery() {
    //     galleryOverlay.style.display = "none";
    // }

    // // Navigate to the previous project in the selected category
    // function navigateLeft() {
    //     const items = currentCategory === "*" ? portfolioItems : portfolioItems.filter(item => item.classList.contains(currentCategory));
    //     currentIndex = (currentIndex - 1 + items.length) % items.length; // Wrap around if needed
    //     displayGalleryItem(currentCategory, currentIndex);
    // }

    // // Navigate to the next project in the selected category
    // function navigateRight() {
    //     const items = currentCategory === "*" ? portfolioItems : portfolioItems.filter(item => item.classList.contains(currentCategory));
    //     currentIndex = (currentIndex + 1) % items.length; // Wrap around if needed
    //     displayGalleryItem(currentCategory, currentIndex);
    // }

    // // Attach event listeners to gallery navigation buttons
    // document.querySelector(".gallery-arrow-left").addEventListener("click", navigateLeft);
    // document.querySelector(".gallery-arrow-right").addEventListener("click", navigateRight);
    // document.querySelector(".close-button").addEventListener("click", closeGallery);

    // // Attach click event to each portfolio item to open the gallery
    // portfolioItems.forEach((item, index) => {
    //     item.addEventListener("click", () => {
    //         const category = Array.from(item.classList).find(cls => cls !== "portfolio-item"); // Get first category
    //         openGallery(category, index);
    //     });
    // });


});




// Add to your main.js file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize zoom functionality
    initializeZoom();
});

function initializeZoom() {
    // Add zoomable-image class to all gallery images
    document.querySelectorAll('.gallery-images .image-container img').forEach(img => {
        img.classList.add('zoomable-image');
        img.dataset.zoomLevel = '1';
    });
    
    // Setup zoom in buttons
    document.querySelectorAll('.zoom-in').forEach(button => {
        button.addEventListener('click', function(e) {
            const container = this.closest('.gallery-images');
            const images = container.querySelectorAll('.zoomable-image');
            
            images.forEach(img => {
                const currentZoom = parseFloat(img.dataset.zoomLevel);
                const newZoom = Math.min(currentZoom * 1.2, 3); // Max zoom 3x
                img.dataset.zoomLevel = newZoom;
                img.style.transform = `scale(${newZoom})`;
            });
            e.stopPropagation();
        });
    });
    
    // Setup zoom out buttons
    document.querySelectorAll('.zoom-out').forEach(button => {
        button.addEventListener('click', function(e) {
            const container = this.closest('.gallery-images');
            const images = container.querySelectorAll('.zoomable-image');
            
            images.forEach(img => {
                const currentZoom = parseFloat(img.dataset.zoomLevel);
                const newZoom = Math.max(currentZoom / 1.2, 0.5); // Min zoom 0.5x
                img.dataset.zoomLevel = newZoom;
                img.style.transform = `scale(${newZoom})`;
            });
            e.stopPropagation();
        });
    });
    
    // Setup zoom reset buttons
    document.querySelectorAll('.zoom-reset').forEach(button => {
        button.addEventListener('click', function(e) {
            const container = this.closest('.gallery-images');
            const images = container.querySelectorAll('.zoomable-image');
            
            images.forEach(img => {
                img.dataset.zoomLevel = '1';
                img.style.transform = 'scale(1)';
            });
            e.stopPropagation();
        });
    });
}