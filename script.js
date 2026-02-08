/* 1. Mobile Menu Toggle */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

/* 2. Hero Slider (Home Page Only) */
const heroBg = document.getElementById('hero-bg');
const heroTitle = document.getElementById('hero-title');

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
            title: "100% Satisfaction. <br><span style='color:#f97316'>Guaranteed.</span>"
        }
    ];

    let currentSlide = 0;

    function changeHero() {
        heroTitle.style.transition = 'all 0.5s ease-in';
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            heroBg.style.backgroundImage = `url('${slides[currentSlide].image}')`;
            heroTitle.innerHTML = slides[currentSlide].title;
            
            heroTitle.style.transition = 'none';
            heroTitle.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.8s ease-out';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateX(0)';
            }, 50);
        }, 500);
    }
    setInterval(changeHero, 5000);
}

/* -----------------------------------------------
   3. FORM HANDLERS (Whatsapp Integration)
----------------------------------------------- */

const myNumber = "94700000000"; // ඔබේ නම්බර් එක මෙතනට

// A. HOME PAGE FORM (With Dropdown)
const homeForm = document.getElementById('homeContactForm');
if (homeForm) {
    homeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const business = document.getElementById('businessName').value;
        const service = document.getElementById('serviceSelection').value; // Dropdown Value

        const msg = `Hi BizMax (Home), I am ${name}. \nBusiness: ${business}. \nSelected Service: ${service}`;
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}

// B. SERVICES PAGE FORM (With Text Area - "What do you want to do?")
const servicesForm = document.getElementById('servicesContactForm');
if (servicesForm) {
    servicesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('serviceName').value;
        const business = document.getElementById('serviceBusiness').value;
        const userDescription = document.getElementById('serviceMessage').value; // Text Area Value

        const msg = `Hi BizMax (Services), I am ${name}. \nBusiness: ${business}. \nRequirement: ${userDescription}`;
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}

/* -----------------------------------------------
   C. PRICING PAGE FORM (Checkbox Chips)
----------------------------------------------- */
const pricingForm = document.getElementById('pricingContactForm');

if (pricingForm) {
    pricingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('pName').value;
        const business = document.getElementById('pBusiness').value;
        
        // 1. Get all checked checkboxes
        const checkedBoxes = document.querySelectorAll('.service-chip input:checked');
        
        // 2. Extract values into an array
        let selectedServices = [];
        checkedBoxes.forEach((checkbox) => {
            selectedServices.push(checkbox.value);
        });
        
        // 3. Convert array to string (e.g., "Logo, Web, SEO")
        let servicesString = selectedServices.length > 0 ? selectedServices.join(', ') : "No specific services selected";

        const myNumber = "94700000000"; // ඔබේ නම්බර් එක
        
        // 4. Create Message
        const msg = `Hi BizMax (Custom Plan), I am ${name}. \nBusiness: ${business}. \n\nI want a quote for: \n👉 ${servicesString}`;
        
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    });
}