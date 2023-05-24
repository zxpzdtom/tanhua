import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { ListItem, Avatar, Header, Icon } from "@rneui/themed";
import { getMyFollowers, getMyFollowings } from "../../../service";
import { useRequest } from "ahooks";

const FriendsScreen = ({ route, navigation }) => {
  const { title } = route.params;

  const { data } = useRequest(
    title === "我的关注" ? getMyFollowings : getMyFollowers
  );

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate("PersonalCircle", { id: item.id });
      }}
    >
      <Avatar
        source={{
          uri: `https://picsum.photos/200?random=${Math.floor(
            Math.random() * 1000
          )}`,
        }}
        size={60}
        rounded
      />
      <ListItem.Content>
        <View style={styles.nameContainer}>
          <ListItem.Title style={styles.name}>{item.nickname}</ListItem.Title>
          <Icon
            name={item.gender === "男" ? "mars" : "venus"}
            size={24}
            color={item.gender === "男" ? "#007aff" : "#ff2d55"}
            style={styles.genderIcon}
          />
        </View>
        <ListItem.Subtitle style={styles.subtitle}>
          <Text style={styles.subtitleText}>{item.age} 岁</Text>
          {item.tags?.map((tag) => (
            <>
              <Text style={styles.subtitleDivider}> | </Text>
              <Text style={styles.subtitleText}>{tag}</Text>
            </>
          ))}
        </ListItem.Subtitle>
      </ListItem.Content>
      <View style={styles.scoreContainer}>
        <Icon name="heart" size={32} color="red" style={styles.heartIcon} />
        <Text style={styles.score}>{item.fateValue}</Text>
      </View>
    </ListItem>
  );

  return (
    <View>
      <Header
        centerComponent={{
          text: title,
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
      <FlatList
        data={data?.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    backgroundColor: "#f5f5f5",
    padding: 10,
    paddingTop: 20,
    marginBottom: 10,
  },
  headerCard: {
    borderRadius: 8,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    position: "absolute",
    top: -8,
    bottom: -6,
    borderRadius: 8,
    overflow: "hidden",
  },
  todayLabel: {
    backgroundColor: "#9b59b6",
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "absolute",
    bottom: 2,
    left: 0,
  },
  todayLabelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerContent: {
    marginTop: 64,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  genderIcon: {
    marginLeft: 8,
  },
  subtitle: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    fontSize: 12,
  },
  subtitleDivider: {
    fontSize: 16,
    color: "#999",
  },
  scoreContainer: {
    marginTop: 16,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  heartIcon: {
    fontSize: 30,
  },
  scoreLabel: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  score: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    top: 5,
    width: "100%",
    textAlign: "center",
  },
  loading: {
    marginVertical: 16,
    fontSize: 16,
    color: "#999",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  loadingText: {
    marginLeft: 10,
    color: "#999",
  },
});

export default FriendsScreen;
