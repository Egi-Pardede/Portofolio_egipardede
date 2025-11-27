// ============================================
// Loading Screen Management
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 4 seconds (adjustable between 3-5 seconds)
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remove from DOM after fade out completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Match CSS transition duration
    }, 4000);
});

// ============================================
// Theme Toggle (Dark/Light Mode)
// ============================================

(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
})();

// ============================================
// Mobile Navigation Menu
// ============================================

(function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
})();

// ============================================
// Portfolio Filter Functionality
// ============================================

(function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio cards
            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show card with animation
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Hide card with animation
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
})();

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

(function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// ============================================
// Intersection Observer for Scroll Animations
// ============================================

(function() {
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
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('.portfolio-section, .about-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe portfolio cards for staggered animation
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        cardObserver.observe(card);
    });
})();

// ============================================
// Navbar Scroll Effect
// ============================================

(function() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
})();

// ============================================
// Image Lazy Loading Enhancement
// ============================================

(function() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src; // Trigger load
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
})();

// ============================================
// Form Validation (if contact form is added later)
// ============================================

// Placeholder for future contact form functionality
function validateForm(form) {
    // Add form validation logic here if needed
    return true;
}

// ============================================
// Fluid Splash Cursor for Navbar
// ============================================

(function() {
    const navElement = document.getElementById('navbar');
    const canvas = document.getElementById('fluid-canvas');

    if (!navElement || !canvas) {
        return;
    }

    const defaultConfig = {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1440,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 3.5,
        VELOCITY_DISSIPATION: 2,
        PRESSURE: 0.1,
        PRESSURE_ITERATIONS: 20,
        CURL: 3,
        SPLAT_RADIUS: 0.2,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLOR_UPDATE_SPEED: 10,
        BACK_COLOR: { r: 0.5, g: 0, b: 0 },
        TRANSPARENT: true
    };

    initSplashCursor(navElement, canvas, defaultConfig);

    function initSplashCursor(nav, canvasElement, configOverrides) {
        function Pointer() {
            this.id = -1;
            this.texcoordX = 0;
            this.texcoordY = 0;
            this.prevTexcoordX = 0;
            this.prevTexcoordY = 0;
            this.deltaX = 0;
            this.deltaY = 0;
            this.down = false;
            this.moved = false;
            this.color = [0, 0, 0];
        }

        const config = {
            ...configOverrides,
            PAUSED: false
        };

        let pointers = [new Pointer()];
        const context = getWebGLContext(canvasElement);
        if (!context.gl) {
            return;
        }

        const { gl, ext } = context;

        if (!ext.supportLinearFiltering) {
            config.DYE_RESOLUTION = 256;
            config.SHADING = false;
        }

        class Material {
            constructor(vertexShader, fragmentShaderSource) {
                this.vertexShader = vertexShader;
                this.fragmentShaderSource = fragmentShaderSource;
                this.programs = [];
                this.activeProgram = null;
                this.uniforms = [];
            }

            setKeywords(keywords) {
                let hash = 0;
                for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
                let program = this.programs[hash];
                if (program == null) {
                    let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
                    program = createProgram(this.vertexShader, fragmentShader);
                    this.programs[hash] = program;
                }
                if (program === this.activeProgram) return;
                this.uniforms = getUniforms(program);
                this.activeProgram = program;
            }

            bind() {
                gl.useProgram(this.activeProgram);
            }
        }

        class Program {
            constructor(vertexShader, fragmentShader) {
                this.uniforms = {};
                this.program = createProgram(vertexShader, fragmentShader);
                this.uniforms = getUniforms(this.program);
            }

            bind() {
                gl.useProgram(this.program);
            }
        }

        function getWebGLContext(canvasEl) {
            const params = {
                alpha: true,
                depth: false,
                stencil: false,
                antialias: false,
                preserveDrawingBuffer: false
            };
            let glContext = canvasEl.getContext('webgl2', params);
            const isWebGL2 = !!glContext;
            if (!isWebGL2) {
                glContext = canvasEl.getContext('webgl', params) || canvasEl.getContext('experimental-webgl', params);
            }

            if (!glContext) {
                return { gl: null, ext: {} };
            }

            let halfFloat;
            let supportLinearFiltering;
            if (isWebGL2) {
                glContext.getExtension('EXT_color_buffer_float');
                supportLinearFiltering = glContext.getExtension('OES_texture_float_linear');
            } else {
                halfFloat = glContext.getExtension('OES_texture_half_float');
                supportLinearFiltering = glContext.getExtension('OES_texture_half_float_linear');
            }

            glContext.clearColor(0.0, 0.0, 0.0, 0.0);

            const halfFloatTexType = isWebGL2 ? glContext.HALF_FLOAT : halfFloat && halfFloat.HALF_FLOAT_OES;

            let formatRGBA;
            let formatRG;
            let formatR;

            if (isWebGL2) {
                formatRGBA = getSupportedFormat(glContext, glContext.RGBA16F, glContext.RGBA, halfFloatTexType);
                formatRG = getSupportedFormat(glContext, glContext.RG16F, glContext.RG, halfFloatTexType);
                formatR = getSupportedFormat(glContext, glContext.R16F, glContext.RED, halfFloatTexType);
            } else {
                formatRGBA = getSupportedFormat(glContext, glContext.RGBA, glContext.RGBA, halfFloatTexType);
                formatRG = getSupportedFormat(glContext, glContext.RGBA, glContext.RGBA, halfFloatTexType);
                formatR = getSupportedFormat(glContext, glContext.RGBA, glContext.RGBA, halfFloatTexType);
            }

            return {
                gl: glContext,
                ext: {
                    formatRGBA,
                    formatRG,
                    formatR,
                    halfFloatTexType,
                    supportLinearFiltering
                }
            };
        }

        function getSupportedFormat(glContext, internalFormat, format, type) {
            if (!supportRenderTextureFormat(glContext, internalFormat, format, type)) {
                switch (internalFormat) {
                    case glContext.R16F:
                        return getSupportedFormat(glContext, glContext.RG16F, glContext.RG, type);
                    case glContext.RG16F:
                        return getSupportedFormat(glContext, glContext.RGBA16F, glContext.RGBA, type);
                    default:
                        return null;
                }
            }
            return { internalFormat, format };
        }

        function supportRenderTextureFormat(glContext, internalFormat, format, type) {
            const texture = glContext.createTexture();
            glContext.bindTexture(glContext.TEXTURE_2D, texture);
            glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, glContext.NEAREST);
            glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MAG_FILTER, glContext.NEAREST);
            glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
            glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
            glContext.texImage2D(glContext.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
            const fbo = glContext.createFramebuffer();
            glContext.bindFramebuffer(glContext.FRAMEBUFFER, fbo);
            glContext.framebufferTexture2D(glContext.FRAMEBUFFER, glContext.COLOR_ATTACHMENT0, glContext.TEXTURE_2D, texture, 0);
            const status = glContext.checkFramebufferStatus(glContext.FRAMEBUFFER);
            return status === glContext.FRAMEBUFFER_COMPLETE;
        }

        function createProgram(vertexShader, fragmentShader) {
            let program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.bindAttribLocation(program, 0, 'aPosition');
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.trace(gl.getProgramInfoLog(program));
            return program;
        }

        function getUniforms(program) {
            let uniforms = [];
            let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < uniformCount; i++) {
                let uniformName = gl.getActiveUniform(program, i).name;
                uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
            }
            return uniforms;
        }

        function compileShader(type, source, keywords) {
            source = addKeywords(source, keywords);
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.trace(gl.getShaderInfoLog(shader));
            return shader;
        }

        function addKeywords(source, keywords) {
            if (!keywords) return source;
            let keywordsString = '';
            keywords.forEach(keyword => {
                keywordsString += '#define ' + keyword + '\n';
            });
            return keywordsString + source;
        }

        const baseVertexShader = compileShader(
            gl.VERTEX_SHADER,
            `
                precision highp float;
                attribute vec2 aPosition;
                varying vec2 vUv;
                varying vec2 vL;
                varying vec2 vR;
                varying vec2 vT;
                varying vec2 vB;
                uniform vec2 texelSize;
                void main () {
                    vUv = aPosition * 0.5 + 0.5;
                    vL = vUv - vec2(texelSize.x, 0.0);
                    vR = vUv + vec2(texelSize.x, 0.0);
                    vT = vUv + vec2(0.0, texelSize.y);
                    vB = vUv - vec2(0.0, texelSize.y);
                    gl_Position = vec4(aPosition, 0.0, 1.0);
                }
            `
        );

        const copyShader = compileShader(
            gl.FRAGMENT_SHADER,
            `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                uniform sampler2D uTexture;
                void main () {
                    gl_FragColor = texture2D(uTexture, vUv);
                }
            `
        );

        const clearShader = compileShader(
            gl.FRAGMENT_SHADER,
            `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                uniform sampler2D uTexture;
                uniform float value;
                void main () {
                    gl_FragColor = value * texture2D(uTexture, vUv);
                }
            `
        );

        const displayShaderSource = `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2D uTexture;
            uniform sampler2D uDithering;
            uniform vec2 ditherScale;
            uniform vec2 texelSize;
            vec3 linearToGamma (vec3 color) {
                color = max(color, vec3(0));
                return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
            }
            void main () {
                vec3 c = texture2D(uTexture, vUv).rgb;
                #ifdef SHADING
                    vec3 lc = texture2D(uTexture, vL).rgb;
                    vec3 rc = texture2D(uTexture, vR).rgb;
                    vec3 tc = texture2D(uTexture, vT).rgb;
                    vec3 bc = texture2D(uTexture, vB).rgb;
                    float dx = length(rc) - length(lc);
                    float dy = length(tc) - length(bc);
                    vec3 n = normalize(vec3(dx, dy, length(texelSize)));
                    vec3 l = vec3(0.0, 0.0, 1.0);
                    float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
                    c *= diffuse;
                #endif
                float a = max(c.r, max(c.g, c.b));
                gl_FragColor = vec4(c, a);
            }
        `;

        const splatShader = compileShader(
            gl.FRAGMENT_SHADER,
            `
                precision highp float;
                precision highp sampler2D;
                varying vec2 vUv;
                uniform sampler2D uTarget;
                uniform float aspectRatio;
                uniform vec3 color;
                uniform vec2 point;
                uniform float radius;
                void main () {
                    vec2 p = vUv - point.xy;
                    p.x *= aspectRatio;
                    vec3 splat = exp(-dot(p, p) / radius) * color;
                    vec3 base = texture2D(uTarget, vUv).xyz;
                    gl_FragColor = vec4(base + splat, 1.0);
                }
            `
        );

        const advectionShader = compileShader(
            gl.FRAGMENT_SHADER,
            `
                precision highp float;
                precision highp sampler2D;
                varying vec2 vUv;
                uniform sampler2D uVelocity;
                uniform sampler2D uSource;
                uniform vec2 texelSize;
                uniform vec2 dyeTexelSize;
                uniform float dt;
                uniform float dissipation;
                vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
                    vec2 st = uv / tsize - 0.5;
                    vec2 iuv = floor(st);
                    vec2 fuv = fract(st);
                    vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
                    vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
                    vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
                    vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
                    return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
                }
                void main () {
                    #ifdef MANUAL_FILTERING
                        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                        vec4 result = bilerp(uSource, coord, dyeTexelSize);
                    #else
                        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                        vec4 result = texture2D(uSource, coord);
                    #endif
                    float decay = 1.0 + dissipation * dt;
                    gl_FragColor = result / decay;
                }
            `,
            ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
        );

        const divergenceShader = compileShader(
            gl.FRAGMENT_SHADER,
            `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                varying highp vec2 vL;
                varying highp vec2 vR;
                varying highp vec2 vT;
                varying highp vec2 vB;
                uniform sampler2D uVelocity;
                void main () {
                    float L = texture2D(uVelocity, vL).x;
                    float R = texture2D(uVelocity, vR).x;
                    float T = texture2D(uVelocity, vT).y;
                    float B = texture2D(uVelocity, vB).y;
                    vec2 C = texture2D(uVelocity, vUv).xy;
                    if (vL.x < 0.0) { L = -C.x; }
                    if (vR.x > 1.0) { R = -C.x; }
                    if (vT.y > 1.0) { T = -C.y; }
                    if (vB.y < 0.0) { B = -C.y; }
                    float div = 0.5 * (R - L + T - B);
                    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
                }
            `
        );

        const curlShader = compileShader(
            gl.FRAGMENT_SHADER,
            `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                 varying highp vec2 vL;
                varying highp vec2 vR;
                varying highp vec2 vT;
                varying highp vec2 vB;
                uniform sampler2D uVelocity;
                void main () {
                    float L = texture2D(uVelocity, vL).y;
                    float R = texture2D(uVelocity, vR).y;
                    float T = texture2D(uVelocity, vT).x;
                    float B = texture2D(uVelocity, vB).x;
                    float vorticity = R - L - T + B;
                    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
                }
            `
        );

        const vorticityShader = compileShader(
            gl.FRAGMENT_SHADER,
            `
                precision highp float;
                precision highp sampler2D;
                varying vec2 vUv;
                varying vec2 vL;
                varying vec2 vR;
                varying vec2 vT;
                varying vec2 vB;
                uniform sampler2D uVelocity;
                uniform sampler2D uCurl;
                uniform float curl;
                uniform float dt;
                void main () {
                    float L = texture2D(uCurl, vL).x;
                    float R = texture2D(uCurl, vR).x;
                    float T = texture2D(uCurl, vT).x;
                    float B = texture2D(uCurl, vB).x;
                    float C = texture2D(uCurl, vUv).x;
                    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
                    force /= length(force) + 0.0001;
                    force *= curl * C;
                    force.y *= -1.0;
                    vec2 velocity = texture2D(uVelocity, vUv).xy;
                    velocity += force * dt;
                    velocity = min(max(velocity, -1000.0), 1000.0);
                    gl_FragColor = vec4(velocity, 0.0, 1.0);
                }
            `
        );

        const pressureShader = compileShader(
            gl.FRAGMENT_SHADER,
            `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                varying highp vec2 vL;
                varying highp vec2 vR;
                varying highp vec2 vT;
                varying highp vec2 vB;
                uniform sampler2D uPressure;
                uniform sampler2D uDivergence;
                void main () {
                    float L = texture2D(uPressure, vL).x;
                    float R = texture2D(uPressure, vR).x;
                    float T = texture2D(uPressure, vT).x;
                    float B = texture2D(uPressure, vB).x;
                    float C = texture2D(uPressure, vUv).x;
                    float divergence = texture2D(uDivergence, vUv).x;
                    float pressure = (L + R + B + T - divergence) * 0.25;
                    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
                }
            `
        );

        const gradientSubtractShader = compileShader(
            gl.FRAGMENT_SHADER,
            `
                precision mediump float;
                precision mediump sampler2D;
                varying highp vec2 vUv;
                varying highp vec2 vL;
                varying highp vec2 vR;
                varying highp vec2 vT;
                varying highp vec2 vB;
                uniform sampler2D uPressure;
                uniform sampler2D uVelocity;
                void main () {
                    float L = texture2D(uPressure, vL).x;
                    float R = texture2D(uPressure, vR).x;
                    float T = texture2D(uPressure, vT).x;
                    float B = texture2D(uPressure, vB).x;
                    vec2 velocity = texture2D(uVelocity, vUv).xy;
                    velocity.xy -= vec2(R - L, T - B);
                    gl_FragColor = vec4(velocity, 0.0, 1.0);
                }
            `
        );

        const blit = (() => {
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            return (target, clear = false) => {
                if (target == null) {
                    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                } else {
                    gl.viewport(0, 0, target.width, target.height);
                    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
                }
                if (clear) {
                    gl.clearColor(0.0, 0.0, 0.0, 1.0);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                }
                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            };
        })();

        let dye, velocity, divergence, curl, pressure;

        const copyProgram = new Program(baseVertexShader, copyShader);
        const clearProgram = new Program(baseVertexShader, clearShader);
        const splatProgram = new Program(baseVertexShader, splatShader);
        const advectionProgram = new Program(baseVertexShader, advectionShader);
        const divergenceProgram = new Program(baseVertexShader, divergenceShader);
        const curlProgram = new Program(baseVertexShader, curlShader);
        const vorticityProgram = new Program(baseVertexShader, vorticityShader);
        const pressureProgram = new Program(baseVertexShader, pressureShader);
        const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
        const displayMaterial = new Material(baseVertexShader, displayShaderSource);

        function initFramebuffers() {
            let simRes = getResolution(config.SIM_RESOLUTION);
            let dyeRes = getResolution(config.DYE_RESOLUTION);
            const texType = ext.halfFloatTexType;
            const rgba = ext.formatRGBA;
            const rg = ext.formatRG;
            const r = ext.formatR;
            const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
            gl.disable(gl.BLEND);
            if (!dye)
                dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
            else
                dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
            if (!velocity)
                velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
            else
                velocity = resizeDoubleFBO(
                    velocity,
                    simRes.width,
                    simRes.height,
                    rg.internalFormat,
                    rg.format,
                    texType,
                    filtering
                );
            divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
            curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
            pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        }

        function createFBO(w, h, internalFormat, format, type, param) {
            gl.activeTexture(gl.TEXTURE0);
            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
            let fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            gl.viewport(0, 0, w, h);
            gl.clear(gl.COLOR_BUFFER_BIT);
            let texelSizeX = 1.0 / w;
            let texelSizeY = 1.0 / h;
            return {
                texture,
                fbo,
                width: w,
                height: h,
                texelSizeX,
                texelSizeY,
                attach(id) {
                    gl.activeTexture(gl.TEXTURE0 + id);
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    return id;
                }
            };
        }

        function createDoubleFBO(w, h, internalFormat, format, type, param) {
            let fbo1 = createFBO(w, h, internalFormat, format, type, param);
            let fbo2 = createFBO(w, h, internalFormat, format, type, param);
            return {
                width: w,
                height: h,
                texelSizeX: fbo1.texelSizeX,
                texelSizeY: fbo1.texelSizeY,
                get read() {
                    return fbo1;
                },
                set read(value) {
                    fbo1 = value;
                },
                get write() {
                    return fbo2;
                },
                set write(value) {
                    fbo2 = value;
                },
                swap() {
                    let temp = fbo1;
                    fbo1 = fbo2;
                    fbo2 = temp;
                }
            };
        }

        function resizeFBO(target, w, h, internalFormat, format, type, param) {
            let newFBO = createFBO(w, h, internalFormat, format, type, param);
            copyProgram.bind();
            gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
            blit(newFBO);
            return newFBO;
        }

        function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
            if (target.width === w && target.height === h) return target;
            target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
            target.write = createFBO(w, h, internalFormat, format, type, param);
            target.width = w;
            target.height = h;
            target.texelSizeX = 1.0 / w;
            target.texelSizeY = 1.0 / h;
            return target;
        }

        function updateKeywords() {
            let displayKeywords = [];
            if (config.SHADING) displayKeywords.push('SHADING');
            displayMaterial.setKeywords(displayKeywords);
        }

        updateKeywords();
        resizeCanvas();
        initFramebuffers();
        seedInitialSplats(6);

        let lastUpdateTime = Date.now();
        let colorUpdateTimer = 0.0;

        function updateFrame() {
            const dt = calcDeltaTime();
            if (resizeCanvas()) initFramebuffers();
            updateColors(dt);
            applyInputs();
            step(dt);
            render(null);
            requestAnimationFrame(updateFrame);
        }

        function calcDeltaTime() {
            let now = Date.now();
            let dt = (now - lastUpdateTime) / 1000;
            dt = Math.min(dt, 0.016666);
            lastUpdateTime = now;
            return dt;
        }

        function resizeCanvas() {
            const rect = nav.getBoundingClientRect();
            let width = Math.floor(rect.width * (window.devicePixelRatio || 1));
            let height = Math.floor(rect.height * (window.devicePixelRatio || 1));
            width = Math.max(width, 1);
            height = Math.max(height, 1);
            if (canvasElement.width !== width || canvasElement.height !== height) {
                canvasElement.width = width;
                canvasElement.height = height;
                return true;
            }
            return false;
        }

        function updateColors(dt) {
            colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
            if (colorUpdateTimer >= 1) {
                colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
                pointers.forEach(p => {
                    p.color = generateColor();
                });
            }
        }

        function applyInputs() {
            pointers.forEach(p => {
                if (p.moved) {
                    p.moved = false;
                    splatPointer(p);
                }
            });
        }

        function step(dt) {
            gl.disable(gl.BLEND);
            curlProgram.bind();
            gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
            blit(curl);
            vorticityProgram.bind();
            gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
            gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
            gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
            gl.uniform1f(vorticityProgram.uniforms.dt, dt);
            blit(velocity.write);
            velocity.swap();
            divergenceProgram.bind();
            gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
            blit(divergence);
            clearProgram.bind();
            gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
            gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
            blit(pressure.write);
            pressure.swap();
            pressureProgram.bind();
            gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
            for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
                gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
                blit(pressure.write);
                pressure.swap();
            }
            gradienSubtractProgram.bind();
            gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
            gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
            blit(velocity.write);
            velocity.swap();
            advectionProgram.bind();
            gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
            if (!ext.supportLinearFiltering)
                gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
            let velocityId = velocity.read.attach(0);
            gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
            gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
            gl.uniform1f(advectionProgram.uniforms.dt, dt);
            gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
            blit(velocity.write);
            velocity.swap();
            if (!ext.supportLinearFiltering)
                gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
            gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
            gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
            gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
            blit(dye.write);
            dye.swap();
        }

        function render(target) {
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
            drawDisplay(target);
        }

        function drawDisplay(target) {
            let width = target == null ? gl.drawingBufferWidth : target.width;
            let height = target == null ? gl.drawingBufferHeight : target.height;
            displayMaterial.bind();
            if (config.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
            gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
            blit(target);
        }

        function splatPointer(pointer) {
            let dx = pointer.deltaX * config.SPLAT_FORCE;
            let dy = pointer.deltaY * config.SPLAT_FORCE;
            splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
        }

        function clickSplat(pointer) {
            const color = generateColor();
            color.r *= 10.0;
            color.g *= 10.0;
            color.b *= 10.0;
            let dx = 10 * (Math.random() - 0.5);
            let dy = 30 * (Math.random() - 0.5);
            splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
        }

        function splat(x, y, dx, dy, color) {
            splatProgram.bind();
            gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
            gl.uniform1f(splatProgram.uniforms.aspectRatio, canvasElement.width / canvasElement.height);
            gl.uniform2f(splatProgram.uniforms.point, x, y);
            gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
            gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
            blit(velocity.write);
            velocity.swap();
            gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
            gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
            blit(dye.write);
            dye.swap();
        }

        function seedInitialSplats(count) {
            for (let i = 0; i < count; i++) {
                const color = generateColor();
                const x = Math.random();
                const y = Math.random();
                const dx = (Math.random() - 0.5) * config.SPLAT_FORCE * 0.3;
                const dy = (Math.random() - 0.5) * config.SPLAT_FORCE * 0.3;
                splat(x, y, dx, dy, color);
            }
        }

        function correctRadius(radius) {
            let aspectRatio = canvasElement.width / canvasElement.height;
            if (aspectRatio > 1) radius *= aspectRatio;
            return radius;
        }

        function updatePointerDownData(pointer, id, posX, posY) {
            pointer.id = id;
            pointer.down = true;
            pointer.moved = false;
            pointer.texcoordX = posX / canvasElement.width;
            pointer.texcoordY = 1.0 - posY / canvasElement.height;
            pointer.prevTexcoordX = pointer.texcoordX;
            pointer.prevTexcoordY = pointer.texcoordY;
            pointer.deltaX = 0;
            pointer.deltaY = 0;
            pointer.color = generateColor();
        }

        function updatePointerMoveData(pointer, posX, posY, color) {
            pointer.prevTexcoordX = pointer.texcoordX;
            pointer.prevTexcoordY = pointer.texcoordY;
            pointer.texcoordX = posX / canvasElement.width;
            pointer.texcoordY = 1.0 - posY / canvasElement.height;
            pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
            pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
            pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
            pointer.color = color;
        }

        function updatePointerUpData(pointer) {
            pointer.down = false;
        }

        function correctDeltaX(delta) {
            let aspectRatio = canvasElement.width / canvasElement.height;
            if (aspectRatio < 1) delta *= aspectRatio;
            return delta;
        }

        function correctDeltaY(delta) {
            let aspectRatio = canvasElement.width / canvasElement.height;
            if (aspectRatio > 1) delta /= aspectRatio;
            return delta;
        }

        function generateColor() {
            let c = HSVtoRGB(Math.random(), 1.0, 1.0);
            c.r *= 0.15;
            c.g *= 0.15;
            c.b *= 0.15;
            return c;
        }

        function HSVtoRGB(h, s, v) {
            let r, g, b, i, f, p, q, t;
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = p;
                    b = q;
                    break;
                default:
                    break;
            }
            return { r, g, b };
        }

        function wrap(value, min, max) {
            const range = max - min;
            if (range === 0) return min;
            return ((value - min) % range) + min;
        }

        function getResolution(resolution) {
            let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
            if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
            const min = Math.round(resolution);
            const max = Math.round(resolution * aspectRatio);
            if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
            else return { width: min, height: max };
        }

        function scaleByPixelRatio(input) {
            const pixelRatio = window.devicePixelRatio || 1;
            return Math.floor(input * pixelRatio);
        }

        function hashCode(s) {
            if (!s || s.length === 0) return 0;
            let hash = 0;
            for (let i = 0; i < s.length; i++) {
                hash = (hash << 5) - hash + s.charCodeAt(i);
                hash |= 0;
            }
            return hash;
        }

        function getRelativePosition(clientX, clientY) {
            const rect = nav.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                return null;
            }
            return {
                x: scaleByPixelRatio(x),
                y: scaleByPixelRatio(y)
            };
        }

        nav.addEventListener('mousedown', e => {
            const coords = getRelativePosition(e.clientX, e.clientY);
            if (!coords) return;
            let pointer = pointers[0];
            updatePointerDownData(pointer, -1, coords.x, coords.y);
            clickSplat(pointer);
        });

        nav.addEventListener('mousemove', e => {
            const coords = getRelativePosition(e.clientX, e.clientY);
            if (!coords) return;
            let pointer = pointers[0];
            updatePointerMoveData(pointer, coords.x, coords.y, pointer.color);
        });

        window.addEventListener('mouseup', () => {
            let pointer = pointers[0];
            updatePointerUpData(pointer);
        });

        nav.addEventListener('touchstart', e => {
            const touches = e.targetTouches;
            let pointer = pointers[0];
            for (let i = 0; i < touches.length; i++) {
                const coords = getRelativePosition(touches[i].clientX, touches[i].clientY);
                if (!coords) continue;
                updatePointerDownData(pointer, touches[i].identifier, coords.x, coords.y);
            }
        });

        nav.addEventListener(
            'touchmove',
            e => {
                const touches = e.targetTouches;
                let pointer = pointers[0];
                for (let i = 0; i < touches.length; i++) {
                    const coords = getRelativePosition(touches[i].clientX, touches[i].clientY);
                    if (!coords) continue;
                    updatePointerMoveData(pointer, coords.x, coords.y, pointer.color);
                }
            },
            { passive: true }
        );

        window.addEventListener('touchend', () => {
            let pointer = pointers[0];
            updatePointerUpData(pointer);
        });

        updateFrame();
    }
})();

// ============================================
// Console Welcome Message
// ============================================

console.log('%c👋 Welcome to Egi Agung Santoso Pardede\'s Portfolio!', 
    'color: #007BFF; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 
    'color: #6C757D; font-size: 14px;');

