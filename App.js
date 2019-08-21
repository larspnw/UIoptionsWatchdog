import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from "react-navigation";

const apiUrl = Constants.manifest.extra.apiUrl;
const apiKey = Constants.manifest.extra.apiKey;

class OptionsScreen extends React.Component {

  static navigationOptions = {
    title: 'Watchdog',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
    }
  }

  componentDidMount() {

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    //var dateNow = Date(Date.now()).toString();
    this.setState({
      date:
        month + '/' + date + '/' + year + ' ' + hours + ':' + min,
      fetchStart: Date.now(),
    });

    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-api-key': apiKey
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('response: ' + response.status);
        }
      })
      .then(responseJson => this.setState({
        dataSource: responseJson,
        isLoading: false
      }, function () {
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));

  }

  _refreshPage() {
    //console.log("Clicked");
    //this.location.reload()
    this.setState({
      dataSource: null
    });
  }

  render() {

    if (this.state.error) {
      return (
        <View style={{ flex: 1, padding: 30 }}>
          <Text>
            Error loading data: {this.state.error.message}
            Time: {Date.now() - this.state.fetchStart} ms
          </Text>
          <Button onPress={this._refreshPage} title="Retry" />


        </View>
      )
    }
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 30 }}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (

      <View style={styles.container} >
        <Text style={styles.second}>Last updated: {this.state.date} Time: {Date.now() - this.state.fetchStart} ms</Text>
        <FlatList
          contentContainerStyle={{ paddingBottom: 40}}
          data={this.state.dataSource}
          /*data={
                 [
                     {
                         "name": "Proxima Midnight",
                         "email": "proxima@appdividend.com"
                     },
                     {
                         "name": "Ebony Maw",
                         "email": "ebony@appdividend.com"
                     },
                     {
                         "name": "Black Dwarf",
                         "email": "dwarf@appdividend.com"
                     }
                   ]
               }
           */
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            <View style={styles.flatview}>
              {(item.alert == 0) ? (
                <Text style={styles.firstAlertP0}>{item.name} {item.type} DTE: {item.DTE} {item.IOTM} {item.pctIOTM}</Text>
              ) : (item.alert == 1) ? (
                <Text style={styles.firstAlertP1}>{item.name} {item.type} DTE: {item.DTE} {item.IOTM} {item.pctIOTM}</Text>
              ) : (
                    <Text style={styles.first}>{item.name} {item.type} DTE: {item.DTE} {item.IOTM} {item.pctIOTM}</Text>
                  )}
              <Text style={styles.second}>Price: {item.price} Opts: {item.optionsPrice} Prem: {item.premium} Exp: {item.expirationDate}</Text>
            </View>
          }
          keyExtractor={({ price }, index) => price}
        />
        <View style={styles.footer}>
          <TouchableOpacity onPress={this._refreshPage} style={styles.button2}>
            <Text style={{ color: 'white' }}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  _refreshPage() {
    this.setState({
      dataSource: null
    });
  }

  componentDidMount() {
    return fetch(apiUrl + "&getIndexes", {
      method: 'GET',
      headers: {
        'X-api-key': apiKey
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('response: ' + response.status);
        }
      })
      .then(responseJson => this.setState({
        dataSource: responseJson,
        isLoading: false
      }, function () {
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 30 }}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (
      <View style={styles.flatview} >
        <View style={styles.homeimage}>
          <Image
            //style={{ width: 478, height: 381 }}
            style={{ width: 300, height: 200 }}
            source={require('./assets/stock-options.jpg')}
          />
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 50}} 
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <Text style={styles.indexes}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}:</Text> {item.price}
              {(item.change.startsWith("+")) ? (
                <Text style={{ color: 'green' }}> {item.change}</Text>
              ) : (
                  <Text style={{ color: 'red' }}> {item.change}</Text>
                )
              }
            </Text>}
          keyExtractor={({ name }, index) => name}
        />
        <View style={styles.footer}>
          <TouchableOpacity onPress={this._refreshPage} style={styles.button2}>
            <Text style={{ color: 'white' }}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ManageOptionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Manage',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>One day you'll manage options here</Text>
      </View>
    );
  }
}
const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Watchdog: OptionsScreen,
    Manage: ManageOptionsScreen
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      labelStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      tabStyle: {
        width: 170,
      },
      style: {
        backgroundColor: 'orange',
        paddingVertical: 10,
      },
    }
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'normal',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
    paddingBottom: 20,
  },
  first: {
    fontFamily: 'normal',
    fontSize: 18
  },
  indexes: {
    fontFamily: 'normal',
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  homeimage: {
    alignItems: 'center',
    marginTop: 50
  },
  firstAlertP0: {
    fontFamily: 'normal',
    fontSize: 18,
    color: 'red'
  },
  firstAlertP1: {
    fontFamily: 'normal',
    fontSize: 18,
    color: 'orange'
  },
  second: {
    color: 'blue'
  },
  button: {
    justifyContent: 'center'
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: -10
  },
  button2: {
    width: 300,
    height: 45,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  }
});

export default createAppContainer(TabNavigator);
