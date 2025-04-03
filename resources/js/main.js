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
        // Don't shuffle if user is hovering over items
        if (isHovering) return;
        
        const visibleItems = portfolioItemsF.filter(item => item.classList.contains("show"));
        if (!visibleItems.length) return;
        
        // 1. First - fade out all items
        visibleItems.forEach(item => {
            item.style.willChange = 'transform, opacity';
            item.style.transition = 'opacity 0.4s ease-out';
            item.style.opacity = '0'; // Fade out
        });
        
        // Wait for fade-out transition to complete
        setTimeout(() => {
            // 2. Record initial positions (while invisible)
            const initialPositions = visibleItems.map(item => {
                const rect = item.getBoundingClientRect();
                return { item: item, rect: rect };
            });
            
            // 3. Shuffle array
            for (let i = visibleItems.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [visibleItems[i], visibleItems[j]] = [visibleItems[j], visibleItems[i]];
            }
            
            // 4. Append items in new order
            requestAnimationFrame(() => {
                const fragment = document.createDocumentFragment();
                visibleItems.forEach(item => fragment.appendChild(item));
                portfolioGrid.appendChild(fragment);
                
                // 5. Measure final positions
                const finalPositions = visibleItems.map(item => {
                    const rect = item.getBoundingClientRect();
                    return { item: item, rect: rect };
                });
                
                // 6. Apply transforms while still invisible
                finalPositions.forEach((finalPos) => {
                    const initialPos = initialPositions.find(pos => pos.item === finalPos.item);
                    const deltaX = initialPos.rect.left - finalPos.rect.left;
                    const deltaY = initialPos.rect.top - finalPos.rect.top;
                    
                    finalPos.item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                    finalPos.item.style.transition = 'none';
                });
                
                // 7. Animate to final positions and fade in
                requestAnimationFrame(() => {
                    visibleItems.forEach((item) => {
                        item.style.transition = 'transform 0.85s ease-out, opacity 0.6s ease-in';
                        item.style.transform = 'translate(0, 0)';
                        item.style.opacity = '1'; // Fade back in
                    });
                    
                    // 8. Clean up after animation completes
                    setTimeout(() => {
                        visibleItems.forEach(item => {
                            item.style.transition = '';
                            item.style.willChange = 'auto';
                        });
                    }, 900);
                });
            });
        }, 450); // Wait just a bit longer than the fade-out animation
    }
    
    // Keep the interval at 5 seconds or longer
    setInterval(shuffleItems, 5500);
    // function shuffleItems() {
    //     if (isHovering) return; // Prevent shuffling when hovering over items

    //     const visibleItems = portfolioItemsF.filter(item => item.classList.contains("show"));

    //     // Shuffle the visible items array
    //     for (let i = visibleItems.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [visibleItems[i], visibleItems[j]] = [visibleItems[j], visibleItems[i]];
    //     }

    //     visibleItems.forEach(item => {
    //         // Assign a random animation class
    //         const randomAnimation = animationClasses[Math.floor(Math.random() * animationClasses.length)];
    //         item.classList.add(randomAnimation);

    //         // Remove the animation class after animation ends
    //         item.addEventListener("animationend", () => {
    //             item.classList.remove(randomAnimation);
    //         });

    //         // Append item back to the grid
    //         portfolioGrid.appendChild(item);
    //     });
    // }

    // Shuffle items every 10 seconds
    // setInterval(shuffleItems, 10000); // Adjust time as needed


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
    function stopSlideshow() {
        // Clear any existing slideshow interval
        if (window.slideshowInterval) {
            clearInterval(window.slideshowInterval);
            window.slideshowInterval = null;
        }
    }
    // Slideshow control functions
    // function startSlideshow() {
    //     stopSlideshow(); // Clear any existing intervals
    //     slideInterval = setInterval(navigateRight, 3000); // Advance every 3 seconds
    // }

    // function stopSlideshow() {
    //     clearInterval(slideInterval);
    // }
    function startSlideshow(galleryId) {
        // Get the current gallery
        const gallery = document.getElementById(galleryId);
        if (!gallery) return;
        
        // Clear any existing slideshow interval
        if (window.slideshowInterval) {
          clearInterval(window.slideshowInterval);
        }
    }
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
        if (!img || !description) return;
        const setDescriptionHeight = () => {
            description.style.height = `${img.clientHeight}px`;
        };
    
        // Use ResizeObserver to handle resizing dynamically
        const resizeObserver = new ResizeObserver(() => {
            setDescriptionHeight();
        });
        if (img) {
            resizeObserver.observe(img);
        }
            
        // Initialize height
        if (img && img.complete) {
            setDescriptionHeight();
        } else if (img) {
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

// // Updated zoom functionality for gallery images
document.addEventListener('DOMContentLoaded', function() {
    initializeZoom();
    const header = document.querySelector('.header');
    if (header && !document.querySelector('.mobile-nav-toggle')) {
      const mobileWrapper = document.createElement('div');
      mobileWrapper.className = 'mobile-nav-wrapper d-lg-none';
      
      // Site name/logo
      const siteName = document.createElement('div');
      siteName.className = 'site-name';
      siteName.textContent = 'Yuri Fung';
      
      // Toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'mobile-nav-toggle';
      toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
      
      mobileWrapper.appendChild(siteName);
      mobileWrapper.appendChild(toggleBtn);
      header.prepend(mobileWrapper);
      
      // Toggle menu
      toggleBtn.addEventListener('click', function() {
        const navmenu = document.querySelector('.navmenu');
        navmenu.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (navmenu.classList.contains('active')) {
          icon.className = 'bi bi-x';
        } else {
          icon.className = 'bi bi-list';
        }
      });
    }

    const headerToggle = document.querySelector('.header-toggle');
    const navmenu = document.querySelector('.navmenu');
    
    headerToggle.addEventListener('click', function() {
      navmenu.classList.toggle('active');
      this.classList.toggle('active');
      
      // Toggle icon between hamburger and X
      if (this.classList.contains('active')) {
        this.classList.remove('bi-list');
        this.classList.add('bi-x');
      } else {
        this.classList.remove('bi-x');
        this.classList.add('bi-list');
      }
    });
    // const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    // // const navmenu = document.querySelector('.navmenu');
    
    // if (mobileNavToggle) {
    //     mobileNavToggle.addEventListener('click', function() {
    //         navmenu.classList.toggle('active');
    //         this.classList.toggle('active');
            
    //         // Toggle icon between hamburger and X
    //         const icon = this.querySelector('i');
    //         if (navmenu.classList.contains('active')) {
    //             icon.className = 'bi bi-x';
    //         } else {
    //             icon.className = 'bi bi-list';
    //         }
    //     });
    // }
    const windowLoaded = new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });
    
    // Create a promise that resolves when images are loaded
    const imagesLoaded = new Promise(resolve => {
        const images = document.querySelectorAll('img');
        let loadedCount = 0;
        
        // If no images, resolve immediately
        if (images.length === 0) {
            resolve();
            return;
        }
        
        // For each image, check if loaded
        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
                if (loadedCount === images.length) resolve();
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === images.length) resolve();
                });
                img.addEventListener('error', () => {
                    loadedCount++;
                    if (loadedCount === images.length) resolve();
                });
            }
        });
    });
    // Create a promise that resolves when fonts are loaded
    const fontsLoaded = new Promise(resolve => {
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(resolve);
        } else {
            // Fallback for browsers not supporting document.fonts
            setTimeout(resolve, 500);
        }
    });
    
    // Wait for all promises to resolve
    Promise.all([windowLoaded, imagesLoaded, fontsLoaded])
        .then(() => {
            // Hide preloader after a short delay to ensure animations are ready
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                if (preloader && preloader.style.display !== 'none') {
                    preloader.style.opacity = '0';
                    preloader.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        
                        // Initialize AOS after preloader is hidden
                        AOS.init({
                            duration: 1000,
                            easing: 'ease-in-out',
                            once: true,
                            mirror: false
                        });
                    }, 500);
                }
            }, 300);
        });
});

