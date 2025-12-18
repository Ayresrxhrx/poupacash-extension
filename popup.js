document.addEventListener("DOMContentLoaded", () => {
  const site = document.getElementById("site");
  const status = document.getElementById("status");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);
    site.textContent = "Site atual: " + url.hostname;
  });

  document.getElementById("verificar").addEventListener("click", () => {
    status.textContent = "Ainda não há cupons disponíveis para este site.";
  });
});
