import {
  getUserInfo,
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

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0 && tabs[0].url) {
      try {
        const url = new URL(tabs[0].url);
        const pathSegments = url.pathname.split("/").filter(Boolean);
        const extractedSlug = pathSegments.pop() || "";
        const searchParams = new URLSearchParams(url.search);
        const extractedCreator = searchParams.get("creator") || "";

        const popupUrl = chrome.runtime.getURL(
          `popup.html?slug=${encodeURIComponent(
            extractedSlug
          )}&creator=${encodeURIComponent(extractedCreator)}`
        );

        if (extractedSlug && extractedCreator) {
          chrome.windows.create({
            url: popupUrl,
            type: "popup",
            width: 600,
            height: 700,
          });
        }
      } catch (error) {
        console.error("Error extracting slug and creator:", error);
      }
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getUserInfo") {
    getUserInfo(message.slugId, message.creatorId)
      .then((response) => sendResponse(response))
      .catch((error) =>
        sendResponse({ success: false, message: error.message })
      );
    return true;
  }
});
