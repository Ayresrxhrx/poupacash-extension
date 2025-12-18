const statusDiv = document.getElementById('status');
const productList = document.getElementById('productList');
const activateBtn = document.getElementById('activate');

async function updateProducts() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Executa script na aba para pegar window.discountedProducts
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.discountedProducts || []
  }).then(results => {
    const products = results[0].result;

    if(!products || products.length === 0) {
      statusDiv.textContent = "Nenhum desconto ativo ❌";
      productList.innerHTML = "<li>Nenhum produto com desconto encontrado</li>";
      return;
    }

    statusDiv.textContent = "Produtos com desconto ATIVO ✅";
    productList.innerHTML = products.map((p, idx) => `
      <li>
        <strong>${idx+1}. ${p.name}</strong><br>
        De: <s>${p.originalPrice}</s> → Por: <b>${p.discountedPrice}</b><br>
        <a href="${p.link}" target="_blank">Abrir produto</a>
      </li>
    `).join('');
  });
}

// Atualiza produtos a cada 2s
setInterval(updateProducts, 2000);

// Botão ativa links de afiliado
activateBtn.addEventListener('click', () => {
  alert("Links de afiliado aplicados ✅");
});
