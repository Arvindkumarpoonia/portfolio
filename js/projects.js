/**
 * ARVIND POONIA - PORTFOLIO PROJECTS DATA & CONTROLLER
 * Lead Android Engineer (10+ Years Experience)
 * Verified Featured Projects:
 *  1. TrackNinja (Motorsports Telemetry & GPS Lap Timer - Live & App Store / Play Store)
 *  2. Tevio Customer App (Google Play)
 *  3. Tevio Rider App (Google Play)
 *  4. VeniVibe (Google Play)
 *  5. Cygni Battery Management System (BMS - IoT/BLE - Cygni.com)
 *  6. FlowPlayer (ExoPlayer & Firebase)
 *  7. Pixafame (Live Stream & Chat)
 *  8. Meet & Greet (CameraX & Room DB)
 */

const portfolioProjects = [
  {
    id: "trackninja",
    title: "TrackNinja - Motorsports Lap Timer & Telemetry",
    role: "Lead Android Engineer",
    category: "telemetry",
    categoryLabel: "Motorsports Telemetry & IoT",
    badge: "GPS Lap Timer & Pit Telemetry",
    stat: "High-Precision GPS Lap Pacing & Hot/Cold Pit Data",
    image: "assets/images/project-trackninja.jpg",
    websiteUrl: "https://trackninja.app/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.trackninja",
    appStoreUrl: "https://apps.apple.com/us/app/trackninja/id1609189820",
    summary: "Pro-level motorsports telemetry and GPS lap timer mobile app featuring sub-second predictive lap timing, sector delta analysis, hot & cold pit data (tire pressures & temps), digital garage build sheets, and track discovery.",
    tags: ["Kotlin", "Jetpack Compose", "Coroutines & Flow", "High-Frequency GPS", "Telemetry Analytics", "BLE / OBD-II", "Room DB", "Clean MVVM"],
    githubUrl: "https://github.com/arvindkumar",
    problem: "Professional motorsport telemetry hardware (AiM, MoTeC) is prohibitively expensive and tethered. Track day racers, karting drivers, and motorsport teams require high-precision lap timing, real-time sector pacing, and cold-to-hot pit data logging directly on mobile devices that operate reliably in high-speed, vibration-heavy environments without internet connectivity.",
    solution: "Architected a high-performance Android mobile application with sub-meter GPS interpolation, automatic track boundary & finish line geofencing, real-time predictive delta calculation, Hot & Cold pit data sheets for tire pressure/suspension setup, and offline-first Room DB synchronization.",
    achievements: [
      "Engineered high-frequency GPS lap timer with auto-detected start/finish and split lines across global tracks",
      "Built real-time predictive lap delta engine comparing current run against driver personal best (PB)",
      "Designed Hot & Cold Pit Data logger recording cold tire pressures, hot target pressures, and suspension clicks",
      "Implemented vehicle build sheets and digital garage management per track session",
      "Developed high-throughput telemetry graph visualizations for speed, acceleration, and sector breakdowns",
      "Integrated BLE / OBD-II hardware sensor stream parsing for live RPM, throttle position, and engine temperature",
      "Engineered zero-latency offline-first Room database architecture for complete offline race track functionality",
      "Published and maintained production releases on Google Play Store and Apple App Store"
    ],
    architecture: `// High-Frequency GPS Lap Timer & Sector Delta Engine
@Singleton
class LapTimerTelemetryEngine @Inject constructor(
    private val locationFlow: Flow<GpsTelemetrySample>,
    private val trackRepository: TrackRepository
) {
    fun trackLapSession(trackId: String): Flow<LapTelemetryState> = channelFlow {
        val trackGeometry = trackRepository.getTrackGeometry(trackId)
        var currentLapDelta = 0.0
        var bestLapTimeMs = trackRepository.getPersonalBestMs(trackId)

        locationFlow.collect { sample ->
            // High-precision geometric split line crossing detection
            if (trackGeometry.crossesStartFinishLine(sample.latLng, sample.bearing)) {
                val lapTimeMs = sample.timestamp - currentLapStartMs
                val isNewPb = bestLapTimeMs == 0L || lapTimeMs < bestLapTimeMs
                trySend(LapTelemetryState.LapCompleted(lapTimeMs, isNewPb))
            } else {
                currentLapDelta = calculatePredictiveDelta(sample, trackGeometry.bestLapGhost)
                trySend(LapTelemetryState.RunningLap(currentLapDelta, sample.speedKmh))
            }
        }
    }.flowOn(Dispatchers.Default)
}`
  },
  {
    id: "tevio-customer",
    title: "Tevio Customer App",
    role: "Lead Android Engineer",
    category: "delivery",
    categoryLabel: "On-Demand Delivery & E-Commerce",
    badge: "Jetpack Compose & Razorpay",
    stat: "Real-time Order Tracking & Low Latency API",
    image: "assets/images/project-tevio-customer.jpg",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.tevioapp.customer",
    summary: "On-demand delivery platform for food, groceries, medicines, and local products with real-time order tracking, Google Maps, cart checkout, and Razorpay.",
    tags: ["Kotlin", "Jetpack Compose", "MVVM", "Clean Architecture", "Retrofit", "Hilt", "Razorpay", "Google Maps API", "FCM"],
    githubUrl: "https://github.com/arvindkumar",
    problem: "Real-time on-demand delivery apps require sub-second order status updates, seamless payment gateways, and fluid interactive map rendering without draining battery or causing UI jank.",
    solution: "Led end-to-end development designing a scalable Clean Architecture (MVVM + Clean Arch), Hilt dependency injection, Google Maps integration for live tracking, and optimized communication loops to significantly reduce API latency.",
    achievements: [
      "Led end-to-end development and feature planning",
      "Designed scalable architecture (MVVM + Clean Architecture)",
      "Integrated Google Maps for location selection and live tracking",
      "Implemented cart, checkout, payment (Razorpay) and order management",
      "Implemented Firebase Cloud Messaging (FCM)",
      "Managed team tasks, code reviews, and releases",
      "Optimized performance and API communication",
      "Published and maintained production releases on Google Play Store"
    ],
    architecture: `// Tevio Customer Reactive Order Tracking Pipeline
@HiltViewModel
class OrderTrackingViewModel @Inject constructor(
    private val getLiveOrderTrackingUseCase: GetLiveOrderTrackingUseCase
) : ViewModel() {

    val trackingState: StateFlow<TrackingUiState> = getLiveOrderTrackingUseCase(orderId)
        .map { location -> TrackingUiState.Active(location, eta = calculateEta(location)) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), TrackingUiState.Loading)
}`
  },
  {
    id: "tevio-rider",
    title: "Tevio Rider App",
    role: "Lead Android Engineer",
    category: "delivery",
    categoryLabel: "Logistics & Live Navigation",
    badge: "WebSockets & Background Services",
    stat: "Battery-Optimized Background GPS & Real-time Routing",
    image: "assets/images/project-tevio-rider.jpg",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.tevioapp.courier",
    summary: "Enables delivery partners to accept orders, navigate routes, update statuses, and share live GPS locations with background services and WebSockets.",
    tags: ["Kotlin", "WebSockets", "Background Services", "WorkManager", "Coroutines", "Room", "Google Maps Navigation"],
    githubUrl: "https://github.com/arvindkumar",
    problem: "Continuous background GPS tracking in delivery rider apps drains battery rapidly, while intermittent cellular connectivity disrupts order assignment notifications.",
    solution: "Designed a real-time order assignment architecture utilizing persistent WebSockets, battery-optimized background location tracking with foreground services and WorkManager, and Google Maps route navigation.",
    achievements: [
      "Led development of rider workflows and features",
      "Designed real-time order assignment architecture",
      "Implemented continuous location tracking and background services",
      "Integrated Google Maps navigation and route management",
      "Implemented WebSocket for real-time updates",
      "Developed status management and availability features",
      "Optimized battery usage and app performance",
      "Managed releases and maintenance on Google Play Store"
    ],
    architecture: `// High-Efficiency Rider Foreground Location Tracking
class LocationTrackingService : Service() {
    private val fusedLocationClient: FusedLocationProviderClient by lazy {
        LocationServices.getFusedLocationProviderClient(this)
    }

    private val locationCallback = object : LocationCallback() {
        override fun onLocationResult(result: LocationResult) {
            result.lastLocation?.let { loc ->
                webSocketManager.emitRiderCoordinates(loc.latitude, loc.longitude)
            }
        }
    }
}`
  },
  {
    id: "venivibe",
    title: "VeniVibe",
    role: "Lead Android Engineer",
    category: "events",
    categoryLabel: "Event Discovery & Ticketing",
    badge: "Modular Arch & Seat Selection",
    stat: "High-Conversion Interactive Seat Mapping",
    image: "assets/images/project-venivibe.jpg",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.venivibe.app",
    summary: "Event discovery and ticket booking platform for concerts, festivals, and local events with interactive seat selection, Razorpay, and Google Maps.",
    tags: ["Kotlin", "Modular Architecture", "Jetpack Components", "Firebase (Auth, Analytics, FCM)", "Razorpay", "Google Maps"],
    githubUrl: "https://github.com/arvindkumar",
    problem: "High-traffic concert ticket launches require concurrent seat reservation locking, minimal checkout friction, and instant transaction/refund reconciliation.",
    solution: "Led Android development implementing interactive seat selection maps, secure payment processing (Razorpay) with automated refunds, and modular architecture separating presentation and business logic.",
    achievements: [
      "Led Android development and feature planning",
      "Implemented event discovery, details, ticketing, and seat selection",
      "Integrated secure payments (Razorpay) and refunds",
      "Integrated Firebase (Auth, FCM, Analytics)",
      "Implemented Google Maps for event venues",
      "Managed team, code reviews, and sprint delivery",
      "Coordinated with backend, design, and QA teams",
      "Improved performance, stability, and user experience on Google Play"
    ],
    architecture: `// Interactive Venue Seat Selection Engine
class VenueSeatMapView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null
) : View(context, attrs) {

    fun onSeatTapped(seatId: String) {
        val currentStatus = seatMatrix[seatId] ?: return
        if (currentStatus == SeatStatus.AVAILABLE) {
            seatMatrix[seatId] = SeatStatus.SELECTED
            invalidate()
            onSeatSelectedListener?.invoke(seatId)
        }
    }
}`
  },
  {
    id: "cygni-bms",
    title: "Cygni Battery Management System",
    role: "Lead Android Engineer",
    category: "iot",
    categoryLabel: "Energy Storage & IoT Telemetry",
    badge: "BLE & Real-Time Monitoring",
    stat: "Real-Time Telemetry & Instant Fault Alerts",
    image: "assets/images/project-cygni.jpg",
    playStoreUrl: null,
    websiteUrl: "https://www.cygni.com/",
    companyLabel: "Visit Cygni.com",
    summary: "Battery monitoring and management application for Cygni energy storage systems providing real-time telemetry monitoring, BLE/IoT hardware communication, analytics, and safety alerts.",
    tags: ["Kotlin", "BLE / Bluetooth Low Energy", "IoT Communication", "Coroutines", "Room DB", "Telemetry Analytics", "Clean Architecture"],
    githubUrl: "https://github.com/arvindkumar",
    problem: "Industrial energy storage systems continuously transmit multi-channel cell voltage, temperature, and current metrics that require robust zero-packet-loss Bluetooth LE communication.",
    solution: "Architected a scalable BLE/IoT communication pipeline with asynchronous GATT characteristic streaming, Room DB offline telemetry caching, and threshold-based critical safety alerts.",
    achievements: [
      "Developed battery monitoring dashboards for Cygni Energy Storage Solutions",
      "Implemented real-time data monitoring and safety alerts",
      "Designed analytics, reports, and battery health insights",
      "Collaborated with hardware and backend teams at Cygni",
      "Implemented BLE / IoT communication protocols",
      "Designed scalable architecture for high reliability",
      "Improved performance and operational stability"
    ],
    architecture: `// Bluetooth Low Energy (BLE) Telemetry Streaming Pipeline
class BleTelemetryManager @Inject constructor(
    private val gattCallbackHandler: GattCallbackHandler
) {
    fun observeBatteryTelemetry(): Flow<BatteryHealthMetrics> = channelFlow {
        gattCallbackHandler.onCharacteristicChanged { characteristic ->
            val payload = characteristic.value
            val metrics = parseCellTelemetry(payload)
            trySend(metrics)
        }
    }.flowOn(Dispatchers.IO)
}`
  },
  {
    id: "flowplayer",
    title: "FlowPlayer Multimedia Suite",
    role: "Android Developer",
    category: "media",
    categoryLabel: "Multimedia & Streaming",
    badge: "ExoPlayer & Firebase",
    stat: "Adaptive Bitrate Audio / Video Engine",
    image: "assets/images/project-flowplayer.jpg",
    playStoreUrl: null,
    summary: "Multimedia player application powered by Google ExoPlayer, background audio services, offline caching with Room DB, and Firebase synchronization.",
    tags: ["Kotlin", "Java", "ExoPlayer / Media3", "Firebase", "MVVM", "Room DB"],
    githubUrl: "https://github.com/arvindkumar",
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
    id: "pixafame",
    title: "Pixafame Live Streaming Application",
    role: "Android Developer",
    category: "media",
    categoryLabel: "Live Stream & Realtime",
    badge: "Live Video & Realtime Chat",
    stat: "Low-Latency Video & Particle Reactions",
    image: "assets/images/project-pixafame.jpg",
    playStoreUrl: null,
    summary: "Live streaming application featuring real-time broadcasting, interactive floating chat bubbles, real-time viewer counters, and animated reaction hearts.",
    tags: ["Java", "Kotlin", "WebSockets", "Firebase", "MVVM", "Material Design"],
    githubUrl: "https://github.com/arvindkumar",
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
  },
  {
    id: "meetgreet",
    title: "Meet & Greet QR Contact Sharing",
    role: "Android Developer",
    category: "utility",
    categoryLabel: "Networking & Camera",
    badge: "CameraX & QR Engine",
    stat: "Sub-100ms Instant QR Scan & Room DB",
    image: "assets/images/project-meetgreet.jpg",
    playStoreUrl: null,
    summary: "QR-based contact sharing and professional networking application featuring CameraX instant QR scanning, offline contact persistence with SQLite/Room DB, and address book export.",
    tags: ["Kotlin", "Java", "CameraX", "Room DB", "SQLite", "Material Design"],
    githubUrl: "https://github.com/arvindkumar",
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
      card.style.animationDelay = `${idx * 0.08}s`;
      card.setAttribute("data-id", project.id);

      const tagsHtml = project.tags
        .slice(0, 5)
        .map(tag => `<span class="tech-tag">${tag}</span>`)
        .join("");

      // Action Badges / External Store Buttons
      let actionButtonsHtml = "";

      if (project.websiteUrl) {
        actionButtonsHtml += `
          <a href="${project.websiteUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background:rgba(255,255,255,0.06);color:var(--text-primary);border:1px solid rgba(255,255,255,0.18);padding:0.35rem 0.75rem;font-size:0.75rem;display:inline-flex;align-items:center;gap:0.35rem;text-decoration:none;border-radius:9999px;" title="Official Website">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>${project.companyLabel || "Website"}</span>
          </a>
        `;
      }

      if (project.playStoreUrl) {
        actionButtonsHtml += `
          <a href="${project.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background:rgba(0,242,254,0.12);color:var(--accent-cyan);border:1px solid rgba(0,242,254,0.35);padding:0.35rem 0.8rem;font-size:0.78rem;display:inline-flex;align-items:center;gap:0.4rem;text-decoration:none;border-radius:9999px;" title="View on Google Play Store">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.926V2.74c.14-.37.35-.69.61-.926zm11.233 11.234l2.57 2.57-12.03 6.945 9.46-9.515zM5.382 3.251l12.03 6.946-2.57 2.57-9.46-9.516zm13.19 7.616l2.84 1.64c.78.45.78 1.18 0 1.63l-2.84 1.64-2.22-2.22 2.22-2.19z"/>
            </svg>
            <span>Google Play</span>
          </a>
        `;
      }

      if (project.appStoreUrl) {
        actionButtonsHtml += `
          <a href="${project.appStoreUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.25);padding:0.35rem 0.75rem;font-size:0.75rem;display:inline-flex;align-items:center;gap:0.35rem;text-decoration:none;border-radius:9999px;" title="View on Apple App Store">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.71-.93 2.73 1 .08 2.02-.48 2.64-1.23z"/>
            </svg>
            <span>App Store</span>
          </a>
        `;
      }

      card.innerHTML = `
        <div class="shimmer-line"></div>
        <div class="project-media-wrapper">
          <img src="${project.image}" alt="${project.title}" class="project-thumbnail" loading="lazy" />
          <span class="project-category-badge">${project.categoryLabel}</span>
        </div>
        <div class="project-content">
          <div class="project-header">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.35rem;flex-wrap:wrap;">
              <h3 class="project-title" style="margin-bottom:0;">${project.title}</h3>
              <span class="tech-tag" style="color:var(--accent-cyan);border-color:rgba(0,242,254,0.3);font-weight:700;">${project.role}</span>
            </div>
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
            <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
              ${actionButtonsHtml}
              <span class="tech-tag">${project.badge}</span>
            </div>
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

  let modalLinksHtml = "";

  if (project.websiteUrl) {
    modalLinksHtml += `
      <a href="${project.websiteUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:0.4rem;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span>${project.companyLabel || "Visit Website"}</span>
      </a>
    `;
  }

  if (project.playStoreUrl) {
    modalLinksHtml += `
      <a href="${project.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="display:inline-flex;align-items:center;gap:0.4rem;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a2.38 2.38 0 0 1-.61-.926V2.74c.14-.37.35-.69.61-.926zm11.233 11.234l2.57 2.57-12.03 6.945 9.46-9.515zM5.382 3.251l12.03 6.946-2.57 2.57-9.46-9.516zm13.19 7.616l2.84 1.64c.78.45.78 1.18 0 1.63l-2.84 1.64-2.22-2.22 2.22-2.19z"/>
        </svg>
        <span>Google Play</span>
      </a>
    `;
  }

  if (project.appStoreUrl) {
    modalLinksHtml += `
      <a href="${project.appStoreUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display:inline-flex;align-items:center;gap:0.4rem;background:rgba(255,255,255,0.08);color:#fff;border-color:rgba(255,255,255,0.3);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.71-.93 2.73 1 .08 2.02-.48 2.64-1.23z"/>
        </svg>
        <span>App Store</span>
      </a>
    `;
  }

  modalBody.innerHTML = `
    <div style="margin-bottom:1.5rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;margin-bottom:0.75rem;">
        <div style="display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap;">
          <span class="section-tag">${project.categoryLabel}</span>
          <span class="tech-tag" style="color:var(--accent-emerald);border-color:rgba(16,185,129,0.3);font-weight:700;">${project.role}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-left:auto;">
          ${modalLinksHtml}
        </div>
      </div>
      <h2 style="font-family:var(--font-display);font-size:2rem;margin-top:0.25rem;margin-bottom:0.75rem;">${project.title}</h2>
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
        <h4 style="color:var(--accent-emerald);font-size:0.95rem;margin-bottom:0.5rem;">The Engineering Solution</h4>
        <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">${project.solution}</p>
      </div>
    </div>

    <div style="margin-bottom:1.75rem;">
      <h4 style="color:var(--text-primary);font-size:1.1rem;margin-bottom:0.75rem;">Key Engineering Achievements</h4>
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
