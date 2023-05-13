import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { Header, Icon, Input } from 'react-native-elements';
import mockjs from 'mockjs';

const mockData = mockjs.mock({
  'list|20': [
    {
      'id|+1': 1,
      'avatar': '@image(50x50)',
      'nickname': '@cname',
      'text': '@cparagraph(1, 3)',
      'images|1-3': ['@image(150x150)'],
      'distance': '@float(0, 10, 1, 1)km',
      'time': '@datetime',
      'likes': '@integer(0, 100)',
      'comments|1-3': [
        {
          'id|+1': 1,
          'avatar': '@image(50x50)',
          'nickname': '@cname',
          'text': '@csentence',
          'time': '@datetime',
        }
      ],
    }
  ]
}).list;

const Separator = () => <View style={styles.separator} />;

const CommentItem = ({ item }) => (
  <View style={styles.commentItem}>
    <Image source={{ uri: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}` }} style={styles.commentAvatar} />
    <View style={styles.commentContent}>
      <Text style={styles.commentNickname}>{item.nickname}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentTime}>{item.time}</Text>
    </View>
  </View>
);

const DynamicDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  console.log(id);
  const [dynamic, setDynamic] = useState(mockData[0]);
  const [comment, setComment] = useState('');

  const handleComment = () => {
    Keyboard.dismiss();
    if (comment.trim()) {
      const newComment = {
        id: dynamic.comments.length + 1,
        avatar: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`,
        nickname: '匿名用户',
        text: comment,
        time: new Date().toLocaleString(),
      };
      setDynamic({
        ...dynamic,
        comments: [...dynamic.comments, newComment],
      });
      setComment('');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <Header
          centerComponent={{ text: '动态详情', style: { color: '#fff', fontSize: 18 } }}
          leftComponent={<Icon name='chevron-left' type='feather' color='#fff' onPress={navigation.goBack} />}
          containerStyle={{ backgroundColor: '#007AFF' }}
        />
        <FlatList
          data={dynamic.comments}
          renderItem={CommentItem}
          keyboardDismissMode="on-drag"
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={() => (
            <View>
              <View style={styles.item}>
                <View style={styles.left}>
                  <Image source={{ uri: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}` }} style={styles.avatar} />
                </View>
                <View style={styles.right}>
                  <View style={styles.header}>
                    <Text style={styles.nickname}>{dynamic.nickname}</Text>
                    <Text style={styles.time}>{dynamic.time}</Text>
                  </View>
                  <Text numberOfLines={3} ellipsizeMode="tail" style={styles.text}>
                    {dynamic.text}
                  </Text>
                  <View style={styles.images}>
                    {dynamic.images.map((image, index) => (
                      <Image key={index} source={{ uri: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}` }} style={styles.image} />
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.commentHeader}>
                <Text style={styles.commentTitle}>评论 ({dynamic.comments.length})</Text>
                <TouchableOpacity onPress={() => console.log('点赞')} style={{ flexDirection: 'row', gap: 8 }}>
                  <Icon name="thumbs-up" size={20} color="#999" />
                  <Text>{dynamic.likes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.commentInputContainer}>
              <Input
                key={dynamic.id}
                placeholder="请输入评论内容"
                value={comment}
                onChangeText={(text) => setComment(text)}
                containerStyle={styles.commentInput}
                inputContainerStyle={{ borderBottomWidth: 0 }}
              />
              <TouchableOpacity style={styles.commentButton} onPress={handleComment}>
                <Text style={styles.commentButtonText}>发送</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nickname: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: 'row',
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
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    borderWidth: 0,
    height: 40,
  },
  commentButton: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  commentButtonText: {
    color: '#fff',
  },
});

export default DynamicDetailScreen;
