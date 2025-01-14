// Define setDarkMode function first
function setDarkMode(isDark) {
    const darkModeIcon = document.getElementById("darkModeIcon");
    const darkModeIconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
    `;
    const lightModeIconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    `;
    document.documentElement.classList.toggle('dark-mode', isDark);
    if (darkModeIcon) {
        darkModeIcon.innerHTML = isDark ? lightModeIconSVG : darkModeIconSVG;
    }
    localStorage.setItem('darkMode', isDark);
}

// Ensure darkModeToggle and darkModeIcon are properly initialized
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Single event listener for dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = !document.documentElement.classList.contains('dark-mode');
            setDarkMode(isDarkMode);
        });
    }

    // Initialize dark mode once
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    // Add event listener for CTA button
    const ctaButton = document.getElementById("cta");
    if (ctaButton) {
        ctaButton.addEventListener("click", () => {
            document.getElementById("calculator").scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            document.getElementById("bedtimeInput").focus();
        });
    }

    // Add input validation
    const bedtimeInput = document.getElementById("bedtimeInput");
    if (bedtimeInput) {
        bedtimeInput.addEventListener("change", (e) => {
            if (e.target.value) {
                lastDrinkTime();
                scrollToResult();
            }
        });
    }

    // Format switch handler
    const formatSwitch = document.getElementById("formatSwitch");
    if (formatSwitch) {
        formatSwitch.addEventListener("change", function() {
            const bedtimeInput = document.getElementById("bedtimeInput");
            const time = bedtimeInput.value;
            
            if (time) {
                lastDrinkTime(); // Update display format if there's a time set
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            optimizedScroll(target, {
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Optimize scroll performance
    let scrollTimeout;
    function optimizedScroll(element, options) {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            element.scrollIntoView(options);
        });
    }

    // Add touch feedback
    const buttons = document.querySelectorAll('.modern-button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.opacity = '0.7';
        }, { passive: true });
        
        button.addEventListener('touchend', () => {
            button.style.opacity = '1';
        }, { passive: true });
    });

    // Debounce resize handler
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle resize events efficiently
    const handleResize = debounce(() => {
        // Adjust layout if needed
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('mobile', isMobile);
    }, 250);

    window.addEventListener('resize', handleResize, { passive: true });
});

function lastDrinkTime() {
    // Add loading state
    const resultElement = document.getElementById("result-time");
    const submitButton = document.querySelector('button[onclick="lastDrinkTime()"]');
    
    submitButton.disabled = true;
    resultElement.textContent = "Calculating...";
    
    // Simulate calculation delay for smoother UX
    setTimeout(() => {
        const userBedtime = document.getElementById("bedtimeInput").value; // Returns HH:mm in 24h format
        const is24HourFormat = document.getElementById("formatSwitch").checked;

        // Create date object from input time
        const [hours, minutes] = userBedtime.split(':');
        const bedDate = new Date();
        bedDate.setHours(parseInt(hours), parseInt(minutes));

        // Subtract 6 hours for caffeine cutoff
        bedDate.setHours(bedDate.getHours() - 6);

        // Format the result time
        let resultTime;
        if (is24HourFormat) {
            resultTime = bedDate.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit'
            });
        } else {
            resultTime = bedDate.toLocaleTimeString('en-US', { 
                hour12: true, 
                hour: 'numeric', 
                minute: '2-digit'
            });
        }

        // Display result
        document.getElementById("result-text").textContent = "Latest time for caffeine consumption: ";
        resultElement.textContent = resultTime;
        
        submitButton.disabled = false;
    }, 500);
}

// Scroll the result into view after calculation
function scrollToResult() {
    const resultElement = document.querySelector('.result');
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}