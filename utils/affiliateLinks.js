// StoreIDs e API Keys – substituir pelos teus reais
export const affiliates = {
  amazon: {
    storeID: 'SEU_AMAZON_STOREID',
    apiKey: 'SUA_AMAZON_API_KEY'
  },
  shein: {
    storeID: 'SEU_SHEIN_STOREID',
    apiKey: 'SUA_SHEIN_API_KEY'
  }
};

/**
 * Aplica link de afiliado para cada site
 * @param {string} url - URL original do produto
 * @param {string} site - 'amazon' ou 'shein'
 * @returns {string} URL com afiliado aplicado
 */
export function applyAffiliate(url, site) {
  switch(site) {
    case 'amazon':
      if(!url.includes('tag=')) {
        return `${url}${url.includes('?') ? '&' : '?'}tag=${affiliates.amazon.storeID}`;
      }
      return url;

    case 'shein':
      if(!url.includes('affid=')) {
        return `${url}${url.includes('?') ? '&' : '?'}affid=${affiliates.shein.storeID}`;
      }
      return url;

    default:
      return url;
  }
}

/**
 * Detecta site pelo URL
 * @param {string} url - URL da aba atual
 * @returns {string} 'amazon', 'shein' ou ''
 */
export function detectSiteByURL(url) {
  if(url.includes('amazon.com')) return 'amazon';
  if(url.includes('shein.com')) return 'shein';
  return '';
}
