// Lista de sites suportados (por enquanto)
const sitesSuportados = [
  "amazon",
  "aliexpress",
  "ebay",
  "shein",
  "jumia"
];

// Pega o domínio atual
const dominio = window.location.hostname.toLowerCase();

// Verifica se o site é suportado
function siteEhSuportado() {
  return sitesSuportados.some(site => dominio.includes(site));
}

// Verifica se está numa página de compra / checkout
function estaNoCheckout() {
  const palavrasCheckout = ["checkout", "cart", "carrinho", "pay", "pagamento"];
  return palavrasCheckout.some(palavra =>
    window.location.href.toLowerCase().includes(palavra)
  );
}

// Envia info para o popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.tipo === "STATUS_SITE") {
    sendResponse({
      dominio: dominio,
      suportado: siteEhSuportado(),
      checkout: estaNoCheckout()
    });
  }
});

// (Opcional) Log só pra debug
console.log("PoupaCash ativo em:", dominio);
