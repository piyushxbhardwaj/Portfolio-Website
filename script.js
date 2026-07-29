// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle hamburger icon between bars and xmark
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Sticky Navigation Box Shadow on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        navbar.style.padding = '1rem 20px';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '1.5rem 20px';
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const checkReveals = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight + 100) {
            el.classList.add('active');
        }
    });
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealOptions = {
    threshold: 0.02,
    rootMargin: "0px 0px 100px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Run immediate reveal checks
window.addEventListener('DOMContentLoaded', checkReveals);
window.addEventListener('load', checkReveals);
window.addEventListener('scroll', checkReveals);

// Update Active Nav Link on Scroll
const sections = document.querySelectorAll('section, header, footer');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["AI Engineer", "Software Engineer", "Full Stack Developer", "Agentic Systems Architect"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (!typedTextSpan || !cursorSpan) return;
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (!typedTextSpan || !cursorSpan) return;
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const categories = (card.getAttribute('data-category') || '').split(' ');
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// Dynamic GitHub Repositories Synchronization
document.addEventListener("DOMContentLoaded", () => {
    const username = "piyushxbhardwaj";
    const projectsGrid = document.querySelector(".projects-grid");
    if (!projectsGrid) return;
    
    // 1. Gather all repository names already rendered statically in the HTML
    const existingRepos = new Set();
    document.querySelectorAll(".projects-grid .project-card").forEach(card => {
        const githubLink = card.querySelector('a[href^="https://github.com/piyushxbhardwaj/"]');
        if (githubLink) {
            const urlParts = githubLink.href.split('/');
            const repoName = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
            if (repoName) {
                existingRepos.add(repoName.trim().toLowerCase());
            }
        }
    });

    // 2. Helper to determine matching categories based on repo keywords
    function getRepoCategory(repo) {
        const categories = [];
        const name = repo.name.toLowerCase();
        const desc = (repo.description || '').toLowerCase();
        const lang = (repo.language || '').toLowerCase();
        const topics = repo.topics || [];
        
        // AI / ML Check
        if (
            name.includes('ai') || name.includes('gpt') || name.includes('rag') || name.includes('bot') || name.includes('agent') || name.includes('model') || name.includes('nlp') || name.includes('predict') || name.includes('learn') ||
            desc.includes('ai') || desc.includes('gpt') || desc.includes('rag') || desc.includes('bot') || desc.includes('agent') || desc.includes('deep learning') || desc.includes('machine learning') || desc.includes('langgraph') || desc.includes('langchain') ||
            topics.includes('ai') || topics.includes('machine-learning') || topics.includes('deep-learning') || topics.includes('rag') || topics.includes('llm') || topics.includes('random-forest') || topics.includes('classification')
        ) {
            categories.push('ai');
        }
        
        // Frontend Check
        if (
            lang === 'javascript' || lang === 'typescript' || lang === 'html' || lang === 'css' || lang === 'swift' ||
            name.includes('frontend') || name.includes('react') || name.includes('nextjs') || name.includes('ui') || name.includes('ios') ||
            desc.includes('frontend') || desc.includes('react') || desc.includes('ui') || desc.includes('website') || desc.includes('swiftui') ||
            topics.includes('react') || topics.includes('frontend') || topics.includes('nextjs') || topics.includes('ui') || topics.includes('swiftui') || topics.includes('ios')
        ) {
            categories.push('frontend');
        }
        
        // Backend Check
        if (
            lang === 'python' || lang === 'java' || lang === 'go' || lang === 'rust' || lang === 'abap' || lang === 'c++' || lang === 'c' || lang === 'sql' || lang === 'php' || lang === 'jupyter notebook' ||
            name.includes('backend') || name.includes('api') || name.includes('server') || name.includes('db') || name.includes('bot') ||
            desc.includes('backend') || desc.includes('api') || desc.includes('server') || desc.includes('database') || desc.includes('fastapi') || desc.includes('streamlit') ||
            topics.includes('backend') || topics.includes('api') || topics.includes('django') || topics.includes('fastapi') || topics.includes('spring-boot')
        ) {
            categories.push('backend');
        }
        
        // Fallback
        if (categories.length === 0) {
            if (['html', 'css', 'javascript', 'typescript', 'swift'].includes(lang)) {
                categories.push('frontend');
            } else {
                categories.push('backend');
            }
        }
        
        return categories.join(' ');
    }

    // Helper to format repository titles nicely
    function formatRepoName(name) {
        return name
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    }

    // 3. Fetch public repositories from GitHub
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch public repositories from GitHub");
            }
            return response.json();
        })
        .then(repos => {
            if (!Array.isArray(repos)) return;
            // Filter out forks and repositories already rendered statically
            const newRepos = repos.filter(repo => {
                if (repo.fork) return false;
                const repoKey = repo.name.trim().toLowerCase();
                return !existingRepos.has(repoKey);
            });
            
            if (newRepos.length === 0) return;

            // Render each repository as a project card in the grid
            newRepos.forEach(repo => {
                const category = getRepoCategory(repo);
                const title = formatRepoName(repo.name);
                const description = repo.description || "No description provided. Click the link below to explore the code on GitHub.";
                
                // Collect tech tags (language + top topics)
                const tagsSet = new Set();
                if (repo.language) tagsSet.add(repo.language);
                if (repo.topics) {
                    repo.topics.slice(0, 4).forEach(topic => {
                        if (topic.length <= 4) {
                            tagsSet.add(topic.toUpperCase());
                        } else {
                            tagsSet.add(topic.charAt(0).toUpperCase() + topic.slice(1));
                        }
                    });
                }
                const tags = Array.from(tagsSet);

                // Create Card element
                const card = document.createElement("div");
                card.className = "project-card filter-item";
                card.setAttribute("data-category", category);
                
                // Check if card matches active filter button to avoid hidden states on load
                const activeFilter = document.querySelector(".filter-btn.active");
                if (activeFilter) {
                    const activeFilterVal = activeFilter.getAttribute("data-filter");
                    const cardCats = category.split(' ');
                    if (activeFilterVal !== 'all' && !cardCats.includes(activeFilterVal)) {
                        card.classList.add("hide");
                    }
                }

                // Render interior HTML matching original portfolio design
                card.innerHTML = `
                    <div class="project-image dynamic-repo-image">
                        <div class="repo-visual-fallback">
                            <i class="fa-brands fa-github"></i>
                            <span class="repo-lang-label">${repo.language || 'Code'}</span>
                        </div>
                        <div class="project-links-overlay">
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="GitHub Repository"><i class="fa-brands fa-github"></i></a>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">${title}</h3>
                        <p class="project-description">${description}</p>
                        ${tags.length > 0 ? `<p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;"><strong>Built with:</strong></p>` : ''}
                        <div class="tech-stack">
                            ${tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem; margin-top: 1.5rem;"><i class="fa-brands fa-github"></i> View Code</a>
                    </div>
                `;
                
                projectsGrid.appendChild(card);
            });
        })
        .catch(err => {
            console.warn("GitHub Repos Sync failed or rate limit hit. Falling back to curated lists.", err);
        });
});

// Secure Email Obfuscation & Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
    const _u = "piyushbhardwaj634";
    const _d = "gmail.com";
    
    function getSecureEmail() {
        return `${_u}@${_d}`;
    }

    // Secure Email Card Click Handler
    const emailCard = document.getElementById("secure-email-card");
    if (emailCard) {
        emailCard.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `mailto:${getSecureEmail()}`;
        });
    }

    // Contact Form Submission Handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("form-name").value;
            const clientEmail = document.getElementById("form-email").value;
            const subject = document.getElementById("form-subject").value;
            const message = document.getElementById("form-message").value;
            
            const secureEmail = getSecureEmail();
            const bodyText = `Hi Piyush,\n\nMy name is ${name} (${clientEmail}).\n\n${message}`;
            const mailtoLink = `mailto:${secureEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
            
            // Open the user's mail application
            window.location.href = mailtoLink;
            
            // Provide visual feedback
            const submitBtn = contactForm.querySelector(".form-submit-btn");
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Opening Mail Client...';
            submitBtn.style.background = 'var(--accent-purple)';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }
});
