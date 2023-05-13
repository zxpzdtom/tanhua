import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Icon, Text, Button } from 'react-native-elements';

const MyScreen = () => {
  const navigation = useNavigation<any>();
  const handleEditProfile = React.useCallback(() => {
    navigation.navigate('EditProfile');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.background} />
        <Avatar
          size="large"
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }}
          containerStyle={styles.avatar}
        />
        <View style={styles.info}>
          <Text h4>自信膨胀的汤姆</Text>
          <View style={styles.row}>
            <Icon name="gender-male" type="material-community" size={16} />
            <Text style={styles.label}>男</Text>
            <Icon name="cake" type="material-community" size={16} />
            <Text style={styles.label}>28</Text>
            <Icon name="map-marker" type="font-awesome" size={16} />
            <Text style={styles.label}>上海</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>100</Text>
          <Text style={styles.statLabel}>我的关注</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>200</Text>
          <Text style={styles.statLabel}>喜欢</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>300</Text>
          <Text style={styles.statLabel}>粉丝</Text>
        </View>
      </View>
      <View style={styles.list}>
        <TouchableOpacity style={styles.item} onPress={handleEditProfile}>
          <Icon name="account-outline" type="material-community" size={24} />
          <Text style={styles.itemLabel}>个人信息</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="newspaper-variant-outline" type="material-community" size={24} />
          <Text style={styles.itemLabel}>我的动态</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="eye-outline" type="material-community" size={24} />
          <Text style={styles.itemLabel}>谁看过我</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon name="headset" type="material-community" size={24} />
          <Text style={styles.itemLabel}>客服在线</Text>
        </TouchableOpacity>
        <Button title="退出登录" onPress={() => {
          navigation.navigate('Login');
        }} buttonStyle={styles.logoutButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    height: 200,
    backgroundColor: '#03A9F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  info: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 5,
    marginRight: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#999',
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    paddingHorizontal: 20,
  },
  itemLabel: {
    marginLeft: 20,
    fontSize: 16,
  },
  logoutButton: {
    margin: 30,
    backgroundColor: '#F44336',
  },
});

export default MyScreen;
