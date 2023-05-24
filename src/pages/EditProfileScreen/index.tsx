import React from "react";
import dayjs from "dayjs";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Header, Avatar, Icon, ListItem, Text } from "@rneui/themed";
import Select from "../../components/Select";
import CityPicker from "../../components/CityPicker";
import DateTimePicker from "../../components/DateTimePicker";
import {
  getCurrentUserInfo,
  saveUserInfo,
  uploadAvatar,
} from "../../../service";
import { useRequest } from "ahooks";

const EditProfileScreen = ({ route, navigation }) => {
  const { data, run } = useRequest(getCurrentUserInfo);

  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(null);
  const [nickName, setNickName] = React.useState(data?.nickName);

  const handleChange = async (key, value) => {
    setBottomSheetVisible(null);
    await saveUserInfo({
      ...data,
      [key]: value,
    });
    run();
  };

  const onClose = () => {
    setBottomSheetVisible(null);
  };

  const selectAvatar = async () => {
    // 打开相册
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    if (result.canceled) return;
    const image = result.assets[0];
    // 上传头像到服务器
    const formData = new FormData();
    formData.append("headPhoto", {
      uri: image.uri,
      type: "image/jpeg",
      name: "avatar.jpg",
    } as any);
    await uploadAvatar(formData);
    run();
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
          <Avatar rounded source={{ uri: data?.logo }} />
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem
          bottomDivider
          onPress={() => {
            setNickName(data?.nickName);
            setBottomSheetVisible("nickName");
          }}
        >
          <ListItem.Content>
            <ListItem.Title>昵称</ListItem.Title>
          </ListItem.Content>
          <Text>{data?.nickName}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem
          bottomDivider
          onPress={() => {
            setBottomSheetVisible("birthday");
          }}
        >
          <ListItem.Content>
            <ListItem.Title>生日</ListItem.Title>
          </ListItem.Content>
          <Text>{dayjs(data?.birthday).format("YYYY-MM-DD")}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem bottomDivider onPress={() => setBottomSheetVisible("sex")}>
          <ListItem.Content>
            <ListItem.Title>性别</ListItem.Title>
          </ListItem.Content>
          <Text>{data?.sex === "MAN" ? "男" : "女"}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem bottomDivider onPress={() => setBottomSheetVisible("city")}>
          <ListItem.Content>
            <ListItem.Title>城市</ListItem.Title>
          </ListItem.Content>
          <Text>{data?.city}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem bottomDivider onPress={() => setBottomSheetVisible("edu")}>
          <ListItem.Content>
            <ListItem.Title>学历</ListItem.Title>
          </ListItem.Content>
          <Text>{data?.edu}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem bottomDivider onPress={() => setBottomSheetVisible("income")}>
          <ListItem.Content>
            <ListItem.Title>月收入</ListItem.Title>
          </ListItem.Content>
          <Text>{data?.income}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem
          bottomDivider
          onPress={() => setBottomSheetVisible("industry")}
        >
          <ListItem.Content>
            <ListItem.Title>行业</ListItem.Title>
          </ListItem.Content>
          <Text>{data?.industry}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <ListItem
          bottomDivider
          onPress={() => setBottomSheetVisible("marriage")}
        >
          <ListItem.Content>
            <ListItem.Title>婚姻状态</ListItem.Title>
          </ListItem.Content>
          <Text>{data?.marriage}</Text>
          <Icon name="chevron-right" type="feather" color="#ccc" />
        </ListItem>

        <DateTimePicker
          visible={bottomSheetVisible === "birthday"}
          value={data?.birthday ? new Date(data?.birthday) : undefined}
          onClose={onClose}
          onChange={(date) => handleChange("birthday", date)}
        />

        {bottomSheetVisible === "nickName" && (
          <Modal animationType="slide" visible>
            <View style={styles.bottomSheet}>
              <View style={styles.bottomSheetHeader}>
                <TouchableWithoutFeedback onPress={onClose}>
                  <Text style={styles.bottomSheetCancel}>取消</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.bottomSheetTitle}>修改昵称</Text>
                <TouchableWithoutFeedback
                  onPress={() => handleChange("nickName", nickName)}
                >
                  <Text style={styles.bottomSheetDone}>完成</Text>
                </TouchableWithoutFeedback>
              </View>
              <TextInput
                style={styles.bottomSheetInput}
                value={nickName}
                onChangeText={(text) => setNickName(text)}
              />
            </View>
          </Modal>
        )}

        <CityPicker
          visible={bottomSheetVisible === "city"}
          onClose={onClose}
          onChange={(value) => handleChange("city", value)}
        />

        <Select
          visible={bottomSheetVisible === "sex"}
          onClose={onClose}
          value={data?.sex}
          options={["男", "女"]}
          onChange={(value) => handleChange("sex", value)}
        />

        <Select
          visible={bottomSheetVisible === "edu"}
          onClose={onClose}
          value={data?.edu}
          options={["本科", "硕士", "博士"]}
          onChange={(value) => handleChange("edu", value)}
        />

        <Select
          visible={bottomSheetVisible === "income"}
          onClose={onClose}
          value={data?.income}
          options={["10K以下", "10K-20K", "20K-50K", "50K以上"]}
          onChange={(value) => handleChange("income", value)}
        />

        <Select
          visible={bottomSheetVisible === "industry"}
          onClose={onClose}
          value={data?.industry}
          options={["互联网", "金融", "教育", "医疗"]}
          onChange={(value) => handleChange("industry", value)}
        />

        <Select
          visible={bottomSheetVisible === "marriage"}
          onClose={onClose}
          value={data?.marriage}
          options={["未婚", "已婚", "离异", "丧偶"]}
          onChange={(value) => handleChange("marriage", value)}
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