// function initializeZoom() {
//     document.querySelectorAll('.zoom-controls .zoom-in').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const container = this.closest('.gallery-images');
//             const imageContainers = container.querySelectorAll('.image-container');
            
//             imageContainers.forEach(imgContainer => {
//                 const currentZoom = parseFloat(imgContainer.dataset.zoomLevel || 1);
//                 const newZoom = Math.min(currentZoom * 1.2, 3); // Max zoom 3x
//                 imgContainer.dataset.zoomLevel = newZoom;
//                 imgContainer.style.transform = `scale(${newZoom})`;
//                 imgContainer.style.transformOrigin = 'top left';
//                 const margin = 10 * (newZoom - 1);
//                 imgContainer.style.margin = `${margin}px`;
//                 imgContainer.style.zIndex = newZoom > 1 ? "5" : "1";
//             });
//             e.stopPropagation();
//         });
//     });
    
//     document.querySelectorAll('.zoom-controls .zoom-out').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const container = this.closest('.gallery-images');
//             const imageContainers = container.querySelectorAll('.image-container');
            
//             imageContainers.forEach(imgContainer => {
//                 const currentZoom = parseFloat(imgContainer.dataset.zoomLevel || 1);
//                 const newZoom = Math.max(currentZoom / 1.2, 0.5); // Min zoom 0.5x
//                 imgContainer.dataset.zoomLevel = newZoom;

