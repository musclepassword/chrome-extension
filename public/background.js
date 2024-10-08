chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generatePassword",
    title: "Generate Password",
    contexts: ["all"]
  });
});

let tabId;

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab && tab.id !== -1) {
    tabId = tab.id
    if (info.menuItemId === "generatePassword") {
      chrome.action.openPopup(); // Sağ click yapınca uzantı popup'ını aç
    }
  } else {
    console.error("Geçerli bir sekme bulunamadı.");
  }
});

// Popup'tan gelen mesajları dinleyen fonksiyon
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SET_PASSWORD') {
    // Şifreyi input alanına yerleştirmek için içerik script'ini çalıştır
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: setPasswordToInput,
      args: [request.password]
    });
  }
});

// Input alanına şifreyi yerleştirecek fonksiyon
function setPasswordToInput(password) {
  const activeElement = document.activeElement;
  if (activeElement && activeElement.tagName === "INPUT" && activeElement.type === "password") {
    activeElement.value = password;
  }
}
