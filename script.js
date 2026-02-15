class Auth {
    constructor() {
        this.usersKey = 'electro_users';
        this.currentUserKey = 'electro_current_user';
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(this.usersKey)) || [];
    }

    register(name, email, phone, password) {
        const users = this.getUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already exists!' };
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            phone,
            password,
            role: 'user',
            date: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        this.login(email, password);
        return { success: true };
    }

    login(identifier, password) {
        const users = this.getUsers();
        const user = users.find(u =>
            (u.email === identifier || u.phone === identifier) && u.password === password
        );

        if (user) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(user));
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    logout() {
        localStorage.removeItem(this.currentUserKey);
        window.location.reload();
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.currentUserKey));
    }
}

const auth = new Auth();

document.addEventListener('DOMContentLoaded', () => {
    updateNav();
    initMobileMenu();
    initScrollAnimations();
    initForms();
});

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.card, .section-title, .form-group');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elementsToAnimate.forEach(el => observer.observe(el));
}

function initForms() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;

            const result = auth.register(name, email, phone, password);
            if (result.success) {
                window.location.href = 'index.html';
            } else {
                alert(result.message);
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('identifier').value;
            const password = document.getElementById('password').value;

            const result = auth.login(identifier, password);
            if (result.success) {
                window.location.href = 'index.html';
            } else {
                alert(result.message);
            }
        });
    }

    const adminTableBody = document.getElementById('userTableBody');
    if (adminTableBody) {
        const users = auth.getUsers();
        if (users.length === 0) {
            adminTableBody.innerHTML = '<tr><td colspan="4">No users found.</td></tr>';
        } else {
            adminTableBody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${new Date(user.date).toLocaleDateString()}</td>
                </tr>
            `).join('');
        }
    }
}

function updateNav() {
    const user = auth.getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    const existingAuth = document.getElementById('navAuth');

    if (existingAuth) existingAuth.remove(); // Clean up old structure if present

    // Append auth links nicely
    if (navLinks) {
        const authLi = document.createElement('li');
        if (user) {
            authLi.innerHTML = `
                <span style="color: var(--accent-color); margin-right: 1rem;">Hi, ${user.name}</span>
                <a href="#" onclick="auth.logout()" style="border: 1px solid var(--accent-color); padding: 0.3rem 0.8rem; border-radius: 5px;">Logout</a>
            `;
        } else {
            authLi.innerHTML = `
                <a href="login.html" style="margin-right: 1rem;">Login</a>
                <a href="signup.html" style="border: 1px solid var(--accent-color); padding: 0.3rem 0.8rem; border-radius: 5px; color: var(--accent-color);">Sign Up</a>
            `;
        }
        navLinks.appendChild(authLi);
    }
}
