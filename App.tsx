/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * RSA ===>>>>==>>>  https://github.com/amitaymolko/react-native-rsa-native
 * AES try1 ====>>>===>>> https://github.com/tectiv3/react-native-aes
 * AES try2 ===>>>====>>> https://morioh.com/p/f0328bbf0ea4
 *
 * @format
 */

import React, {useState} from 'react';
import {RSA} from 'react-native-rsa-native';
import {NativeModules, Platform} from 'react-native';
import Aes from 'react-native-aes-crypto';
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
  const [pubKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const generateKey =  (password: string, salt: string, cost: number, length: number) =>
    Aes.pbkdf2(password, salt, cost, length);
  const encryptData = (text: string, key: any) => {
    return Aes.randomKey(16).then(iv => {
      return Aes.encrypt(text, key, iv, 'aes-256-cbc').then(cipher => ({
        cipher,
        iv,
      }));
    });
  };
  const decryptData = (encryptedData: any, key: any) =>
    Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, 'aes-256-cbc');
  try {
    generateKey('Arnold', 'salt', 5000, 256).then(key => {
      console.log('Key:', key);
      encryptData('These violent delights have violent ends', key)
        .then(({cipher, iv}) => {
          console.log('Encrypted:', cipher);

          decryptData({cipher, iv}, key)
            .then(text => {
              console.log('Decrypted:', text);
            })
            .catch(error => {
              console.log(error);
            });

          Aes.hmac256(cipher, key).then(hash => {
            console.log('HMAC', hash);
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  } catch (e) {
    console.error(e);
  }
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
              title="Generate Keys"
              onPress={() => {
                RSA.generateKeys(2048) // set key size
                  .then(keys => {
                    setPublicKey(keys.public);
                    setPrivateKey(keys.private);
                    setDecryptedMessage('');
                    setEncryptedMessage('');
                  });
              }}
            />
          </View>

          <View style={{margin: 5}}>
            <Button
              title="Encrypt"
              onPress={() => {
                let message = 'my secret message';
                RSA.encrypt(message, pubKey).then(encodedMessage => {
                  setEncryptedMessage(encodedMessage);
                  //console.log(`the encoded message is ${encryptedMessage}`);
                });
              }}
            />
          </View>
          <View style={{margin: 5}}>
            <Button
              title="Decrypt"
              onPress={() => {
                RSA.decrypt(encryptedMessage, privateKey).then(
                  decryptedMessage => {
                    setDecryptedMessage(decryptedMessage);
                    // console.log(`The original message was ${origianlMessage}`);
                  },
                );
              }}
            />
          </View>
          <View style={{margin: 5}}>
            <Text style={styles.text}>
              {'decryptedMessage ' + decryptedMessage}
            </Text>
          </View>
          <View style={{margin: 5}}>
            <Text>{'encryptedMessage ' + encryptedMessage}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text style={styles.text}>{'pubKey ' + pubKey}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text>{'privateKey ' + privateKey}</Text>
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
