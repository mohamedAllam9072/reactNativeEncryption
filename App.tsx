/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * RSA >>>>>>  https://github.com/amitaymolko/react-native-rsa-native
 * AES >>>>>>  https://github.com/tectiv3/react-native-aes
 *
 * @format
 */

import React, {useState} from 'react';
import {RSA} from 'react-native-rsa-native';
import {
  aes_generateKey,
  aes_encryptData,
  aes_decryptData,
} from './securityHelper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [rsaPublicKey, setRSAPublicKey] = useState('');
  const [rsaPrivateKey, setRSAPrivateKey] = useState('');
  const [rsaEncryptedMessage, setRSAEncryptedMessage] = useState('');
  const [rsaDecryptedMessage, setRSADecryptedMessage] = useState('');
  const [aesKey, setAesKey] = useState('');
  const [aes_iv, setAes_iv] = useState('');
  const [aesEncrypted, setAesEncrypted] = useState('');
  const [aesDecrypted, setAesDecrypted] = useState('');
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={{margin: 5}}>
            <Button
              title="Reset ALL"
              onPress={async () => {
                setRSAPublicKey('');
                setRSAPrivateKey('');
                setRSAEncryptedMessage('');
                setRSADecryptedMessage('');
                setAesKey('');
                setAes_iv('');
                setAesEncrypted('');
                setAesDecrypted('');
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fcba03',
            }}>
            <View style={{margin: 5}}>
              <Button
                title="AES Generate Key"
                onPress={async () => {
                  try {
                    aes_generateKey().then(key => {
                      setAesKey(key);
                    });
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
              <Text style={styles.text}>{aesKey}</Text>
              <Button
                title="AES Encrypt"
                onPress={() => {
                  try {
                    aes_encryptData('my massage', aesKey)
                      .then(({cipher}) => {
                        setAesEncrypted(cipher);
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
              <Text style={styles.text}>{aesEncrypted}</Text>
              <Button
                title="AES Decrypt"
                onPress={() => {
                  aes_decryptData(aesEncrypted, aesKey)
                    .then(text => {
                      console.log('Decrypted:', text);
                      setAesDecrypted(text);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                }}
              />
              <Text style={styles.text}>{aesDecrypted}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#03fc6f',
            }}>
            <View style={{margin: 5}}>
              <Button
                title="Generate Keys"
                onPress={() => {
                  RSA.generateKeys(2048) // set key size
                    .then(keys => {
                      setRSAPublicKey(keys.public);
                      setRSAPrivateKey(keys.private);
                      setRSADecryptedMessage('');
                      setRSAEncryptedMessage('');
                      console.log('rsaPublicKey' + keys.public);
                      console.log('rsaPrivateKey' + keys.private);
                    });
                }}
              />
              <Text style={styles.text}>{rsaPublicKey}</Text>
              <Text>{rsaPrivateKey}</Text>
            </View>

            <View style={{margin: 5}}>
              <Button
                title="Encrypt"
                onPress={() => {
                  let message = 'my secret message';
                  let msg2 =
                    '427932b2c56ef5e221402bdd9abbb2b44bc6d670b9fc7cf31b418b9116508fa9';
                  const publicKey = `-----BEGIN RSA PUBLIC KEY-----
                MIIBCgKCAQEA9sAyyYRdXwZHHyKO689LxlWGrvdRkmcFkkQrony6CqVnVylxJr3X
                TBDuOLq5EpNr13ad/fMZpQjuIWJehPDYOqxSWOJQi9JygpyVF5Nv29F2BZu2eGih
                n863CAbpkWTz6ntNqzoTX7nwYDYQzjzdGl5/qF4ikxGLVfmZoAWn4mKD/heb6POT
                OXaOK/QBh455WdSZlZkMtDZJ1HEeV2dW8srw0h5F2g8GD5ZBLTH8wkWZZjKfU+Qt
                CArseBgAP6nSclIMM26iTpHQtHRvF3XTplTGC8VSEXx6QQebvmmDJbsl0AregN/Z
                /BN0QsrPH7J4ydsMbTdUUf/9wqoM4Lnx1QIDAQAB
                -----END RSA PUBLIC KEY-----`;

                  const publicKey2 = `-----BEGIN RSA PUBLIC KEY-----
                  MIIBCgKCAQEA1Ts98CmYk2ZZ7IfaJpDdtu/WWpeAwWg1qTLt1VkJR1eOEoLp8qHv
                  hMR8Sr4imyvHLOJexECY++BBX9ofNGcTAdZGbpdM51nXtMS8yumCaSQekubRsx0D
                  o337bK4qfIxXv12SfGKrVuoaoxbfu3uFC1eMoqcavinU/PYkqQD/LA08e0F7T266
                  w/JxogmeAigi2deqjG7NE51/KeFhSHEjB1t6oSkrLVtutVeS30vmy95tSXWv1YNe
                  47GuJA60CVjAbtgPE1DdRwtHpkJhio0jqxOmRI6e2b8/shzdf6A1aLhxcjwbVBHZ
                  oW9OB0LPPO7kcBaEW4yAgnxP6QS2xpL1DQIDAQAB
                  -----END RSA PUBLIC KEY-----`;
                  RSA.encrypt(msg2, publicKey2).then(function (encodedMessage) {
                    console.log('RSA Encrypt', encodedMessage);
                    setRSAEncryptedMessage(encodedMessage);
                  });
                }}
              />
              <Text>{rsaEncryptedMessage}</Text>
            </View>
            <View style={{margin: 5}}>
              <Button
                title="Decrypt"
                onPress={() => {
                  const privateKey2 = `-----BEGIN RSA PRIVATE KEY-----
                  MIIEowIBAAKCAQEA1Ts98CmYk2ZZ7IfaJpDdtu/WWpeAwWg1qTLt1VkJR1eOEoLp
                  8qHvhMR8Sr4imyvHLOJexECY++BBX9ofNGcTAdZGbpdM51nXtMS8yumCaSQekubR
                  sx0Do337bK4qfIxXv12SfGKrVuoaoxbfu3uFC1eMoqcavinU/PYkqQD/LA08e0F7
                  T266w/JxogmeAigi2deqjG7NE51/KeFhSHEjB1t6oSkrLVtutVeS30vmy95tSXWv
                  1YNe47GuJA60CVjAbtgPE1DdRwtHpkJhio0jqxOmRI6e2b8/shzdf6A1aLhxcjwb
                  VBHZoW9OB0LPPO7kcBaEW4yAgnxP6QS2xpL1DQIDAQABAoIBAGhQVAuyfbbWYnWJ
                  PFqTkjOVfzrQVSfI0D+W76zootZo6dL6gnK1b9R2vwtdmtZog0bc81l09KJ74d9/
                  eLaNGkpSxiACGpgvZoxDlsx5kdfX2LErBDlon0gTMLXJOnW1vpOatjftmT6qxh80
                  6Hzyf3K+AMntj/Kpyk16KRMYrrygVC48DUHpvEbnHi386TdEg0JUbbX0afEpSlBI
                  WyCuz/yIdPnyI8LTPPSlTn4OwiIk+HW01iMCVYLkOnVt0XZGBolJciwYDK4xpuxr
                  BILIEnHTth2yktNBiCfsjXUY8s9fiWyGhDm3qoa/7uH/Xq2SGrZPKylrRseqHV3d
                  fVDb9k0CgYEA9YMJOfqYGiO2nN8xhBLXNsmdVpzvrXbQLPm29AtA4jbEsCTFl8on
                  0v7qag7aFDyCqtrXOhFCxai3jvkzLBJ/p6nGdY/XFNY1Cb52+qgQojK/E5FgOdNf
                  l5YDP+bsfYVVKoXiiiYTiCsRwmUrUB6bRz7VnBmsiMtwb2slu88qfOcCgYEA3lcu
                  TV9rFDVeya1pity0q/iIET5cenVvao+kcmOOSuWV4Gq3vNY24DLwX0iS2JTPq3JO
                  Ou+dKXUn/dNhz9/bIFxfWg3h0YaHZCTc00ODQlG5A5fsdctW3sEDFFteIVUo/21S
                  DCS1P1+e/+ZsatJWU5v+ucPnS8uTe2+9NhU8q+sCgYAfCXK4Jqrl2w/x4vFijfMx
                  FOnUEkDmf/evR95OGcIZFu1kizGDj+Xa8aj2wWvmVQP7z3CYAaicTkjuRSin8Kq8
                  qmTRZd693pqT4cUuyOJZburi8WTlyofyJN/CS1IoSBvNJWHPLyMW+sLi/WEtXsEo
                  j5P3iPNb08QiAbyicn0fjwKBgQDdd/mnGGSQvJiuSw3WRAGzStw+UN/NGyzf+DTV
                  vFUARbAE2kgq0TXYHOVSA/hBw/kXzcQe8I6bvRcYvnWvmkuq8FgKW8mT62zxU8ai
                  qZ0VclHYQnxG2USunZNzs48PpMQxqbMQZYAkoBrAy8UyolFa9wfEAl9iIGXHjoXq
                  WT0WAQKBgAm0WDBL7bHJxcQZFBKjg7aVf9vK/7oo3dmaSjctJaEBeF9wN8b95ANX
                  N13kPT/lTNXo1jjL/r4oGe/FrqqiGcVlWVhbvidyHKpR2wgsmpv9n1DpYLK8B7T/
                  6Ji7+jmos9I0xd2Lqoj51yQFJg4tfotRTZACL/OmcWr4Y/7c2DB/
                  -----END RSA PRIVATE KEY-----`;
                  const session = `qZvlFGexVzaxeiXDC2wcPm8knx2GabzljU5SD2VAX+l8YfbLtok6J8qS9/pflT9hkVVdGBXw71sEAqb92nFHGDQ6flmP4vuYNEgMRFz4IOuY6fgoWm7lD2NtYPjX1Wcp8pNhegyLakYKChhzWLrAe6Rl4zTUdp1vhM93RdAxWZnI3H/iDGIuTh78hq7zqKi7x0akriCLiUvrN5FgvOSFQgOAS0fLZb4zTRaDyZ2PAU4Hmb8/ApRszrdZFagE0mcKYV1v4YBDVjaHtwkXrzbIxY+Jy69PcegDRCgpkO/EzEiAplwtzh2p/MwDwPnRbibRv/UwtHo/nloe7hrMEo6WNg==`;
                  RSA.decrypt(rsaEncryptedMessage, privateKey2).then(
                    decryptedMessage => {
                      setRSADecryptedMessage(decryptedMessage);
                      // console.log(`The original message was ${origianlMessage}`);
                    },
                  );
                }}
              />
              <Text style={styles.text}>{rsaDecryptedMessage}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 16,
    lineHeight: 21,
    color: 'black',
  },
});

export default App;
