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
                scrollToElement(".result");
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

    // Show custom size input if "Custom" is selected
    const sizeSelect = document.getElementById("sizeSelect");
    const customSizeGroup = document.getElementById("customSizeGroup");
    if (sizeSelect) {
        sizeSelect.addEventListener("change", function() {
            if (sizeSelect.value === "custom") {
                customSizeGroup.style.display = "block";
            } else {
                customSizeGroup.style.display = "none";
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

function maxCaffeineDaily(weight, age) {
    // Max recommended caffeine per kg body weight (in mg)
    const mgMaxAdultPerKg = 6;
    const mgMaxChildPerKg = 3;
    const maxPregnantTotal = 200;
    const maxAdultTotal = 400;

    let maxAmount;
    if (age < 18) {
        maxAmount = Math.min(weight * mgMaxChildPerKg, 100);
    } else {
        maxAmount = Math.min(weight * mgMaxAdultPerKg, maxAdultTotal);
    }
    return maxAmount;
}

function findTolerance(weight, age, unitsWeekly) {
    const baseMaxCaffeine = maxCaffeineDaily(weight, age);
    // Calculate tolerance based on weekly consumption
    const toleranceFactor = Math.min(1.5, 1 + (unitsWeekly / 100));
    return baseMaxCaffeine * toleranceFactor;
}

function lastDrinkTime() {
    // Add loading state
    const resultElement = document.getElementById("result-time");
    const submitButton = document.getElementById("calculateButton");
    const resultSection = document.querySelector(".result");
    
    submitButton.disabled = true;
    resultElement.textContent = "Calculating...";
    resultSection.classList.remove("show"); // Ensure it's hidden during calculation
    resultSection.style.display = "none"; // Ensure it's hidden during calculation
    
    console.log("Starting calculation...");

    // Simulate calculation delay for smoother UX
    setTimeout(() => {
        // getting users input
        const bedtime = document.getElementById("bedtimeInput").value; // Returns HH:mm in 24h format
        const age = document.getElementById("ageInput").value; 
        const weight = document.getElementById("weightInput").value; 
        const unitsWeekly = document.getElementById("unitsWeeklyInput").value; 
        const drink = document.getElementById("drinkSelect").value;
        let size = document.getElementById("sizeSelect").value;
        if (size === "custom") {
            size = document.getElementById("customSizeInput").value;
        }
        
        console.log("Inputs:", { bedtime, age, weight, unitsWeekly, drink, size });

        // check format
        const is24HourFormat = document.getElementById("formatSwitch").checked;

        // Create date object from input time
        const [hours, minutes] = bedtime.split(':');
        const bedDate = new Date();
        bedDate.setHours(parseInt(hours), parseInt(minutes));

        // Calculate last drink time
        bedDate.setHours(calculateLastDrinkTime(bedDate, drink, size, weight, age, unitsWeekly));

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

        console.log("Result time:", resultTime);

        // Display result
        document.getElementById("result-text").textContent = "Latest time for caffeine consumption: ";
        resultElement.textContent = resultTime;
        resultSection.classList.add("show"); // Show the result section
        resultSection.style.display = "block"; // Ensure it's visible
        
        submitButton.disabled = false;
    }, 500);
}

function calculateLastDrinkTime(bedDate, drink, size, weight, age, unitsWeekly) {
    const caffeineContent = {
        espresso: 63,
        filterCoffee: 95,
        nespresso: 60,
        starbucks: 155,
        mcdonalds: 145,
        redbull: 80,
        monster: 160,
        preworkout: 200
    };

    // Calculate actual caffeine intake based on drink size
    const drinkCaffeine = (caffeineContent[drink] || 0) * (size / 240); // Normalize to 8oz (240ml)
    const tolerance = findTolerance(weight, age, unitsWeekly);
    
    // Calculate metabolization rate based on individual factors
    const baseHalfLife = 5; // Base half-life in hours
    const adjustedHalfLife = baseHalfLife * (1 - (age - 25) * 0.01) * (1 + (weight - 70) * 0.005);
    
    let hoursBeforeBed = 4; // Minimum recommended hours
    let currentCaffeineLevel = drinkCaffeine;
    
    // Calculate until caffeine level is below safe threshold
    while (currentCaffeineLevel > tolerance * 0.1) {
        hoursBeforeBed++;
        currentCaffeineLevel = calculateCaffeineLevel(drinkCaffeine, hoursBeforeBed, adjustedHalfLife);
        
        if (hoursBeforeBed > 12) break; // Safety limit
    }

    return Math.max(bedDate.getHours() - hoursBeforeBed, 0);
}

function calculateCaffeineLevel(initialCaffeine, hours, halfLife = 5) {
    return initialCaffeine * Math.pow(0.5, hours / halfLife);
}

// Scroll the result into view after calculation
function scrollToElement(element) {
    const resultElement = document.querySelector(element);
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}