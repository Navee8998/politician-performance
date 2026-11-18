// auth.js - Dedicated Authentication and Role Management for CivicPulse Karnataka

// Default System Accounts
const DEFAULT_ACCOUNTS = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Karnataka Assembly Admin",
    constituency: "Vidhana Sabha Secretariat",
    email: "admin.kla@karnataka.gov.in"
  },
  {
    username: "citizen",
    password: "citizen123",
    role: "citizen",
    name: "Ramesh Kumar",
    constituency: "Kanakapura",
    email: "ramesh.k@gmail.com"
  },
  {
    username: "officer",
    password: "officer123",
    role: "admin",
    name: "Legislative Affairs Officer",
    constituency: "Bengaluru Central",
    email: "officer.kla@karnataka.gov.in"
  }
];

// Initialize Auth State from LocalStorage
function getAuthAccounts() {
  const saved = localStorage.getItem("civic_auth_accounts");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [...DEFAULT_ACCOUNTS];
    }
  }
  localStorage.setItem("civic_auth_accounts", JSON.stringify(DEFAULT_ACCOUNTS));
  return [...DEFAULT_ACCOUNTS];
}

function saveAuthAccounts(accounts) {
  localStorage.setItem("civic_auth_accounts", JSON.stringify(accounts));
}

function getCurrentAuthUser() {
  const saved = localStorage.getItem("civic_current_user");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  // Default to citizen demo user
  const defaultUser = {
    username: "citizen",
    name: "Ramesh Kumar",
    role: "citizen",
    constituency: "Kanakapura",
    email: "ramesh.k@gmail.com",
    isLoggedIn: true
  };
  localStorage.setItem("civic_current_user", JSON.stringify(defaultUser));
  return defaultUser;
}

function saveCurrentAuthUser(user) {
  localStorage.setItem("civic_current_user", JSON.stringify(user));
}

// Authentication Actions: Login, Register, Logout
function authenticateUser(username, password) {
  const accounts = getAuthAccounts();
  const user = accounts.find(
    acc => acc.username.toLowerCase() === username.trim().toLowerCase() && acc.password === password
  );
  if (user) {
    const sessionUser = {
      username: user.username,
      name: user.name,
      role: user.role,
      constituency: user.constituency,
      email: user.email,
      isLoggedIn: true
    };
    saveCurrentAuthUser(sessionUser);
    return { success: true, user: sessionUser };
  }
  return { success: false, message: "Invalid username or password! Please check credentials." };
}

function registerNewUser(username, password, name, constituency, email, role = "citizen") {
  const accounts = getAuthAccounts();
  const exists = accounts.some(acc => acc.username.toLowerCase() === username.trim().toLowerCase());
  if (exists) {
    return { success: false, message: "Username already exists. Please choose a different username." };
  }
  const newAccount = {
    username: username.trim(),
    password: password,
    role: role,
    name: name.trim(),
    constituency: constituency || "Bangalore South",
    email: email || `${username.trim().toLowerCase()}@civicpulse.org`
  };
  accounts.push(newAccount);
  saveAuthAccounts(accounts);

  const sessionUser = {
    username: newAccount.username,
    name: newAccount.name,
    role: newAccount.role,
    constituency: newAccount.constituency,
    email: newAccount.email,
    isLoggedIn: true
  };
  saveCurrentAuthUser(sessionUser);
  return { success: true, user: sessionUser };
}

function logoutCurrentUser() {
  const guestUser = {
    username: "guest",
    name: "Guest Visitor",
    role: "citizen",
    constituency: "Kanakapura",
    email: "",
    isLoggedIn: false
  };
  saveCurrentAuthUser(guestUser);
  return guestUser;
}

// UI Modal Handlers
let authModalMode = "login"; // 'login' or 'register'

