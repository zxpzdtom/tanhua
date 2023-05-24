import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { Header, Icon } from "@rneui/themed";
import { useRequest } from "ahooks";
import { getMyLikers, getMyMoments, getUserMoments } from "../../../service";
import { RecommendationMomentListItem } from "../../../types";
import Empty from "../../components/Empty";

const Separator = () => <View style={styles.separator} />;

const PersonalCircleScreen = ({ route, navigation }) => {
  const { id, title } = route.params;
  // 某个用户的动态
  let api = () => getUserMoments({ userId: id });
  // 我的动态
  if (title === "我的动态") {
    api = getMyMoments;
  } else if (title === "我的喜欢") {
    // 我的喜欢
    api = getMyLikers;
  }
  const { data } = useRequest(api);

  const renderItem = ({ item }: { item: RecommendationMomentListItem }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DynamicDetail", {
          id: item.id,
        })
      }
    >
      <View style={styles.item}>
        <View style={styles.left}>
          <Image
            source={{
              uri: item.avatar,
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.right}>
          <View style={styles.header}>
            <Text style={styles.nickname}>{item.nickname}</Text>
            <Text style={styles.time}>{item.createDate}</Text>
          </View>
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.text}>
            {item.textContent}
          </Text>
          <View style={styles.images}>
            {item.imageContent?.map((image, index) => (
              <Image
                key={index}
                source={{
                  uri: image,
                }}
                style={styles.image}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: title || "TA的动态",
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
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={<Empty />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
  },
  left: {
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  right: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  nickname: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#f5f5f5",
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: "row",
    padding: 10,
  },
  commentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentNickname: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  commentTime: {
    fontSize: 12,
    color: "#999",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f5f5f5",
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 0,
    height: 40,
  },
  commentButton: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  commentButtonText: {
    color: "#fff",
  },
});

export default PersonalCircleScreen;