//                 imgContainer.style.transform = `scale(${newZoom})`;
//                 imgContainer.style.transformOrigin = 'top left';

//                 const margin = 10 * (newZoom - 1);
//                 imgContainer.style.margin = newZoom > 1 ? `${margin}px` : '10px';
//                 imgContainer.style.zIndex = newZoom > 1 ? "5" : "1";
//             });
//             e.stopPropagation();
//         });
//     });
    
//     document.querySelectorAll('.zoom-controls .zoom-reset').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const container = this.closest('.gallery-images');
//             const imageContainers = container.querySelectorAll('.image-container');
            
//             imageContainers.forEach(imgContainer => {
//                 imgContainer.dataset.zoomLevel = 1;
//                 imgContainer.style.transform = 'scale(1)';
//                 imgContainer.style.margin = '10px';
//                 imgContainer.style.zIndex = "1";
//             });
//             e.stopPropagation();
//         });
//     });

    


// }

// function initializeZoom() {
//     // Zoom in - applies to entire gallery container
//     document.querySelectorAll('.zoom-controls .zoom-in').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const container = this.closest('.gallery-images');
//             const currentZoom = parseFloat(container.dataset.zoomLevel || 1);
//             const newZoom = Math.min(currentZoom * 1.2, 3); // Max zoom 3x
            
//             // Apply zoom to the entire container
//             container.dataset.zoomLevel = newZoom;
//             container.style.transform = `scale(${newZoom})`;
//             container.style.transformOrigin = 'top left';
            
//             e.stopPropagation();
//         });
//     });
    
//     // Zoom out - applies to entire gallery container
//     document.querySelectorAll('.zoom-controls .zoom-out').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const container = this.closest('.gallery-images');
//             const currentZoom = parseFloat(container.dataset.zoomLevel || 1);
//             const newZoom = Math.max(currentZoom / 1.2, 0.5); // Min zoom 0.5x
            
//             // Apply zoom to the entire container
//             container.dataset.zoomLevel = newZoom;
//             container.style.transform = `scale(${newZoom})`;
//             container.style.transformOrigin = 'top left';
            
//             e.stopPropagation();
//         });
//     });
    
//     // Reset zoom - applies to entire gallery container
//     document.querySelectorAll('.zoom-controls .zoom-reset').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const container = this.closest('.gallery-images');
//             container.dataset.zoomLevel = 1;
//             container.style.transform = 'scale(1)';
            
