/* =========================================
   1. MOBILE MENU (SLIDE-IN + CLICK OUTSIDE)
   ========================================= */
const navLinks = document.getElementById('navLinks');
// Select the menu button using its class (since we changed it to an icon)
const menuBtn = document.querySelector('.menu-btn');

// Function to toggle the menu open/close
function toggleMenu() {
    navLinks.classList.toggle('active');
}

// Logic to close the menu when clicking outside of it
document.addEventListener('click', function(event) {
    // Check if the click is INSIDE the menu or ON the button
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnBtn = menuBtn.contains(event.target);

    // If the menu is open AND the click is NOT inside menu AND NOT on button -> Close it
    if (navLinks.classList.contains('active') && !isClickInsideMenu && !isClickOnBtn) {
        navLinks.classList.remove('active');
    }
});


/* =========================================
   2. HERO SLIDER (SMOOTH ANIMATION - FIXED IMAGES)
   ========================================= */
const heroBg = document.getElementById('hero-bg');
const heroTitle = document.getElementById('hero-title');

// Only run this code if we are on the Home Page (elements exist)
if (heroBg && heroTitle) {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
            title: "We Don't Guess. <br><span style='color:#f97316'>We Analyze.</span>"
        },
        {
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
            title: "Digital Growth. <br><span style='color:#f97316'>Simplified.</span>"
        },
        {
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
            title: "We work until you are <br><span style='color:#f97316'>100% Satisfied.</span><br><span style='font-size:1.5rem; color:white;'>No extra charges.</span>"
        }
    ];

    let currentSlide = 0;

    function changeHero() {
        // Step 1: Fade Out TEXT Only
        heroTitle.classList.add('fade-out');
        // (අපි මෙතන තිබ්බ heroBg.style.opacity = '0.2'; පේළිය අයින් කළා)

        // Step 2: Change Content after 0.8 seconds
        setTimeout(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Image changes smoothly thanks to CSS transition
            heroBg.style.backgroundImage = `url('${slides[currentSlide].image}')`;
            heroTitle.innerHTML = slides[currentSlide].title;
            
            // Step 3: Fade In TEXT Only
            // (අපි මෙතන තිබ්බ heroBg.style.opacity = '0.4'; පේළිය අයින් කළා)
            heroTitle.classList.remove('fade-out'); 
            
        }, 800); 
    }

    // Change slide every 6 seconds
    setInterval(changeHero, 6000); 
}


/* =========================================
   3. WHATSAPP FORM INTEGRATION
   ========================================= */

// ⚠️ වැදගත්: ඔයාගේ WhatsApp නම්බර් එක මෙතනට දාන්න (94...)
const myNumber = "94700000000"; 


// --- A. HOME PAGE FORM HANDLER ---
const homeForm = document.getElementById('homeContactForm');
if (homeForm) {
    homeForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page reload
        
        const name = document.getElementById('name').value;
        const business = document.getElementById('businessName').value;
        const service = document.getElementById('serviceSelection').value;

        const msg = `Hi BizMax (Home), I am ${name}. \nBusiness: ${business}. \nSelected Service: ${service}`;
        
        // Open WhatsApp
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}


// --- B. SERVICES PAGE FORM HANDLER ---
const servicesForm = document.getElementById('servicesContactForm');
if (servicesForm) {
    servicesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('serviceName').value;
        const business = document.getElementById('serviceBusiness').value;
        const userDescription = document.getElementById('serviceMessage').value;

        const msg = `Hi BizMax (Services), I am ${name}. \nBusiness: ${business}. \nRequirement: ${userDescription}`;
        
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}


// --- C. PRICING PAGE FORM HANDLER (Multi-Select) ---
const pricingForm = document.getElementById('pricingContactForm');
if (pricingForm) {
    pricingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('pName').value;
        const business = document.getElementById('pBusiness').value;
        
        // 1. Get all checked checkboxes (Chips)
        const checkedBoxes = document.querySelectorAll('.service-chip input:checked');
        
        // 2. Collect values into an array
        let selectedServices = [];
        checkedBoxes.forEach((checkbox) => {
            selectedServices.push(checkbox.value);
        });
        
        // 3. Create a string list
        let servicesString = selectedServices.length > 0 ? selectedServices.join(', ') : "No specific services selected";

        const msg = `Hi BizMax (Custom Plan), I am ${name}. \nBusiness: ${business}. \n\nI want a quote for: \n👉 ${servicesString}`;
        
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}