const KEY = 'portfolio_messages';

export const saveMessage = (fields) => {
  const list = getMessages();
  list.unshift({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...fields,
  });
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const getMessages = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
};

export const deleteMessage = (id) => {
  const list = getMessages().filter(m => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const exportMessages = () => {
  const data = JSON.stringify(getMessages(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `messages-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
