import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Tab } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mock from 'mockjs';

const Separator = () => <View style={styles.separator} />;

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [dataList, setDataList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DynamicDetail', {
      id: item.id,
    })}>
      <View style={styles.left}>
        <Image source={{ uri: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}` }} style={styles.avatar} />
      </View>
      <View style={styles.right}>
        <View style={styles.header}>
          <Text style={styles.nickname}>{item.nickname}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.text}>
          {item.text}
        </Text>
        <View style={styles.images}>
          {item.images.map((image) => (
            <Image source={{ uri: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}` }} style={styles.image} />
          ))}
        </View>
        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <Icon name="thumbs-up" size={16} color="#999" />
            <Text style={styles.iconText}>{item.likes}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="comment" size={16} color="#999" />
            <Text style={styles.iconText}>{item.comments}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const fetchData = () => {
    const mockData = Mock.mock({
      'list|20': [
        {
          'id': '@guid',
          'avatar': '@image(50x50)',
          'nickname': '@cname',
          'text': '@cparagraph(1, 6)',
          'images|0-9': ['@image(150x150)'],
          'distance': '@float(0, 10, 1, 1)km',
          'time': '@now',
          'likes': '@integer(0, 100)',
          'comments': '@integer(0, 50)',
        }
      ]
    }).list;
    setIsLoading(true);
    setTimeout(() => {
      if (page === 1) {
        setDataList(mockData);
      } else {
        setDataList([...dataList, ...mockData]);
      }
      setPage(page + 1);
      setIsLoading(false);
      setIsRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    fetchData();
  };

  const handleLoadMore = () => {
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Tab value={0} containerStyle={styles.tab} indicatorStyle={styles.indicator}>
        <Tab.Item titleStyle={styles.tabTitle} title="推荐" />
        <Tab.Item titleStyle={styles.tabTitle} title="最新" />
      </Tab>
      <FlatList
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.list}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color="#999" />
              <Text style={styles.loadingText}>正在加载...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tab: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  indicator: {
    backgroundColor: '#333',
    height: 2,
  },
  tabTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nickname: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  time: {
    color: '#999',
  },
  text: {
    lineHeight: 20,
    marginBottom: 10,
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 10,
  },
  image: {
    width: '30%',
    height: 50,
    aspectRatio: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  iconText: {
    marginLeft: 5,
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 76, // left padding + avatar width + margin right
  },
  list: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  loading: {
    marginVertical: 16,
    fontSize: 16,
    color: '#999',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loadingText: {
    marginLeft: 10,
    color: '#999',
  },
});

export default HomeScreen;
