import React from "react";
import dayjs from "dayjs";
import Constants from 'expo-constants';
import * as ImagePicker from "expo-image-picker";
import { View, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback, TextInput } from "react-native";
import { Header, Avatar, Icon, ListItem, Text } from "@rneui/themed";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Select from "../../components/Select";
import CityPicker from "../../components/CityPicker";

const EditProfileScreen = ({ route, navigation }) => {
  const [profileData, setProfileData] = React.useState({
    avatar: `https://picsum.photos/200?random=${Math.floor(
      Math.random() * 1000
    )}`,
    nickname: "自信膨胀的汤姆",
    birthday: new Date("2000-01-01"),
    gender: "男",
    city: "上海",
    education: "本科",
    monthlyIncome: "20K-50K",
    industry: "互联网",
    maritalStatus: "未婚",
  });

  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(null);
  const [nickname, setNickname] = React.useState(profileData.nickname);

  const handleChange = (key, value) => {
    setProfileData((prevProfileData) => ({ ...prevProfileData, [key]: value }));
    setBottomSheetVisible(null);
  };

  const onClose = () => {
    setBottomSheetVisible(null);
  }

  const selectAvatar = async () => {
    // 打开相册
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (result.canceled) return;
    const avatar = result.assets[0].uri;
    setProfileData((prevProfileData) => ({ ...prevProfileData, avatar }));
    // 上传头像到服务器
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "编辑个人资料",
          style: { color: "#fff", fontSize: 18 },
        }}
        leftComponent={
          <Icon
            name="chevron-left"
            type="feather"
            color="#fff"
            onPress={navigation.goBack}
          />
        }
        containerStyle={{ backgroundColor: "#007AFF" }}
      />
      <ScrollView>
        <ListItem bottomDivider onPress={selectAvatar}>
          <ListItem.Content>
            <ListItem.Title>头像</ListItem.Title>
          </ListItem.Content>
          <Avatar rounded source={{ uri: profileData.avatar }} />
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem bottomDivider onPress={() => setBottomSheetVisible("nickname")}>
          <ListItem.Content>
            <ListItem.Title>昵称</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.nickname}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem
          bottomDivider
          onPress={() => {
            DateTimePickerAndroid.open({
              value: new Date(profileData.birthday),
              onChange: (event, date) => handleChange('birthday', date),
              mode: "date",
            });
          }}
        >
          <ListItem.Content>
            <ListItem.Title>生日</ListItem.Title>
          </ListItem.Content>
          <Text>{dayjs(profileData.birthday).format('YYYY-MM-DD')}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem bottomDivider onPress={() => setBottomSheetVisible("gender")}>
          <ListItem.Content>
            <ListItem.Title>性别</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.gender}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem bottomDivider onPress={() => setBottomSheetVisible("city")}>
          <ListItem.Content>
            <ListItem.Title>城市</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.city}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem
          bottomDivider
          onPress={() => setBottomSheetVisible("education")}
        >
          <ListItem.Content>
            <ListItem.Title>学历</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.education}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem bottomDivider onPress={() => setBottomSheetVisible("monthlyIncome")}>
          <ListItem.Content>
            <ListItem.Title>月收入</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.monthlyIncome}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem
          bottomDivider
          onPress={() => setBottomSheetVisible("industry")}
        >
          <ListItem.Content>
            <ListItem.Title>行业</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.industry}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem
          bottomDivider
          onPress={() => setBottomSheetVisible("maritalStatus")}
        >
          <ListItem.Content>
            <ListItem.Title>婚姻状态</ListItem.Title>
          </ListItem.Content>
          <Text>{profileData.maritalStatus}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        {bottomSheetVisible === "nickname" && (
        <Modal animationType="slide" visible>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <TouchableWithoutFeedback onPress={onClose}>
                <Text style={styles.bottomSheetCancel}>取消</Text>
              </TouchableWithoutFeedback>
              <Text style={styles.bottomSheetTitle}>修改昵称</Text>
              <TouchableWithoutFeedback
                onPress={() => handleChange("nickname", nickname)}
              >
                <Text style={styles.bottomSheetDone}>完成</Text>
              </TouchableWithoutFeedback>
            </View>
            <TextInput
              style={styles.bottomSheetInput}
              value={nickname}
              onChangeText={(text) =>
                setNickname(text)
              }
            />
          </View>
        </Modal>
      )}

        <CityPicker
          visible={bottomSheetVisible === "city"}
          onClose={onClose}
          onChange={(value) => handleChange('city', value)}
        />

        <Select
          visible={bottomSheetVisible === "gender"}
          onClose={onClose}
          value={profileData.gender}
          options={["男", "女", "保密"]}
          onChange={(value) => handleChange('gender', value)}
        />

        <Select
          visible={bottomSheetVisible === "education"}
          onClose={onClose}
          value={profileData.education}
          options={["本科", "硕士", "博士"]}
          onChange={(value) => handleChange('education', value)}
        />

        <Select
          visible={bottomSheetVisible === "monthlyIncome"}
          onClose={onClose}
          value={profileData.monthlyIncome}
          options={["10K以下", "10K-20K", "20K-50K", "50K以上"]}
          onChange={(value) => handleChange('monthlyIncome', value)}
        />

        <Select
          visible={bottomSheetVisible === "industry"}
          onClose={onClose}
          value={profileData.industry}
          options={["互联网", "金融", "教育", "医疗"]}
          onChange={(value) => handleChange('industry', value)}
        />

        <Select
          visible={bottomSheetVisible === "maritalStatus"}
          onClose={onClose}
          value={profileData.maritalStatus}
          options={["未婚", "已婚", "离异", "丧偶"]}
          onChange={(value) => handleChange('maritalStatus', value)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    margin: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  overlay: {
    padding: 16,
  },
  overlayButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  loadingOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    height: "auto",
    maxHeight: "80%",
    paddingTop: Constants.statusBarHeight,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  bottomSheetCancel: {
    color: "#007AFF",
    fontSize: 18,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomSheetDone: {
    color: "#007AFF",
    fontSize: 18,
  },
  bottomSheetInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
    marginBottom: 16,
    minHeight: 40,
  },
});

export default EditProfileScreen;
