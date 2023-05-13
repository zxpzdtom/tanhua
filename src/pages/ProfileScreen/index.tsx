import React from 'react';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import CityPicker from '../../components/CityPicker';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [gender, setGender] = React.useState('male');
  const [name, setName] = React.useState('');
  const [birthday, setBirthday] = React.useState(new Date());
  const [city, setCity] = React.useState();
  const [pickerVisible, setPickerVisible] = React.useState(false);

  const handleOpenPicker = () => {
    setPickerVisible(true);
  };

  const handleClosePicker = () => {
    setPickerVisible(false);
  };

  const handleCityChange = (val) => {
    setCity(val);
    setPickerVisible(false);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>填写资料</Text>
        <Text style={styles.subTitle}>提升我的魅力</Text>
      </View>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => setGender('male')}>
          <Avatar
            rounded
            size="large"
            source={require('../../../assets/male.png')}
            overlayContainerStyle={{ backgroundColor: gender === 'male' ? 'blue' : 'gray' }}
          />
          <ListItem.Content>
            <ListItem.Title style={[styles.avatarTitle, { color: gender === 'male' ? 'blue' : 'gray' }]}>男生</ListItem.Title>
          </ListItem.Content>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('female')}>
          <Avatar
            rounded
            size="large"
            source={require('../../../assets/female.png')}
            overlayContainerStyle={{ backgroundColor: gender === 'female' ? 'pink' : 'gray' }}
          />
          <ListItem.Content>
            <ListItem.Title style={[styles.avatarTitle, { color: gender === 'female' ? 'pink' : 'gray' }]}>女生</ListItem.Title>
          </ListItem.Content>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>昵称</Text>
        <ListItem>
          <ListItem.Content>
            <View style={styles.inputWrapper}>
              <Icon name='user' size={20} color='#007AFF' style={styles.inputIcon} />
              <ListItem.Input
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder="请输入昵称"
                style={styles.input}
              />
            </View>
          </ListItem.Content>
        </ListItem>
        <Text style={styles.label}>生日</Text>
        <TouchableOpacity onPress={() => {
          DateTimePickerAndroid.open({
            value: birthday,
            onChange: (event, date) => setBirthday(date),
            mode: 'date',
          });
        }}>
          <ListItem>
            <ListItem.Content>
              <View style={styles.inputWrapper}>
                <Icon name='calendar' size={20} color='#007AFF' style={styles.inputIcon} />
                <ListItem.Input
                  value={dayjs(birthday).format('YYYY-MM-DD')}
                  placeholder="请选择生日"
                  editable={false}
                  style={styles.input}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
        <Text style={styles.label}>城市</Text>
        <TouchableOpacity onPress={handleOpenPicker}>
          <ListItem>
            <ListItem.Content>
              <View style={styles.inputWrapper}>
                <Icon name='map-marker' size={20} color='#007AFF' style={styles.inputIcon} />
                <ListItem.Input
                  value={city}
                  placeholder="请选择城市"
                  editable={false}
                  style={styles.input}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={() => {
        navigation.navigate('Main');
      }}>
        <View style={[styles.submitButtonContainer, { width: '100%' }]}>
          <Text style={styles.submitButtonText}>提 交</Text>
        </View>
      </TouchableOpacity>
      <CityPicker visible={pickerVisible} onClose={handleClosePicker} onChange={handleCityChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 24,
  },
  subTitle: {
    fontSize: 20,
    color: '#007AFF',
    marginTop: 8,
    marginBottom: 24,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  avatarTitle: {
    marginTop: 30,
    height: 20,
    width: '100%',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    height: 60,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'center',
  },
  submitButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    width: '100%',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileScreen;