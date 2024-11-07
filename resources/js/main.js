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
    // Initialize Typed.js
    // const typedElement = document.querySelector('.typed');
    // if (typedElement) {
    //     const typedStrings = typedElement.getAttribute('data-typed-items').split(',');
    //     new Typed('.typed', {
    //         strings: typedStrings,
    //         typeSpeed: 100,
    //         backSpeed: 50,
    //         backDelay: 2000,
    //         loop: true,
    //         loopCount: Infinity,
    //         showCursor: true,
    //         cursorChar: '|',
    //         autoInsertCss: true
    //     });
    // }
  
// Initialize Typed.js - GLITCH
    const typedElement = document.querySelector('.typed');
    if (typedElement) {
        const typedStrings = typedElement.getAttribute('data-typed-items').split(',');
        new Typed('.typed', {
            strings: typedStrings,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            preStringTyped: (arrayPos, self) => {
                // Apply glitch effect dynamically by updating data-text attribute
                typedElement.setAttribute('data-text', self.strings[arrayPos]);
                typedElement.classList.add('typed-glitch'); // Add the glitch effect class
            },
            onComplete: () => {
                typedElement.classList.remove('typed-glitch'); // Reset effect if needed
            },
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


});