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
                i5v1GL9cERKY06xtV53VvCAKsPJKr4t6ql1WEB5hZY+it/lG6Y2W16GGbygeONx2
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
                  const privateKey2 = `-----BEGIN PRIVATE KEY-----
                  MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDLuejh9ivsQh/c
                  dTiMEDBLpLcppFTRI/c+6lPYujRBtMiNNXOXw3b5STCZM5yRb1ojbN6spnjRGNQU
                  96HE8l6Lm/UYv1wREpjTrG1XndW8IAqw8kqvi3qqXVYQHmFlj6JP+UbpjZbXoYZv
                  KB443HY0fkVT3VbWnUVztr063eQqULEQBwa/Kc7KQSACaTGSk99XnwbbBqE4bUv7
                  IL1JyMTskRu1CHpENzmnGYxz1X5MRFD0Mvc8pBU40D7CnOpMqnZWp+C2SiJFBjZz
                  jacuamd/jP1FiRNS+Zm8QeZk+NGVK3/FMh+fN4oKQfQIoxjvgxBXOCtH6cLx7m7h
                  dohxE9FBAgMBAAECggEACS36UVwvRHkCSIO7pYwBMRdd7XFrJPVS6bHTT1usiR1l
                  P/+dksQK81aZ6v1JW8BBtoDsU6k4nmtY+wzhbCdjnTTMyW2t71MAMeF+F8mT3OMw
                  uCJivSAyycRk4VsNFm9vZ90aleF8X4D2tsF/Ax7j8J+T7iB2DjuN6pXcVu+ynTlq
                  9SiFRRdDYMd2uWzRPkeq8Tqn08a536OD0X0ZyZ3ij0mYEpl+Td8D6RWm3ZuPVPzE
                  OBoyeNSjzHmltAwssmhkst4qrsez4+vmGk6WCIVonVZGW4yPdcnYSiqoPxyWzKw2
                  OloccoQLW1AjqOEjPxXuiLI+BC4Mmn+oUeTNwqPqMQKBgQDYtAHkXMbRobf5nUU/
                  MkKBiPvVSYhqyNu7bcUI5icADTtamxdgEfYtJjNtHkX7Wk+GDTXvcu50Q4euh9S/
                  76Ywyqq+xG2I9+56FyVZkkL4AJmkGUE+GnW9a9TPiHvdgplHcUcb114MY73BqG63
                  kEiH2X3Yll9kg5UUD7NDwCZQdQKBgQDwq3mGHPy9LSTkFfGxyFr4TOUpNWDw9txA
                  y7JJFvA1pKGqMq++yrd9BTpkDt7AtW/gacUQipagFMztBBcTr7Zp2RG3qmT+Ph0F
                  mPHwlKkHDgBKtfQsv7o1mvxEkVdAFAs//pWN6Z3brgP7f5rAijZReWmjXeClTBVR
                  Un0qNjNkHQKBgQDM1foj3f6hEPhSHnLiNaPfxZgmGAe2yH3LQQtKSiL7TYaZMph5
                  2wCT1NQvhLopyUf6MmqVGFKF239ZXlOfyeuRm0CiahIPsivdhBtt+28J9adFEgo1
                  pdU9Y7wZH63VyCkS+uR4UK85jt5DO+7L3LpyjwcBv8ITxL0Z5W1R0UNmMQKBgHvb
                  w+8BfBDf6tx3bqvQMQEYkddjYUChyziNnHOBGp6A27J743aNXWE6D5LvFDSZK7qS
                  tJiOunYoPk68jCPViktvK28agl9WGBmJXPozh8nZqszIV6GwCmUMHkgrhHu11RRa
                  MR2X3WXxaJtGUJ5Ggy3rDjLFXZe0UERJ76CJxGkBAoGARmR6qBpeWkIyVxvOI9U5
                  WGtuKrVtElx6Ui5hFlhOks74Qo4BG1k1giru7JuRwDrVHqnjtkFqQOvqEICcufy6
                  vF1qRU406p73wg/Lk7mo8mSZQWIaG4S7JZdgVdlrY2Z5NI/MeGHqj6ZsCkWklGLx
                  IcbCLW5PFiEm58YNW6/DNpU=
                  -----END PRIVATE KEY-----`;
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
