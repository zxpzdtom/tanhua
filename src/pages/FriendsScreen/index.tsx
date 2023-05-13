import React from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mock from 'mockjs';

const FriendsScreen = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newData = Mock.mock({
        'data|10': [
          {
            id: '@guid',
            name: '@name',
            age: '@integer(20, 50)',
            maritalStatus: '@pick(["单身", "离异", "已婚"])',
            education: '@pick(["大专", "本科", "硕士"])',
            gender: '@pick(["男", "女"])',
            score: '@integer(60, 100)',
          },
        ],
      }).data;
      setData([...data, ...newData]);
      setIsLoading(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newData = Mock.mock({
        'data|10': [
          {
            id: '@guid',
            name: '@name',
            age: '@integer(20, 50)',
            maritalStatus: '@pick(["单身", "离异", "已婚"])',
            education: '@pick(["大专", "本科", "硕士"])',
            gender: '@pick(["男", "女"])',
            score: '@integer(60, 100)',
          },
        ],
      }).data;
      setData(newData);
      setIsRefreshing(false);
    }, 1000);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <ListItem containerStyle={styles.headerCard}>
        <Avatar
          source={{ uri: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}` }}
          size={120}
          containerStyle={styles.headerAvatar}
        />
        <View style={styles.todayLabel}>
          <Text style={styles.todayLabelText}>今日佳人</Text>
        </View>
        <ListItem.Content style={{ marginLeft: 100 }}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>张三</Text>
            <Icon name="mars" size={24} color="#007aff" style={styles.genderIcon} />
          </View>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>25 岁</Text>
            <Text style={styles.subtitleDivider}> | </Text>
            <Text style={styles.subtitleText}>单身</Text>
            <Text style={styles.subtitleDivider}> | </Text>
            <Text style={styles.subtitleText}>本科</Text>
          </View>
        </ListItem.Content>
        <View>
          <View style={styles.scoreContainer}>
            <Icon name="heart" size={32} color="red" style={styles.heartIcon} />
            <Text style={styles.score}>{85}</Text>
          </View>
          <Text style={styles.scoreLabel}>缘分值</Text>
        </View>
      </ListItem>
    </View>
  );

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar
        source={{ uri: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}` }}
        size={60}
        rounded
      />
      <ListItem.Content>
        <View style={styles.nameContainer}>
          <ListItem.Title style={styles.name}>{item.name}</ListItem.Title>
          <Icon name={item.gender === '男' ? 'mars' : 'venus'} size={24} color={item.gender === '男' ? '#007aff' : '#ff2d55'} style={styles.genderIcon} />
        </View>
        <ListItem.Subtitle style={styles.subtitle}>
          <Text style={styles.subtitleText}>{item.age} 岁</Text>
          <Text style={styles.subtitleDivider}> | </Text>
          <Text style={styles.subtitleText}>{item.maritalStatus}</Text>
          <Text style={styles.subtitleDivider}> | </Text>
          <Text style={styles.subtitleText}>{item.education}</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <View style={styles.scoreContainer}>
        <Icon name="heart" size={32} color="red" style={styles.heartIcon} />
        <Text style={styles.score}>{item.score}</Text>
      </View>
    </ListItem>
  );

  React.useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
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
    position: 'relative',
    backgroundColor: '#f5f5f5',
    padding: 10,
    paddingTop: 20,
    marginBottom: 10,
  },
  headerCard: {
    borderRadius: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    position: 'absolute',
    top: -8,
    bottom: -6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  todayLabel: {
    backgroundColor: '#9b59b6',
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    bottom: 2,
    left: 0,
  },
  todayLabelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerContent: {
    marginTop: 64,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderIcon: {
    marginLeft: 8,
  },
  subtitle: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleText: {
    fontSize: 16,
  },
  subtitleDivider: {
    fontSize: 16,
    color: '#999',
  },
  scoreContainer: {
    marginTop: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 30,
  },
  scoreLabel: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  score: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    top: 5,
    width: '100%',
    textAlign: 'center',
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

export default FriendsScreen;
