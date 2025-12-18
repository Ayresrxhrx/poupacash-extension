import { affiliates, applyAffiliate } from './utils/affiliateLinks.js';

window.discountedProducts = [];

// Detecta site
const url = window.location.href;
let site = '';
if(url.includes('amazon.com')) site = 'amazon';
if(url.includes('shein.com')) site = 'shein';

// Função pra buscar produtos da API
async function fetchDiscountedProducts() {
  let products = [];
  try {
    switch(site) {
      case 'amazon':
        const resA = await fetch(`https://api.amazon.com/products?discounted=true&apikey=${affiliates.amazon.apiKey}`);
        const dataA = await resA.json();
        products = dataA.products.map(p => ({
          name: p.title,
          originalPrice: p.original_price,
          discountedPrice: p.discount_price,
          link: applyAffiliate(p.url, 'amazon')
        }));
        break;

      case 'shein':
        const resS = await fetch(`https://api.shein.com/products?discounted=true&apikey=${affiliates.shein.apiKey}`);
        const dataS = await resS.json();
        products = dataS.products.map(p => ({
          name: p.title,
          originalPrice: p.original_price,
          discountedPrice: p.discount_price,
          link: applyAffiliate(p.url, 'shein')
        }));
        break;
    }
  } catch(e) {
    console.error("Erro ao buscar produtos", e);
  }

  window.discountedProducts = products.slice(0,50);

  // Envia pro background
  chrome.runtime.sendMessage({ type: "discountedProducts", products: window.discountedProducts });
}

// Atualiza de 30 em 30s
fetchDiscountedProducts();
setInterval(fetchDiscountedProducts, 30000);
