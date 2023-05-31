import Aes from 'react-native-aes-crypto';

//const IV = await Aes.randomKey(16);
//const IV = 'd21f145dc3a9263f27fc1017c97ad417';
 const IV = '00000000000000000000000000000000'; //32 char

export const aes_generateKey = async salt =>
  Aes.pbkdf2('Default', await Aes.randomKey(16), 5000, 256);

export const aes_encryptData = (text, key) => {
  return Aes.encrypt(text, key, IV, 'aes-256-cbc').then(cipher => ({
    cipher,
  }));
};

export const aes_decryptData = (encryptedData, key) =>
  Aes.decrypt(encryptedData, key, IV, 'aes-256-cbc');
