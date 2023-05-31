/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * RSA ===>>>>==>>>  https://github.com/amitaymolko/react-native-rsa-native
 * AES try1 ====>>>===>>> https://github.com/tectiv3/react-native-aes
 * AES try2 ===>>>====>>> https://morioh.com/p/f0328bbf0ea4
 * AES try3 ====>>>===>>> https://www.npmjs.com/package/crypto-js
 *
 * @format
 */

import React, {useState} from 'react';
import {RSA} from 'react-native-rsa-native';
import Aes from 'react-native-aes-crypto';
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
                    const IV = await Aes.randomKey(16);
                    aes_generateKey('Arnold', 'salt', 5000, 256).then(key => {
                      setAesKey(key);
                    });
                    setAes_iv(IV);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
              <Text style={styles.text}>{aesKey}</Text>
              <Text style={styles.text}>{}</Text>
              <Text style={styles.text}>{aes_iv}</Text>
              <Button
                title="AES Encrypt"
                onPress={() => {
                  try {
                    aes_encryptData('my massage', aesKey, aes_iv)
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
                  aes_decryptData(aesEncrypted, aesKey, aes_iv)
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
                  const publicKey = `-----BEGIN RSA PUBLIC KEY-----
                MIIBCgKCAQEA9sAyyYRdXwZHHyKO689LxlWGrvdRkmcFkkQrony6CqVnVylxJr3X
                TBDuOLq5EpNr13ad/fMZpQjuIWJehPDYOqxSWOJQi9JygpyVF5Nv29F2BZu2eGih
                n863CAbpkWTz6ntNqzoTX7nwYDYQzjzdGl5/qF4ikxGLVfmZoAWn4mKD/heb6POT
                OXaOK/QBh455WdSZlZkMtDZJ1HEeV2dW8srw0h5F2g8GD5ZBLTH8wkWZZjKfU+Qt
                CArseBgAP6nSclIMM26iTpHQtHRvF3XTplTGC8VSEXx6QQebvmmDJbsl0AregN/Z
                /BN0QsrPH7J4ydsMbTdUUf/9wqoM4Lnx1QIDAQAB
                -----END RSA PUBLIC KEY-----`;
                  RSA.encrypt(message, rsaPublicKey).then(encodedMessage => {
                    console.log('RSA Encrypt}}}}}}} ', encodedMessage);
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
                  RSA.decrypt(rsaEncryptedMessage, rsaPrivateKey).then(
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
