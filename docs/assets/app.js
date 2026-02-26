export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyClV5jh7eS9DTUBUjcA1ruXMnilhYH_o88",
  authDomain: "red-cresent-109b0.firebaseapp.com",
  databaseURL: "https://red-cresent-109b0-default-rtdb.firebaseio.com",
  projectId: "red-cresent-109b0",
  storageBucket: "red-cresent-109b0.firebasestorage.app",
  messagingSenderId: "901836433483",
  appId: "1:901836433483:web:c1acf1b92adff45de9c5ce",
  measurementId: "G-BYP3NNH75Q"
};

export const CLOUDINARY = {
  cloudName: "dqe832ooh",
  uploadPreset: "public_upload"
};

export function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function fmtDate(d) {
  try {
    if (!d) return "—";
    if (typeof d === "object" && d.seconds) {
      return new Date(d.seconds * 1000).toLocaleDateString("en-GB");
    }
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return String(d);
    return dt.toLocaleDateString("en-GB");
  } catch {
    return "—";
  }
}

export function toast(el, msg, type = "info") {
  el.textContent = msg;
  el.classList.remove("hidden");
  el.style.borderColor =
    type === "ok"
      ? "rgba(45,212,191,.35)"
      : type === "bad"
      ? "rgba(255,91,110,.55)"
      : "rgba(255,255,255,.12)";
  el.style.color =
    type === "ok"
      ? "rgba(45,212,191,.95)"
      : type === "bad"
      ? "rgba(255,91,110,.95)"
      : "var(--muted)";
  setTimeout(() => el.classList.add("hidden"), 4500);
}

export async function uploadToCloudinary(file) {
  const { cloudName, uploadPreset } = CLOUDINARY;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const form = new FormData();
  form.append("upload_preset", uploadPreset);
  form.append("file", file);

  const res = await fetch(url, { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Cloudinary upload failed");
  return data.secure_url;
}