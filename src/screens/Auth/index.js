import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { startMainTabs } from '../../navigation';
import MainText from '../../components/UI/MainText';
import HeadingText from '../../components/UI/HeadingText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';
import DefaultInput from '../../components/UI/DefaultInput';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
  loginHandler () {
    startMainTabs();
  }

  render () {
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <MainText>
            <HeadingText>Please Log In</HeadingText>
          </MainText>
          <ButtonWithBackground
            color='#29AAF4'
            onPress={() => alert('Hello')}
          >
            Switch to Login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput style={styles.input} placeholder='Your E-mail Address' />
            <DefaultInput style={styles.input} placeholder='Password' />
            <DefaultInput style={styles.input} placeholder='Confirm Password' />
          </View>
          <ButtonWithBackground color='#29AAF4' onPress={() => this.loginHandler()}>
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: '100%'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#EEE',
    borderColor: '#BBB'
  }
});

export default AuthScreen;
