import {
  loginService,
  logoutService,
  updateInfoService,
  userInfoService,
} from "../utils/service";

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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message in background script:", message);

  if (message.type === "USER_INFO") {
    userInfoService(message.userInfo)
      .then((response) => sendResponse(response))
      .catch((error) =>
        sendResponse({ success: false, message: error.message })
      );
    return true;
  }

  if (message.type === "UPDATE_USER_INFO") {
    updateInfoService(message.userInfo)
      .then((response) => sendResponse(response))
      .catch((error) =>
        sendResponse({ success: false, message: error.message })
      );
    return true;
  }
});
