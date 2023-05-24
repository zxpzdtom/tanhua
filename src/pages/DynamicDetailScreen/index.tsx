import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Header, Icon, Input } from "@rneui/themed";
import { useRequest } from "ahooks";
import {
  getMomentComments,
  getMomentDetail,
  likeMoment,
  publishMomentComment,
  unlikeMoment,
} from "../../../service";
import Empty from "../../components/Empty";
import { MomentCommentsItem } from "../../../types";

const Separator = () => <View style={styles.separator} />;

const CommentItem = ({ item }: { item: MomentCommentsItem }) => (
  <View style={styles.commentItem}>
    <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
    <View style={styles.commentContent}>
      <Text style={styles.commentNickname}>{item.nickname}</Text>
      <Text style={styles.commentText}>{item.content}</Text>
      <Text style={styles.commentTime}>{item.createDate}</Text>
    </View>
  </View>
);

const DynamicDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [comment, setComment] = useState("");
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const pageRef = React.useRef(1);
  const hasMoreRef = React.useRef(true);
  const [comments, setComments] = React.useState([]);
  const detailReq = useRequest(() => getMomentDetail(id));
  const data = detailReq.data || {};

  const handleComment = async () => {
    if (comment.trim()) {
      await publishMomentComment(id, comment.trim());
      setComment("");
      handleRefresh();
    }
  };

  const handleLikePress = async () => {
    if (data.hasLiked) {
      await unlikeMoment(id);
    } else {
      await likeMoment(id);
    }
    detailReq.run();
  };

  const handleLoadMore = async () => {
    try {
      if (isLoading) return;
      if (!hasMoreRef.current) return;
      setIsLoading(true);
      const res = await getMomentComments({
        page: pageRef.current,
        pagesize: 10,
        movementId: id,
      });
      if (res?.items?.length < 10) {
        hasMoreRef.current = false;
      }
      pageRef.current += 1;
      setComments([...comments, ...res.items]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const res = await getMomentComments({
      page: 1,
      pagesize: 10,
      movementId: id,
    });
    pageRef.current = 2;
    setComments(res.items);
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "动态详情",
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
        data={comments}
        renderItem={CommentItem}
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<Empty />}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.item}>
              <View style={styles.left}>
                <Image source={{ uri: data.avatar }} style={styles.avatar} />
              </View>
              <View style={styles.right}>
                <View style={styles.header}>
                  <Text style={styles.nickname}>{data.nickname}</Text>
                  <Text style={styles.time}>{data.createDate}</Text>
                </View>
                <Text
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                  {data.textContent}
                </Text>
                <View style={styles.images}>
                  {data.imageContent?.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: image }}
                      style={styles.image}
                    />
                  ))}
                </View>
              </View>
            </View>
            <View style={styles.commentHeader}>
              <Text style={styles.commentTitle}>
                评论 ({data.commentCount})
              </Text>
              <TouchableOpacity
                onPress={handleLikePress}
                style={{ flexDirection: "row", gap: 8 }}
              >
                <Icon
                  name="thumbs-up"
                  type="feather"
                  size={20}
                  color={data.hasLiked ? "red" : "#999"}
                />
                <Text>{data.likeCount || 0}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={() =>
          isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color="#999" />
              <Text style={styles.loadingText}>正在加载...</Text>
            </View>
          ) : null
        }
      />
      <View style={styles.commentInputContainer}>
        <Input
          placeholder="请输入评论内容"
          value={comment}
          onChangeText={setComment}
          containerStyle={styles.commentInput}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleComment}>
          <Text style={styles.commentButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
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

export default DynamicDetailScreen;
