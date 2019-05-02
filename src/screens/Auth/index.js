import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { startMainTabs } from '../../navigation';
import MainText from '../../components/UI/MainText';
import HeadingText from '../../components/UI/HeadingText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground';
import DefaultInput from '../../components/UI/DefaultInput';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      viewMode: Dimensions.get('window').height > 500
        ? 'portrait' : 'landscape'
    };
    this.updateStyles = this.updateStyles.bind(this);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles (dims) {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  }

  loginHandler () {
    startMainTabs();
  }

  render () {
    let headingText;
    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground
            color='#2196F3'
            onPress={() => alert('Hello')}
          >
            Switch to Login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput style={styles.input} placeholder='Your E-mail Address' />
            <View style={styles[`${this.state.viewMode}PasswordContainer`]}>
              <View style={styles[`${this.state.viewMode}PasswordWrapper`]}>
                <DefaultInput style={styles.input} placeholder='Password' />
              </View>
              <View style={styles[`${this.state.viewMode}PasswordWrapper`]}>
                <DefaultInput style={styles.input} placeholder='Confirm Password' />
              </View>
            </View>
          </View>
          <ButtonWithBackground
            color='#2196F3'
            onPress={this.loginHandler}
          >
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
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
});

export default AuthScreen;
