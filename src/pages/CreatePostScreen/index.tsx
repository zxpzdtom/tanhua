import React, { useState } from "react";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon, Header } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { publishMoment } from "../../../service";

const CreatePostScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const res = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: res?.coords?.latitude,
        longitude: res?.coords?.longitude,
      });
    })();
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });
    if (result.canceled) return;
    const image = result.assets[0];
    setImages([...images, image.uri]);
  };

  const handlePressPost = async () => {
    try {
      const formData = new FormData();
      formData.append("textContent", text);
      const imageContent: any = images.map((image, index) => ({
        uri: image,
        type: "image/jpeg",
        name: `image${index}.jpg`,
      }));
      formData.append("imageContent", imageContent);
      const longitude = location?.longitude || "121.510979";
      const latitude = location?.latitude || "31.179502";
      const res = await fetch(`http://restapi.amap.com/v3/geocode/regeo?key=e39d38ca810849bbee21937c3a6cc00c&location=${longitude},${latitude}&poitype=&radius=1000&extensions=base&batch=false&roadlevel=1`).then(res => res.json())
      formData.append("location", res?.regeocode?.addressComponent?.province || "上海");
      formData.append("longitude", longitude);
      formData.append("latitude", latitude);
      await publishMoment(formData);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "提示",
        textBody: "发布成功",
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "发布失败",
        textBody: error.message,
      });
    }
  };

  const renderImage = (index) => {
    if (index < images.length) {
      return <Image source={{ uri: images[index] }} style={styles.image} />;
    } else if (index === images.length && images.length < 9) {
      return (
        <TouchableOpacity
          style={styles.pickImageButton}
          onPress={handlePickImage}
        >
          <Icon name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      );
    } else {
      return <View style={styles.image} />;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "发布动态",
          style: { color: "#fff", fontSize: 18 },
        }}
        leftComponent={
          <TouchableOpacity onPress={navigation.goBack}>
            <Text style={{ color: "#fff", fontSize: 16 }}>取消</Text>
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={handlePressPost}>
            <Text style={{ color: "#fff", fontSize: 16 }}>发表</Text>
          </TouchableOpacity>
        }
        containerStyle={{ backgroundColor: "#007AFF" }}
      />
      <TextInput
        style={styles.input}
        placeholder="分享你的新鲜事..."
        value={text}
        onChangeText={setText}
        multiline
      />
      <View style={styles.imageGrid}>
        {[...Array(9)].map((_, index) => (
          <View key={index} style={styles.imageContainer}>
            {renderImage(index)}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 120,
    fontSize: 16,
    margin: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  imageContainer: {
    width: "30%",
    height: 100,
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pickImageButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
  },
});

export default CreatePostScreen;
