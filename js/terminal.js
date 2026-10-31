/**
 * ARVIND KUMAR POONIA - INTERACTIVE DEVELOPER CONSOLE / CLI TERMINAL
 */

function initTerminal() {
  const terminal = document.getElementById("terminal-drawer");
  const terminalBody = document.getElementById("terminal-body");
  const terminalInput = document.getElementById("terminal-input");
  const openButtons = document.querySelectorAll(".open-terminal-btn");
  const closeDot = document.getElementById("term-close-dot");

  if (!terminal || !terminalInput || !terminalBody) return;

  function toggleTerminal(state) {
    if (state !== undefined) {
      terminal.classList.toggle("open", state);
    } else {
      terminal.classList.toggle("open");
    }
    if (terminal.classList.contains("open")) {
      setTimeout(() => terminalInput.focus(), 150);
      if (window.soundFX) window.soundFX.playPop();
    }
  }

  openButtons.forEach(btn => btn.addEventListener("click", () => toggleTerminal(true)));
  if (closeDot) closeDot.addEventListener("click", () => toggleTerminal(false));

  const commands = {
    help: () => `
<span style="color:#00f2fe;font-weight:bold;">Available Commands:</span>
  <span style="color:#f59e0b;">whoami</span>      - Overview of Arvind Kumar Poonia
  <span style="color:#f59e0b;">skills</span>      - Technical stack & proficiencies
  <span style="color:#f59e0b;">projects</span>    - Featured apps (FlowPlayer, Meet & Greet, Pixafame...)
  <span style="color:#f59e0b;">experience</span>  - Career milestones & leadership
  <span style="color:#f59e0b;">education</span>   - Academic credentials (MCA - Kurukshetra Univ)
  <span style="color:#f59e0b;">contact</span>     - Direct contact & email details
  <span style="color:#f59e0b;">matrix</span>      - Trigger digital rain animation
  <span style="color:#f59e0b;">sudo hire</span>   - Unlock secret Easter egg 🎉
  <span style="color:#f59e0b;">clear</span>       - Clear terminal output
`,
    whoami: () => `
<span style="color:#10b981;font-weight:bold;">Arvind Kumar Poonia</span>
Title: Senior Android Developer & Team Lead
Experience: 7+ Years in Mobile Architecture
Location: India / Remote
Expertise: Java, Kotlin, MVVM, Room DB, ExoPlayer, Material Design
`,
    skills: () => `
<span style="color:#8b5cf6;font-weight:bold;">[Technical Proficiencies]</span>
  • <span style="color:#00f2fe;">Languages:</span> Kotlin, Java, TypeScript, Dart
  • <span style="color:#00f2fe;">Android SDK:</span> MVVM, Jetpack, Coroutines, Flow, Room DB, SQLite, CameraX, ExoPlayer
  • <span style="color:#00f2fe;">Cross-Platform:</span> Kotlin Multiplatform (KMP), React Native, iOS Basics
  • <span style="color:#00f2fe;">Architecture:</span> Clean Architecture, Repository Pattern, Offline-First, MVI
  • <span style="color:#00f2fe;">Tools & Cloud:</span> Android Studio, Git, Jira, Firebase, Fastlane, CI/CD
`,
    projects: () => `
<span style="color:#ec4899;font-weight:bold;">[Featured Mobile Projects]</span>
  1. <span style="color:#00f2fe;font-weight:bold;">FlowPlayer</span> - Multimedia player app with ExoPlayer & Firebase
  2. <span style="color:#00f2fe;font-weight:bold;">Pixafame</span> - Low-latency live streaming app with interactive chat & reactions
  3. <span style="color:#00f2fe;font-weight:bold;">Meet & Greet</span> - QR-based networking & contact sharing app with CameraX & Room
  4. <span style="color:#00f2fe;font-weight:bold;">OpenSauda Mobile</span> - High-frequency trading & commodities platform
  5. <span style="color:#00f2fe;font-weight:bold;">KMP Core Engine</span> - Multiplatform shared architecture across iOS & Android
`,
    experience: () => `
<span style="color:#f59e0b;font-weight:bold;">[Career History]</span>
  • <span style="color:#00f2fe;">Team Lead & Android Developer</span> (7+ Years Experience)
    - Architected scalable mobile applications serving hundreds of thousands of users.
    - Mentored engineering teams, led code reviews, and enforced strict MVVM & Clean Code practices.
    - Achieved 99.9% crash-free sessions across Google Play & internal enterprise releases.
`,
    education: () => `
<span style="color:#10b981;font-weight:bold;">[Education]</span>
  🎓 Master of Computer Applications (MCA)
  🏛️ Kurukshetra University
`,
    contact: () => `
<span style="color:#00f2fe;font-weight:bold;">[Connect with Arvind]</span>
  📧 Email:    <a href="mailto:kumararvind@seasiainfotech.com" style="color:#38bdf8;text-decoration:underline;">kumararvind@seasiainfotech.com</a>
  🐙 GitHub:   <a href="https://github.com/arvindkumar" target="_blank" style="color:#38bdf8;text-decoration:underline;">github.com/arvindkumar</a>
  💼 Status:   Available for Senior Android, Lead & Cross-Platform roles
`,
    matrix: () => {
      runMatrixEffect();
      return `<span style="color:#22c55e;">Entering the Matrix... Wake up, Neo.</span>`;
    },
    "sudo hire": () => {
      if (window.soundFX) window.soundFX.playSuccess();
      return `
<span style="color:#10b981;font-weight:bold;">🎉 ACCESS GRANTED! 🎉</span>
Arvind Kumar Poonia is ready to supercharge your mobile engineering roadmap!
Initiate onboarding sequence via: <a href="mailto:kumararvind@seasiainfotech.com" style="color:#00f2fe;text-decoration:underline;">kumararvind@seasiainfotech.com</a>
`;
    },
    clear: () => {
      terminalBody.innerHTML = "";
      return null;
    }
  };

  function runMatrixEffect() {
    const chars = "01010101ABCDEF0123456789";
    let count = 0;
    const interval = setInterval(() => {
      const line = document.createElement("div");
      line.style.color = "#22c55e";
      line.style.fontSize = "0.75rem";
      let row = "";
      for (let i = 0; i < 40; i++) {
        row += chars[Math.floor(Math.random() * chars.length)] + " ";
      }
      line.textContent = row;
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      count++;
      if (count > 15) clearInterval(interval);
    }, 80);
  }

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const raw = terminalInput.value.trim().toLowerCase();
      if (!raw) return;

      const userLine = document.createElement("div");
      userLine.innerHTML = `<span style="color:#ec4899;font-weight:bold;">visitor@arvind:~$</span> ${escapeHTML(raw)}`;
      terminalBody.appendChild(userLine);

      if (commands[raw]) {
        const out = commands[raw]();
        if (out) {
          const resp = document.createElement("div");
          resp.innerHTML = out;
          terminalBody.appendChild(resp);
        }
      } else {
        const errorLine = document.createElement("div");
        errorLine.innerHTML = `<span style="color:#ef4444;">Command not recognized: "${escapeHTML(raw)}". Type <span style="color:#00f2fe;">help</span> for commands.</span>`;
        terminalBody.appendChild(errorLine);
      }

      terminalInput.value = "";
      terminalBody.scrollTop = terminalBody.scrollHeight;
      if (window.soundFX) window.soundFX.playPop();
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

document.addEventListener("DOMContentLoaded", initTerminal);
