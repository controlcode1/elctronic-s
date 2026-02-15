// Contact Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

function handleContactSubmit(e) {
    e.preventDefault();

    const formData = {
        id: Date.now(),
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        date: new Date().toISOString(),
        status: 'unread'
    };

    // Validate
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Save to localStorage
    try {
        let contacts = JSON.parse(localStorage.getItem('contactMessages')) || [];
        contacts.unshift(formData);
        localStorage.setItem('contactMessages', JSON.stringify(contacts));

        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');

        // Reset form
        document.getElementById('contactForm').reset();
    } catch (error) {
        showToast('Error sending message. Please try again.', 'error');
        console.error(error);
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast show ' + type;

    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}
