export const setStorage = async (key: string, value: any) => {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve();
    });
  });
};

export const getStorage = async (key: string): Promise<any> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (data) => {
      resolve(data[key] || null);
    });
  });
};

export const removeStorage = async (keys: string | string[]) => {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.sync.remove(keys, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve();
    });
  });
};
