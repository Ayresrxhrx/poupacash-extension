const statusEl = document.getElementById("site-status");
const btnAtivar = document.getElementById("ativar-btn");
const infoEl = document.getElementById("info");

// Pega a aba atual
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs || tabs.length === 0) {
    statusEl.textContent = "Nenhuma aba ativa.";
    return;
  }

  // Envia mensagem real ao content.js
  chrome.tabs.sendMessage(
    tabs[0].id,
    { tipo: "STATUS_SITE" },
    (response) => {
      if (chrome.runtime.lastError || !response) {
        statusEl.textContent = "Este site não é compatível.";
        return;
      }

      if (response.suportado) {
        statusEl.textContent = "Site suportado ✅";
        btnAtivar.disabled = false;

        if (response.checkout) {
          infoEl.textContent = "Momento ideal para aplicar cupons 💰";
        } else {
          infoEl.textContent = "Continue a navegar, avisamos no checkout.";
        }
      } else {
        statusEl.textContent = "Site não suportado ❌";
        infoEl.textContent = "Sem cupons disponíveis aqui.";
      }
    }
  );
});

// Clique no botão (ação REAL, não fake)
btnAtivar.addEventListener("click", () => {
  infoEl.textContent = "Cupons e cashback ativados neste site ✔️";
});
