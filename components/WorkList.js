import React, {useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import axios from 'axios';
import WorkListItem from './WorkListItem';
// import Navbar from './nav-bar';
import theme from '../styling';
import Search from '../Images/Search';
const WorkList = ({navigation, route}) => {
  const pageSize = 10;
  const [advice, setAdvice] = useState([]);
  const [page, setPage] = useState({currentPage: 1});
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  // const [searchText, setSearchText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchable, setSeatchable] = useState(false);

  const onDetailClick = (id, userId, title) => {
    console.log('-----detail id-----', id);
    console.log('-----user id-----', userId);

    navigation.navigate('Home', {
      id: id,
      userId: userId,
      title: title,
    });
  };
  const nextPage = () => {
    if (alerts.length >= pageSize) {
      setPage({...page, currentPage: page.currentPage + 1});
    }
  };

  const onFilterClicked = () => {
    navigation.navigate('AlertFilter');
  };

  const fetchWorkList = () => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/todos').then(response => {
      setAlerts(response.data);
      // console.log('------res data------', response.data);
      // console.log('------data------', alerts);
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchWorkList();
  }, []);

  useEffect(() => {
    const filtered = alerts.filter(
      item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.id.toString().includes(searchText.toString()) ||
        item.userId.toString().includes(searchText.toString()),
    );
    if (filtered > 0) {
      console.log('---inside if-----');
      setFilteredData(filtered);
    }
    if (searchText === '') {
      return setFilteredData(alerts);
    }

    setFilteredData(filtered);
  }, [searchText]);

  const onSearchChange = e => {
    setSearchText(e);
    // console.log('---text-----',searchText)
    setSeatchable(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{
            zIndex: 10,
            backgroundColor: 'rgba(255,255,255,0.5)',
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          color={theme.colors.blue}
        />
      ) : (
        ''
      )}

      <View style={styles.filter}>
        {/* <Navbar
          onFilterClicked={onFilterClicked}
          filter={true}
          title="Alert List"></Navbar> */}
      </View>
      <View style={{backgroundColor: theme.colors.lightGrey, flex: 1}}>
        <View style={styles.logoContainer}>
          <View style={{justifyContent: 'flex-start', marginTop: 5}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../Images/Menu.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Image
              style={{width: 180, height: 60}}
              source={require('../Images/logo_nova.png')}
            />
          </View>
        </View>
        <Text style={styles.title}>WorkList & Status</Text>

        <View style={{flex: 2}}>
          {searchable ? (
            <FlatList
              onEndReached={nextPage}
              onEndReachedThreshold={0.2}
              style={styles.list}
              renderItem={({item: alert}) => (
                <WorkListItem
                  id={alert.id}
                  userId={alert.userId}
                  onDetailClick={() =>
                    onDetailClick(alert.id, alert.userId, alert.title)
                  }
                  title={alert.title}
                  // completed={alert.completed}
                />
              )}
              data={filteredData}
              keyExtractor={item => item.id}
            />
          ) : (
            <FlatList
              onEndReached={nextPage}
              onEndReachedThreshold={0.2}
              style={styles.list}
              renderItem={({item: alert}) => (
                <WorkListItem
                  id={alert.id}
                  userId={alert.userId}
                  onDetailClick={() =>
                    onDetailClick(alert.id, alert.userId, alert.title)
                  }
                  title={alert.title}
                  // completed={alert.completed}
                />
              )}
              data={alerts}
              keyExtractor={item => item.id}
            />
          )}
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            padding: 2,
            margin: 10,
            marginBottom: 10,
            borderColor: theme.colors.blue,
            borderWidth: 2,
            borderRadius: 3,
          }}>
          <TouchableOpacity>
            <Search strokeWidth={2} stroke={theme.colors.blue}></Search>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={theme.colors.blue}
              onChangeText={onSearchChange}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');

const IMAGE_WIDTH = (width - 24) / 2;

const styles = StyleSheet.create({
  list: {
    padding: 15,
    borderColor: '#999999',
  },
  logoContainer: {
    padding: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 200,
    height: 50,
    marginTop: 20,
  },
  title: {
    marginTop: 40,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 40,
    color: '#757575',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  searchInput: {
    textAlign: 'center',
    width: 380,
    height: 42,
  },
  item: {
    backgroundColor: '#ededed',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  title1: {
    fontSize: 20,
  },
});

export default WorkList;
