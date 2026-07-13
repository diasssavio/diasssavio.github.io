// Academic Website - Content Loader for Public Pages
// This script loads content from the CMS and updates the public website

class ContentLoader {
    constructor() {
        this.storageKey = 'academicWebsiteContent';
        this.previewKey = 'academicWebsitePreview';
        this.isPreviewMode = new URLSearchParams(window.location.search).has('preview');
        this.init();
    }

    init() {
        this.loadContent();
        this.updatePageContent();
    }

    loadContent() {
        let contentKey = this.storageKey;
        
        // Use preview content if in preview mode
        if (this.isPreviewMode) {
            const previewContent = localStorage.getItem(this.previewKey);
            if (previewContent) {
                contentKey = this.previewKey;
                this.showPreviewBanner();
            }
        }

        try {
            const stored = localStorage.getItem(contentKey);
            this.content = stored ? JSON.parse(stored) : this.getDefaultContent();
        } catch (e) {
            console.log('Error loading content, using defaults');
            this.content = this.getDefaultContent();
        }
    }

    getDefaultContent() {
        return {
            site: {
                title: 'Sávio S. Dias, D.Sc.',
                subtitle: 'Assistant Professor - Institute of Mathematics and Computing',
                university: 'Federal University of Itajubá',
                email: 'dias@unifei.edu.br',
                phone: '(35) 3629-1836',
                office: 'Room C.1.2.56, IMC Building (C1)'
            },
            index: {
                title: 'Sávio S. Dias, D.Sc.',
                subtitle: 'Assistant Professor - Institute of Mathematics and Computing, Federal University of Itajubá',
                description: 'Welcome to my academic page. I am a passionate researcher and educator specialised in Operations Research, Combinatorial Optimisation, and Integer Programming. My work focuses on developing solutions to complex problems while fostering the next generation of computer scientists.',
                recentNews: []
            },
            about: {
                title: 'About Me',
                subtitle: 'Academic Journey & Background',
                biography: '<p>I am an Assistant Professor in the Institute of Mathematics and Computing at Federal University of Itajubá (IMC/UNIFEI).</p>'
            },
            research: {
                title: 'Research',
                subtitle: 'Publications, Projects & Expertise',
                description: 'My research focuses on developing algorithms to solve hard optimisation problems.',
                publications: []
            },
            teaching: {
                title: 'Teaching',
                subtitle: 'Inspiring the Next Generation of Computer Scientists',
                // description: 'I am passionate about making complex computer science concepts accessible.',
                courses: []
            },
            contact: {
                title: 'Contact Me',
                subtitle: 'Let us Connect and Collaborate',
                description: 'I am always interested in discussing research opportunities.',
                contactInfo: {
                    email: 'dias@unifei.edu.br',
                    phone: '(35) 3629-1836',
                    'office-hours': 'Regular business hours',
                    office: 'Room C.1.2.56, IMC Building (C1)'
                }
            }
        };
    }

    updatePageContent() {
        // Get current page from URL
        const path = window.location.pathname;
        let currentPage = 'index';
        
        if (path.includes('about.html')) currentPage = 'about';
        else if (path.includes('research.html')) currentPage = 'research';
        else if (path.includes('teaching.html')) currentPage = 'teaching';
        else if (path.includes('contact.html')) currentPage = 'contact';
        else if (path.includes('cv.html')) currentPage = 'cv';

        // Update site-wide elements
        this.updateSiteElements();
        
        // Update page-specific content
        this.updatePageSpecificContent(currentPage);
    }

    updateSiteElements() {
        const siteContent = this.content.site || {};
        
        // Update navigation title
        const navTitle = document.querySelector('.logo');
        if (navTitle && siteContent.title) {
            navTitle.textContent = siteContent.title;
        }

        // Update footer contact info
        const footerEmail = document.querySelector('footer a[href^="mailto:"]');
        if (footerEmail && siteContent.email) {
            footerEmail.href = `mailto:${siteContent.email}`;
            footerEmail.textContent = siteContent.email;
        }

        const footerPhone = document.querySelector('footer a[href^="tel:"]');
        if (footerPhone && siteContent.phone) {
            footerPhone.href = `tel:${siteContent.phone.replace(/\D/g, '')}`;
            footerPhone.textContent = siteContent.phone;
        }

        // Update meta tags
        this.updateMetaTags();
    }

    updatePageSpecificContent(page) {
        const pageContent = this.content[page] || {};

        switch (page) {
            case 'index':
                this.updateHomepage(pageContent);
                break;
            case 'about':
                this.updateAboutPage(pageContent);
                break;
            case 'research':
                this.updateResearchPage(pageContent);
                break;
            case 'teaching':
                this.updateTeachingPage(pageContent);
                break;
            case 'contact':
                this.updateContactPage(pageContent);
                break;
        }
    }

