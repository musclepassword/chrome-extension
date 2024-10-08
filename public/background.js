chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generatePassword",
    title: "Generate Password",
    contexts: ["all"] // Yalnızca düzenlenebilir alanlar (örneğin input) için görünür olacak
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab && tab.id !== -1) {
    if (info.menuItemId === "generatePassword") {
      chrome.action.openPopup(); // Uzantı popup'ını aç

      // Burada şifre oluşturma işlemi yapacak bir fonksiyon çağırabiliriz, ancak
      // popup'ta bu işlemi yapacağımız için burayı kullanmayacağız.
    }
  } else {
    console.error("Geçerli bir sekme bulunamadı.");
  }
});

// Popup'tan gelen mesajları dinleyin
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SET_PASSWORD') {
    // Şifreyi input alanına yerleştirmek için içerik script'ini çalıştır
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: setPasswordToInput,
      args: [request.password]
    });
  }
});

// Input alanına şifreyi yerleştirecek fonksiyon
function setPasswordToInput(password) {
  const activeElement = document.activeElement;
  if (activeElement && activeElement.tagName === "INPUT" && activeElement.type === "password") {
      activeElement.value = password; // Şifreyi input'a yerleştir
  }
}