//             e.stopPropagation();
//         });
//     });
// }
function initializeZoom() {
    // Track zoom level
    let zoomLevel = 1;
    const minZoom = 0.5;
    const maxZoom = 2;
    
    // Zoom in - show fewer items but larger
    document.querySelectorAll('.zoom-controls .zoom-in').forEach(button => {
        button.addEventListener('click', function(e) {
            const galleryContent = this.closest('.gallery-content');
            const galleryImages = galleryContent.querySelector('.gallery-images');
            
            zoomLevel = Math.min(zoomLevel * 1.2, maxZoom);
            updateGalleryLayout(galleryImages, zoomLevel);
            e.stopPropagation();
        });
    });
    
    // Zoom out - show more items but smaller
    document.querySelectorAll('.zoom-controls .zoom-out').forEach(button => {
        button.addEventListener('click', function(e) {
            const galleryContent = this.closest('.gallery-content');
            const galleryImages = galleryContent.querySelector('.gallery-images');
            
            zoomLevel = Math.max(zoomLevel / 1.2, minZoom);
            updateGalleryLayout(galleryImages, zoomLevel);
            e.stopPropagation();
        });
    });
    
    // Reset zoom
    document.querySelectorAll('.zoom-controls .zoom-reset').forEach(button => {
        button.addEventListener('click', function(e) {
            const galleryContent = this.closest('.gallery-content');
            const galleryImages = galleryContent.querySelector('.gallery-images');
            
            zoomLevel = 1;
            updateGalleryLayout(galleryImages, zoomLevel);
            e.stopPropagation();
        });
    });
    
    // Function to update gallery layout based on zoom level
    function updateGalleryLayout(galleryImages, zoom) {
        // Base values at zoom level 1
        const baseColumnWidth = 200; // Minimum column width at zoom=1
        const baseGap = 20;         // Gap between items at zoom=1
        
        // Calculate new values based on zoom
        const columnWidth = baseColumnWidth * zoom;
        const gap = baseGap * zoom;
        
        // Apply to gallery grid
        galleryImages.style.gridTemplateColumns = `repeat(auto-fill, minmax(${columnWidth}px, 1fr))`;
        galleryImages.style.gap = `${gap}px`;
        
        // Update image and video container sizes
        const imageContainers = galleryImages.querySelectorAll('.image-container');
        imageContainers.forEach(container => {
            container.style.transform = 'none'; // Remove any previous transforms
            
            // Handle videos specifically within containers
            const video = container.querySelector('video');
            if (video) {
                // Ensure videos have proper dimensions
                video.style.width = '100%';
                video.style.height = 'auto';
                video.style.objectFit = 'contain';
                
                // Apply additional styles for better video display at different zoom levels
                if (zoom > 1) {
                    container.style.overflow = 'visible';
                } else {
                    container.style.overflow = 'hidden';
                }
            }
        });
    }
}
// function initializeZoom() {
//     // Track zoom level
//     let zoomLevel = 1;
//     const minZoom = 0.5;
//     const maxZoom = 2;
    
//     // Zoom in - show fewer items but larger
//     document.querySelectorAll('.zoom-controls .zoom-in').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const galleryContent = this.closest('.gallery-content');
//             const galleryImages = galleryContent.querySelector('.gallery-images');
            
//             zoomLevel = Math.min(zoomLevel * 1.2, maxZoom);
//             updateGalleryLayout(galleryImages, zoomLevel);
//             e.stopPropagation();
//         });
//     });
    
//     // Zoom out - show more items but smaller
//     document.querySelectorAll('.zoom-controls .zoom-out').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const galleryContent = this.closest('.gallery-content');
//             const galleryImages = galleryContent.querySelector('.gallery-images');
            
//             zoomLevel = Math.max(zoomLevel / 1.2, minZoom);
//             updateGalleryLayout(galleryImages, zoomLevel);
//             e.stopPropagation();
//         });
//     });
    
//     // Reset zoom
//     document.querySelectorAll('.zoom-controls .zoom-reset').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const galleryContent = this.closest('.gallery-content');
//             const galleryImages = galleryContent.querySelector('.gallery-images');
            
