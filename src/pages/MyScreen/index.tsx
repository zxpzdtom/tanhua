import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Icon, Text, Button } from "@rneui/themed";
import { useRequest } from "ahooks";
import { getCurrentUserInfo } from "../../../service";

const MyScreen = () => {
  const navigation = useNavigation<any>();

  const { data } = useRequest(getCurrentUserInfo, {
    refreshOnWindowFocus: true,
  });

  const handleEditProfile = React.useCallback(() => {
    navigation.navigate("EditProfile");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.background} />
        <Avatar
          size="large"
          rounded
          source={{ uri: data?.logo }}
          containerStyle={styles.avatar}
        />
        <View style={styles.info}>
          <Text h4>{data?.nickName}</Text>
          <View style={styles.row}>
            <Icon name="gender-male" type="material-community" size={16} />
            <Text style={styles.label}>{data?.sex}</Text>
            <Icon name="cake" type="material-community" size={16} />
            <Text style={styles.label}>{data?.age}</Text>
            <Icon name="map-marker" type="font-awesome" size={16} />
            <Text style={styles.label}>{data?.city}</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.stat}
          onPress={() => navigation.navigate("Friends", { title: "我的关注" })}
        >
          <Text style={styles.statValue}>{data?.starCounts || 0}</Text>
          <Text style={styles.statLabel}>我的关注</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stat}
          onPress={() =>
            navigation.navigate("PersonalCircle", { title: "我的喜欢" })
          }
        >
          <Text style={styles.statValue}>{data?.likeCounts || 0}</Text>
          <Text style={styles.statLabel}>喜欢</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stat}
          onPress={() => navigation.navigate("Friends", { title: "我的粉丝" })}
        >
          <Text style={styles.statValue}>{data?.fanCounts || 0}</Text>
          <Text style={styles.statLabel}>粉丝</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <TouchableOpacity style={styles.item} onPress={handleEditProfile}>
          <Icon name="account-outline" type="material-community" size={24} />
          <Text style={styles.itemLabel}>个人信息</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("PersonalCircle", { title: "我的动态" })
          }
        >
          <Icon
            name="newspaper-variant-outline"
            type="material-community"
            size={24}
          />
          <Text style={styles.itemLabel}>我的动态</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            navigation.navigate("Customer");
          }}
        >
          <Icon name="headset" type="material-community" size={24} />
          <Text style={styles.itemLabel}>客服在线</Text>
        </TouchableOpacity>
        <Button
          title="退出登录"
          onPress={() => {
            navigation.navigate("Login");
          }}
          buttonStyle={styles.logoutButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profile: {
    height: 200,
    backgroundColor: "#03A9F4",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  avatar: {
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  info: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginLeft: 5,
    marginRight: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    color: "#999",
  },
  list: {
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    paddingHorizontal: 20,
  },
  itemLabel: {
    marginLeft: 20,
    fontSize: 16,
  },
  logoutButton: {
    margin: 30,
    backgroundColor: "#F44336",
  },
});

export default MyScreen;
