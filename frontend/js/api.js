const API_BASE = "";

function getToken() {
  return localStorage.getItem("jojan_token");
}

function setSession(token, user) {
  localStorage.setItem("jojan_token", token);
  localStorage.setItem("jojan_user", JSON.stringify(user));
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("jojan_user")) || null;
  } catch (e) {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem("jojan_token");
  localStorage.removeItem("jojan_user");
}

function requireAuth() {
  if (!getToken()) {
    window.location.href = "/index.html";
  }
}

async function apiRequest(path, options = {}) {
  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) headers["Authorization"] = "Bearer " + token;

  const res = await fetch(API_BASE + path, { ...options, headers });

  if (res.status === 401) {
    clearSession();
    window.location.href = "/index.html";
    throw new Error("Not authenticated");
  }

  if (!res.ok) {
    let detail = "Something went wrong";
    try {
      const err = await res.json();
      detail = err.detail || detail;
    } catch (e) {}
    throw new Error(detail);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res;
}

function apiGet(path) {
  return apiRequest(path, { method: "GET" });
}
function apiPost(path, body) {
  return apiRequest(path, { method: "POST", body: JSON.stringify(body) });
}
function apiPut(path, body) {
  return apiRequest(path, { method: "PUT", body: JSON.stringify(body) });
}
function apiDelete(path) {
  return apiRequest(path, { method: "DELETE" });
}

function showToast(message, isError = false) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = "toast" + (isError ? " error" : "");
  toast.style.display = "block";
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.display = "none"; }, 3200);
}

function formatDate(isoStr) {
  if (!isoStr) return "";
  const d = new Date(isoStr);
  if (isNaN(d)) return isoStr;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

function todayISO() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

async function doLogout() {
  try { await apiPost("/api/auth/logout", {}); } catch (e) {}
  clearSession();
  window.location.href = "/index.html";
}
