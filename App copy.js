import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Button } from 'react-native';
import  Constants  from 'expo-constants';
 
const apiUrl = Constants.manifest.extra.apiUrl;
const apiKey = Constants.manifest.extra.apiKey;

export default class OptionsWatchdog extends React.Component {
   
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
        <Text style={styles.h2text}>
          Options Watchdog
      </Text>
        <Text style={styles.second}>Last updated: {this.state.date} Time: {Date.now() - this.state.fetchStart} ms</Text>
        <FlatList
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

        <Button onPress={this._refreshPage} title="Refresh" />

      </View>

    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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
  },
  first: {
    fontFamily: 'normal',
    fontSize: 18
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
  }

});

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  //Home: HomeScreen,
  Settings: SettingsScreen,
});
 
export default createAppContainer(TabNavigator);