/**
 * Guarda dados no storage local do Chrome
 * @param {string} key 
 * @param {any} value 
 */
export function setLocal(key, value) {
  if (!key) return;
  chrome.storage.local.set({ [key]: value }, () => {
    console.log(`Storage salvo: ${key}`);
  });
}

/**
 * Lê dados do storage local do Chrome
 * @param {string} key 
 * @returns {Promise<any>}
 */
export function getLocal(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      resolve(result[key]);
    });
  });
}

/**
 * Remove uma chave do storage local do Chrome
 * @param {string} key 
 */
export function removeLocal(key) {
  if (!key) return;
  chrome.storage.local.remove([key], () => {
    console.log(`Storage removido: ${key}`);
  });
}
