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
    const portfolioItems = Array.from(portfolioGrid.children);
    let isHovering = false;
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: false, // Ensures animations trigger each time
    });
    // Initially display all items with the "show" class
    portfolioItems.forEach(item => {
        item.classList.add("show");
        item.style.display = "block";
        item.classList.add("aos-animate");
    });
    portfolioItems.forEach(item => {
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
            // portfolioItems.forEach(item => {
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
            portfolioItems.forEach(item => {
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

        const visibleItems = portfolioItems.filter(item => item.classList.contains("show"));

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















    // GALLARYOVERLAY
    // JavaScript code to handle the opening and closing of the gallery overlay
    function openGallery(projectId) {
        const overlay = document.getElementById(projectId);
        if (overlay) {
            overlay.style.display = 'flex'; // Display overlay when clicked
        }
    }

    function closeGallery() {
        const overlays = document.querySelectorAll('.gallery-overlay');
        overlays.forEach(overlay => {
            overlay.style.display = 'none'; // Hide all overlays
        });
    }

    // Ensure these functions are in the global scope
    window.openGallery = openGallery;
    window.closeGallery = closeGallery;

});