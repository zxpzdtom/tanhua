import React from 'react';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { Header, Avatar, Icon, ListItem, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ route, navigation }) => {
  const [profileData, setProfileData] = React.useState({
    avatar: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`,
    nickname: '自信膨胀的汤姆',
    birthday: '2000-01-01',
    gender: '男',
    city: '上海',
    education: '本科',
    monthlyIncome: '100W',
    industry: '互联网',
    maritalStatus: '未婚'
  });

  const selectAvatar = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      Alert.alert(
        '需要相机和相册权限',
        '请在应用设置中打开相机和相册权限，以便选择和上传头像。',
        [
          { text: '取消', style: 'cancel' },
          { text: '前往设置', onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }

    // 打开相册
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 只选择图片
      allowsEditing: true, // 允许编辑
      aspect: [1, 1], // 裁剪比例为4:3
      quality: 0.6, // 图片质量为最高
    });

    const avatar = result.assets[0].uri;
    setProfileData(prevProfileData => ({ ...prevProfileData, avatar }));
    // 上传头像到服务器
  };


  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: '编辑个人资料', style: { color: '#fff', fontSize: 18 } }}
        leftComponent={<Icon name='chevron-left' type='feather' color='#fff' onPress={navigation.goBack} />}
        containerStyle={{ backgroundColor: '#007AFF' }}
      />
      <ScrollView>
        <ListItem bottomDivider onPress={selectAvatar}>
          <ListItem.Content>
            <ListItem.Title>头像</ListItem.Title>
          </ListItem.Content>
          <Avatar rounded source={{ uri: profileData.avatar }} />
          <Icon name='chevron-right' type='feather' color='#ccc' />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>昵称</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.nickname}</Text>
          <Icon name='chevron-right' type='feather' color='#ccc' />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>生日</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.birthday}</Text>
          <Icon name='chevron-right' type='feather' color='#ccc' />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>性别</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.gender}</Text>
          <Icon name='chevron-right' type='feather' color='#ccc' />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>城市</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.city}</Text>
          <Icon name='chevron-right' type='feather' color='#ccc' />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>学历</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.education}</Text>
          <Icon name='chevron-right' type='feather' color='#ccc' />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>月收入</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.monthlyIncome}</Text>
          <Icon name='chevron-right' type='feather' color='#ccc' />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>行业</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.industry}</Text>
          <Icon name='chevron-right' type='feather' color='#ccc' />
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>婚姻状态</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.maritalStatus}</Text>
          <Icon name='chevron-right' type='feather' color='#ccc' />
        </ListItem>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  overlay: {
    padding: 16,
  },
  overlayButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  loadingOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
