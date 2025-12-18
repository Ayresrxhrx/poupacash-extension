// Lista de sites suportados
const sitesSuportados = [
  "amazon.com",
  "amazon.co.uk",
  "aliexpress.com",
  "ebay.com",
  "shein.com",
  "temu.com",
  "jumia.co.mz",
  "jumia.co.za"
];

// Detecta domínio atual
const dominioAtual = window.location.hostname.replace("www.", "").toLowerCase();

// Detecta se a página parece checkout
function estaNoCheckout() {
  const termosCheckout = ["checkout", "cart", "carrinho", "pay", "pagamento"];
  const url = window.location.href.toLowerCase();
  return termosCheckout.some(termo => url.includes(termo));
}

// Comunica com popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.tipo === "STATUS_SITE") {
    sendResponse({
      dominio: dominioAtual,
      suportado: sitesSuportados.includes(dominioAtual),
      checkout: estaNoCheckout()
    });
  }
});

// Log só pra debug (não é fake, ajuda a verificar)
console.log("PoupaCash ativo em:", dominioAtual);
