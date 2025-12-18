/**
 * Retorna o domínio principal de uma URL
 * Ex: "www.amazon.com" -> "amazon.com"
 */
export function getDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace("www.", "").toLowerCase();
  } catch (err) {
    console.error("Erro ao processar URL:", url, err);
    return null;
  }
}

/**
 * Verifica se um domínio está na lista de parceiros
 */
export function isPartner(domain, partners) {
  if (!domain || !partners) return false;
  return Object.keys(partners).includes(domain.toLowerCase());
}
