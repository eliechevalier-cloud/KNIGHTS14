// Navigation smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Single data for modals
const singlesData = [
    {
        title: 'OPENING',
        date: 'April 1, 2026',
        label: 'KNIGHTS14 Records',
        place: 'Worldwide',
        genre: 'Electronic Music',
        duration: '4:30',
        description: 'The opening track introduces the sonic universe of KNIGHTS14, setting the stage for an immersive musical journey.'
    },
    {
        title: 'MARATHON',
        date: 'May 1, 2026',
        label: 'KNIGHTS14 Records',
        place: 'Worldwide',
        genre: 'Experimental Electronic',
        duration: '5:45',
        description: 'A continuous exploration of rhythm and space, Marathon challenges conventional song structures.'
    },
    {
        title: 'RECKONING',
        date: 'June 1, 2026',
        label: 'KNIGHTS14 Records',
        place: 'Worldwide',
        genre: 'Ambient Electronic',
        duration: '6:15',
        description: 'Reckoning brings a moment of reflection, blending ethereal soundscapes with deep basslines.'
    },
    {
        title: 'BIRTH',
        date: 'July 1, 2026',
        label: 'KNIGHTS14 Records',
        place: 'Worldwide',
        genre: 'Techno',
        duration: '4:50',
        description: 'Birth concludes the initial chapter, representing renewal and the emergence of new sonic possibilities.'
    }
];

// Modal functionality
const modal = document.getElementById('singleModal');
const closeModal = document.querySelector('.close-modal');

// Add click listeners to gallery items
document.querySelectorAll('.galerie-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        const data = singlesData[index];
        if (data) {
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDate').textContent = data.date;
            document.getElementById('modalLabel').textContent = data.label;
            document.getElementById('modalPlace').textContent = data.place;
            document.getElementById('modalGenre').textContent = data.genre;
            document.getElementById('modalDuration').textContent = data.duration;
            document.getElementById('modalDescription').textContent = data.description;
            modal.classList.add('show');
        }
    });
});

// Close modal when clicking X
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Contact form handling with Formspree via AJAX
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Send to Formspree
        fetch('https://formspree.io/f/mnjbdbzj', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success message
                formMessage.textContent = '✅ Thank you! Your message has been sent. Our team will contact you within 24 hours.';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('success');
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Error message
            formMessage.textContent = '❌ Error sending message. Please try again.';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.classList.remove('error');
            }, 5000);
        });
    });
}

// Add scroll animation for gallery items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.galerie-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Navbar active link highlight on scroll
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#ffd93d';
        }
    });
});

console.log('KNIGHTS14 - Website loaded successfully!');
