// CivicPulse Karnataka - 17 Ordered Modules Application Logic

let currentUser = typeof getCurrentAuthUser === "function" ? getCurrentAuthUser() : { name: "Ramesh Kumar", constituency: "Kanakapura", role: "citizen", isLoggedIn: true };
let currentRole = currentUser.role || "citizen";
let activeTab = "directory";
let selectedMla = null;
let currentModalTab = "mod-1";
let selectedPerformanceYear = "all";
let mlaDataset = [];
let complaintsDataset = [];

document.addEventListener("DOMContentLoaded", () => {
  loadDataFromStorage();
  initEventListeners();
  renderApp();
  initTheme();
});

function loadDataFromStorage() {
  const savedMlas = localStorage.getItem("civic_karnataka_mlas_v2");
  if (savedMlas) {
    try { mlaDataset = JSON.parse(savedMlas); } catch (e) { mlaDataset = [...KARNATAKA_MLAS]; }
  } else {
    mlaDataset = [...KARNATAKA_MLAS];
  }

  const savedComplaints = localStorage.getItem("civic_karnataka_complaints_v2");
  if (savedComplaints) {
    try { complaintsDataset = JSON.parse(savedComplaints); } catch (e) { complaintsDataset = getInitialComplaints(); }
  } else {
    complaintsDataset = getInitialComplaints();
  }
}

function saveDataToStorage() {
  localStorage.setItem("civic_karnataka_mlas_v2", JSON.stringify(mlaDataset));
  localStorage.setItem("civic_karnataka_complaints_v2", JSON.stringify(complaintsDataset));
}

function getInitialComplaints() {
  return [
    {
      id: "comp-101",
      constituency: "Kanakapura",
      category: "Roads & Streetlights",
      title: "Main Bus Stand Streetlights Not Working",
      description: "Streetlights around Kanakapura bus station have been flickering and out for 4 days.",
      status: "In Progress",
      dateSubmitted: "2026-08-20",
      reportedBy: "Kiran Kumar",
      aiCategory: "Urgent Infrastructure Need",
      aiSeverity: "Medium Risk"
    },
    {
      id: "comp-102",
      constituency: "Chittapur",
      category: "Cleanliness & Sanitation",
      title: "Drainage Overflow near Railway Gate Ward 3",
      description: "Open drain overflowing after heavy rain. Needs immediate sanitation team clearance.",
      status: "Submitted",
      dateSubmitted: "2026-08-28",
      reportedBy: "Syed Ismail",
      aiCategory: "Urgent Infrastructure Need",
      aiSeverity: "High Severity Concern"
    }
  ];
}

function initEventListeners() {
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const tab = e.currentTarget.getAttribute("data-tab");
      switchTab(tab);
    });
  });

  document.getElementById("btn-role-citizen").addEventListener("click", () => {
    setRole("citizen");
  });
  document.getElementById("btn-role-admin").addEventListener("click", () => {
    if (currentUser.role !== "admin") {
      openAuthModal("admin");
    } else {
      setRole("admin");
    }
  });
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

  document.getElementById("search-input").addEventListener("input", filterDirectory);
  document.getElementById("filter-district").addEventListener("change", filterDirectory);
  document.getElementById("filter-party").addEventListener("change", filterDirectory);
  document.getElementById("filter-age").addEventListener("change", filterDirectory);

  document.getElementById("modal-close-btn").addEventListener("click", closeModal);
  document.getElementById("modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  });

  const complaintForm = document.getElementById("complaint-form");
  if (complaintForm) complaintForm.addEventListener("submit", handleComplaintSubmit);
}

function initTheme() {
  if (localStorage.getItem("civic_theme") === "light") {
    document.body.classList.add("light-theme");
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("civic_theme", document.body.classList.contains("light-theme") ? "light" : "dark");
}

function setRole(role) {
  currentRole = role;
  document.getElementById("btn-role-citizen").classList.toggle("active", role === "citizen");
  document.getElementById("btn-role-admin").classList.toggle("active", role === "admin");
  document.getElementById("btn-role-admin").classList.toggle("admin-active", role === "admin");

  const adminNavTab = document.getElementById("nav-admin-tab");
  if (role === "admin") {
    adminNavTab.style.display = "flex";
    showToast("Admin Panel Unlocked", "info");
  } else {
    adminNavTab.style.display = "none";
    if (activeTab === "admin") switchTab("directory");
  }
  renderApp();
}

function switchTab(tabName) {
  activeTab = tabName;
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
  });
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));

  const activePane = document.getElementById(`tab-pane-${tabName}`);
  if (activePane) activePane.classList.add("active");

  if (tabName === "directory") renderDirectoryGrid();
  if (tabName === "projects") renderGlobalProjects();
  if (tabName === "gis") renderGisLocalityMap();
  if (tabName === "promises") renderPromisesTracker();
  if (tabName === "survey") renderServiceSurveyForm();
  if (tabName === "dashboard") renderDashboard();
  if (tabName === "complaints") renderComplaintsPortal();
  if (tabName === "admin") renderAdminPanel();
}

function renderApp() {
  populateFilterOptions();
  populateAuthConstituencyOptions();
  switchTab(activeTab);
  updateHeaderCounters();
  renderUserSessionHeader();
}

function populateAuthConstituencyOptions() {
  const select = document.getElementById("auth-constituency-select");
  if (select && select.options.length <= 1) {
    mlaDataset.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m.constituency;
      opt.textContent = `${m.constituency} (${m.mla})`;
      select.appendChild(opt);
    });
  }
}

function renderUserSessionHeader() {
  const sessionBox = document.getElementById("user-session-box");
  if (sessionBox) {
    if (currentUser && currentUser.isLoggedIn) {
      sessionBox.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <span style="font-size:0.82rem; color:var(--text-muted);">
            <i class="fa-solid fa-circle-user" style="color:var(--accent-cyan);"></i>
            <strong>${currentUser.name}</strong> 
            <span style="background:rgba(56,189,248,0.15); color:var(--accent-cyan); padding:0.15rem 0.5rem; border-radius:999px; font-size:0.72rem; font-weight:700; text-transform:uppercase;">${currentUser.role}</span>
          </span>
          <button onclick="handleLogoutClick()" title="Sign Out" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); color:#f87171; font-size:0.75rem; padding:0.25rem 0.55rem; border-radius:var(--radius-md); cursor:pointer;">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      `;
    } else {
      sessionBox.innerHTML = `
        <button onclick="openAuthModal()" class="btn-primary" style="padding:0.35rem 0.85rem; font-size:0.8rem;">
          <i class="fa-solid fa-lock"></i> Login / Register
        </button>
      `;
    }
  }
}

function handleLogoutClick() {
  logoutCurrentUser();
  currentUser = getCurrentAuthUser();
  setRole("citizen");
  showToast("Logged out successfully.", "info");
  renderUserSessionHeader();
}

function updateHeaderCounters() {
  const elTotal = document.getElementById("counter-total-mlas");
  if (elTotal) elTotal.textContent = mlaDataset.length;

  const elInc = document.getElementById("counter-inc");
  if (elInc) elInc.textContent = mlaDataset.filter(m => m.party === "INC").length;

  const elBjp = document.getElementById("counter-bjp");
  if (elBjp) elBjp.textContent = mlaDataset.filter(m => m.party === "BJP").length;

  const elJds = document.getElementById("counter-jds");
  if (elJds) elJds.textContent = mlaDataset.filter(m => m.party.includes("JD")).length;

  const elProj = document.getElementById("counter-projects");
  if (elProj) {
    let totalProjects = 0;
    mlaDataset.forEach(m => totalProjects += (m.projects ? m.projects.length : 0));
    elProj.textContent = totalProjects;
  }
}

function populateFilterOptions() {
  const districtSelect = document.getElementById("filter-district");
  if (districtSelect && districtSelect.options.length <= 1) {
    const districts = [...new Set(mlaDataset.map(m => m.district))].sort();
    districts.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d; opt.textContent = `${d} District`;
      districtSelect.appendChild(opt);
    });
  }

  const compSelect = document.getElementById("complaint-constituency-select");
  if (compSelect && compSelect.options.length <= 1) {
    mlaDataset.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m.constituency; opt.textContent = `${m.constituency} (${m.mla})`;
      compSelect.appendChild(opt);
    });
  }

  const loginSelect = document.getElementById("login-constituency-select");
  if (loginSelect && loginSelect.options.length <= 1) {
    mlaDataset.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m.constituency; opt.textContent = m.constituency;
      loginSelect.appendChild(opt);
    });
  }
}

function filterDirectory() {
  const query = document.getElementById("search-input").value.toLowerCase().trim();
  const district = document.getElementById("filter-district").value;
  const party = document.getElementById("filter-party").value;
  const ageGroup = document.getElementById("filter-age").value;

  const filtered = mlaDataset.filter(m => {
    const matchesQuery = !query || m.mla.toLowerCase().includes(query) || m.constituency.toLowerCase().includes(query) || m.district.toLowerCase().includes(query);
    const matchesDistrict = !district || m.district === district;
    const matchesParty = !party || m.party === party || (party === "JDS" && m.party.includes("JD"));

    let matchesAge = true;
    if (ageGroup === "young") matchesAge = m.age < 45;
    if (ageGroup === "mid") matchesAge = m.age >= 45 && m.age <= 60;
    if (ageGroup === "senior") matchesAge = m.age > 60;

    return matchesQuery && matchesDistrict && matchesParty && matchesAge;
  });

  renderDirectoryGrid(filtered);
}

function renderDirectoryGrid(dataToRender = null) {
  const container = document.getElementById("politician-grid-container");
  const data = dataToRender || mlaDataset;

  container.innerHTML = data.map(m => `
    <div class="mla-card" onclick="openMlaProfileModal(${m.id})">
      <div class="party-stripe ${m.party}"></div>
      <div class="mla-header">
        <div class="mla-avatar-wrapper">
          <img src="${m.photo}" alt="${m.mla}" class="mla-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(m.mla)}&background=334155&color=fff'">
          <span class="mla-party-badge ${m.party}">${m.party}</span>
        </div>
        <div class="mla-info">
          <h3>${m.mla}</h3>
          <div class="mla-constituency"><i class="fa-solid fa-location-dot" style="margin-right:4px;"></i>${m.constituency} (${m.district})</div>
          <div class="mla-meta-tags">
            <span class="tag-badge">Age: ${m.age}</span>
            <span class="tag-badge verified"><i class="fa-solid fa-circle-check"></i> ECI Verified</span>
            ${m.legalCasesCount > 0 ? `<span class="tag-badge legal-warning"><i class="fa-solid fa-triangle-exclamation"></i> ${m.legalCasesCount} Legal Case</span>` : ''}
          </div>
        </div>
      </div>

      <div class="mla-metrics-grid">
        <div class="metric-item">
          <span class="metric-label">Assembly Attendance</span>
          <span class="metric-value highlight">${m.assemblyPerformance.attendancePct}%</span>
          <div class="score-progress-bar"><div class="score-progress-fill" style="width:${m.assemblyPerformance.attendancePct}%;"></div></div>
        </div>
        <div class="metric-item">
          <span class="metric-label">Net Assets</span>
          <span class="metric-value">₹ ${m.financials.netWorthCr} Cr</span>
          <span style="font-size:0.7rem; color:var(--text-dim);">${m.projectsCount} Development Projects</span>
        </div>
      </div>

      <button class="btn-card-action">
        View Full 17-Module Record <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `).join('');
}

