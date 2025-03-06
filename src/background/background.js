import {
  getUserInfo,
  loginService,
  logoutService,
  updateInfoService,
  userInfoService,
} from "../utils/service";

let popupWindowId = null

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

  if (message.action === "getUserInfo") {
    getUserInfo(message.slugId, message.creatorId)
      .then((response) => sendResponse(response))
      .catch((error) =>
        sendResponse({ success: false, message: error.message })
      );
    return true;
  }

  if (message.type === "LOGIN") {
    loginService(message.username, message.password).then(sendResponse);
    return true;
  }

  if (message.type === "LOGOUT") {
    logoutService().then(() => sendResponse({ success: true }));
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
        let realtimeParam = new Date().getTime();
        const popupUrl = chrome.runtime.getURL(
          `popup.html?slug=${encodeURIComponent(extractedSlug)}&creator=${encodeURIComponent(extractedCreator)}&time=${realtimeParam}`
        );

        if (extractedSlug && extractedCreator) {
          chrome.windows.create(
            {
              url: popupUrl,
              type: "popup",
              width: 600,
              height: 700,
            },
            (window) => {
              popupWindowId = window.id;
            }
        );
        }
      } catch (error) {
        console.error("Error extracting slug and creator:", error);
      }
    }
  });
});

const initializeServiceWorker = async () => {
  try {
    const checkParams = await chrome.alarms.get("check_params");
    if (!checkParams) {
      await chrome.alarms.create("check_params", { periodInMinutes: 2/60 });
    }
  } catch (error) {
    console.log(error, 'error');
  }
};

chrome.alarms.onAlarm.addListener(async function (alarm) {
  try {
    switch (alarm.name) {
      case "check_params":
        if (popupWindowId !== null){
          await sendParmsToOpendWindow()
        }
        break;
      default:
        break;
    }
  } catch (error) { }
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === popupWindowId) {
    popupWindowId = null;
  }
});

const sendParmsToOpendWindow = async() =>{
  chrome.tabs.query({ active: true,}, (tabs) => {
    if (tabs.length > 0 && tabs[0].url) {
      try {
        const url = new URL(tabs[0].url);
        const pathSegments = url.pathname.split("/").filter(Boolean);
        const extractedSlug = pathSegments.pop() || "";
        const searchParams = new URLSearchParams(url.search);
        const extractedCreator = searchParams.get("creator") || "";
        let realtimeParam = new Date().getTime();
        if (extractedSlug && extractedCreator) {
          chrome.runtime.sendMessage({
            action: "updateParams",
            newSlug: extractedSlug,
            newCreator: extractedCreator,
            time: realtimeParam,
          });
        }
      } catch (error) {
        console.error("Error extracting slug and creator:", error);
      }
    }
  });
}

initializeServiceWorker();