//             zoomLevel = 1;
//             updateGalleryLayout(galleryImages, zoomLevel);
//             e.stopPropagation();
//         });
//     });
    
//     // Function to update gallery layout based on zoom level
//     function updateGalleryLayout(galleryImages, zoom) {
//         // Base values at zoom level 1
//         const baseColumnWidth = 200; // Minimum column width at zoom=1
//         const baseGap = 20;         // Gap between items at zoom=1
        
//         // Calculate new values based on zoom
//         const columnWidth = baseColumnWidth * zoom;
//         const gap = baseGap * zoom;
        
//         // Apply to gallery grid
//         galleryImages.style.gridTemplateColumns = `repeat(auto-fill, minmax(${columnWidth}px, 1fr))`;
//         galleryImages.style.gap = `${gap}px`;
        
//         // Update image container sizes
//         const imageContainers = galleryImages.querySelectorAll('.image-container');
//         imageContainers.forEach(container => {
//             container.style.transform = 'none'; // Remove any previous transforms
//         });
//     }
// }

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to the clicked button
      this.classList.add('active');
    });
});











document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the container exists
    const container = document.getElementById('project-graph-container');
    if (!container) return;
    
    // Create graph tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'graph-tooltip';
    tooltip.style.opacity = 0;
    container.appendChild(tooltip);
    
    // Project data structured as a graph
    const projectData = {
      nodes: [
        // Core node (center)
        { 
          id: 'you', 
          name: 'Yuri Fung', 
          group: 'core', 
          size: 30,
          description: 'My projects and technologies',
          type: 'person'
        },
        
        // Project nodes
        { 
          id: 'perfecthome', 
          name: 'PerfectHomeFinder', 
          group: 'web-development', 
          size: 15, 
          gallery: 'perfectHomeFinder',
          description: 'Real-time home searching app using AI and data-driven APIs',
          type: 'project' 
        },
        { 
          id: 'trimble', 
          name: 'Trimble Capstone', 
          group: 'ai', 
          size: 15, 
          gallery: 'data2Paper',
          description: 'Data-to-paper solution for research professionals',
          type: 'project' 
        },
        { 
          id: 'sportsphere', 
          name: 'SportSphere', 
          group: 'web-development', 
          size: 15, 
          gallery: 'sportSphere',
          description: 'Sports betting tracker with user authentication',
          type: 'project' 
        },
        // Add more project nodes as needed
      ],
      links: [
        // Connect all projects to the core
        { source: 'you', target: 'perfecthome', value: 5 },
        { source: 'you', target: 'trimble', value: 5 },
        { source: 'you', target: 'sportsphere', value: 5 },
        
        // Connect related projects
        { source: 'perfecthome', target: 'trimble', value: 2 }, // Both use AI
        { source: 'sportsphere', target: 'perfecthome', value: 2 }, // Both web apps
      ]
    };
  
    // Color groups
    const groupColors = {
      'core': '#00796b',
      'web-development': '#2196F3',
      'ai': '#9C27B0',
      'applications': '#FF9800',
      'security': '#F44336',
      'hackathon': '#4CAF50'
    };
  
    // Create and add the legend
    const legend = document.createElement('div');
    legend.className = 'graph-legend';
    let legendContent = `<h5>Project Categories</h5>`;
    
    Object.entries(groupColors).forEach(([group, color]) => {
      if (group === 'core') return; // Skip core node
      
      const formattedLabel = group.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      legendContent += `
        <div class="legend-item">
          <div class="color-box" style="background-color: ${color}"></div>
          <span>${formattedLabel}</span>
        </div>
      `;
    });
    
    legend.innerHTML = legendContent;
    container.appendChild(legend);
    
    // Add control panel
    const controls = document.createElement('div');
    controls.className = 'graph-controls';
    controls.innerHTML = `
      <button class="graph-control-btn" id="reset-camera"><i class="bi bi-arrows-fullscreen"></i> Reset View</button>
      <button class="graph-control-btn" id="toggle-rotation"><i class="bi bi-arrow-repeat"></i> Rotate</button>
    `;
    container.appendChild(controls);
  
    // Initialize the graph
    const Graph = ForceGraph3D()
      .backgroundColor('rgba(0,0,0,0)')
      .graphData(projectData)
      .nodeId('id')
      .nodeVal('size')
      .nodeLabel(node => `${node.name}${node.type === 'project' ? ' (Click to view)' : ''}`)
      .nodeColor(node => groupColors[node.group] || '#00796b')
      .linkWidth('value')
      .linkOpacity(0.6)
      .nodeOpacity(1)
      .nodeThreeObject(node => {
        const group = new THREE.Group();
        
        const material = new THREE.MeshLambertMaterial({ 
          color: groupColors[node.group] || '#00796b',
          transparent: true,
          opacity: 0.9
        });
        
        let geometry;
        // Different shapes for different node types
        if (node.type === 'person') {
          geometry = new THREE.SphereGeometry(node.size/2.5);
        } else {
          geometry = new THREE.OctahedronGeometry(node.size/3, 1);
        }
        
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
        
        // Add glow effect
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: groupColors[node.group] || '#00796b',
          transparent: true,
          opacity: 0.2
        });
        const glowGeometry = node.type === 'person' 
          ? new THREE.SphereGeometry(node.size/2.2) 
          : new THREE.OctahedronGeometry(node.size/2.8, 1);
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glowMesh);
        
        // Add label
        const sprite = new SpriteText(node.name);
        sprite.color = '#ffffff';
        sprite.textHeight = node.type === 'person' ? 6 : 3;
        sprite.position.y = node.size/1.8;
        group.add(sprite);
        
        return group;
      })
      .onNodeClick(node => {
        if (node.gallery) {
          openGallery(node.gallery);
        }
      })
      .onNodeHover(node => {
        container.style.cursor = node ? (node.gallery ? 'pointer' : 'default') : null;
        
        if (node) {
          tooltip.innerHTML = `
            <strong>${node.name}</strong><br>
            ${node.description || ''}
            ${node.gallery ? '<br><em>Click to view gallery</em>' : ''}
          `;
          tooltip.style.opacity = 1;
          
          // Position the tooltip near the mouse
          document.addEventListener('mousemove', updateTooltipPosition);
        } else {
          tooltip.style.opacity = 0;
          document.removeEventListener('mousemove', updateTooltipPosition);
        }
      })
      .enableNodeDrag(false)
      .enableNavigationControls(true)
      .showNavInfo(false)
      .cameraPosition({ z: 140 })
      (container);
      
    // Update tooltip position based on mouse
    function updateTooltipPosition(event) {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left + 15;
      const y = event.clientY - rect.top + 15;
      
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    }
    
    // Add rotation animation
    let rotation = false;
    let angle = 0;
    
    function animate() {
      if (rotation) {
        angle += 0.002;
        const distance = 140;
        Graph.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle)
        });
      }
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Add event listeners for controls
    document.getElementById('reset-camera').addEventListener('click', () => {
      Graph.cameraPosition({ x: 0, y: 0, z: 140 }, { x: 0, y: 0, z: 0 }, 1000);
    });
    
    document.getElementById('toggle-rotation').addEventListener('click', (e) => {
      rotation = !rotation;
      e.target.innerHTML = rotation ? 
        '<i class="bi bi-pause-circle"></i> Stop' : 
        '<i class="bi bi-arrow-repeat"></i> Rotate';
    });
  });






  // GitHub integration
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the container exists
    const githubSection = document.getElementById('github-projects');
    if (!githubSection) return;
    
    const username = 'SUPERINTIALD'; // Your GitHub username
    
    // Load GitHub profile
    fetchGitHubProfile(username);
    
    // Load GitHub trophies
    displayGitHubTrophies(username);
    
    // Load repositories
    fetchGitHubRepos(username);
    
    /**
     * Fetches GitHub user profile data and renders it
     */
    function fetchGitHubProfile(username) {
        const profileContainer = document.getElementById('github-profile');
        
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                profileContainer.innerHTML = `
                    <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-right">
                        <div class="card h-100">
                            <div class="text-center pt-4">
                                <img src="${data.avatar_url}" alt="${username}" class="rounded-circle" width="150">
                            </div>
                            <div class="card-body text-center">
                                <h3 class="card-title">${data.name || username}</h3>
                                <p class="text-muted">${data.bio || ''}</p>
                                <div class="d-flex justify-content-center mb-3">
                                    <div class="px-3"><i class="bi bi-people"></i> ${data.followers} followers</div>
                                    <div class="px-3"><i class="bi bi-person"></i> ${data.following} following</div>
                                </div>
                                <div class="mb-3"><i class="bi bi-code-square"></i> ${data.public_repos} repositories</div>
                                <a href="${data.html_url}" class="btn btn-primary" target="_blank">View Profile</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-6" data-aos="fade-left">
                        <h3>GitHub Activity</h3>
                        <p>Check out my latest projects and contributions on GitHub. I'm actively working on web development, AI, and software engineering projects.</p>
                        <p>My coding activity reflects my interests in ${data.public_repos} public repositories spanning various technologies and domains.</p>
                        <div class="mt-4">
                            <h5>Contribution Statistics</h5>
                            <img src="https://github-readme-stats.vercel.app/api?username=SUPERINTIALD&show_icons=true&icon_color=00796b&title_color=00796b&text_color=000000&bg_color=ffffff&hide_border=false&border_color=00796b" 
                                 alt="${username}'s GitHub stats" class="img-fluid">
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error fetching GitHub profile:', error);
                profileContainer.innerHTML = `<div class="col-12 text-center"><p class="text-danger">Unable to load GitHub profile. Please try again later.</p></div>`;
            });
    }
    
    /**
     * Displays GitHub trophies using the github-profile-trophy service
     */
    function displayGitHubTrophies(username) {
        const trophiesContainer = document.getElementById('github-trophies');
        
        trophiesContainer.innerHTML = `
        `;
    }
    
    
    /**
     * Fetches and displays GitHub repositories
     */
    function fetchGitHubRepos(username) {
        const reposContainer = document.getElementById('github-repositories');
        
        // Show loading indicator
        reposContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading repositories...</span>
                </div>
                <p class="mt-2">Loading repositories...</p>
            </div>
        `;
        
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`)
            .then(response => response.json())
            .then(repos => {
                reposContainer.innerHTML = '<h3 class="col-12 mb-4" data-aos="fade-up">Featured Repositories</h3>';
                
                repos.forEach(repo => {
                    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
                    
                    const repoElement = document.createElement('div');
                    repoElement.className = 'col-md-6 col-lg-4 mb-4';
                    repoElement.setAttribute('data-aos', 'fade-up');
                    repoElement.setAttribute('data-aos-delay', '100');
                    
                    repoElement.innerHTML = `
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text small text-muted">${repo.description || 'No description available'}</p>
                                <div class="mb-2">
                                    <span class="badge bg-primary me-1">${repo.language || 'N/A'}</span>
                                    <small class="text-muted">Updated: ${updatedDate}</small>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <span title="Stars"><i class="bi bi-star"></i> ${repo.stargazers_count}</span>
                                        <span class="ms-2" title="Forks"><i class="bi bi-diagram-2"></i> ${repo.forks_count}</span>
                                    </div>
                                    <a href="${repo.html_url}" class="btn btn-sm btn-outline-primary" target="_blank">View Repo</a>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    reposContainer.appendChild(repoElement);
                });
                
                // Re-initialize AOS for new content
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            })
            .catch(error => {
                console.error('Error fetching repositories:', error);
                reposContainer.innerHTML = `<div class="col-12 text-center"><p class="text-danger">Unable to load repositories. Please try again later.</p></div>`;
            });
    }
});























