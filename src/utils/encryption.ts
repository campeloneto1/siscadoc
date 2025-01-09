const encrypt = (text: string) => {
  return btoa(text);
};

const decrypt = (text: string) => {
  return atob(text);
};

export { encrypt, decrypt };
