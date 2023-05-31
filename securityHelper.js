import Aes from 'react-native-aes-crypto';

export const aes_generateKey = salt => Aes.pbkdf2('Default', salt, 5000, 256);

export const aes_encryptData = (text, key, iv) => {
  return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
    cipher,
  }));
};

export const aes_decryptData = (encryptedData, key, iv) =>
  Aes.decrypt(encryptedData, key, iv, 'aes-256-cbc');
