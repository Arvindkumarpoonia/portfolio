/**
 * ARVIND KUMAR POONIA - PORTFOLIO CORE APPLICATION
 * Theme Switcher, Navigation, Scroll Spy, Architecture Tabs, Form Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSoundToggle();
  initScrollSpy();
  initMobileMenu();
  initArchitectureTabs();
  initContactForm();
  initEmailCopy();
  initScrollProgress();
  initTimezoneClock();
});

// 1. Theme Management (Dark / Light)
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("ak_theme") || "dark";

  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("ak_theme", next);
      updateThemeIcon(next);

      if (window.soundFX) window.soundFX.playPop();
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === "dark"
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
}

// 2. Sound Effects Toggle
function initSoundToggle() {
  const soundToggle = document.getElementById("sound-toggle");
  if (!soundToggle || !window.soundFX) return;

  const savedSound = localStorage.getItem("ak_sound");
  if (savedSound !== null) {
    window.soundFX.enabled = savedSound === "true";
  }
  updateSoundIcon();

  soundToggle.addEventListener("click", () => {
    window.soundFX.enabled = !window.soundFX.enabled;
    localStorage.setItem("ak_sound", window.soundFX.enabled);
    updateSoundIcon();
    if (window.soundFX.enabled) window.soundFX.playPop();
  });

  function updateSoundIcon() {
    soundToggle.innerHTML = window.soundFX.enabled
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
  }
}

// 3. Scroll Spy Navigation
function initScrollSpy() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// 4. Mobile Menu
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-toggle");
  const overlay = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu-link");

  if (!toggleBtn || !overlay) return;

  function closeMenu() {
    overlay.classList.remove("active");
    toggleBtn.classList.remove("open");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = overlay.classList.contains("active");
    if (isOpen) {
      closeMenu();
    } else {
      overlay.classList.add("active");
      toggleBtn.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  });

  mobileLinks.forEach(link => link.addEventListener("click", closeMenu));
}

// 5. Architecture Philosophy Tabs
function initArchitectureTabs() {
  const tabBtns = document.querySelectorAll(".arch-tab-btn");
  if (!tabBtns || tabBtns.length === 0) return;
  const codeDisplay = document.getElementById("arch-code-block");
  const tabContents = {
    mvvm: `// Android MVVM with StateFlow & Clean Coroutines
@HiltViewModel
class MediaCatalogViewModel @Inject constructor(
    private val getTracksUseCase: GetTracksUseCase,
    private val mediaRepository: MediaRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<MediaUiState>(MediaUiState.Loading)
    val uiState: StateFlow<MediaUiState> = _uiState.asStateFlow()

    fun loadMedia(category: String) {
        viewModelScope.launch {
            getTracksUseCase(category)
                .catch { error -> _uiState.value = MediaUiState.Error(error.localizedMessage) }
                .collect { tracks -> _uiState.value = MediaUiState.Success(tracks) }
        }
    }
}`,
    room: `// Offline-First Room DB Entity & DAO Architecture
@Entity(tableName = "cached_contacts")
data class ContactEntity(
    @PrimaryKey val id: String,
    val name: String,
    val company: String,
    val qrPayload: String,
    val syncedAt: Long = System.currentTimeMillis()
)

@Dao
interface ContactDao {
    @Query("SELECT * FROM cached_contacts ORDER BY syncedAt DESC")
    fun getAllContacts(): Flow<List<ContactEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertContact(contact: ContactEntity)
}`,
    kmp: `// Kotlin Multiplatform Shared Network Pipeline
class NetworkGateway(private val httpClient: HttpClient) {
    suspend fun fetchRealtimePrices(): Result<List<MarketTicker>> = runCatching {
        httpClient.get("https://api.market.live/v1/tickers") {
            header(HttpHeaders.Accept, "application/json")
        }.body()
    }
}`
  };

  const codeDisplay = document.getElementById("arch-code-block");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tabKey = btn.getAttribute("data-tab");
      if (codeDisplay && tabContents[tabKey]) {
        codeDisplay.textContent = tabContents[tabKey];
        if (window.soundFX) window.soundFX.playPop();
      }
    });
  });
}

// 6. Interactive Contact Form with Direct Gmail Delivery (FormSubmit)
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("#contact-name").value.trim();
    const email = form.querySelector("#contact-email").value.trim();
    const subject = form.querySelector("#contact-subject")?.value.trim() || "Portfolio Opportunity / Inquiry";
    const message = form.querySelector("#contact-message").value.trim();

    if (!name || !email || !message) {
      showToast("⚠️ Please fill in all required fields.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Sending to Arvind...</span>
    `;
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://formsubmit.co/ajax/arvindpoonia01@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: `[Portfolio Inquiry] ${subject} - ${name}`,
          message: message,
          _captcha: "false",
          _template: "table"
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        submitBtn.innerHTML = `<span>Delivered to Arvind's Inbox! ✓</span>`;
        form.reset();
        showToast("🚀 Message sent directly to arvindpoonia01@gmail.com!");
        if (window.soundFX) window.soundFX.playSuccess();
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      console.warn("Direct form submission error, opening mailto fallback:", err);
      // Fallback to mailto so user's message is never lost
      const mailtoUrl = `mailto:arvindpoonia01@gmail.com?subject=${encodeURIComponent("[Portfolio Inquiry] " + subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
      window.location.href = mailtoUrl;

      submitBtn.innerHTML = `<span>Opened in Mail Client ✓</span>`;
      showToast("✉️ Opening your email app to send directly to Arvind.");
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
      }, 4500);
    }
  });
}

// 7. Copy Email with Toast Notification
function initEmailCopy() {
  const copyPills = document.querySelectorAll(".email-copy-pill");

  copyPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const email = pill.getAttribute("data-email") || "arvindpoonia01@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        showToast("📋 Email copied to clipboard: " + email);
        if (window.soundFX) window.soundFX.playPop();
      }).catch(() => {
        showToast("Email: " + email);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }

  toast.innerHTML = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// 8. Scroll Progress
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.pageYOffset / total) * 100 : 0;
    bar.style.width = `${progress}%`;
  });
}

// 9. Timezone Clock
function initTimezoneClock() {
  const clock = document.getElementById("timezone-clock");
  if (!clock) return;

  function update() {
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };
    const now = new Date().toLocaleTimeString("en-US", options);
    clock.textContent = `${now} IST (India)`;
  }

  update();
  setInterval(update, 1000);
}
