import { loginService, logoutService } from "../utils/service";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "LOGIN") {
    loginService(message.username, message.password).then(sendResponse);
    return true;
  }

  if (message.type === "LOGOUT") {
    logoutService().then(() => sendResponse({ success: true }));
    return true;
  }
});
