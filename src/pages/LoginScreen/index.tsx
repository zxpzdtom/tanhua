import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { login, sendVerificationCode } from '../../../service';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = React.useState('15882320653');
  const [verificationCode, setVerificationCode] = React.useState('123456');
  const [buttonColor, setButtonColor] = React.useState('#007AFF');
  const [buttonText, setButtonText] = React.useState('获取验证码');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [countdown, setCountdown] = React.useState(60);

  React.useEffect(() => {
    let timer = null;
    if (countdown > 0 && buttonDisabled) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      setButtonText(`重新获取(${countdown})`);
    } else {
      setButtonText('重新获取');
      setButtonDisabled(false);
      setButtonColor('#007AFF');
      setCountdown(60);
      clearTimeout(timer)
    }
    return () => clearTimeout(timer);
  }, [countdown, buttonDisabled]);

  const handlePhoneNumberChange = React.useCallback((number: string) => {
    setPhoneNumber(number);
  }, []);

  const handleButtonPress = React.useCallback(async () => {
    try {
      if (phoneNumber.length !== 11) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: '提示',
          textBody: "请输入正确的手机号码",
        });
        return;
      }
      await sendVerificationCode(phoneNumber);
      setButtonDisabled(true);
      setButtonColor('#ccc');
      setButtonText(`重新获取(${countdown})`);
    } catch (error) {
      console.log('Failed to send verification code', error);
    }
  }, [phoneNumber, countdown]);


  const handleLoginPress = React.useCallback(async () => {
    if (!verificationCode) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '提示',
        textBody: "请输入验证码",
      });
      return;
    }
    const res = await login({
      phone: phoneNumber,
      verificationCode,
    });
    // 保存token
    await AsyncStorage.setItem('token', res.token);

    console.debug("%c Line:72 🍞 res.token", "color:#ed9ec7", res.token);
    if (res.isNew) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Main');
    }
  }, [navigation, phoneNumber, verificationCode]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Image style={{ width: "100%", height: 220 }} source={require("../../../assets/bg.png")} />
      <Text style={styles.title}>手机号登录注册</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.phoneNumberInput}
          placeholder="请输入手机号"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
        />
        <View style={styles.verificationCodeContainer}>
          <TextInput
            style={styles.verificationCodeInput}
            placeholder="请输入验证码"
            keyboardType="numeric"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPress={handleButtonPress}
            disabled={buttonDisabled}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, { marginTop: 30, width: '100%', borderRadius: 10, }]}
          onPress={handleLoginPress}
        >
          <Text style={styles.buttonText}>登 录</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    margin: 24,
  },
  inputContainer: {
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  phoneNumberInput: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 18,
  },
  verificationCodeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  verificationCodeInput: {
    height: 50,
    width: '50%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
  },
  button: {
    height: 50,
    borderRadius: 25,
    width: '40%',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default LoginScreen;
