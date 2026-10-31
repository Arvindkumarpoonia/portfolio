/**
 * ARVIND KUMAR POONIA - PORTFOLIO PROJECTS DATA & CONTROLLER
 * Highlights FlowPlayer, Meet & Greet, and Pixafame (from resume)
 */

const portfolioProjects = [
  {
    id: "flowplayer",
    title: "FlowPlayer Multimedia Suite",
    category: "media",
    categoryLabel: "Multimedia & Audio",
    badge: "ExoPlayer & Firebase",
    stat: "ExoPlayer Architecture & Background Service",
    image: "assets/images/project-flowplayer.jpg",
    summary: "Multimedia player application powered by Google ExoPlayer, background audio services, offline caching with Room DB, and Firebase synchronization.",
    tags: ["Kotlin", "Java", "ExoPlayer", "Firebase", "MVVM", "Room DB"],
    githubUrl: "https://github.com/arvindkumar",
    liveUrl: "#",
    problem: "Standard Android MediaPlayer often exhibits buffering stutter, high battery drain, and complex audio focus transitions across diverse hardware vendors.",
    solution: "Architected a custom ExoPlayer wrapper with dynamic audio buffering, media session background notification controllers, SQLite/Room caching for offline tracks, and Firebase analytics.",
    achievements: [
      "Smooth 60 FPS playback with adaptive bitrate streaming (HLS & DASH)",
      "Background playback service with lock-screen media session controls",
      "Offline track caching with Room DB and encrypted local storage",
      "Firebase Realtime Database integration for user playlists & favorites"
    ],
    architecture: `// ExoPlayer Service Architecture
class PlayerService : MediaSessionService() {
    private lateinit var player: ExoPlayer
    
    override fun onCreate() {
        super.onCreate()
        player = ExoPlayer.Builder(this)
            .setAudioAttributes(AudioAttributes.DEFAULT, /* handleAudioFocus= */ true)
            .setHandleAudioBecomingNoisy(true)
            .build()
    }
}`
  },
  {
    id: "meetgreet",
    title: "Meet & Greet QR Contact Sharing",
    category: "utility",
    categoryLabel: "Networking & Camera",
    badge: "CameraX & QR Engine",
    stat: "Sub-100ms Instant QR Scan & Room DB",
    image: "assets/images/project-meetgreet.jpg",
    summary: "QR-based contact sharing and professional networking application featuring CameraX instant QR scanning, offline contact persistence with SQLite/Room DB, and address book export.",
    tags: ["Kotlin", "Java", "CameraX", "Room DB", "SQLite", "Material Design"],
    githubUrl: "https://github.com/arvindkumar",
    liveUrl: "#",
    problem: "Exchanging professional contacts at crowded conferences via physical paper cards leads to lost connections, manual data entry errors, and zero offline sync.",
    solution: "Engineered a lightning-fast QR generation and scanning engine utilizing Google ML Kit and CameraX, paired with instant encrypted local contact persistence via Room DB.",
    achievements: [
      "Sub-100ms barcode recognition in low-light and tilted camera angles",
      "One-tap automatic address book sync via Android Contacts Provider",
      "Offline-first SQLite/Room storage with instant search and tag filters",
      "Clean MVVM architecture ensuring robust test coverage and reliability"
    ],
    architecture: `// CameraX QR Barcode Analyzer
class QrCodeAnalyzer(private val onQrDetected: (String) -> Unit) : ImageAnalysis.Analyzer {
    @androidx.camera.core.ExperimentalGetImage
    override fun analyze(imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image ?: return imageProxy.close()
        val image = InputImage.fromMediaImage(mediaImage, imageProxy.imageInfo.rotationDegrees)
        barcodeScanner.process(image)
            .addOnSuccessListener { barcodes -> barcodes.firstOrNull()?.rawValue?.let(onQrDetected) }
            .addOnCompleteListener { imageProxy.close() }
    }
}`
  },
  {
    id: "pixafame",
    title: "Pixafame Live Streaming Application",
    category: "media",
    categoryLabel: "Live Stream & Realtime",
    badge: "Live Video & Realtime Chat",
    stat: "Real-time Chat & Reactive Video Stream",
    image: "assets/images/project-pixafame.jpg",
    summary: "Live streaming application featuring real-time broadcasting, interactive floating chat bubbles, real-time viewer counters, and animated reaction hearts.",
    tags: ["Java", "Kotlin", "WebSockets", "Firebase", "MVVM", "Material Design"],
    githubUrl: "https://github.com/arvindkumar",
    liveUrl: "#",
    problem: "Live streaming applications struggle with synchronization between high-throughput chat messages and video feeds under erratic mobile cellular connections.",
    solution: "Built a reactive stream rendering pipeline with WebSockets / Firebase RTDB, hardware-accelerated video rendering, and a custom particle animation engine for floating reactions.",
    achievements: [
      "Ultra-low latency streaming with adaptive protocol switching",
      "High-throughput chat pipeline handling simultaneous viewer messages",
      "Dynamic heart/reaction floating physics using canvas micro-animations",
      "Material Design aesthetic with dark-mode glassmorphic controls"
    ],
    architecture: `// Realtime Chat & Reaction Observer
class LiveStreamViewModel @Inject constructor(
    private val streamRepository: StreamRepository
) : ViewModel() {
    val liveChatMessages: StateFlow<List<ChatMessage>> = streamRepository
        .observeChatChannel(streamId)
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())
}`
  }
];

function initProjectsShowcase() {
  const container = document.getElementById("projects-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!container) return;

  function renderProjects(filter = "all") {
    container.innerHTML = "";
    const filtered = filter === "all"
      ? portfolioProjects
      : portfolioProjects.filter(p => p.category === filter);

    filtered.forEach((project, idx) => {
      const card = document.createElement("article");
      card.className = "project-card reveal-on-scroll";
      card.style.animationDelay = `${idx * 0.1}s`;
      card.setAttribute("data-id", project.id);

      const tagsHtml = project.tags
        .map(tag => `<span class="tech-tag">${tag}</span>`)
        .join("");

      card.innerHTML = `
        <div class="shimmer-line"></div>
        <div class="project-media-wrapper">
          <img src="${project.image}" alt="${project.title}" class="project-thumbnail" loading="lazy" />
          <span class="project-category-badge">${project.categoryLabel}</span>
        </div>
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-summary">${project.summary}</p>
          </div>
          <div class="project-stat-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            <span>${project.stat}</span>
          </div>
          <div class="project-tech-tags">
            ${tagsHtml}
          </div>
          <div class="project-actions">
            <button class="project-link-btn view-case-study" data-project-id="${project.id}">
              <span>View Case Study</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <span class="tech-tag">${project.badge}</span>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Re-bind click events for case studies
    container.querySelectorAll(".view-case-study").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-project-id");
        openCaseStudyModal(id);
      });
    });

    // Trigger reveal observer
    if (window.observeNewElements) {
      window.observeNewElements();
    }
  }

  // Filter tabs click listener
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderProjects(filter);
    });
  });

  // Initial render
  renderProjects("all");
}

function openCaseStudyModal(projectId) {
  const project = portfolioProjects.find(p => p.id === projectId);
  if (!project) return;

  const modalBackdrop = document.getElementById("case-study-modal");
  const modalBody = document.getElementById("modal-dynamic-content");

  if (!modalBackdrop || !modalBody) return;

  const achievementsList = project.achievements
    .map(item => `<li><span style="color:var(--accent-cyan);margin-right:8px;">▹</span>${item}</li>`)
    .join("");

  const techBadges = project.tags
    .map(t => `<span class="tech-tag" style="color:var(--accent-cyan);border-color:rgba(0,242,254,0.3);">${t}</span>`)
    .join("");

  modalBody.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <span class="section-tag">${project.categoryLabel}</span>
      <h2 style="font-family:var(--font-display);font-size:2rem;margin-top:0.5rem;margin-bottom:0.75rem;">${project.title}</h2>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.5rem;">${techBadges}</div>
    </div>
    
    <div style="border-radius:16px;overflow:hidden;margin-bottom:1.75rem;aspect-ratio:16/9;background:#0d121f;">
      <img src="${project.image}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;" />
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.75rem;">
      <div style="background:rgba(255,255,255,0.03);padding:1.25rem;border-radius:12px;border:1px solid var(--border-subtle);">
        <h4 style="color:var(--accent-magenta);font-size:0.95rem;margin-bottom:0.5rem;">The Challenge</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">${project.problem}</p>
      </div>
      <div style="background:rgba(255,255,255,0.03);padding:1.25rem;border-radius:12px;border:1px solid var(--border-subtle);">
        <h4 style="color:var(--accent-emerald);font-size:0.95rem;margin-bottom:0.5rem;">The Architecture Solution</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">${project.solution}</p>
      </div>
    </div>

    <div style="margin-bottom:1.75rem;">
      <h4 style="color:var(--text-primary);font-size:1.1rem;margin-bottom:0.75rem;">Key Engineering Outcomes</h4>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;color:var(--text-secondary);font-size:0.92rem;">
        ${achievementsList}
      </ul>
    </div>

    <div>
      <h4 style="color:var(--text-primary);font-size:1.1rem;margin-bottom:0.75rem;">Core Architecture Pattern</h4>
      <pre class="arch-code-snippet"><code>${project.architecture}</code></pre>
    </div>
  `;

  modalBackdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function initCaseStudyModal() {
  const modalBackdrop = document.getElementById("case-study-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (!modalBackdrop) return;

  function closeModal() {
    modalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("open")) {
      closeModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initProjectsShowcase();
  initCaseStudyModal();
});
