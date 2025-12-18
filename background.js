// background.js
// Service Worker da extensão

// Recebe mensagens do content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if(msg.type === "discountedProducts") {
    // Podemos armazenar no storage ou apenas logar
    console.log("Produtos atualizados:", msg.products);
    // Opcional: salvar para popup acessar rápido
    chrome.storage.local.set({ discountedProducts: msg.products });
  }
});
