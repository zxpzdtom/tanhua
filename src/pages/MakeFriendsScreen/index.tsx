import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ListItem, Avatar, Icon } from "@rneui/themed";
import { useRequest } from "ahooks";
import { getRecommendationList, getTodayBest } from "../../../service";
import { useNavigation } from "@react-navigation/native";

const FriendsScreen = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);
  const pageRef = React.useRef(1);
  const hasMoreRef = React.useRef(true);
  const todayBestReq = useRequest(getTodayBest);

  const handleLoadMore = async () => {
    try {
      if (isLoading) return;
      if (!hasMoreRef.current) return;
      setIsLoading(true);
      const res = await getRecommendationList({
        page: pageRef.current,
        pagesize: 10,
      });
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
    const res = await getRecommendationList({ page: 1, pagesize: 10 });
    pageRef.current = 2;
    setData(res.items);
    setIsRefreshing(false);
  };

  const renderHeader = () => {
    const todayBestData = todayBestReq.data;
    if (!todayBestData) return null;
    const isMan = todayBestData.gender === "man";
    return (
      <View style={styles.headerContainer}>
        <ListItem containerStyle={styles.headerCard}>
          <Avatar
            source={{ uri: todayBestData.avatar }}
            size={120}
            containerStyle={styles.headerAvatar}
          />
          <View style={styles.todayLabel}>
            <Text style={styles.todayLabelText}>今日佳人</Text>
          </View>
          <ListItem.Content style={{ marginLeft: 90 }}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{todayBestData.nickname}</Text>
              <Icon
                type="font-awesome"
                name={isMan ? "mars" : "venus"}
                size={24}
                color={isMan ? "#007aff" : "#ff2d55"}
                style={styles.genderIcon}
              />
            </View>
            <View style={styles.subtitle}>
              <Text style={styles.subtitleText}>{todayBestData.age} 岁</Text>
              {todayBestData.tags?.map((tag) => (
                <>
                  <Text style={styles.subtitleDivider}> | </Text>
                  <Text style={styles.subtitleText}>{tag}</Text>
                </>
              ))}
            </View>
          </ListItem.Content>
          <View>
            <View style={styles.scoreContainer}>
              <Icon
                type="font-awesome"
                name="heart"
                size={32}
                color="red"
                style={styles.heartIcon}
              />
              <Text style={styles.score}>{todayBestData.fateValue}</Text>
            </View>
            <Text style={styles.scoreLabel}>缘分值</Text>
          </View>
        </ListItem>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => {
        navigation.navigate("PersonalCircle", { id: item.id });
      }}
    >
      <Avatar
        source={{
          uri: item.avatar,
        }}
        size={60}
        rounded
      />
      <ListItem.Content>
        <View style={styles.nameContainer}>
          <ListItem.Title style={styles.name}>{item.nickname}</ListItem.Title>
          <Icon
            type="font-awesome"
            name={item.gender === "男" ? "mars" : "venus"}
            size={24}
            color={item.gender === "男" ? "#007aff" : "#ff2d55"}
            style={styles.genderIcon}
          />
        </View>
        <ListItem.Subtitle style={styles.subtitle}>
          <Text style={styles.subtitleText}>{item.age} 岁</Text>
          {item.tags?.map?.((tag) => (
            <>
              <Text style={styles.subtitleDivider}> | </Text>
              <Text style={styles.subtitleText}>{tag}</Text>
            </>
          ))}
        </ListItem.Subtitle>
      </ListItem.Content>
      <View style={styles.scoreContainer}>
        <Icon
          type="font-awesome"
          name="heart"
          size={32}
          color="red"
          style={styles.heartIcon}
        />
        <Text style={styles.score}>{item.fateValue}</Text>
      </View>
    </ListItem>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListFooterComponent={
        isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="#999" />
            <Text style={styles.loadingText}>正在加载...</Text>
          </View>
        ) : null
      }
      ListHeaderComponent={renderHeader}
    />
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
