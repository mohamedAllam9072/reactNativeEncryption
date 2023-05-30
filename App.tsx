/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{useState}from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [pubKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
       <View style={{margin: 5}}>
            <Button
              title="Generate Keys"
              onPress={() => {
                // RSA.generateKeys(2048) // set key size
                //   .then(keys => {
                //     setPublicKey(keys.public);
                //     setPrivateKey(keys.private);
                //     setDecryptedMessage('')
                //     setEncryptedMessage('');
                //   });
              }}
            />
          </View>

          <View style={{margin: 5}}>
            <Button
              title="Encrypt"
              onPress={() => {
                // let message = 'my secret message';
                // RSA.encrypt(message, pubKey).then(encodedMessage => {
                //   setEncryptedMessage(encodedMessage);
                //  //console.log(`the encoded message is ${encryptedMessage}`);
                // });
              }}
            />
          </View>
          <View style={{margin: 5}}>
            <Button
              title="Decrypt"
              onPress={() => {
                // RSA.decrypt(encryptedMessage, privateKey).then(
                //   decryptedMessage => {
                //    setDecryptedMessage(decryptedMessage)
                //    // console.log(`The original message was ${origianlMessage}`);
                //   },
                // );
              }}
            />
          </View>
          <View style={{margin: 5}}>
            <Text style={styles.text}>{"decryptedMessage "+decryptedMessage}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text>{"encryptedMessage "+encryptedMessage}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text style={styles.text}>{"pubKey "+pubKey}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text>{"privateKey "+privateKey}</Text>
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
    flex :1,
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 16,
    lineHeight: 21,
    color: 'black',
  },
});

export default App;
