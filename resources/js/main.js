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

// Add this to your main.js file
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