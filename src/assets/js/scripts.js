// scripts.js
function restartApp() {
    sessionStorage.clear();  // Clears all session storage data
    localStorage.clear();    // Clears all local storage data (if used)
    location.href = location.origin; // Reloads the website from the root (like a fresh visit)
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Preloader
window.addEventListener('load', () => {
    document.getElementById('preloader').style.display = 'none';
});

// Back to Top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.style.display = 'block';
    else backToTop.style.display = 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Counter animation with Intersection Observer
const counterSection = document.querySelector('.row.mt-4.text-center');
const counters = document.querySelectorAll('.counter');

const countUp = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = 0; // Reset to 0 each time
    counter.innerText = count;
    const speed = 200;
    const increment = target / speed;

    const updateCounter = () => {
        const current = +counter.innerText;
        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target;
        }
    };
    updateCounter();
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => countUp(counter));
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the section is visible
});

observer.observe(counterSection);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Add this to your existing scripts.js

// Animation for CTA section
const animateElements = document.querySelectorAll('.animate__animated');
const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateElements.forEach(el => {
                const animation = el.getAttribute('data-animate');
                const delay = el.getAttribute('data-delay') || '0s';
                el.style.animation = `${animation} 0.8s ease ${delay} forwards`;
                el.style.opacity = '1'; // Start hidden
            });
        } else {
            // Reset animation when out of view
            animateElements.forEach(el => {
                el.style.animation = 'none';
                el.style.opacity = '0';
            });
        }
    });
}, { threshold: 0.3 });

ctaObserver.observe(document.querySelector('.cta-section'));
// document.getElementById("contactForm").addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get form values
//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const phone = document.getElementById("phone").value;
//     const service = document.getElementById("service").value;
//     const message = document.getElementById("message").value;

//     // Prepare data
//     const formData = { name, email, phone, service, message };

//     // Send data to the server
//     // try {
//     //     const response = await fetch("http://localhost:5000/send-email", {
//     //         method: "POST",
//     //         headers: {
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify(formData)
//     //     });


//         // const data = await response.json();
//     //     document.getElementById("responseMessage").innerText = data.message;
//     //     document.getElementById("responseMessage").style.color = "green";

//     //     // Clear form fields after submission
//     //     document.getElementById("contactForm").reset();
//     // } catch (error) {
//     //     document.getElementById("responseMessage").innerText = "Error sending request. Please try again.";
//     //     document.getElementById("responseMessage").style.color = "red";
//     // }
//     console.log(formData)
// });
