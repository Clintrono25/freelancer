import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Constant from '../constants/globalConstant';
import {useSelector, useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused} from '@react-navigation/native';
import Header from '../components/Header';
import {BallIndicator, MaterialIndicator} from 'react-native-indicators';
import styles from '../styles/Style';
import SocketioService from '../socketio/socketio.service';
import ListCard from './ListCard';
import Translation from '../constants/Translation';

const Inbox = ({navigation}) => {
  const socketService = SocketioService;
  const isFocused = useIsFocused();
  const settings = useSelector(state => state.setting.settings);
  const token = useSelector(state => state.value.token);
  const [search, setSearch] = useState('');
  const userInfo = useSelector(state => state.value.userInfo);
  const [searchLoader, setSearchLoader] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (isFocused) {
      getChatList();
      if (settings.chat_settings.gadget == 'chat') {
        // socketData();
      }
    }
  }, [isFocused]);

  const socketData = async () => {
    const socket = socketService.socketConnection(
      token.authToken,
      settings.chat_settings.chat.host,
      settings.chat_settings.chat.port,
    );
    socketService.connectUser(userInfo.id);
    console.log('Socket', socket);
    socket.on('send_msg', mydata => {
      console.log('mydata', mydata);
    });
  };

  const getChatList = async () => {
    // setLoader(true)
    return fetch(Constant.BaseUrl + 'chat/list_users?user_id=' + userInfo.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token.authToken,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('Chat list', responseJson);
        setChatData(responseJson.chats);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.error(error);
      });
  };
  const openMessageDetails = item => {
    navigation.navigate('MessageDetail', {data: item});
  };
  return (
    <SafeAreaView style={styles.globalContainer}>
      <Header
        backColor={Constant.whiteColor}
        iconColor={'#1C1C1C'}
        heading={true}
        title={'Inbox'}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          marginTop: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          paddingTop: 10,
        }}>
        <View style={{paddingHorizontal: 10}}>
          <View style={styles.managePortfolioSearchView}>
            <Feather name="search" color={Constant.lightGrayColor} size={20} />
            <TextInput
              style={{marginLeft: 8, width: '87%'}}
              value={search}
              onChangeText={text => setSearch(text)}
              placeholder={Translation.inboxSearch}
              placeholderTextColor="#676767"
              underlineColorAndroid="transparent"
            />
            {searchLoader && (
              <MaterialIndicator
                count={8}
                size={14}
                color={Constant.lightGrayColor}
              />
            )}
          </View>
        </View>
        {loader ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f7f7f7',
              zIndex: 20,
            }}>
            <View style={{marginTop: -70}}>
              <BallIndicator count={8} size={26} color={Constant.fontColor} />
            </View>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            //   style={styles.TopRatedFlatlistStyle}
            data={chatData}
            extraData={refreshFlatlist}
            keyExtractor={(x, i) => i.toString()}
            //   onEndReached={() => onEndReachedHandler()}
            //   onEndReachedThreshold={0.1}
            //   onMomentumScrollBegin={() => {
            //     onEndReachedCalledDuringMomentum.current = false;
            //   }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={{borderColor: Constant.borderColor, borderWidth: 0.6}}
                onPress={() => openMessageDetails(item)}>
                <ListCard
                  isSender={item.message_status}
                  image={item.image_url}
                  name={item.user_name}
                  message={item.chat_message}
                  unread={item.unread_count}
                  isOnline={item.is_online}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Inbox;