    updateHomepage(content) {
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && content.title) {
            heroTitle.textContent = content.title;
        }

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle && content.subtitle) {
            heroSubtitle.textContent = content.subtitle;
        }

        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription && content.description) {
            heroDescription.textContent = content.description;
        }

        // Update recent news
        this.updateRecentNews(content.recentNews || []);
    }

    updateAboutPage(content) {
        // Update page header
        const pageTitle = document.querySelector('.hero-title');
        if (pageTitle && content.title) {
            pageTitle.textContent = content.title;
        }

        const pageSubtitle = document.querySelector('.hero-subtitle');
        if (pageSubtitle && content.subtitle) {
            pageSubtitle.textContent = content.subtitle;
        }

        // Update biography
        const biographyContainer = document.querySelector('[data-content="biography"]');
        if (biographyContainer && content.biography) {
            biographyContainer.innerHTML = content.biography;
        }
    }

    updateResearchPage(content) {
        // Update page header
        const pageTitle = document.querySelector('.hero-title');
        if (pageTitle && content.title) {
            pageTitle.textContent = content.title;
        }

        const pageSubtitle = document.querySelector('.hero-subtitle');
        if (pageSubtitle && content.subtitle) {
            pageSubtitle.textContent = content.subtitle;
        }

        const pageDescription = document.querySelector('.hero-description');
        if (pageDescription && content.description) {
            pageDescription.textContent = content.description;
        }

        // Update publications
        this.updatePublications(content.publications || []);
    }

    updateTeachingPage(content) {
        // Update page header
        const pageTitle = document.querySelector('.hero-title');
        if (pageTitle && content.title) {
            pageTitle.textContent = content.title;
        }

        const pageSubtitle = document.querySelector('.hero-subtitle');
        if (pageSubtitle && content.subtitle) {
            pageSubtitle.textContent = content.subtitle;
        }

        const pageDescription = document.querySelector('.hero-description');
        if (pageDescription && content.description) {
            pageDescription.textContent = content.description;
        }

        // Update courses
        this.updateCourses(content.courses || []);
    }

    updateContactPage(content) {
        // Update page header
        const pageTitle = document.querySelector('.hero-title');
        if (pageTitle && content.title) {
            pageTitle.textContent = content.title;
        }

        const pageSubtitle = document.querySelector('.hero-subtitle');
        if (pageSubtitle && content.subtitle) {
            pageSubtitle.textContent = content.subtitle;
        }

        const pageDescription = document.querySelector('.hero-description');
        if (pageDescription && content.description) {
            pageDescription.textContent = content.description;
        }

        // Update contact information
        this.updateContactInfo(content.contactInfo || {});
    }

    updateRecentNews(news) {
        const newsContainer = document.querySelector('[data-content="recent-news"]');
        if (!newsContainer || !news.length) return;

        const newsHTML = news.map(item => `
            <div class="news-item">
                <div class="news-date">${item.date}</div>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-summary">${item.summary}</p>
            </div>
        `).join('');

        newsContainer.innerHTML = newsHTML;
    }

    updatePublications(publications) {
        const pubContainer = document.querySelector('[data-content="publications"]');
        if (!pubContainer || !publications.length) return;

        const pubHTML = publications.map(pub => `
            <div class="publication-item">
                <h3 class="publication-title">${pub.title}</h3>
                <p class="publication-authors">${pub.authors}</p>
                <p class="publication-venue">${pub.venue}</p>
                ${pub.links ? `
                    <div class="publication-links">
                        ${pub.links.map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`).join(' ')}
                    </div>
                ` : ''}
            </div>
        `).join('');

        pubContainer.innerHTML = pubHTML;
    }

    updateCourses(courses) {
        const coursesContainer = document.querySelector('[data-content="courses"]');
        if (!coursesContainer || !courses.length) return;

        const coursesHTML = courses.map(course => `
            <div class="course-item">
                <h3 class="course-title">${course.title}</h3>
                <div class="course-meta">
                    <span class="course-semester">${course.semester}</span>
                    <span class="course-level">${course.level}</span>
                </div>
                <p class="course-description">${course.description}</p>
            </div>
        `).join('');

        coursesContainer.innerHTML = coursesHTML;
    }

    updateContactInfo(contactInfo) {
        // Update contact elements with data attributes
        Object.keys(contactInfo).forEach(key => {
            const element = document.querySelector(`[data-contact="${key}"]`);
            if (element) {
                if (key === 'email') {
                    element.href = `mailto:${contactInfo[key]}`;
                    element.textContent = contactInfo[key];
                } else if (key === 'phone') {
                    element.textContent = contactInfo[key];
                } else {
                    element.textContent = contactInfo[key];
                }
            }
        });
    }

    updateMetaTags() {
        const siteContent = this.content.site || {};
        
        // Update title
        if (siteContent.title) {
            document.title = document.title.replace('Dr. Academic Name', siteContent.title);
        }

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && siteContent.title) {
            metaDescription.content = metaDescription.content.replace('Dr. Academic Name', siteContent.title);
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && siteContent.title) {
            ogTitle.content = ogTitle.content.replace('Dr. Academic Name', siteContent.title);
        }
    }

    showPreviewBanner() {
        const banner = document.createElement('div');
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #f59e0b;
            color: white;
            padding: 0.75rem;
            text-align: center;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        banner.innerHTML = `
            🔍 PREVIEW MODE - You are viewing unpublished changes
            <button onclick="this.parentElement.remove()" style="
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                margin-left: 1rem;
                cursor: pointer;
            ">×</button>
        `;
        
        document.body.insertBefore(banner, document.body.firstChild);
        
        // Adjust body padding to account for banner
        document.body.style.paddingTop = '60px';
    }

    // Public method to refresh content
    refresh() {
        this.loadContent();
        this.updatePageContent();
    }
}

// Initialize content loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.contentLoader = new ContentLoader();
});

// Listen for storage changes (when content is updated in admin)
window.addEventListener('storage', function(e) {
    if (e.key === 'academicWebsiteContent' || e.key === 'academicWebsitePreview') {
        if (window.contentLoader) {
            window.contentLoader.refresh();
        }
    }
});