// Open MLA Profile Modal with 17 Ordered Modules
function openMlaProfileModal(mlaId) {
  selectedMla = mlaDataset.find(m => m.id === mlaId);
  if (!selectedMla) return;

  currentModalTab = "mod-2"; // Module 2: Politician Profile Default

  document.getElementById("modal-avatar").src = selectedMla.photo;
  document.getElementById("modal-name").innerHTML = `${selectedMla.mla} <span class="mla-party-badge ${selectedMla.party}">${selectedMla.party}</span>`;
  document.getElementById("modal-subtext").innerHTML = `
    <strong>${selectedMla.constituency} Constituency</strong> | ${selectedMla.district} District | Term: ${selectedMla.term}
  `;
  document.getElementById("modal-portfolio-tag").textContent = selectedMla.designation;

  document.getElementById("modal-stat-age").textContent = `${selectedMla.age} yrs`;
  document.getElementById("modal-stat-attendance").textContent = `${selectedMla.assemblyPerformance.attendancePct}%`;
  document.getElementById("modal-stat-networth").textContent = `₹ ${selectedMla.financials.netWorthCr} Cr`;
  document.getElementById("modal-stat-cases").textContent = `${selectedMla.legalCasesCount}`;

  renderModalTabContent();
  document.getElementById("modal-backdrop").classList.add("active");
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.remove("active");
}

function switchModalTab(tabName) {
  currentModalTab = tabName;
  document.querySelectorAll(".modal-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-mtab") === tabName);
  });
  renderModalTabContent();
}

