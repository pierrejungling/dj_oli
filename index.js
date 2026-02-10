const contact = {
  firstName: "Olivier",
  lastName: "Dheur",
  title: "DJ et Conseiller en communication & Responsable Evenementiel",
  company: "VLAN Verviers",
  phone: "",
  email: "olivier.dheur@rossel.be",
  address: "Andrimont, Belgique",
  website: "",
  facebook: "https://www.facebook.com/share/18BNa9wdnh/?mibextid=wwXIfr",
  linkedin: "",
  instagram: "https://www.instagram.com/olivierdheur?igsh=N2JpazNrd2V3bTVu"
};

function isFilled(value) {
  return typeof value === "string" && value.trim() !== "";
}

function escapeVcf(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function sanitizeFilename(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function formatPhoneForDisplay(value) {
  return value.trim();
}

function makeDetailRow(label, valueHtml) {
  const wrapper = document.createElement("div");
  wrapper.className = "detail-row";

  const term = document.createElement("dt");
  term.className = "detail-term";
  term.textContent = label;

  const val = document.createElement("dd");
  val.className = "detail-value";
  val.innerHTML = valueHtml;

  wrapper.append(term, val);
  return wrapper;
}

function getIconSvg(type) {
  const icons = {
    website:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.93 9h-3.1a15.9 15.9 0 00-1.27-5.06A8.03 8.03 0 0118.93 11zM12 4.06c.86 1.22 1.9 3.54 2.32 6.94H9.68C10.1 7.6 11.14 5.28 12 4.06zM4.07 13h3.1c.12 1.84.56 3.62 1.27 5.06A8.03 8.03 0 014.07 13zm3.1-2h-3.1a8.03 8.03 0 014.37-5.06A15.9 15.9 0 007.17 11zM12 19.94c-.86-1.22-1.9-3.54-2.32-6.94h4.64c-.42 3.4-1.46 5.72-2.32 6.94zM15.83 13h3.1a8.03 8.03 0 01-4.37 5.06c.71-1.44 1.15-3.22 1.27-5.06z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 3.5A2 2 0 113.5 5.5a2 2 0 012-2zM4 8h3v12H4zm5 0h2.88v1.64h.04C12.4 8.79 13.5 8 15.24 8 19 8 20 10.24 20 13.15V20h-3v-6.09c0-1.45-.02-3.31-2.02-3.31-2.03 0-2.34 1.58-2.34 3.21V20H9z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.76 5.76 0 0122 7.75v8.5A5.76 5.76 0 0116.25 22h-8.5A5.76 5.76 0 012 16.25v-8.5A5.76 5.76 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4zm8.88 1.25a1.12 1.12 0 110 2.25 1.12 1.12 0 010-2.25zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H8v3h2.4v8h3.1z"/></svg>'
  };
  return icons[type] || "";
}

function addLinks() {
  const linksWrapper = document.getElementById("links-wrapper");
  const list = document.getElementById("contact-links");
  list.innerHTML = "";

  const links = [
    { key: "website", label: "Site web", href: contact.website },
    { key: "facebook", label: "Facebook", href: contact.facebook },
    { key: "linkedin", label: "LinkedIn", href: contact.linkedin },
    { key: "instagram", label: "Instagram", href: contact.instagram }
  ];

  const presentLinks = links.filter((item) => isFilled(item.href));
  if (presentLinks.length === 0) {
    linksWrapper.hidden = true;
    return;
  }

  presentLinks.forEach((item) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.className = "link-chip";
    a.href = item.href.trim();
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", `${item.label} (nouvel onglet)`);
    a.innerHTML = `${getIconSvg(item.key)}<span>${item.label}</span>`;

    li.appendChild(a);
    list.appendChild(li);
  });

  linksWrapper.hidden = false;
}

function addDetails() {
  const details = document.getElementById("contact-details");
  details.innerHTML = "";

  if (isFilled(contact.phone)) {
    const phone = contact.phone.trim();
    details.appendChild(
      makeDetailRow("Telephone", `<a href="tel:${phone}">${formatPhoneForDisplay(phone)}</a>`)
    );
  }

  if (isFilled(contact.email)) {
    const email = contact.email.trim();
    details.appendChild(makeDetailRow("Email", `<a href="mailto:${email}">${email}</a>`));
  }

  if (isFilled(contact.address)) {
    details.appendChild(makeDetailRow("Adresse", escapeHtml(contact.address.trim())));
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildVcfContent() {
  const firstName = (contact.firstName || "").trim();
  const lastName = (contact.lastName || "").trim();
  const fullName = `${firstName} ${lastName}`.trim() || "Contact";

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVcf(fullName)}`,
    `N:${escapeVcf(lastName)};${escapeVcf(firstName)};;;`
  ];

  if (isFilled(contact.phone)) {
    lines.push(`TEL;TYPE=CELL,VOICE:${escapeVcf(contact.phone.trim())}`);
  }
  if (isFilled(contact.email)) {
    lines.push(`EMAIL;TYPE=INTERNET:${escapeVcf(contact.email.trim())}`);
  }
  if (isFilled(contact.company)) {
    lines.push(`ORG:${escapeVcf(contact.company.trim())}`);
  }
  if (isFilled(contact.title)) {
    lines.push(`TITLE:${escapeVcf(contact.title.trim())}`);
  }
  if (isFilled(contact.website)) {
    lines.push(`URL:${escapeVcf(contact.website.trim())}`);
  }
  if (isFilled(contact.linkedin)) {
    lines.push(`URL:${escapeVcf(contact.linkedin.trim())}`);
  }
  if (isFilled(contact.facebook)) {
    lines.push(`URL:${escapeVcf(contact.facebook.trim())}`);
  }
  if (isFilled(contact.instagram)) {
    lines.push(`URL:${escapeVcf(contact.instagram.trim())}`);
  }

  lines.push("END:VCARD");
  return `${lines.join("\r\n")}\r\n`;
}

function getVcfFilename() {
  const firstName = sanitizeFilename((contact.firstName || "").trim());
  const lastName = sanitizeFilename((contact.lastName || "").trim());
  const base = [firstName, lastName].filter(Boolean).join("-");
  return `${base || "contact"}.vcf`;
}

function downloadVcf() {
  const vcfContent = buildVcfContent();
  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = getVcfFilename();
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

async function copyInfos(button, feedbackEl) {
  const lines = [];
  const fullName = `${(contact.firstName || "").trim()} ${(contact.lastName || "").trim()}`.trim();

  if (fullName) {
    lines.push(fullName);
  }
  if (isFilled(contact.phone)) {
    lines.push(`Tel: ${contact.phone.trim()}`);
  }
  if (isFilled(contact.email)) {
    lines.push(`Email: ${contact.email.trim()}`);
  }

  const payload = lines.join("\n");
  if (!payload) {
    feedbackEl.textContent = "Aucune information à copier.";
    return;
  }

  try {
    await navigator.clipboard.writeText(payload);
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = payload;
    textArea.setAttribute("readonly", "true");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  const initialLabel = button.textContent;
  feedbackEl.textContent = "Copié ✅";
  button.textContent = "Copié ✅";
  window.setTimeout(() => {
    button.textContent = initialLabel;
  }, 1800);
}

function renderContact() {
  const nameEl = document.getElementById("contact-full-name");
  const subtitleEl = document.getElementById("contact-subtitle");

  const fullName = `${(contact.firstName || "").trim()} ${(contact.lastName || "").trim()}`.trim();
  nameEl.textContent = fullName || "Contact";

  const subtitleParts = [contact.title, contact.company].filter(isFilled).map((item) => item.trim());
  if (subtitleParts.length > 0) {
    subtitleEl.textContent = subtitleParts.join(" - ");
    subtitleEl.hidden = false;
  } else {
    subtitleEl.hidden = true;
  }

  addDetails();
  addLinks();
}

function bindActions() {
  const feedbackEl = document.getElementById("feedback");
  const downloadBtn = document.getElementById("download-vcf-btn");
  const copyBtn = document.getElementById("copy-info-btn");

  downloadBtn.addEventListener("click", () => {
    downloadVcf();
    feedbackEl.textContent = "Fichier VCF téléchargé.";
  });

  copyBtn.addEventListener("click", () => {
    copyInfos(copyBtn, feedbackEl);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderContact();
  bindActions();
});
