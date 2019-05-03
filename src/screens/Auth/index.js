import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { startMainTabs } from '../../navigation';
import { authRequest } from '../../store/actions';
import validate from '../../utils/validators';
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
        ? 'portrait' : 'landscape',
      authMode: 'login',
      controls: {
        email: {
          value: '',
          valid: false,
          rules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: '',
          valid: false,
          rules: {
            minLength: 6,
            noWhiteSpace: true
          },
          touched: false
        },
        confirmPass: {
          value: '',
          valid: false,
          rules: {
            equalTo: 'password'
          },
          touched: false
        }
      }
    };
    this.switchAuthModeHandler = this.switchAuthModeHandler.bind(this);
    this.updateStyles = this.updateStyles.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  switchAuthModeHandler () {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      };
    });
  }

  updateStyles (dims) {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  }

  loginHandler () {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  }

  updateInputValue (key, value) {
    let checkValue;
    if (this.state.controls[key].rules.equalTo) {
      const equalTo = this.state.controls[key].rules.equalTo;
      checkValue = this.state.controls[equalTo].value;
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          // If user updates `password`, revalidate `confirmPass`
          confirmPass: {
            ...prevState.controls.confirmPass,
            valid: key === 'password' ? validate(
              prevState.controls.confirmPass.value,
              prevState.controls.confirmPass.rules,
              value
            ) : prevState.controls.confirmPass.valid
          },
          [key]: {
            ...prevState.controls[key],
            valid: validate(
              value,
              prevState.controls[key].rules,
              checkValue
            ),
            touched: true,
            value
          }
        }
      };
    });
  }

  render () {
    let headingText;
    let confirmPassControl = null;

    if (this.state.authMode === 'signup') {
      confirmPassControl = (
        <View style={styles[`${this.state.viewMode}PasswordWrapper`]}>
          <DefaultInput
            style={styles.input}
            placeholder='Confirm Password'
            value={this.state.controls.confirmPass.value}
            onChangeText={(val) => this.updateInputValue('confirmPass', val)}
            valid={this.state.controls.confirmPass.valid}
            touched={this.state.controls.confirmPass.touched}
            secureTextEntry
          />
        </View>
      );
    }

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>
            Please {this.state.authMode === 'login' ? 'Login' : 'Sign Up'}
          </HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
              {headingText}
              <ButtonWithBackground
                color='#2196F3'
                onPress={this.switchAuthModeHandler}
              >
                Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
              </ButtonWithBackground>
              <View style={styles.inputContainer}>
                <DefaultInput
                  style={styles.input}
                  placeholder='Your E-mail Address'
                  value={this.state.controls.email.value}
                  onChangeText={(val) => this.updateInputValue('email', val)}
                  valid={this.state.controls.email.valid}
                  touched={this.state.controls.email.touched}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                />
                <View style={styles[`${this.state.viewMode}PasswordContainer`]}>
                  <View
                    style={
                      this.state.viewMode === 'portrait' ||
                        this.state.authMode === 'login'
                        ? styles.portraitPasswordWrapper
                        : styles.landscapePasswordWrapper
                    }
                  >
                    <DefaultInput
                      style={styles.input}
                      placeholder='Password'
                      value={this.state.controls.password.value}
                      onChangeText={val => this.updateInputValue('password', val)}
                      valid={this.state.controls.password.valid}
                      touched={this.state.controls.password.touched}
                      secureTextEntry
                    />
                  </View>
                  {confirmPassControl}
                </View>
              </View>
              <ButtonWithBackground
                color='#2196F3'
                onPress={this.loginHandler}
                disabled={
                  !this.state.controls.email.valid ||
                  !this.state.controls.password.valid ||
                  (!this.state.controls.confirmPass.valid &&
                    this.state.authMode === 'signup')
                }
              >
                Submit
              </ButtonWithBackground>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
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

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (authData) => dispatch(authRequest(authData))
  };
};

export default connect(null, mapDispatchToProps)(AuthScreen);