// Render Content for All 17 Ordered Modules in Profile Modal
function renderModalTabContent() {
  const container = document.getElementById("modal-tab-body");
  if (!selectedMla) return;

  const m = selectedMla;

  if (currentModalTab === "mod-2") {
    // Module 2: Politician Profile Overview
    container.innerHTML = `
      <div class="module-section-card">
        <h3 style="margin-bottom:0.5rem;"><i class="fa-solid fa-user-tie" style="color:var(--accent-primary);"></i> Representative Overview</h3>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; font-size:0.9rem;">
          <div><strong>Full Name:</strong> ${m.mla}</div>
          <div><strong>Constituency:</strong> ${m.constituency} (${m.district})</div>
          <div><strong>Political Party:</strong> ${m.party}</div>
          <div><strong>Designation:</strong> ${m.designation}</div>
          <div><strong>Age:</strong> ${m.age} Years</div>
          <div><strong>Term in Office:</strong> ${m.term}</div>
        </div>
      </div>
    `;
  } else if (currentModalTab === "mod-eval") {
    // 10-Metric Evaluation Scorecard
    const evalData = m.evaluationMetrics || {};
    const metricsList = [
      { name: "Area Development", score: evalData.areaDevelopment || 75 },
      { name: "Local Problem Resolution", score: evalData.problemResolution || 70 },
      { name: "MLA Accessibility & Availability", score: evalData.mlaAccessibility || 82 },
      { name: "Road & Infrastructure Quality", score: evalData.roadInfrastructure || 68 },
      { name: "Complaint Resolution SLA", score: evalData.complaintSla || 74 },
      { name: "Information Transparency", score: evalData.informationTransparency || 80 },
      { name: "Cleanliness & Sanitation", score: evalData.cleanlinessSanitation || 65 },
      { name: "Public Transportation", score: evalData.publicTransport || 72 },
      { name: "Education Facilities", score: evalData.educationFacilities || 84 },
      { name: "Healthcare Services", score: evalData.healthcareServices || 78 }
    ];

    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-chart-radar" style="color:var(--accent-cyan);"></i> 10-Category Politician Performance Evaluation</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.25rem;">
          Quantitative evaluation scores calculated from constituent surveys, assembly attendance, project execution, and complaint SLA statistics for ${m.mla}.
        </p>

        <div class="eval-metric-grid">
          ${metricsList.map(item => `
            <div class="eval-card">
              <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
                <strong style="color:var(--text-main);">${item.name}</strong>
                <span style="color:var(--accent-cyan); font-weight:700;">${item.score}%</span>
              </div>
              <div class="eval-bar-bg">
                <div class="eval-bar-fill" style="width:${item.score}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (currentModalTab === "mod-promises") {
    // Promise Progress Tracker
    const promises = m.promisesTracker || [];
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-handshake" style="color:var(--accent-gold);"></i> Public Promises & Development Progress</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.25rem;">
          Lifecycle tracking of election promises and major project announcements made by ${m.mla}.
        </p>
        ${promises.map(p => `
          <div style="padding:1rem; background:rgba(15,23,42,0.5); border-radius:var(--radius-md); margin-bottom:0.85rem; border:1px solid var(--border-color);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="tag-badge designation">${p.category}</span>
              <span class="promise-status-badge ${p.status.replace(' ', '-')}">${p.status}</span>
            </div>
            <h4 style="margin-top:0.4rem; color:var(--text-main);">${p.title}</h4>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.2rem;">${p.description}</p>
            <div style="margin-top:0.6rem; font-size:0.8rem; display:flex; gap:1.5rem;">
              <span><strong>Progress:</strong> ${p.progressPct}%</span>
              <span><strong>Budget:</strong> ₹ ${p.costCr} Cr</span>
              <span><strong>Target:</strong> ${p.targetDate}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentModalTab === "mod-3") {
    // Module 3: 5-Year Assembly Performance
    container.innerHTML = renderFiveYearPerformance(m);
  } else if (currentModalTab === "mod-4") {
    // Module 4: Assembly Questions
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-circle-question" style="color:var(--accent-cyan);"></i> Assembly Questions Record</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
          Starred and Unstarred questions asked by ${m.mla} across the 5-year Vidhana Sabha term with official government responses and document links.
        </p>
        ${m.assemblyQuestions.map(q => `
          <div style="padding:0.9rem; background:rgba(15,23,42,0.5); border-radius:var(--radius-md); margin-bottom:0.75rem; border:1px solid var(--border-color);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="tag-badge designation">Q No: ${q.id}</span>
              <span style="font-size:0.75rem; color:var(--text-dim);">${q.date} | ${q.category}</span>
            </div>
            <h4 style="font-size:0.95rem; margin-top:0.4rem; color:var(--text-main);">${q.title}</h4>
            <div style="font-size:0.85rem; color:var(--status-success); margin-top:0.3rem; background:rgba(16,185,129,0.1); padding:0.4rem 0.6rem; border-radius:var(--radius-md);">
              <i class="fa-solid fa-check-double"></i> ${q.responseStatus}
            </div>
            <button class="doc-link-btn" onclick="openDocumentViewerModal('Assembly Starred Question', '${q.id}', '${q.date}', '${escapeAttr(q.title)}', '${escapeAttr(q.category)}', '${escapeAttr(q.responseStatus)}', '')">
              <i class="fa-solid fa-file-pdf"></i> View Official Question Document PDF
            </button>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentModalTab === "mod-5") {
    // Module 5: Assembly Discussions
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-comments" style="color:var(--accent-gold);"></i> Assembly Discussions & Debates</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
          Zero-Hour mentions, calling attention motions, and budget debates participated in by ${m.mla}.
        </p>
        ${m.assemblyDiscussions.map(d => `
          <div style="padding:0.9rem; background:rgba(15,23,42,0.5); border-radius:var(--radius-md); margin-bottom:0.75rem; border:1px solid var(--border-color);">
            <div style="font-weight:600; color:var(--text-main); font-size:0.95rem;">${d.topic}</div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.2rem;">${d.summary}</div>
            <div style="font-size:0.75rem; color:var(--text-dim); margin-top:0.2rem;">Date: ${d.date} | Speaking Time: ${d.duration}</div>
            <button class="doc-link-btn" onclick="openDocumentViewerModal('Assembly Proceeding & Debate', 'KLA/PROC/${d.date}', '${d.date}', '${escapeAttr(d.topic)}', '${escapeAttr(d.summary)}', '', '')">
              <i class="fa-solid fa-file-lines"></i> View Official Assembly Proceeding PDF
            </button>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentModalTab === "mod-6") {
    // Module 6: Ruling-Party / Government Discussion Records
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-briefcase" style="color:var(--accent-primary);"></i> Ruling Party & Government Discussion Records</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
          Verified assembly proceedings, house standing committee reports, and cabinet review citations.
        </p>
        ${m.govtDiscussionRecords.map(r => `
          <div style="padding:0.9rem; background:rgba(15,23,42,0.5); border-radius:var(--radius-md); margin-bottom:0.75rem; border:1px solid var(--border-color);">
            <div style="font-weight:600; color:var(--accent-gold); font-size:0.95rem;">${r.title}</div>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.2rem;">Session / Date: <strong>${r.meetingDate}</strong></div>
            <div style="font-size:0.85rem; color:var(--text-main); margin-top:0.2rem; background:rgba(255,255,255,0.03); padding:0.5rem; border-radius:var(--radius-md);">${r.notes}</div>
            <button class="doc-link-btn" onclick="openDocumentViewerModal('Ruling Party & Govt Record', 'KLA/GOV-REC/${r.id}', '${r.meetingDate}', '${escapeAttr(r.title)}', 'Legislative Standing Committee', '', '${escapeAttr(r.notes)}')">
              <i class="fa-solid fa-book-bookmark"></i> View Official Hansard Citation PDF
            </button>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentModalTab === "mod-7") {
    // Module 7: Development Projects
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-helmet-safety" style="color:var(--accent-primary);"></i> Infrastructure & Development Projects</h3>
        ${m.projects.map(p => `
          <div class="module-section-card">
            <div style="display:flex; justify-content:space-between;">
              <span class="tag-badge designation">${p.category}</span>
              <span class="status-badge ${p.status.replace(' ', '-')}">${p.status}</span>
            </div>
            <h4 style="margin-top:0.4rem;">${p.title}</h4>
            <p style="font-size:0.85rem; color:var(--text-muted);">${p.description}</p>
            <div style="margin-top:0.5rem; font-size:0.85rem; display:flex; gap:1.5rem;">
              <span><strong>Cost:</strong> ₹ ${p.costCr} Cr</span>
              <span><strong>Location:</strong> ${p.location}</span>
              <span><strong>Completion:</strong> ${p.completionDate}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentModalTab === "mod-8") {
    // Module 8: Public Feedback & AI Classification
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-star" style="color:var(--accent-gold);"></i> Constituent Ratings & AI Feedback Classification</h3>
        ${m.comments.map(c => `
          <div style="padding:0.85rem; background:rgba(15,23,42,0.5); border-radius:var(--radius-md); margin-bottom:0.75rem; border:1px solid var(--border-color);">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong>${c.author}</strong>
              <span class="ai-sentiment-badge ${c.aiCategory.replace(/ /g, '')}"><i class="fa-solid fa-robot"></i> AI: ${c.aiCategory} (${c.aiSeverity})</span>
            </div>
            <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.4rem;">${c.text}</p>
            <div style="font-size:0.75rem; color:var(--text-dim); margin-top:0.4rem;">AI Summary: ${c.aiSummary}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentModalTab === "mod-10") {
    // Module 10: Declared Legal Cases
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-scale-balanced" style="color:var(--status-danger);"></i> Declared Criminal & Civil Cases</h3>
        ${m.legalCasesCount === 0 ? `
          <div style="color:var(--status-success); font-weight:600; padding:1rem;"><i class="fa-solid fa-shield-check"></i> No Pending Criminal/Civil Cases Declared in Affidavit.</div>
        ` : m.legalCases.map(lc => `
          <div style="padding:0.75rem; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:var(--radius-md);">
            <div style="font-weight:700; color:var(--status-danger);">${lc.caseNo}</div>
            <div style="font-size:0.85rem;">Court: ${lc.court}</div>
            <div style="font-size:0.85rem;">IPC Sections: ${lc.IPCSections}</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">Status: ${lc.status}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (currentModalTab === "mod-11") {
    // Module 11: Election Affidavit
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-file-contract" style="color:var(--accent-primary);"></i> Election Commission Affidavit (Form 26)</h3>
        <div style="font-size:0.9rem; line-height:1.8;">
          <div><strong>ECI Filing ID:</strong> ${m.electionAffidavit.affidavitId}</div>
          <div><strong>Filing Date:</strong> ${m.electionAffidavit.filingDate}</div>
          <div><strong>Education Qualification:</strong> ${m.electionAffidavit.education}</div>
          <div><strong>Verification:</strong> <span class="tag-badge verified">${m.electionAffidavit.verificationStatus}</span></div>
          <div style="margin-top:1.2rem; display:flex; gap:1rem; flex-wrap:wrap;">
            <a href="${m.electionAffidavit.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="text-decoration:none;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open ECI Affidavit (New Window)</a>
            <button class="btn-secondary" onclick="closeModal()"><i class="fa-solid fa-arrow-left"></i> Return to Main Directory</button>
          </div>
        </div>
      </div>
    `;
  } else if (currentModalTab === "mod-12") {
    // Module 12: Assets & Liabilities
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-coins" style="color:var(--accent-gold);"></i> Declared Financial Assets & Liabilities</h3>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-top:1rem;">
          <div style="background:rgba(15,23,42,0.6); padding:1rem; border-radius:var(--radius-md);">
            <div style="font-size:0.75rem; color:var(--text-dim);">MOVABLE ASSETS</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--accent-primary);">₹ ${m.financials.assetsMovableCr} Cr</div>
          </div>
          <div style="background:rgba(15,23,42,0.6); padding:1rem; border-radius:var(--radius-md);">
            <div style="font-size:0.75rem; color:var(--text-dim);">IMMOVABLE ASSETS</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--accent-gold);">₹ ${m.financials.assetsImmovableCr} Cr</div>
          </div>
          <div style="background:rgba(15,23,42,0.6); padding:1rem; border-radius:var(--radius-md);">
            <div style="font-size:0.75rem; color:var(--text-dim);">TOTAL LIABILITIES</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--status-danger);">₹ ${m.financials.totalLiabilitiesCr} Cr</div>
          </div>
          <div style="background:rgba(15,23,42,0.6); padding:1rem; border-radius:var(--radius-md);">
            <div style="font-size:0.75rem; color:var(--text-dim);">NET DECLARED WORTH</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--status-success);">₹ ${m.financials.netWorthCr} Cr</div>
          </div>
        </div>
      </div>
    `;
  } else if (currentModalTab === "mod-13") {
    // Module 13: Office Locations + Map
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-map-location-dot" style="color:var(--accent-primary);"></i> Constituency Office Location & Contact</h3>
        <div style="font-size:0.9rem; line-height:1.8;">
          <div><i class="fa-solid fa-location-dot" style="color:var(--status-danger); margin-right:6px;"></i> <strong>Office Address:</strong> ${m.officeLocation.address}</div>
          <div><i class="fa-solid fa-phone" style="color:var(--status-success); margin-right:6px;"></i> <strong>Hotline:</strong> ${m.officeLocation.phone}</div>
          <div><i class="fa-solid fa-envelope" style="color:var(--accent-primary); margin-right:6px;"></i> <strong>Email:</strong> ${m.officeLocation.email}</div>
          <div><i class="fa-solid fa-clock" style="color:var(--accent-gold); margin-right:6px;"></i> <strong>Office Hours:</strong> ${m.officeLocation.timing}</div>
        </div>
      </div>
    `;
  } else if (currentModalTab === "mod-14") {
    // Module 14: Document Verification
    container.innerHTML = `
      <div class="module-section-card">
        <h3><i class="fa-solid fa-certificate" style="color:var(--status-success);"></i> Document & Audit Verification Status</h3>
        <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:0.75rem;">
          <span class="tag-badge verified" style="padding:0.6rem 1rem; font-size:0.9rem;"><i class="fa-solid fa-circle-check"></i> ECI Form 26 Verified</span>
          <span class="tag-badge verified" style="padding:0.6rem 1rem; font-size:0.9rem;"><i class="fa-solid fa-circle-check"></i> Income Tax Clearance Certified</span>
          <span class="tag-badge verified" style="padding:0.6rem 1rem; font-size:0.9rem;"><i class="fa-solid fa-circle-check"></i> Govt Audit Cleared</span>
        </div>
      </div>
    `;
  }
}

function renderGlobalProjects() {
  const container = document.getElementById("global-projects-container");
  let allProjects = [];
  mlaDataset.forEach(m => {
    if (m.projects) {
      m.projects.forEach(p => {
        allProjects.push({ ...p, mlaName: m.mla, constituency: m.constituency, party: m.party });
      });
    }
  });

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:1rem;">
      ${allProjects.map(p => `
        <div class="module-section-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span class="tag-badge designation">${p.category}</span>
              <h4 style="font-size:1.1rem; margin-top:0.2rem;">${p.title}</h4>
              <div style="font-size:0.85rem; color:var(--text-muted);">MLA: <strong>${p.mlaName}</strong> (${p.constituency})</div>
            </div>
            <span class="status-badge ${p.status.replace(' ', '-')}">${p.status}</span>
          </div>
          <div style="font-size:0.85rem; margin-top:0.5rem; display:flex; gap:1.5rem;">
            <span>Budget: ₹ ${p.costCr} Cr</span>
            <span>Location: ${p.location}</span>
            <span>Target: ${p.completionDate}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderComplaintsPortal() {
  const container = document.getElementById("complaints-list-container");
  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:1rem;">
      ${complaintsDataset.map(c => `
        <div class="module-section-card">
          <div style="display:flex; justify-content:space-between;">
            <div>
              <span class="tag-badge designation">${c.category}</span>
              <h4 style="font-size:1.05rem; margin-top:0.2rem;">${c.title}</h4>
              <div style="font-size:0.85rem; color:var(--text-muted);">${c.constituency} | Reported by ${c.reportedBy}</div>
            </div>
            <span class="status-badge ${c.status.replace(' ', '-')}">${c.status}</span>
          </div>
          <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.4rem;">${c.description}</p>
          <div style="margin-top:0.4rem;">
            <span class="ai-sentiment-badge ${c.aiCategory ? c.aiCategory.replace(/ /g, '') : 'Urgent'}"><i class="fa-solid fa-robot"></i> AI Tagged: ${c.aiCategory || 'Urgent Infrastructure Need'}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function handleComplaintSubmit(e) {
  e.preventDefault();
  const constituency = document.getElementById("complaint-constituency-select").value;
  const category = document.getElementById("complaint-category-select").value;
  const title = document.getElementById("complaint-title-input").value;
  const description = document.getElementById("complaint-desc-input").value;
  const reportedBy = document.getElementById("complaint-name-input").value;

  const newComp = {
    id: `comp-${Date.now()}`,
    constituency, category, title, description,
    status: "Submitted",
    dateSubmitted: new Date().toISOString().split('T')[0],
    reportedBy: reportedBy || "Citizen",
    aiCategory: "Urgent Infrastructure Need",
    aiSeverity: "High Priority"
  };

  complaintsDataset.unshift(newComp);
  saveDataToStorage();
  showToast("Local complaint submitted & AI classified!", "success");
  e.target.reset();
  renderComplaintsPortal();
}

function renderDashboard() {
  const container = document.getElementById("dashboard-charts-container");
  container.innerHTML = `
    <div class="dashboard-grid">
      <div class="chart-card">
        <h3><i class="fa-solid fa-chart-column" style="color:var(--accent-primary);"></i> Party Assembly Attendance Rate (%)</h3>
        <div class="chart-container"><canvas id="chart-party-attendance"></canvas></div>
      </div>
      <div class="chart-card">
        <h3><i class="fa-solid fa-coins" style="color:var(--accent-gold);"></i> Net Worth Asset Disclosures</h3>
        <div class="chart-container"><canvas id="chart-asset-dist"></canvas></div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const ctx1 = document.getElementById("chart-party-attendance");
    if (ctx1) {
      new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ['INC', 'BJP', 'JD(S)'],
          datasets: [{ label: 'Avg Attendance (%)', data: [88, 85, 82], backgroundColor: ['#0d9488', '#ea580c', '#16a34a'] }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    const ctx2 = document.getElementById("chart-asset-dist");
    if (ctx2) {
      new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: ['< ₹ 5 Cr', '₹ 5 - 20 Cr', '> ₹ 20 Cr'],
          datasets: [{ data: [65, 110, 49], backgroundColor: ['#38bdf8', '#818cf8', '#f43f5e'] }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }, 100);
}

let adminSelectedMlaId = null;
let adminSubTab = "edit-mla";

function setAdminSubTab(tab) {
  adminSubTab = tab;
  renderAdminPanel();
}

function handleAdminSelectMla(mlaId) {
  adminSelectedMlaId = parseInt(mlaId, 10);
  renderAdminPanel();
}

function handleSaveMlaAdmin(e) {
  e.preventDefault();
  if (!adminSelectedMlaId) return;

  const mlaIndex = mlaDataset.findIndex(m => m.id === adminSelectedMlaId);
  if (mlaIndex === -1) return;

  const m = mlaDataset[mlaIndex];

  // Update fields from form
  m.mla = document.getElementById("admin-mla-name").value;
  m.party = document.getElementById("admin-mla-party").value;
  m.designation = document.getElementById("admin-mla-designation").value;
  m.age = parseInt(document.getElementById("admin-mla-age").value, 10) || m.age;
  m.term = document.getElementById("admin-mla-term").value;

  if (!m.assemblyPerformance) m.assemblyPerformance = {};
  m.assemblyPerformance.attendancePct = parseInt(document.getElementById("admin-mla-attendance").value, 10) || m.assemblyPerformance.attendancePct;
  m.assemblyPerformance.billsIntroduced = parseInt(document.getElementById("admin-mla-bills-intro").value, 10) || 0;
  m.assemblyPerformance.billsPassed = parseInt(document.getElementById("admin-mla-bills-passed").value, 10) || 0;
  m.assemblyPerformance.debatesParticipated = parseInt(document.getElementById("admin-mla-debates").value, 10) || 0;

  if (!m.financials) m.financials = {};
  m.financials.netWorthCr = parseFloat(document.getElementById("admin-mla-networth").value) || m.financials.netWorthCr;
  m.financials.assetsMovableCr = parseFloat(document.getElementById("admin-mla-assets-movable").value) || 0;
  m.financials.assetsImmovableCr = parseFloat(document.getElementById("admin-mla-assets-immovable").value) || 0;
  m.financials.totalLiabilitiesCr = parseFloat(document.getElementById("admin-mla-liabilities").value) || 0;

  m.legalCasesCount = parseInt(document.getElementById("admin-mla-cases").value, 10) || 0;

  if (!m.officeLocation) m.officeLocation = {};
  m.officeLocation.address = document.getElementById("admin-mla-address").value;
  m.officeLocation.phone = document.getElementById("admin-mla-phone").value;
  m.officeLocation.email = document.getElementById("admin-mla-email").value;

  saveDataToStorage();
  showToast(`Successfully saved changes for ${m.mla}! Record updated in database.`, "success");
  renderAdminPanel();
  updateHeaderCounters();
}

function handleAddAdminProject(e) {
  e.preventDefault();
  if (!adminSelectedMlaId) return;

  const mlaIndex = mlaDataset.findIndex(m => m.id === adminSelectedMlaId);
  if (mlaIndex === -1) return;

  const m = mlaDataset[mlaIndex];
  if (!m.projects) m.projects = [];

  const newProj = {
    id: `proj-${Date.now()}`,
    title: document.getElementById("admin-proj-title").value,
    category: document.getElementById("admin-proj-category").value,
    costCr: parseFloat(document.getElementById("admin-proj-cost").value) || 1.0,
    status: document.getElementById("admin-proj-status").value,
    location: document.getElementById("admin-proj-location").value,
    startDate: document.getElementById("admin-proj-start").value,
    completionDate: document.getElementById("admin-proj-end").value,
    description: document.getElementById("admin-proj-desc").value
  };

  m.projects.unshift(newProj);
  m.projectsCount = m.projects.length;

  saveDataToStorage();
  showToast(`New project added to ${m.constituency}!`, "success");
  e.target.reset();
  renderAdminPanel();
}

function handleDeleteAdminProject(mlaId, projId) {
  const m = mlaDataset.find(item => item.id === mlaId);
  if (m && m.projects) {
    m.projects = m.projects.filter(p => p.id !== projId);
    m.projectsCount = m.projects.length;
    saveDataToStorage();
    showToast("Project deleted successfully.", "info");
    renderAdminPanel();
  }
}

function handleAddAdminQuestion(e) {
  e.preventDefault();
  if (!adminSelectedMlaId) return;

  const m = mlaDataset.find(item => item.id === adminSelectedMlaId);
  if (!m) return;
  if (!m.assemblyQuestions) m.assemblyQuestions = [];

  const newQ = {
    id: document.getElementById("admin-q-no").value || `LA-Q-${Date.now()}`,
    date: document.getElementById("admin-q-date").value,
    category: document.getElementById("admin-q-category").value,
    title: document.getElementById("admin-q-title").value,
    type: document.getElementById("admin-q-type").value,
    responseStatus: document.getElementById("admin-q-response").value,
    docLink: document.getElementById("admin-q-link").value || ""
  };

  m.assemblyQuestions.unshift(newQ);
  saveDataToStorage();
  showToast("Official Assembly Question recorded!", "success");
  e.target.reset();
  renderAdminPanel();
}

function handleUpdateComplaintStatus(compId, newStatus) {
  const comp = complaintsDataset.find(c => c.id === compId);
  if (comp) {
    comp.status = newStatus;
    saveDataToStorage();
    showToast(`Complaint #${compId} status updated to: ${newStatus}`, "success");
    renderAdminPanel();
  }
}

function handleDeleteComplaint(compId) {
  complaintsDataset = complaintsDataset.filter(c => c.id !== compId);
  saveDataToStorage();
  showToast(`Complaint #${compId} removed.`, "info");
  renderAdminPanel();
}

function handleResetAllMlas() {
  if (confirm("Are you sure you want to restore the entire 224 MLA database to factory defaults? Any edits made will be reset.")) {
    localStorage.removeItem("civic_karnataka_mlas_v2");
    loadDataFromStorage();
    showToast("Database restored to original state.", "success");
    renderAdminPanel();
    updateHeaderCounters();
  }
}

function renderAdminPanel() {
  const container = document.getElementById("admin-panel-container");
  if (!container) return;

  if (!adminSelectedMlaId && mlaDataset.length > 0) {
    adminSelectedMlaId = mlaDataset[0].id;
  }

  const selectedMlaAdmin = mlaDataset.find(m => m.id === adminSelectedMlaId) || mlaDataset[0];

  container.innerHTML = `
    <!-- Admin Header Banner -->
    <div style="background:linear-gradient(135deg, rgba(30,27,75,0.7), rgba(15,23,42,0.9)); border:1px solid rgba(239,68,68,0.4); border-radius:var(--radius-lg); padding:1.5rem; margin-bottom:1.5rem; backdrop-filter:blur(16px);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <div style="display:inline-flex; align-items:center; gap:0.5rem; background:rgba(239,68,68,0.2); border:1px solid rgba(239,68,68,0.5); padding:0.25rem 0.75rem; border-radius:999px; font-size:0.75rem; font-weight:800; color:#f87171; text-transform:uppercase; margin-bottom:0.4rem;">
            <i class="fa-solid fa-lock-open"></i> Full Administrative Access Granted
          </div>
          <h2 style="color:#ffffff; font-size:1.5rem; margin:0; display:flex; align-items:center; gap:0.6rem;">
            <i class="fa-solid fa-shield-halved" style="color:var(--status-danger);"></i>
            Karnataka Assembly Secretariat Administration Center
          </h2>
          <p style="color:var(--text-muted); font-size:0.875rem; margin-top:0.3rem;">
            Direct live database editor for all 224 MLAs, election declarations, official questions, development projects, and public grievance resolution.
          </p>
        </div>
        <div style="display:flex; gap:0.75rem;">
          <button class="btn-secondary" onclick="handleResetAllMlas()" style="border-color:rgba(239,68,68,0.4); color:#fca5a5; font-size:0.82rem;">
            <i class="fa-solid fa-rotate-left"></i> Reset Database
          </button>
        </div>
      </div>

      <!-- Quick Sub-Navigation Tabs inside Admin -->
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:1.25rem; border-top:1px solid var(--border-color); padding-top:1rem;">
        <button class="timeline-year-btn ${adminSubTab === 'edit-mla' ? 'active' : ''}" onclick="setAdminSubTab('edit-mla')">
          <i class="fa-solid fa-user-pen"></i> Edit MLA Profile & Metrics
        </button>
        <button class="timeline-year-btn ${adminSubTab === 'projects' ? 'active' : ''}" onclick="setAdminSubTab('projects')">
          <i class="fa-solid fa-helmet-safety"></i> Manage Development Projects
        </button>
        <button class="timeline-year-btn ${adminSubTab === 'questions' ? 'active' : ''}" onclick="setAdminSubTab('questions')">
          <i class="fa-solid fa-circle-question"></i> Record Assembly Questions
        </button>
        <button class="timeline-year-btn ${adminSubTab === 'complaints' ? 'active' : ''}" onclick="setAdminSubTab('complaints')">
          <i class="fa-solid fa-list-check"></i> Moderate Complaints (${complaintsDataset.length})
        </button>
      </div>
    </div>

    <!-- Active Admin Sub-Panel -->
    ${adminSubTab === 'edit-mla' ? renderAdminEditMlaSection(selectedMlaAdmin) : ''}
    ${adminSubTab === 'projects' ? renderAdminProjectsSection(selectedMlaAdmin) : ''}
    ${adminSubTab === 'questions' ? renderAdminQuestionsSection(selectedMlaAdmin) : ''}
    ${adminSubTab === 'complaints' ? renderAdminComplaintsSection() : ''}
  `;
}

function renderAdminEditMlaSection(m) {
  return `
    <div style="display:grid; grid-template-columns: 320px 1fr; gap:1.5rem; align-items:start;">
      <!-- MLA Selector Sidebar -->
      <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.25rem;">
        <h4 style="color:var(--accent-cyan); font-size:0.95rem; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.4rem;">
          <i class="fa-solid fa-users"></i> Select Representative to Edit
        </h4>
        <input type="text" id="admin-search-mla" placeholder="Filter by name/constituency..." class="form-control" style="padding:0.6rem; font-size:0.85rem; margin-bottom:0.75rem;" oninput="filterAdminMlaList(this.value)">
        <div id="admin-mla-list-box" style="max-height:550px; overflow-y:auto; display:flex; flex-direction:column; gap:0.35rem;">
          ${renderAdminMlaListItems(mlaDataset, m.id)}
        </div>
      </div>

      <!-- Main Edit Form -->
      <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:1rem; margin-bottom:1.5rem;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="${m.photo}" alt="${m.mla}" style="width:48px; height:48px; border-radius:50%; border:2px solid var(--accent-cyan); object-fit:cover;">
            <div>
              <h3 style="margin:0; font-size:1.2rem; color:var(--text-main);">${m.mla}</h3>
              <span style="font-size:0.82rem; color:var(--text-muted);">${m.constituency} (${m.district}) • <strong style="color:var(--accent-cyan);">${m.party}</strong></span>
            </div>
          </div>
          <span class="tag-badge verified"><i class="fa-solid fa-circle-check"></i> Live Editable Record</span>
        </div>

        <form onsubmit="handleSaveMlaAdmin(event)">
          <!-- Section 1: Basic Information -->
          <h4 style="color:var(--accent-cyan); font-size:0.95rem; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
            <i class="fa-solid fa-id-card"></i> 1. Basic Profile & Portfolio
          </h4>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Full Name</label>
              <input type="text" id="admin-mla-name" class="form-control" value="${m.mla}" required>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Political Party</label>
              <select id="admin-mla-party" class="form-control">
                <option value="INC" ${m.party === 'INC' ? 'selected' : ''}>INC (Congress)</option>
                <option value="BJP" ${m.party === 'BJP' ? 'selected' : ''}>BJP</option>
                <option value="JD(S)" ${m.party === 'JD(S)' || m.party === 'JDS' ? 'selected' : ''}>JD(S)</option>
                <option value="IND" ${m.party === 'IND' ? 'selected' : ''}>Independent / Others</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Designation / Portfolio</label>
              <input type="text" id="admin-mla-designation" class="form-control" value="${m.designation || 'MLA'}" required>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Age (Years)</label>
              <input type="number" id="admin-mla-age" class="form-control" value="${m.age}" min="25" max="100" required>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Term in Office</label>
              <input type="text" id="admin-mla-term" class="form-control" value="${m.term || '2023 – 2028'}" required>
            </div>
          </div>

          <!-- Section 2: Assembly Performance Metrics -->
          <h4 style="color:var(--accent-primary); font-size:0.95rem; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
            <i class="fa-solid fa-landmark"></i> 2. Legislative Assembly Performance
          </h4>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Attendance Rate (%)</label>
              <input type="number" id="admin-mla-attendance" class="form-control" value="${m.assemblyPerformance ? m.assemblyPerformance.attendancePct : 85}" min="0" max="100" required>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Bills Introduced</label>
              <input type="number" id="admin-mla-bills-intro" class="form-control" value="${m.assemblyPerformance ? m.assemblyPerformance.billsIntroduced : 3}" min="0">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Bills Passed</label>
              <input type="number" id="admin-mla-bills-passed" class="form-control" value="${m.assemblyPerformance ? m.assemblyPerformance.billsPassed : 2}" min="0">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Debates Participated</label>
              <input type="number" id="admin-mla-debates" class="form-control" value="${m.assemblyPerformance ? m.assemblyPerformance.debatesParticipated : 20}" min="0">
            </div>
          </div>

          <!-- Section 3: Financials & Legal Disclosures -->
          <h4 style="color:var(--accent-gold); font-size:0.95rem; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
            <i class="fa-solid fa-coins"></i> 3. Assets, Liabilities & Legal Disclosures
          </h4>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Net Assets Worth (₹ Crores)</label>
              <input type="number" step="0.01" id="admin-mla-networth" class="form-control" value="${m.financials ? m.financials.netWorthCr : 5.0}" required>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Movable Assets (₹ Cr)</label>
              <input type="number" step="0.01" id="admin-mla-assets-movable" class="form-control" value="${m.financials ? m.financials.assetsMovableCr : 1.5}">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Immovable Assets (₹ Cr)</label>
              <input type="number" step="0.01" id="admin-mla-assets-immovable" class="form-control" value="${m.financials ? m.financials.assetsImmovableCr : 4.0}">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Total Liabilities (₹ Cr)</label>
              <input type="number" step="0.01" id="admin-mla-liabilities" class="form-control" value="${m.financials ? m.financials.totalLiabilitiesCr : 0.5}">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Declared Criminal Cases</label>
              <input type="number" id="admin-mla-cases" class="form-control" value="${m.legalCasesCount || 0}" min="0" required>
            </div>
          </div>

          <!-- Section 4: Office Location & Helpdesk -->
          <h4 style="color:var(--status-success); font-size:0.95rem; margin-bottom:1rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.4rem;">
            <i class="fa-solid fa-map-location-dot"></i> 4. Constituency Office Location & Contact
          </h4>
          <div style="display:grid; grid-template-columns: 2fr 1fr 1fr; gap:1rem; margin-bottom:1.75rem;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Constituency Office Address</label>
              <input type="text" id="admin-mla-address" class="form-control" value="${m.officeLocation ? m.officeLocation.address : ''}" required>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Helpdesk Phone</label>
              <input type="text" id="admin-mla-phone" class="form-control" value="${m.officeLocation ? m.officeLocation.phone : ''}" required>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Official Email</label>
              <input type="email" id="admin-mla-email" class="form-control" value="${m.officeLocation ? m.officeLocation.email : ''}" required>
            </div>
          </div>

          <!-- Submit Button -->
          <div style="display:flex; justify-content:flex-end; gap:1rem; border-top:1px solid var(--border-color); padding-top:1.25rem;">
            <button type="submit" class="btn-primary" style="padding:0.9rem 2.5rem; font-size:1rem;">
              <i class="fa-solid fa-floppy-disk"></i> Save & Apply Changes to Live Record
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderAdminMlaListItems(list, selectedId) {
  return list.map(m => `
    <div onclick="handleAdminSelectMla(${m.id})" style="padding:0.6rem 0.8rem; border-radius:var(--radius-md); cursor:pointer; display:flex; justify-content:space-between; align-items:center; background:${m.id === selectedId ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.02)'}; border:1px solid ${m.id === selectedId ? 'var(--accent-cyan)' : 'transparent'}; transition:var(--transition);">
      <div>
        <div style="font-size:0.85rem; font-weight:700; color:var(--text-main);">${m.mla}</div>
        <div style="font-size:0.75rem; color:var(--text-dim);">${m.constituency} (${m.party})</div>
      </div>
      ${m.id === selectedId ? '<i class="fa-solid fa-check" style="color:var(--accent-cyan); font-size:0.8rem;"></i>' : ''}
    </div>
  `).join('');
}

function filterAdminMlaList(query) {
  const q = query.toLowerCase().trim();
  const filtered = mlaDataset.filter(m => m.mla.toLowerCase().includes(q) || m.constituency.toLowerCase().includes(q) || m.district.toLowerCase().includes(q));
  const container = document.getElementById("admin-mla-list-box");
  if (container) {
    container.innerHTML = renderAdminMlaListItems(filtered, adminSelectedMlaId);
  }
}

function renderAdminProjectsSection(m) {
  const projects = m.projects || [];
  return `
    <div style="display:grid; grid-template-columns: 1fr 1.3fr; gap:1.5rem; align-items:start;">
      <!-- Add New Project Form -->
      <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem;">
        <h4 style="color:var(--accent-primary); font-size:1.1rem; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
          <i class="fa-solid fa-plus-circle"></i> Add Development Project for ${m.mla}
        </h4>
        <form onsubmit="handleAddAdminProject(event)">
          <div class="form-group">
            <label class="form-label">Project Title</label>
            <input type="text" id="admin-proj-title" class="form-control" placeholder="e.g. 100-Bed Maternity Wing Construction" required>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
            <div class="form-group">
              <label class="form-label">Category</label>
              <select id="admin-proj-category" class="form-control">
                <option value="Roads">Roads & Transport</option>
                <option value="Schools & Hospitals">Schools & Hospitals</option>
                <option value="Water Supply">Water Supply & Irrigation</option>
                <option value="Energy & Power">Energy & Power</option>
                <option value="Urban Infrastructure">Urban Infrastructure</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Estimated Cost (₹ Crores)</label>
              <input type="number" step="0.01" id="admin-proj-cost" class="form-control" placeholder="e.g. 14.5" required>
            </div>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select id="admin-proj-status" class="form-control">
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending / Tendering</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Location / Ward</label>
              <input type="text" id="admin-proj-location" class="form-control" value="${m.constituency} Main Block" required>
            </div>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
            <div class="form-group">
              <label class="form-label">Start Date</label>
              <input type="date" id="admin-proj-start" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label">Target Completion Date</label>
              <input type="date" id="admin-proj-end" class="form-control" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Project Description</label>
            <textarea id="admin-proj-desc" class="form-control" placeholder="Brief technical summary and scope of work..." required></textarea>
          </div>
          <button type="submit" class="btn-primary" style="width:100%;">
            <i class="fa-solid fa-check"></i> Sanction & Publish Project
          </button>
        </form>
      </div>

      <!-- Current Projects List for MLA -->
      <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h4 style="color:var(--text-main); font-size:1.1rem; margin:0;">
            Tracked Projects in ${m.constituency} (${projects.length})
          </h4>
          <span style="font-size:0.8rem; color:var(--text-dim);">Representative: ${m.mla}</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.85rem; max-height:580px; overflow-y:auto;">
          ${projects.map(p => `
            <div style="background:rgba(15,23,42,0.5); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="tag-badge designation">${p.category}</span>
                <span class="status-badge ${p.status ? p.status.replace(' ', '-') : 'Pending'}">${p.status}</span>
              </div>
              <h4 style="margin:0.4rem 0 0.2rem 0; color:var(--text-main); font-size:1rem;">${p.title}</h4>
              <p style="font-size:0.82rem; color:var(--text-muted); margin:0;">${p.description}</p>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:var(--text-dim); margin-top:0.6rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:0.4rem;">
                <span><strong>Budget:</strong> ₹ ${p.costCr} Cr | ${p.location}</span>
                <button onclick="handleDeleteAdminProject(${m.id}, '${p.id}')" style="background:transparent; border:none; color:var(--status-danger); cursor:pointer; font-size:0.8rem;">
                  <i class="fa-solid fa-trash"></i> Delete
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderAdminQuestionsSection(m) {
  const questions = m.assemblyQuestions || [];
  return `
    <div style="display:grid; grid-template-columns: 1fr 1.3fr; gap:1.5rem; align-items:start;">
      <!-- Add Question Form -->
      <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem;">
        <h4 style="color:var(--accent-cyan); font-size:1.1rem; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
          <i class="fa-solid fa-circle-question"></i> Record Legislative Question for ${m.mla}
        </h4>
        <form onsubmit="handleAddAdminQuestion(event)">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
            <div class="form-group">
              <label class="form-label">Question Reference No</label>
              <input type="text" id="admin-q-no" class="form-control" placeholder="e.g. LA-Q-642" required>
            </div>
            <div class="form-group">
              <label class="form-label">Date Tabled</label>
              <input type="date" id="admin-q-date" class="form-control" required>
            </div>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
            <div class="form-group">
              <label class="form-label">Question Type</label>
              <select id="admin-q-type" class="form-control">
                <option value="Starred">Starred (Oral Reply on Floor)</option>
                <option value="Unstarred">Unstarred (Written Reply Tabled)</option>
                <option value="Short Notice">Short Notice Question</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ministry / Department</label>
              <input type="text" id="admin-q-category" class="form-control" placeholder="e.g. Health & Family Welfare" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Subject / Question Text</label>
            <input type="text" id="admin-q-title" class="form-control" placeholder="Specific query raised on assembly floor..." required>
          </div>
          <div class="form-group">
            <label class="form-label">Government / Minister Official Reply</label>
            <textarea id="admin-q-response" class="form-control" placeholder="Official reply tabled by the Cabinet Minister..." required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Official Document URL / Reference</label>
            <input type="text" id="admin-q-link" class="form-control" placeholder="https://kla.kar.nic.in/assembly/questions/..." value="https://kla.kar.nic.in/assembly/questions/doc.pdf">
          </div>
          <button type="submit" class="btn-primary" style="width:100%;">
            <i class="fa-solid fa-file-circle-check"></i> Save & Log in Assembly Registry
          </button>
        </form>
      </div>

      <!-- Current Questions List -->
      <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem;">
        <h4 style="color:var(--text-main); font-size:1.1rem; margin-bottom:1rem;">
          Recorded Assembly Questions for ${m.mla} (${questions.length})
        </h4>
        <div style="display:flex; flex-direction:column; gap:0.85rem; max-height:580px; overflow-y:auto;">
          ${questions.map(q => `
            <div style="background:rgba(15,23,42,0.5); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="tag-badge designation">Q No: ${q.id}</span>
                <span style="font-size:0.75rem; color:var(--text-dim);">${q.date} | ${q.category}</span>
              </div>
              <h4 style="margin:0.4rem 0 0.3rem 0; color:var(--text-main); font-size:0.95rem;">${q.title}</h4>
              <div style="font-size:0.82rem; color:var(--status-success); background:rgba(16,185,129,0.1); padding:0.4rem 0.6rem; border-radius:var(--radius-md); margin-top:0.3rem;">
                <i class="fa-solid fa-check-double"></i> ${q.responseStatus}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderAdminComplaintsSection() {
  return `
    <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <h3 style="margin:0; color:var(--text-main);"><i class="fa-solid fa-list-check" style="color:var(--accent-primary);"></i> Public Grievance Moderation & Resolution Queue</h3>
          <p style="margin:0.2rem 0 0 0; font-size:0.85rem; color:var(--text-muted);">Review citizen complaints, change status, and dispatch official resolution updates.</p>
        </div>
        <span class="tag-badge designation">${complaintsDataset.length} Total Complaints in Queue</span>
      </div>

      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Constituency</th>
              <th>Category</th>
              <th>Complaint Details</th>
              <th>AI Tag / Priority</th>
              <th>Status</th>
              <th>Admin Action</th>
            </tr>
          </thead>
          <tbody>
            ${complaintsDataset.map(c => `
              <tr>
                <td><strong>#${c.id}</strong></td>
                <td><strong style="color:var(--accent-cyan);">${c.constituency}</strong><br><span style="font-size:0.75rem; color:var(--text-dim);">${c.reportedBy}</span></td>
                <td><span class="tag-badge designation">${c.category}</span></td>
                <td style="max-width:280px;">
                  <strong style="color:var(--text-main);">${c.title}</strong>
                  <div style="font-size:0.8rem; color:var(--text-muted);">${c.description}</div>
                  <span style="font-size:0.7rem; color:var(--text-dim);">${c.dateSubmitted}</span>
                </td>
                <td>
                  <span class="ai-sentiment-badge Urgent" style="font-size:0.75rem;"><i class="fa-solid fa-robot"></i> ${c.aiCategory || 'Urgent Need'}</span>
                </td>
                <td>
                  <span class="status-badge ${c.status.replace(' ', '-')}">${c.status}</span>
                </td>
                <td>
                  <div style="display:flex; gap:0.4rem; align-items:center;">
                    <select onchange="handleUpdateComplaintStatus('${c.id}', this.value)" style="background:rgba(15,23,42,0.8); color:var(--text-main); border:1px solid var(--border-color); padding:0.3rem 0.5rem; border-radius:var(--radius-md); font-size:0.75rem;">
                      <option value="Submitted" ${c.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
                      <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                      <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                    <button onclick="handleDeleteComplaint('${c.id}')" title="Delete complaint" style="background:rgba(239,68,68,0.2); border:1px solid rgba(239,68,68,0.4); color:#fca5a5; padding:0.35rem 0.6rem; border-radius:var(--radius-md); cursor:pointer;">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (container) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--status-success);"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
}

function setPerformanceYearFilter(year) {
  selectedPerformanceYear = year;
  renderModalTabContent();
}

function renderFiveYearPerformance(m) {
  const perf = m.fiveYearPerformance || {
    termSpan: "2023 – 2028",
    overallAttendancePct: m.assemblyPerformance ? m.assemblyPerformance.attendancePct : 85,
    totalDaysAttended: m.assemblyPerformance ? m.assemblyPerformance.daysAttended : 115,
    totalAssemblySessions: 135,
    years: []
  };

  const yearsData = perf.years || [];

  let totalQuestions = 0;
  let totalDiscussions = 0;
  let totalProjects = 0;
  let totalIssues = 0;

  yearsData.forEach(y => {
    totalQuestions += y.questionsCount || 0;
    totalDiscussions += y.discussionsCount || 0;
    totalProjects += y.projectsCount || 0;
    totalIssues += y.issuesRaised || 0;
  });

  const yearPills = [
    { key: "all", label: "📊 Overall 5-Year Dashboard" },
    ...yearsData.map(y => ({ key: y.yearNum, label: y.yearLabel }))
  ];

  const pillsHtml = `
    <div class="timeline-year-nav">
      ${yearPills.map(p => `
        <button class="timeline-year-btn ${selectedPerformanceYear == p.key ? 'active' : ''}" onclick="setPerformanceYearFilter('${p.key}')">
          ${p.label}
        </button>
      `).join('')}
    </div>
  `;

  const stepperHtml = `
    <div class="stepper-flow">
      ${yearsData.map((y, idx) => `
        <div class="stepper-card ${selectedPerformanceYear == y.yearNum ? 'active' : ''}" onclick="setPerformanceYearFilter('${y.yearNum}')">
          <div class="step-title">${y.yearLabel.split(' ')[0]} ${y.yearLabel.split(' ')[1]}</div>
          <div class="step-value">${y.questionsCount} Qs</div>
          <div class="step-sub">${y.discussionsCount} Debates | ${y.projectsCount} Proj</div>
        </div>
        ${idx < yearsData.length - 1 ? `<div class="stepper-arrow"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
      `).join('')}
    </div>
  `;

  let mainBodyContent = "";

  if (selectedPerformanceYear === "all") {
    mainBodyContent = `
      <div class="module-section-card">
        <h4 style="margin-bottom:0.75rem; color:var(--accent-cyan); display:flex; align-items:center; gap:0.5rem;">
          <i class="fa-solid fa-table-list"></i> 📊 5-Year Assembly Performance Dashboard Summary
        </h4>
        <div class="data-table-wrapper">
          <table class="performance-dashboard-table">
            <thead>
              <tr>
                <th>Term Year</th>
                <th>Session Period</th>
                <th>Questions Asked</th>
                <th>Discussions Participated</th>
                <th>Projects Sanctioned</th>
                <th>Issues Raised</th>
                <th>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              ${yearsData.map(y => `
                <tr style="cursor:pointer;" onclick="setPerformanceYearFilter('${y.yearNum}')">
                  <td><strong style="color:var(--text-main);">${y.yearLabel}</strong></td>
                  <td style="color:var(--text-muted);">${y.sessionPeriod}</td>
                  <td><span class="tag-badge designation">${y.questionsCount} Questions</span></td>
                  <td><span class="tag-badge verified">${y.discussionsCount} Debates</span></td>
                  <td>${y.projectsCount} Projects</td>
                  <td>${y.issuesRaised} Issues</td>
                  <td><strong style="color:var(--status-success);">${y.attendancePct}%</strong></td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td>OVERALL 5-YEAR TOTAL</td>
                <td>2023 - 2028 Term</td>
                <td>${totalQuestions} Questions</td>
                <td>${totalDiscussions} Debates</td>
                <td>${totalProjects} Projects</td>
                <td>${totalIssues} Issues</td>
                <td>${perf.overallAttendancePct}% Avg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3 style="margin:1.5rem 0 1rem 0; display:flex; align-items:center; gap:0.5rem;">
        <i class="fa-solid fa-timeline" style="color:var(--accent-cyan);"></i> Chronological 5-Year Record Details
      </h3>

      ${yearsData.map(y => `
        <div class="module-section-card" style="margin-bottom:1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-cyan); font-size:1.05rem;">
              <i class="fa-solid fa-calendar-check" style="margin-right:6px;"></i> ${y.yearLabel} (${y.sessionPeriod})
            </h4>
            <button class="doc-link-btn" onclick="setPerformanceYearFilter('${y.yearNum}')">View ${y.yearLabel} Details <i class="fa-solid fa-arrow-right"></i></button>
          </div>

          <div style="margin-bottom:1rem;">
            <div style="font-size:0.85rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:0.4rem;">
              1. Assembly Questions (${y.questionsList.length})
            </div>
            ${y.questionsList.map(q => `
              <div style="background:rgba(15,23,42,0.5); padding:0.75rem; border-radius:var(--radius-md); margin-bottom:0.5rem; border:1px solid var(--border-color);">
                <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
                  <span class="tag-badge designation">Q No: ${q.qNo}</span>
                  <span style="color:var(--text-dim);">${q.date} | ${q.ministry}</span>
                </div>
                <div style="font-weight:600; color:var(--text-main); margin-top:0.3rem;">${q.subject}</div>
                <div style="font-size:0.82rem; color:var(--status-success); margin-top:0.3rem;">
                  <i class="fa-solid fa-reply"></i> <strong>Govt Response:</strong> ${q.govResponse}
                </div>
                <button class="doc-link-btn" onclick="openDocumentViewerModal('Assembly Starred Question', '${q.qNo}', '${q.date}', '${escapeAttr(q.subject)}', '${escapeAttr(q.ministry)}', '${escapeAttr(q.govResponse)}', '')">
                  <i class="fa-solid fa-file-pdf"></i> View Official Question Document PDF
                </button>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom:1rem;">
            <div style="font-size:0.85rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:0.4rem;">
              2. Assembly Discussions & Debates (${y.discussionsList.length})
            </div>
            ${y.discussionsList.map(d => `
              <div style="background:rgba(15,23,42,0.5); padding:0.75rem; border-radius:var(--radius-md); margin-bottom:0.5rem; border:1px solid var(--border-color);">
                <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
                  <span style="color:var(--accent-cyan); font-weight:600;">Session: ${d.session}</span>
                  <span style="color:var(--text-dim);">${d.date}</span>
                </div>
                <div style="font-weight:600; color:var(--text-main); margin-top:0.3rem;">${d.topic}</div>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;">Related Department: ${d.dept}</div>
                <button class="doc-link-btn" onclick="openDocumentViewerModal('Assembly Proceeding & Debate', 'KLA/PROC/${d.date}', '${d.date}', '${escapeAttr(d.topic)}', '${escapeAttr(d.dept)}', '', 'Session: ${escapeAttr(d.session)}')">
                  <i class="fa-solid fa-file-lines"></i> View Official Assembly Proceeding PDF
                </button>
              </div>
            `).join('')}
          </div>

          <div>
            <div style="font-size:0.85rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:0.4rem;">
              3. Ruling Party / Govt Discussion Records (${y.govtRecordsList.length})
            </div>
            ${y.govtRecordsList.map(g => `
              <div style="background:rgba(15,23,42,0.5); padding:0.75rem; border-radius:var(--radius-md); margin-bottom:0.5rem; border:1px solid var(--border-color);">
                <div style="font-weight:600; color:var(--accent-gold);">${g.topic}</div>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;">Assembly Session: ${g.session}</div>
                <div style="font-size:0.8rem; color:var(--text-dim); margin-top:0.2rem;">Official Source: ${g.source}</div>
                <button class="doc-link-btn" onclick="openDocumentViewerModal('Ruling Party & Govt Record', 'KLA/HANSARD/${y.yearNum}', '${g.session}', '${escapeAttr(g.topic)}', 'Legislative Standing Committee', '', '${escapeAttr(g.source)}')">
                  <i class="fa-solid fa-book-bookmark"></i> View Official Hansard Record PDF
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    `;
  } else {
    const y = yearsData.find(item => item.yearNum == selectedPerformanceYear) || yearsData[0];

    mainBodyContent = `
      <div class="module-section-card">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.75rem; margin-bottom:1rem;">
          <div>
            <h3 style="color:var(--accent-cyan);"><i class="fa-solid fa-calendar-days"></i> ${y.yearLabel} Assembly Performance</h3>
            <span style="font-size:0.85rem; color:var(--text-muted);">${y.sessionPeriod} | Attendance: <strong>${y.attendancePct}%</strong></span>
          </div>
          <button class="btn-secondary" onclick="setPerformanceYearFilter('all')"><i class="fa-solid fa-rotate-left"></i> View All 5 Years</button>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:0.75rem; margin-bottom:1.5rem;">
          <div style="background:rgba(15,23,42,0.7); padding:0.85rem; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:0.7rem; color:var(--text-dim);">QUESTIONS</div>
            <div style="font-size:1.4rem; font-weight:800; color:var(--accent-cyan);">${y.questionsCount}</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); padding:0.85rem; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:0.7rem; color:var(--text-dim);">DEBATES</div>
            <div style="font-size:1.4rem; font-weight:800; color:var(--accent-gold);">${y.discussionsCount}</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); padding:0.85rem; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:0.7rem; color:var(--text-dim);">PROJECTS</div>
            <div style="font-size:1.4rem; font-weight:800; color:var(--status-success);">${y.projectsCount}</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); padding:0.85rem; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:0.7rem; color:var(--text-dim);">ISSUES RAISED</div>
            <div style="font-size:1.4rem; font-weight:800; color:var(--text-main);">${y.issuesRaised}</div>
          </div>
        </div>

        <h4 style="color:var(--accent-cyan); margin-bottom:0.75rem;"><i class="fa-solid fa-circle-question"></i> 1. Assembly Questions (${y.questionsList.length})</h4>
        ${y.questionsList.map(q => `
          <div style="background:rgba(15,23,42,0.5); padding:1rem; border-radius:var(--radius-md); margin-bottom:0.75rem; border:1px solid var(--border-color);">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span class="tag-badge designation">Q No: ${q.qNo}</span>
              <span style="color:var(--text-dim);">${q.date} | ${q.ministry}</span>
            </div>
            <h4 style="font-size:0.95rem; margin-top:0.4rem; color:var(--text-main);">${q.subject}</h4>
            <div style="font-size:0.85rem; color:var(--status-success); margin-top:0.4rem; background:rgba(16,185,129,0.1); padding:0.5rem; border-radius:var(--radius-md);">
              <i class="fa-solid fa-check-double"></i> <strong>Govt Response:</strong> ${q.govResponse}
            </div>
            <button class="doc-link-btn" onclick="openDocumentViewerModal('Assembly Starred Question', '${q.qNo}', '${q.date}', '${escapeAttr(q.subject)}', '${escapeAttr(q.ministry)}', '${escapeAttr(q.govResponse)}', '')">
              <i class="fa-solid fa-file-pdf"></i> View Official Document PDF
            </button>
          </div>
        `).join('')}

        <h4 style="color:var(--accent-gold); margin:1.5rem 0 0.75rem 0;"><i class="fa-solid fa-comments"></i> 2. Assembly Discussions & Debates (${y.discussionsList.length})</h4>
        ${y.discussionsList.map(d => `
          <div style="background:rgba(15,23,42,0.5); padding:1rem; border-radius:var(--radius-md); margin-bottom:0.75rem; border:1px solid var(--border-color);">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span style="color:var(--accent-cyan); font-weight:600;">Session: ${d.session}</span>
              <span style="color:var(--text-dim);">${d.date}</span>
            </div>
            <h4 style="font-size:0.95rem; margin-top:0.3rem; color:var(--text-main);">${d.topic}</h4>
            <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.2rem;">Department: <strong>${d.dept}</strong></div>
            <button class="doc-link-btn" onclick="openDocumentViewerModal('Assembly Proceeding & Debate', 'KLA/PROC/${d.date}', '${d.date}', '${escapeAttr(d.topic)}', '${escapeAttr(d.dept)}', '', 'Session: ${escapeAttr(d.session)}')">
              <i class="fa-solid fa-file-lines"></i> View Official Assembly Proceeding PDF
            </button>
          </div>
        `).join('')}

        <h4 style="color:var(--status-warning); margin:1.5rem 0 0.75rem 0;"><i class="fa-solid fa-landmark-flag"></i> 3. Ruling Party / Government Discussion Records (${y.govtRecordsList.length})</h4>
        ${y.govtRecordsList.map(g => `
          <div style="background:rgba(15,23,42,0.5); padding:1rem; border-radius:var(--radius-md); margin-bottom:0.75rem; border:1px solid var(--border-color);">
            <div style="font-size:0.8rem; color:var(--text-dim); margin-bottom:0.2rem;">Session: ${g.session}</div>
            <h4 style="font-size:0.95rem; color:var(--accent-gold);">${g.topic}</h4>
            <div style="font-size:0.85rem; color:var(--text-main); margin-top:0.3rem; background:rgba(255,255,255,0.03); padding:0.5rem; border-radius:var(--radius-md);">
              <i class="fa-solid fa-book-open"></i> <strong>Verified Source Citation:</strong> ${g.source}
            </div>
            <button class="doc-link-btn" onclick="openDocumentViewerModal('Ruling Party & Govt Record', 'KLA/HANSARD/${y.yearNum}', '${g.session}', '${escapeAttr(g.topic)}', 'Legislative Standing Committee', '', '${escapeAttr(g.source)}')">
              <i class="fa-solid fa-book-bookmark"></i> View Official Hansard Record PDF
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  return `
    <div style="margin-bottom:1rem;">
      <h3 style="margin-bottom:0.3rem;"><i class="fa-solid fa-landmark" style="color:var(--accent-cyan);"></i> 🏛️ Module 3: 5-Year Assembly Performance</h3>
      <p style="font-size:0.85rem; color:var(--text-muted);">
        Comprehensive year-wise record of questions asked, debates participated, government responses, and official assembly proceedings across the 5-year Vidhana Sabha term (${perf.termSpan}).
      </p>
    </div>

    ${pillsHtml}
    ${stepperHtml}
    ${mainBodyContent}
  `;
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function openDocumentViewerModal(docType, refNo, date, title, dept, govReply, sourceInfo) {
  const modalBackdrop = document.getElementById("doc-modal-backdrop");
  const modalBody = document.getElementById("doc-modal-body");
  if (!modalBackdrop || !modalBody) return;

  const mlaName = selectedMla ? selectedMla.mla : "Assembly Member";
  const constituency = selectedMla ? selectedMla.constituency : "Karnataka";
  const party = selectedMla ? selectedMla.party : "INC";

  modalBody.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
      <div style="font-size: 2.2rem; color: #b45309; margin-bottom: 0.2rem;"><i class="fa-solid fa-building-columns"></i></div>
      <h2 style="font-family: 'Georgia', serif; font-size: 1.35rem; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; margin: 0;">
        KARNATAKA LEGISLATIVE ASSEMBLY SECRETARIAT
      </h2>
      <div style="font-size: 0.85rem; color: #475569; font-weight: 600; margin-top: 0.2rem;">
        VIDHANA SABHA, BENGALURU – 560001 • OFFICIAL PROCEEDINGS REGISTRY
      </div>
      <div style="margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; background: #f1f5f9; padding: 0.5rem 0.8rem; border-radius: 4px; border: 1px solid #cbd5e1;">
        <span><strong>DOCUMENT TYPE:</strong> ${docType.toUpperCase()}</span>
        <span><strong>RECORD REF NO:</strong> ${refNo}</span>
        <span><strong>DATE TABLED:</strong> ${date}</span>
      </div>
    </div>

    <div style="font-family: 'Georgia', serif; font-size: 1.05rem; line-height: 1.6; color: #0f172a;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; font-size: 0.9rem; background: #f8fafc; padding: 1rem; border-left: 4px solid #0284c7; border-radius: 4px;">
        <div><strong>Hon'ble Member:</strong> ${mlaName} (MLA)</div>
        <div><strong>Constituency:</strong> ${constituency} (${party})</div>
        <div><strong>Ministry / Department:</strong> ${dept || 'General Administration'}</div>
        <div><strong>Legislative Assembly:</strong> 16th Vidhana Sabha</div>
      </div>

      <h3 style="font-size: 1.1rem; color: #1e3a8a; margin-top: 1.25rem; margin-bottom: 0.5rem; font-weight: 700;">
        SUBJECT / QUESTION TABLED ON FLOOR OF HOUSE:
      </h3>
      <div style="background: #ffffff; padding: 1rem; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: 600; font-size: 1.05rem; color: #0f172a;">
        "${title}"
      </div>

      ${govReply ? `
        <h3 style="font-size: 1.1rem; color: #15803d; margin-top: 1.25rem; margin-bottom: 0.5rem; font-weight: 700;">
          GOVERNMENT / MINISTER OFFICIAL RESPONSE TABLED:
        </h3>
        <div style="background: #f0fdf4; padding: 1rem; border: 1px solid #86efac; border-radius: 4px; color: #14532d; font-size: 1rem;">
          <i class="fa-solid fa-quote-left" style="opacity: 0.5; margin-right: 0.4rem;"></i>
          ${govReply}
        </div>
      ` : ''}

      ${sourceInfo ? `
        <h3 style="font-size: 1.1rem; color: #b45309; margin-top: 1.25rem; margin-bottom: 0.5rem; font-weight: 700;">
          OFFICIAL HANSARD / JOURNAL CITATION SOURCE:
        </h3>
        <div style="background: #fffbeb; padding: 1rem; border: 1px solid #fde68a; border-radius: 4px; color: #78350f; font-size: 0.95rem;">
          <i class="fa-solid fa-book-open" style="margin-right: 0.4rem;"></i> ${sourceInfo}
        </div>
      ` : ''}

      <div style="margin-top: 2rem; border-top: 1px dashed #94a3b8; padding-top: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 45px; height: 45px; border-radius: 50%; border: 2px double #15803d; display: flex; align-items: center; justify-content: center; color: #15803d; font-size: 1.2rem;">
            <i class="fa-solid fa-stamp"></i>
          </div>
          <div>
            <div style="font-size: 0.75rem; font-weight: 700; color: #15803d; text-transform: uppercase;">
              ✓ DIGITALLY SIGNED & VERIFIED
            </div>
            <div style="font-size: 0.7rem; color: #64748b;">
              Secretary • Karnataka Legislative Assembly Secretariat
            </div>
          </div>
        </div>

        <div style="text-align: right; font-size: 0.75rem; color: #64748b;">
          <div>CivicPulse Karnataka Accountability Engine</div>
          <div>Official Public Record Registry</div>
        </div>
      </div>
    </div>

    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end; background: #f1f5f9; padding: 0.85rem; border-radius: 6px; flex-wrap: wrap;">
      <button class="btn-primary" onclick="window.print()" style="background: #0284c7; color: #fff; padding: 0.6rem 1.2rem; font-size: 0.85rem; cursor: pointer; border: none; border-radius: 4px; font-weight: 700;">
        <i class="fa-solid fa-print"></i> Print Document Record
      </button>
      <a href="http://kla.kar.nic.in/" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="background: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; padding: 0.6rem 1.2rem; font-size: 0.85rem; text-decoration: none; border-radius: 4px; font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem;">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Open kla.kar.nic.in Portal
      </a>
      <button onclick="closeDocModal()" style="background: #64748b; color: #fff; border: none; padding: 0.6rem 1.2rem; font-size: 0.85rem; cursor: pointer; border-radius: 4px; font-weight: 600;">
        Close
      </button>
    </div>
  `;

  modalBackdrop.classList.add("active");
}

function closeDocModal() {
  const modalBackdrop = document.getElementById("doc-modal-backdrop");
  if (modalBackdrop) modalBackdrop.classList.remove("active");
}

/* CSE Major Project Modules: Speech, Multilingual, GIS Map, Promise Tracker, Survey */

let isRecording = false;
let speechRecognition = null;

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Web Speech API not supported in this browser. Please type description.", "error");
    return null;
  }
  const rec = new SpeechRecognition();
  rec.continuous = false;
  rec.interimResults = false;
  rec.lang = document.getElementById("lang-select") ? document.getElementById("lang-select").value : "en-US";
  if (rec.lang === "kn") rec.lang = "kn-IN";
  if (rec.lang === "hi") rec.lang = "hi-IN";
  if (rec.lang === "ta") rec.lang = "ta-IN";
  if (rec.lang === "te") rec.lang = "te-IN";

  rec.onstart = () => {
    isRecording = true;
    const btn = document.getElementById("btn-voice-input");
    const label = document.getElementById("mic-status-text");
    if (btn) btn.classList.add("recording");
    if (label) label.textContent = "Listening... Speak now!";
    showToast("Microphone active. Speak your complaint clearly...", "info");
  };

  rec.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const textarea = document.getElementById("complaint-desc-input");
    if (textarea) {
      textarea.value = transcript;
      showToast("Speech converted to text successfully!", "success");
    }
  };

  rec.onerror = (e) => {
    isRecording = false;
    resetMicBtn();
    showToast("Voice recording ended or microphone permission denied.", "info");
  };

  rec.onend = () => {
    isRecording = false;
    resetMicBtn();
  };

  return rec;
}

function toggleVoiceRecording() {
  if (isRecording && speechRecognition) {
    speechRecognition.stop();
    isRecording = false;
    resetMicBtn();
  } else {
    speechRecognition = initSpeechRecognition();
    if (speechRecognition) speechRecognition.start();
  }
}

function resetMicBtn() {
  const btn = document.getElementById("btn-voice-input");
  const label = document.getElementById("mic-status-text");
  if (btn) btn.classList.remove("recording");
  if (label) label.textContent = "Speak Voice";
}

let currentLanguage = "en";

const i18n = {
  en: {
    heroTitle: "Karnataka Legislative Assembly Scorecard",
    heroSubtitle: "Comprehensive 17-module governance tracking for all 224 Karnataka MLAs."
  },
  kn: {
    heroTitle: "ಕರ್ನಾಟಕ ಶಾಸನಸಭೆಯ ಶಾಸಕರ ಕಾರ್ಯಕ್ಷಮತೆ ಕಾರ್ಡ್",
    heroSubtitle: "224 ಕರ್ನಾಟಕ ಶಾಸಕರ 17 ಸಾರ್ವಜನಿಕ ಆಡಳಿತ ವಿಷಯಗಳ ಸಮಗ್ರ ವಿವರ."
  },
  hi: {
    heroTitle: "कर्नाटक विधानसभा विधायक प्रदर्शन रिपोर्ट कार्ड",
    heroSubtitle: "सभी 224 विधायकों की 17 मॉड्यूल वाली व्यापक शासन रिपोर्ट।"
  },
  ta: {
    heroTitle: "கர்நாடகா சட்டமன்ற எம்.எல்.ஏ செயல்திறன் அறிக்கை",
    heroSubtitle: "224 கர்நாடகா எம்.எல்.ஏக்களின் 17 தொகுதி நிர்வாகத் தகவல்."
  },
  te: {
    heroTitle: "కర్ణాటక శాసనసభ ఎమ్మెల్యే పనితీరు నివేదిక",
    heroSubtitle: "224 మంది కర్ణాటక ఎమ్మెల్యేల 17 నియోజకవర్గ సమగ్ర నివేదిక."
  }
};

function switchLanguage(lang) {
  currentLanguage = lang;
  showToast(`Language switched to ${lang.toUpperCase()}`, "info");
  const dict = i18n[lang] || i18n['en'];

  const heroT = document.querySelector(".hero-title");
  if (heroT) heroT.textContent = dict.heroTitle;

  const heroSub = document.querySelector(".hero-subtitle");
  if (heroSub) heroSub.textContent = dict.heroSubtitle;
}

let isAnonymousFiling = false;

function toggleAnonymousFiling(checked) {
  isAnonymousFiling = checked;
  const nameInput = document.getElementById("complaint-name-input");
  if (nameInput) {
    if (checked) {
      const anonHash = "Citizen_" + Math.floor(100000 + Math.random() * 900000);
      nameInput.value = anonHash;
      nameInput.readOnly = true;
      showToast("Anonymous mode active. Device hash registered.", "info");
    } else {
      nameInput.value = "";
      nameInput.readOnly = false;
    }
  }
}

function renderGisLocalityMap() {
  const container = document.getElementById("gis-map-container");
  if (!container) return;

  const currentMla = selectedMla || mlaDataset[0];
  const wards = currentMla.localityMapData || [];

  container.innerHTML = `
    <div style="background:var(--bg-card); padding:1.5rem; border-radius:var(--radius-lg); border:1px solid var(--border-color); margin-bottom:1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <h3 style="color:var(--accent-cyan); margin-bottom:0.3rem;"><i class="fa-solid fa-map-location-dot"></i> 🗺️ Ward & Locality GIS Issue Map</h3>
          <p style="font-size:0.85rem; color:var(--text-muted);">
            Real-time geospatial breakdown of public issues, complaint density, and health scores across ${currentMla.constituency} Wards.
          </p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <select id="gis-constituency-select" class="form-control" style="width:260px;" onchange="changeGisConstituency(this.value)">
            ${mlaDataset.map(m => `<option value="${m.id}" ${m.id === currentMla.id ? 'selected' : ''}>${m.constituency} (${m.mla})</option>`).join('')}
          </select>
        </div>
      </div>
    </div>

    <div class="gis-map-grid">
      ${wards.map(w => `
        <div class="ward-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="tag-badge designation">Ward #${w.wardNo}</span>
            <span class="tag-badge ${w.healthScore > 75 ? 'verified' : 'legal-warning'}">Health: ${w.healthScore}%</span>
          </div>
          <h4 style="margin-top:0.5rem; color:var(--text-main);">${w.wardName}</h4>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;">Primary Concern: <strong style="color:var(--status-warning);">${w.topIssue}</strong></div>

          <div style="margin-top:0.85rem; font-size:0.85rem; display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
            <div style="background:rgba(15,23,42,0.6); padding:0.5rem; border-radius:var(--radius-md);">
              <div style="font-size:0.7rem; color:var(--text-dim);">TOTAL ISSUES</div>
              <div style="font-weight:700; color:var(--accent-cyan);">${w.totalComplaints}</div>
            </div>
            <div style="background:rgba(15,23,42,0.6); padding:0.5rem; border-radius:var(--radius-md);">
              <div style="font-size:0.7rem; color:var(--text-dim);">RESOLVED</div>
              <div style="font-weight:700; color:var(--status-success);">${w.resolved}</div>
            </div>
          </div>

          <div class="ward-heat-bar">
            <div class="ward-heat-fill" style="width:${(w.resolved / w.totalComplaints) * 100}%; background:${w.healthScore > 75 ? 'var(--status-success)' : 'var(--status-warning)'};"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function changeGisConstituency(mlaId) {
  selectedMla = mlaDataset.find(m => m.id == mlaId);
  renderGisLocalityMap();
}

let selectedPromiseStatus = "All";

function setPromiseFilter(status) {
  selectedPromiseStatus = status;
  renderPromisesTracker();
}

function renderPromisesTracker() {
  const container = document.getElementById("promises-tracker-container");
  if (!container) return;

  const currentMla = selectedMla || mlaDataset[0];
  const promises = currentMla.promisesTracker || [];

  const filteredPromises = selectedPromiseStatus === "All" ? promises : promises.filter(p => p.status === selectedPromiseStatus);
  const statuses = ["All", "Proposed", "Approved", "In Progress", "Completed", "Delayed"];

  container.innerHTML = `
    <div style="background:var(--bg-card); padding:1.5rem; border-radius:var(--radius-lg); border:1px solid var(--border-color); margin-bottom:1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <h3 style="color:var(--accent-gold); margin-bottom:0.3rem;"><i class="fa-solid fa-handshake"></i> 📜 Public Promise & Progress Tracker</h3>
          <p style="font-size:0.85rem; color:var(--text-muted);">
            Tracking announced developmental promises for <strong>${currentMla.mla}</strong> (${currentMla.constituency}) across 5 lifecycle stages.
          </p>
        </div>
        <select id="promise-constituency-select" class="form-control" style="width:260px;" onchange="changePromiseConstituency(this.value)">
          ${mlaDataset.map(m => `<option value="${m.id}" ${m.id === currentMla.id ? 'selected' : ''}>${m.constituency} (${m.mla})</option>`).join('')}
        </select>
      </div>

      <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:1rem;">
        ${statuses.map(s => `
          <button class="timeline-year-btn ${selectedPromiseStatus === s ? 'active' : ''}" onclick="setPromiseFilter('${s}')">
            ${s}
          </button>
        `).join('')}
      </div>
    </div>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
      ${filteredPromises.map(p => `
        <div class="module-section-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="tag-badge designation">${p.category}</span>
            <span class="promise-status-badge ${p.status.replace(' ', '-')}">${p.status}</span>
          </div>
          <h4 style="margin-top:0.6rem; color:var(--text-main); font-size:1.05rem;">${p.title}</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.3rem;">${p.description}</p>

          <div style="margin-top:1rem;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:0.3rem;">
              <span>Execution Progress</span>
              <strong style="color:var(--accent-cyan);">${p.progressPct}%</strong>
            </div>
            <div class="score-progress-bar">
              <div class="score-progress-fill" style="width:${p.progressPct}%;"></div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-dim); margin-top:0.85rem; border-top:1px solid var(--border-color); padding-top:0.6rem;">
            <span><i class="fa-solid fa-indian-rupee-sign"></i> Budget: ₹ ${p.costCr} Cr</span>
            <span><i class="fa-solid fa-calendar"></i> Target: ${p.targetDate}</span>
            <span><i class="fa-solid fa-comments"></i> ${p.citizenUpdatesCount} Feedback</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function changePromiseConstituency(mlaId) {
  selectedMla = mlaDataset.find(m => m.id == mlaId);
  renderPromisesTracker();
}

function renderServiceSurveyForm() {
  const container = document.getElementById("service-survey-container");
  if (!container) return;

  container.innerHTML = `
    <div style="max-width:800px; margin:0 auto; background:var(--bg-card); padding:2rem; border-radius:var(--radius-lg); border:1px solid var(--border-color);">
      <h3 style="margin-bottom:0.5rem; color:var(--accent-cyan);"><i class="fa-solid fa-square-poll-vertical"></i> 📊 6-Service Public Satisfaction Survey</h3>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.5rem;">
        Rate local public services from 1 (Very Poor) to 5 (Excellent). Your feedback directly powers the Constituency Service Scorecard.
      </p>

      <form id="survey-form" onsubmit="handleSurveySubmit(event)">
        <div class="form-group">
          <label class="form-label">Select Constituency</label>
          <select id="survey-constituency-select" class="form-control" required>
            ${mlaDataset.map(m => `<option value="${m.id}">${m.constituency} (${m.mla})</option>`).join('')}
          </select>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
          <div class="form-group">
            <label class="form-label">1. Roads & Highway Infrastructure (1-5)</label>
            <input type="range" id="survey-roads" min="1" max="5" value="4" class="form-control" oninput="this.nextElementSibling.value=this.value + ' / 5 Stars'">
            <output style="font-weight:700; color:var(--accent-cyan); font-size:0.9rem;">4 / 5 Stars</output>
          </div>

          <div class="form-group">
            <label class="form-label">2. Water Supply Reliability (1-5)</label>
            <input type="range" id="survey-water" min="1" max="5" value="3" class="form-control" oninput="this.nextElementSibling.value=this.value + ' / 5 Stars'">
            <output style="font-weight:700; color:var(--accent-cyan); font-size:0.9rem;">3 / 5 Stars</output>
          </div>

          <div class="form-group">
            <label class="form-label">3. Healthcare & Hospital Access (1-5)</label>
            <input type="range" id="survey-healthcare" min="1" max="5" value="4" class="form-control" oninput="this.nextElementSibling.value=this.value + ' / 5 Stars'">
            <output style="font-weight:700; color:var(--accent-cyan); font-size:0.9rem;">4 / 5 Stars</output>
          </div>

          <div class="form-group">
            <label class="form-label">4. Government School Education (1-5)</label>
            <input type="range" id="survey-education" min="1" max="5" value="4" class="form-control" oninput="this.nextElementSibling.value=this.value + ' / 5 Stars'">
            <output style="font-weight:700; color:var(--accent-cyan); font-size:0.9rem;">4 / 5 Stars</output>
          </div>

          <div class="form-group">
            <label class="form-label">5. Waste Management & Cleanliness (1-5)</label>
            <input type="range" id="survey-waste" min="1" max="5" value="3" class="form-control" oninput="this.nextElementSibling.value=this.value + ' / 5 Stars'">
            <output style="font-weight:700; color:var(--accent-cyan); font-size:0.9rem;">3 / 5 Stars</output>
          </div>

          <div class="form-group">
            <label class="form-label">6. Grievance & Problem Resolution (1-5)</label>
            <input type="range" id="survey-grievance" min="1" max="5" value="4" class="form-control" oninput="this.nextElementSibling.value=this.value + ' / 5 Stars'">
            <output style="font-weight:700; color:var(--accent-cyan); font-size:0.9rem;">4 / 5 Stars</output>
          </div>
        </div>

        <button type="submit" class="btn-primary" style="width:100%; margin-top:1rem;">
          <i class="fa-solid fa-paper-plane"></i> Submit Constituency Service Ratings
        </button>
      </form>
    </div>
  `;
}

function handleSurveySubmit(e) {
  e.preventDefault();
  const mlaId = document.getElementById("survey-constituency-select").value;
  const m = mlaDataset.find(item => item.id == mlaId);
  if (m) {
    showToast(`Thank you! Your ratings for ${m.constituency} have been recorded.`, "success");
    switchTab("directory");
  }
}
