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
                  const publicKey = `-----BEGIN RSA PUBLIC KEY-----
                MIIBCgKCAQEA9sAyyYRdXwZHHyKO689LxlWGrvdRkmcFkkQrony6CqVnVylxJr3X
                TBDuOLq5EpNr13ad/fMZpQjuIWJehPDYOqxSWOJQi9JygpyVF5Nv29F2BZu2eGih
                n863CAbpkWTz6ntNqzoTX7nwYDYQzjzdGl5/qF4ikxGLVfmZoAWn4mKD/heb6POT
                OXaOK/QBh455WdSZlZkMtDZJ1HEeV2dW8srw0h5F2g8GD5ZBLTH8wkWZZjKfU+Qt
                CArseBgAP6nSclIMM26iTpHQtHRvF3XTplTGC8VSEXx6QQebvmmDJbsl0AregN/Z
                /BN0QsrPH7J4ydsMbTdUUf/9wqoM4Lnx1QIDAQAB
                -----END RSA PUBLIC KEY-----`;

                  const publicKey2 = `-----BEGIN PUBLIC KEY-----
                  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy7no4fYr7EIf3HU4jBAw
                  S6S3KaRU0SP3PupT2Lo0QbTIjTVzl8N2+UkwmTOckW9aI2zerKZ40RjUFPehxPJe
                  i5v1GL9cERKY06xtV53VvCAKsPJKr4t6ql1WEB5hZY+iT/lG6Y2W16GGbygeONx2
                  NH5FU91W1p1Fc7a9Ot3kKlCxEAcGvynOykEgAmkxkpPfV58G2wahOG1L+yC9ScjE
                  7JEbtQh6RDc5pxmMc9V+TERQ9DL3PKQVONA+wpzqTKp2VqfgtkoiRQY2c42nLmpn
                  f4z9RYkTUvmZvEHmZPjRlSt/xTIfnzeKCkH0CKMY74MQVzgrR+nC8e5u4XaIcRPR
                  QQIDAQAB
                  -----END PUBLIC KEY-----`;
                  RSA.encrypt(message, publicKey2).then(function (
                    encodedMessage,
                  ) {
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
                  MIIEowIBAAKCAQEAy7no4fYr7EIf3HU4jBAwS6S3KaRU0SP3PupT2Lo0QbTIjTVz
                  l8N2+UkwmTOckW9aI2zerKZ40RjUFPehxPJei5v1GL9cERKY06xtV53VvCAKsPJK
                  r4t6ql1WEB5hZY+iT/lG6Y2W16GGbygeONx2NH5FU91W1p1Fc7a9Ot3kKlCxEAcG
                  vynOykEgAmkxkpPfV58G2wahOG1L+yC9ScjE7JEbtQh6RDc5pxmMc9V+TERQ9DL3
                  PKQVONA+wpzqTKp2VqfgtkoiRQY2c42nLmpnf4z9RYkTUvmZvEHmZPjRlSt/xTIf
                  nzeKCkH0CKMY74MQVzgrR+nC8e5u4XaIcRPRQQIDAQABAoIBAAkt+lFcL0R5AkiD
                  u6WMATEXXe1xayT1Uumx009brIkdZT//nZLECvNWmer9SVvAQbaA7FOpOJ5rWPsM
                  4WwnY500zMltre9TADHhfhfJk9zjMLgiYr0gMsnEZOFbDRZvb2fdGpXhfF+A9rbB
                  fwMe4/Cfk+4gdg47jeqV3Fbvsp05avUohUUXQ2DHdrls0T5HqvE6p9PGud+jg9F9
                  Gcmd4o9JmBKZfk3fA+kVpt2bj1T8xDgaMnjUo8x5pbQMLLJoZLLeKq7Hs+Pr5hpO
                  lgiFaJ1WRluMj3XJ2EoqqD8clsysNjpaHHKEC1tQI6jhIz8V7oiyPgQuDJp/qFHk
                  zcKj6jECgYEA2LQB5FzG0aG3+Z1FPzJCgYj71UmIasjbu23FCOYnAA07WpsXYBH2
                  LSYzbR5F+1pPhg0173LudEOHrofUv++mMMqqvsRtiPfuehclWZJC+ACZpBlBPhp1
                  vWvUz4h73YKZR3FHG9deDGO9wahut5BIh9l92JZfZIOVFA+zQ8AmUHUCgYEA8Kt5
                  hhz8vS0k5BXxscha+EzlKTVg8PbcQMuySRbwNaShqjKvvsq3fQU6ZA7ewLVv4GnF
                  EIqWoBTM7QQXE6+2adkRt6pk/j4dBZjx8JSpBw4ASrX0LL+6NZr8RJFXQBQLP/6V
                  jemd264D+3+awIo2UXlpo13gpUwVUVJ9KjYzZB0CgYEAzNX6I93+oRD4Uh5y4jWj
                  38WYJhgHtsh9y0ELSkoi+02GmTKYedsAk9TUL4S6KclH+jJqlRhShdt/WV5Tn8nr
                  kZtAomoSD7Ir3YQbbftvCfWnRRIKNaXVPWO8GR+t1cgpEvrkeFCvOY7eQzvuy9y6
                  co8HAb/CE8S9GeVtUdFDZjECgYB728PvAXwQ3+rcd26r0DEBGJHXY2FAocs4jZxz
                  gRqegNuye+N2jV1hOg+S7xQ0mSu6krSYjrp2KD5OvIwj1YpLbytvGoJfVhgZiVz6
                  M4fJ2arMyFehsAplDB5IK4R7tdUUWjEdl91l8WibRlCeRoMt6w4yxV2XtFBESe+g
                  icRpAQKBgEZkeqgaXlpCMlcbziPVOVhrbiq1bRJcelIuYRZYTpLO+EKOARtZNYIq
                  7uybkcA61R6p47ZBakDr6hCAnLn8urxdakVONOqe98IPy5O5qPJkmUFiGhuEuyWX
                  YFXZa2NmeTSPzHhh6o+mbApFpJRi8SHGwi1uTxYhJufGDVuvwzaV
                  -----END RSA PRIVATE KEY-----`;
                  const session = `PgCtHQW8W2OwRKzX+nSWk+vFd+Qtr8tS6SqGqnxOCKQ45h5TLAgfdOkFPbYVw9iOvqYJyVoetDVd8StC/U6T6B3nTNQug+fPf2Rx/orznjccyyR0a0IF+D6TnxizoUFuw4hR931BxzXwEqPDuhb8qx14+Bhub4vszjZ21TzHWCkIArtogW5qD94efYKc7HMYDkNdz4uQyyLBJbUeKG1yAwYvaw9o59QS0AK92qlL/b/0oKe9gSy9wjEk/gmCWF0F1oaeYA2ah8bj6DqSlcHB22aEps9zPYj2TDBegMxd1v/LYZA8Xch9RJ3144OpCFOBxYyU4OtSPP2W31gIiNxzfQ==`;
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
