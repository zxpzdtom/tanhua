import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import {
  getFriendsMomentList,
  getRecommendationMomentList,
} from "../../../service";
import { RecommendationMomentListItem } from "../../../types";
import Empty from "../Empty";

const Separator = () => <View style={styles.separator} />;

interface CircleListProps {
  type: "recommendation" | "friend";
}

const CircleList: React.FC<CircleListProps> = (props) => {
  const navigation = useNavigation<any>();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const pageRef = React.useRef(1);
  const hasMoreRef = React.useRef(true);

  let api = getRecommendationMomentList;
  if (props.type === "friend") {
    api = getFriendsMomentList;
  }

  const renderItem = ({ item }: { item: RecommendationMomentListItem }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("DynamicDetail", {
          id: item.id,
        })
      }
    >
      <View style={styles.left}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
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
          {item.imageContent.map((image) => (
            <Image source={{ uri: image }} style={styles.image} />
          ))}
        </View>
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <Icon name="thumbs-up" type="feather" size={16} color="#999" />
            <Text style={styles.iconText}>{item.likeCount || 0}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="message-square" type="feather" size={16} color="#999" />
            <Text style={styles.iconText}>{item.commentCount || 0}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = async () => {
    try {
      if (isLoading) return;
      if (!hasMoreRef.current) return;
      setIsLoading(true);
      const res = await api({ page: pageRef.current, pagesize: 10 });
      if (res?.items?.length < 10) {
        hasMoreRef.current = false;
      }
      pageRef.current += 1;
      setData([...data, ...res.items]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const res = await api({ page: 1, pagesize: 10 });
    pageRef.current = 2;
    setData(res.items);
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={styles.list}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={<Empty />}
      ListFooterComponent={
        isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="#999" />
            <Text style={styles.loadingText}>正在加载...</Text>
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  left: {
    marginRight: 10,
  },
  right: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  nickname: {
    marginRight: 10,
    fontWeight: "bold",
  },
  time: {
    color: "#999",
  },
  text: {
    lineHeight: 20,
    marginBottom: 10,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    gap: 10,
  },
  image: {
    width: "30%",
    height: 50,
    aspectRatio: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  iconText: {
    marginLeft: 5,
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 76, // left padding + avatar width + margin right
  },
  list: {
    paddingTop: 10,
    paddingBottom: 20,
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

export default CircleList;
