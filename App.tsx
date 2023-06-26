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
                  let msg3 = 'Ali Maâloul Tunisian football player';
                  const publicKey = `-----BEGIN RSA PUBLIC KEY-----
                  MIIBCgKCAQEA1marKp4ZDKpNlxrpDesix2LFM0AA0evzxMWt/O4YwVB2BePySoAm
                  uGrM7w78+dMsYMc7epP/IR0I+zIU2epC0tathBVRtTLnu83a8zrq1ONlB4/pOj3N
                  0vmgYQ4Sb03KZw5Kf+W8TBloVIuaMXX+YOCrlAOwFEdaWvCl161sq7/TAjlIAeZj
                  QnCBWJRVciZJCL/VnbY7QgFk0IKwJzUpZz0Wa545S9CGTXiobuDPRC36Rhi6LgED
                  M14Xkn1VliR9S5jlbLH2PuqkCNK5iab3vf5U8s7X1xcMOl+/w6z3IIFRXqtK00Dc
                  ImpHeTPnn2u6ekYuPGw/i69B6wQ4LZ6PswIDAQAB
                  -----END RSA PUBLIC KEY-----`;

                  const publicKey2 = `-----BEGIN RSA PUBLIC KEY-----
                  MIIBCgKCAQEA33f7RgfaVvAhb40OSlaYznSVhgm8BmpIPwKAIIFVkBXj4Q8HIatz
                  0k04C4i4A9Y+8H0mh+RfnOv6umZ3pCw6oCG5F6ol6p8aVNWz2nTZCBIzOWWslJjg
                  5TN4IzPP76nbiBxSDp9xhHgwRrxA6JzIhTMF1Z+gbAJq9+m1kJ6CAlFYA8KJxTXD
                  /c+69eH1UMmRwToPfkz5iTdJ9uBcfGTSZKcJKkKZN4MZZRg5EPqIoEr0NDJsH5yC
                  iSafFHT2gwUYpuwVe5GQVuOTfMg8RYUsZbmnDOs4j3penlkjUNpY4CHbcjGNjt5W
                  Hc0ojk+/yJiVKSc5wc2nNR4waeWVOaYquQIDAQAB
                  -----END RSA PUBLIC KEY-----`;
                  RSA.encrypt(msg3, publicKey).then(function (encodedMessage) {
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
                  MIIEpQIBAAKCAQEA33f7RgfaVvAhb40OSlaYznSVhgm8BmpIPwKAIIFVkBXj4Q8H
                  Iatz0k04C4i4A9Y+8H0mh+RfnOv6umZ3pCw6oCG5F6ol6p8aVNWz2nTZCBIzOWWs
                  lJjg5TN4IzPP76nbiBxSDp9xhHgwRrxA6JzIhTMF1Z+gbAJq9+m1kJ6CAlFYA8KJ
                  xTXD/c+69eH1UMmRwToPfkz5iTdJ9uBcfGTSZKcJKkKZN4MZZRg5EPqIoEr0NDJs
                  H5yCiSafFHT2gwUYpuwVe5GQVuOTfMg8RYUsZbmnDOs4j3penlkjUNpY4CHbcjGN
                  jt5WHc0ojk+/yJiVKSc5wc2nNR4waeWVOaYquQIDAQABAoIBAAmrd5Es1RD6wFmj
                  Pw1usJtLbm5vxKX66qAmX6y4Z/9NgTA7jh2R/ZeprX2LR5or5sqRgc2yz0PbLrzq
                  4u20178W4ntgipY71v/5hNg0wvDvV63ZxVVjRaUJXH8adnqajSQ3RII7OkZnDIC9
                  E+p04VTpM60OJJsT4jTS1T9aKopGzdOUu/8YYUvlmLqn9Rv7+Samw28oCYFuRU//
                  rcqjaMrHbQph0kmDLYF/FXpYq0BIBaVUkK5A948dCtX83lawc7SeFVmSY6kvPFpa
                  1IvQ7ZY7upWay9wySOb6nJprWnWz9m/D7G2849A73g60nMRgdab8NkaSxRBKmT6R
                  XssIUxECgYEA/1pVpRlyztV9sUV5zNLB6tQB+nCOUjPutnrPv8IztbxKTQDssDKg
                  34jxbBcg8I2TXcBuUuCoSL+7E86uqwt7BF6fRrUSbnPD+yaBMgQVSCRcuKQXnz4e
                  QDP2U+uV6G3U11ZePxg7VcmBHjrMsjDP9hOHCzhYPtoY7Na30MvjnskCgYEA4Aj2
                  Iiw9sTEKlmZ39FIDzaRdtOYSoxffpZf7dl3wNnJ5B2ukOnthTgI8/MI6rDgzUsL1
                  6p09s5FUWUU8sNwWXxEEJyvlQ++Fx5BLZ5VnUxVcXGjcIf1+0cjjX2BlhgcWWuVY
                  /jg64/kECI8wXc/SdVx6mAQ8VQVCQxMeHh9qdHECgYEAzLxfIurOlGu0RagQylrJ
                  REEL/QK1+c7NvN2nKHbLAxGe+TKek39kYRXpi+LXdEfvOiIJ0sVx6DJiCrWScm3Y
                  Cl7bkdOonYqQPhRXTgTcE2WkOh7HGdSyaIPBIvQm058MIkOLeUcye8v+jIBUkyJz
                  +zcY9bQNfQddKLfX1b9EF5ECgYEAoVnS6wmx5MvNNETYX74xvwmB86dABPZMvJaZ
                  JMbDGnOXdyCvRu9VRTmXcvLwDtjrHdAMDMzyg0FH3oNfEoFwG0fGFfAnTqZTU0c5
                  B4EyyUO5IVTkNha8H5rvJuHmPIEeOJi1X2JgB5BwtzlpPCdRC/Vu1c03JoSDFIvQ
                  RSGbKgECgYEA4P+92xp7cXoClUlvIK6o8CRO+kEBp7se7YkYGFGQO5FWM3bIoM2k
                  CLZpa+o9OvgtaCDmMwwcEoYp+y4Cmm01VQbJKigmCPkt/NQxCiKDqv1FZwAIlk5B
                  7UuFwxsnHLJmENhQtQkDMw4QqHkYlwkBFuhTWIOUlLGoko2u0XT3Y1o=
                  -----END RSA PRIVATE KEY-----`;
                  const session = `qHBkWlVPHU+1C1XJgffKq38kMcga8BK3Ii2BYUKtHMqFPK3QhPtGwr2KtHn7TGFsZIzsU0vgyk7hQNxw+d4Bd1d5HCg4/EPu8La+BB/JEc3LttKk7Y81kr4Wt1Q3eUkgiK7OwuzDTzC7Mrm9HjlPeUgSKgXZQVumvTpNtHG04CeFlKKKYLiXeHBPAtddi/BBfgkVKbHdqujDYIN/Z8xoQy5h4QkHCrMnzUyddMw6RawB38pvwma7/iudh3HBlfkFniCXX3zuLSQHwXOjsEkVESbeX2lLYGnI5N71ZwZKtAHyxrVE4uGWTv8BZ5Ic6mp8e1JUZXy1mFq5N9EWJRT2Mg==`;
                  RSA.decrypt(session, privateKey2).then(decryptedMessage => {
                    setRSADecryptedMessage(decryptedMessage);
                    // console.log(`The original message was ${origianlMessage}`);
                  });
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
