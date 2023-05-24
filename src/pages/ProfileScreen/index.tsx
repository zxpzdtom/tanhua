import React from "react";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, ListItem } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import CityPicker from "../../components/CityPicker";
import DateTimePicker from "../../components/DateTimePicker";
import { saveProfile } from "../../../service";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [gender, setGender] = React.useState<"man" | "woman">("man");
  const [name, setName] = React.useState("");
  const [birthday, setBirthday] = React.useState(new Date());
  const [city, setCity] = React.useState("");
  const [pickerVisible, setPickerVisible] = React.useState(false);
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);

  const handleOpenPicker = React.useCallback(() => {
    setPickerVisible(true);
  }, []);

  const handleClosePicker = React.useCallback(() => {
    setPickerVisible(false);
  }, []);

  const handleCityChange = React.useCallback((val: string) => {
    setCity(val);
    setPickerVisible(false);
  }, []);

  const handleSubmit = React.useCallback(async () => {
    await saveProfile({
      gender,
      birthday: dayjs(birthday).format("YYYY-MM-DD"),
      city,
      header: "",
      nickname: name,
    });
    navigation.navigate("Main");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>填写资料</Text>
        <Text style={styles.subTitle}>提升我的魅力</Text>
      </View>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => setGender("man")}>
          <Avatar
            rounded
            size="large"
            source={require("../../../assets/male.png")}
            overlayContainerStyle={{
              backgroundColor: gender === "man" ? "blue" : "gray",
            }}
          />
          <ListItem.Content>
            <ListItem.Title
              style={[
                styles.avatarTitle,
                { color: gender === "man" ? "blue" : "gray" },
              ]}
            >
              男生
            </ListItem.Title>
          </ListItem.Content>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender("woman")}>
          <Avatar
            rounded
            size="large"
            source={require("../../../assets/female.png")}
            overlayContainerStyle={{
              backgroundColor: gender === "woman" ? "pink" : "gray",
            }}
          />
          <ListItem.Content>
            <ListItem.Title
              style={[
                styles.avatarTitle,
                { color: gender === "woman" ? "pink" : "gray" },
              ]}
            >
              女生
            </ListItem.Title>
          </ListItem.Content>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>昵称</Text>
        <ListItem>
          <ListItem.Content>
            <View style={styles.inputWrapper}>
              <Icon
                name="user"
                size={20}
                color="#007AFF"
                style={styles.inputIcon}
              />
              <ListItem.Input
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder="请输入昵称"
              />
            </View>
          </ListItem.Content>
        </ListItem>
        <Text style={styles.label}>生日</Text>
        <TouchableOpacity
          onPress={() => {
            setDatePickerVisible(true);
          }}
        >
          <ListItem>
            <ListItem.Content>
              <View style={styles.inputWrapper} pointerEvents="none">
                <Icon
                  name="calendar"
                  size={20}
                  color="#007AFF"
                  style={styles.inputIcon}
                />
                <ListItem.Input
                  value={dayjs(birthday).format("YYYY-MM-DD")}
                  placeholder="请选择生日"
                  editable={false}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
        <Text style={styles.label}>城市</Text>
        <TouchableOpacity onPress={handleOpenPicker}>
          <ListItem>
            <ListItem.Content>
              <View style={styles.inputWrapper} pointerEvents="none">
                <Icon
                  name="map-marker"
                  size={20}
                  color="#007AFF"
                  style={styles.inputIcon}
                />
                <ListItem.Input
                  value={city}
                  placeholder="请选择城市"
                  editable={false}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <View style={[styles.submitButtonContainer, { width: "100%" }]}>
          <Text style={styles.submitButtonText}>提 交</Text>
        </View>
      </TouchableOpacity>
      <DateTimePicker
        visible={datePickerVisible}
        value={birthday}
        onClose={() => setDatePickerVisible(false)}
        onChange={(date) => setBirthday(date)}
      />
      <CityPicker
        visible={pickerVisible}
        onClose={handleClosePicker}
        onChange={handleCityChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 24,
  },
  subTitle: {
    fontSize: 20,
    color: "#007AFF",
    marginTop: 8,
    marginBottom: 24,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  avatarTitle: {
    marginTop: 30,
    height: 20,
    width: "100%",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: "center",
  },
  submitButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    width: "100%",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;
