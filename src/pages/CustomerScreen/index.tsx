import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Header, Icon } from "@rneui/themed";

const CustomerService = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "客服在线",
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
      <Image
        source={require("../../../assets/wechat.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "80%",
    height: "80%",
  },
});

export default CustomerService;