function openAuthModal(targetRole = null) {
  const modal = document.getElementById("auth-modal-backdrop");
  if (!modal) return;

  if (targetRole === "admin") {
    authModalMode = "login";
    document.getElementById("auth-role-select").value = "admin";
  }

  updateAuthModalView();
  modal.classList.add("active");
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal-backdrop");
  if (modal) modal.classList.remove("active");
}

function switchAuthMode(mode) {
  authModalMode = mode;
  updateAuthModalView();
}

function updateAuthModalView() {
  const title = document.getElementById("auth-modal-title");
  const subtext = document.getElementById("auth-modal-subtext");
  const registerFields = document.getElementById("auth-register-fields");
  const submitBtn = document.getElementById("auth-submit-btn");
  const toggleText = document.getElementById("auth-toggle-link");

  if (authModalMode === "login") {
    if (title) title.innerHTML = `<i class="fa-solid fa-right-to-bracket" style="color:var(--accent-cyan);"></i> Citizen & Admin Secure Sign In`;
    if (subtext) subtext.textContent = "Log in with your username and password to submit complaints, evaluate MLAs, or access the admin panel.";
    if (registerFields) registerFields.style.display = "none";
    if (submitBtn) submitBtn.innerHTML = `<i class="fa-solid fa-lock-open"></i> Sign In to Account`;
    if (toggleText) toggleText.innerHTML = `Don't have an account? <a href="javascript:void(0)" onclick="switchAuthMode('register')" style="color:var(--accent-cyan); font-weight:700; text-decoration:underline;">Create Citizen Account</a>`;
  } else {
    if (title) title.innerHTML = `<i class="fa-solid fa-user-plus" style="color:var(--accent-primary);"></i> New Citizen Registration`;
    if (subtext) subtext.textContent = "Register with your Karnataka constituency to access voice complaints, voting surveys, and community tracking.";
    if (registerFields) registerFields.style.display = "block";
    if (submitBtn) submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Complete Registration`;
    if (toggleText) toggleText.innerHTML = `Already registered? <a href="javascript:void(0)" onclick="switchAuthMode('login')" style="color:var(--accent-cyan); font-weight:700; text-decoration:underline;">Sign In Here</a>`;
  }
}

function handleAuthFormSubmit(e) {
  e.preventDefault();
  const usernameInput = document.getElementById("auth-username-input").value;
  const passwordInput = document.getElementById("auth-password-input").value;
  const roleSelect = document.getElementById("auth-role-select").value;

  if (authModalMode === "login") {
    const result = authenticateUser(usernameInput, passwordInput);
    if (result.success) {
      currentUser = result.user;
      setRole(result.user.role);
      showToast(`Welcome, ${result.user.name}! Signed in successfully as ${result.user.role.toUpperCase()}.`, "success");
      closeAuthModal();
      renderUserSessionHeader();
    } else {
      showToast(result.message, "error");
    }
  } else {
    // Registration
    const nameInput = document.getElementById("auth-name-input").value;
    const constSelect = document.getElementById("auth-constituency-select").value;
    const emailInput = document.getElementById("auth-email-input").value;

    const result = registerNewUser(usernameInput, passwordInput, nameInput, constSelect, emailInput, roleSelect);
    if (result.success) {
      currentUser = result.user;
      setRole(result.user.role);
      showToast(`Account created! Logged in as ${result.user.name}.`, "success");
      closeAuthModal();
      renderUserSessionHeader();
    } else {
      showToast(result.message, "error");
    }
  }
}

function quickFillDemoLogin(role) {
  const usernameField = document.getElementById("auth-username-input");
  const passwordField = document.getElementById("auth-password-input");
  const roleField = document.getElementById("auth-role-select");

  if (role === "admin") {
    if (usernameField) usernameField.value = "admin";
    if (passwordField) passwordField.value = "admin123";
    if (roleField) roleField.value = "admin";
  } else {
    if (usernameField) usernameField.value = "citizen";
    if (passwordField) passwordField.value = "citizen123";
    if (roleField) roleField.value = "citizen";
  }
  authModalMode = "login";
  updateAuthModalView();
}
