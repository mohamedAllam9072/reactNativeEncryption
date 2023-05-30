/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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
          {/* <View style={{margin: 5}}>
            <Text style={styles.text}>{decryptedMessage}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text>{encryptedMessage}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text style={styles.text}>{pubKey}</Text>
          </View>
          <View style={{margin: 5}}>
            <Text>{privateKey}</Text>
          </View>
        </View> */}
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
});

export default App;
