// Background da extensão: controla cliques, links afiliados e comunicação

// Quando a extensão é instalada
chrome.runtime.onInstalled.addListener(() => {
  console.log("PoupaCash instalado e pronto 💼💸");
});

// Função para abrir links de afiliado
function abrirAfiliado(url) {
  if (!url) return;
  chrome.tabs.create({ url });
}

// Listener para mensagens vindas do popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.tipo) {

    case "ABRIR_AFILIADO":
      // request.url deve ser o link do parceiro
      abrirAfiliado(request.url);
      sendResponse({ sucesso: true });
      break;

    case "LOG_CLIQUE":
      // Aqui podes guardar histórico de cliques
      chrome.storage.local.get(["historico"], (res) => {
        const historico = res.historico || [];
        historico.push({
          dominio: request.dominio,
          data: new Date().toISOString(),
          link: request.url
        });
        chrome.storage.local.set({ historico });
      });
      sendResponse({ sucesso: true });
      break;

    default:
      sendResponse({ sucesso: false });
      break;
  }

  return true; // necessário para responder async
});
