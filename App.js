import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet } from 'react-native';

//TODO refresh button
//TODO status box
//TODO check for timeout error on fetch

export default class OptionsWatchdog extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      error: null, 
    }
  }


  componentDidMount() {

    return fetch('https://lrzmovv1td.execute-api.us-east-1.amazonaws.com/default/optionsWatchdog?requestJson=true', {
      method: 'GET',
      headers: {
        'X-api-key': "uFBeU8GkjE7pD2kd0bcn176ZY16p8foFl1Gb9Qbe"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('response: ' + response.status + ' / ' + response.statusText);
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

    /*
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
*/
  }

  render() {
    
    if (this.state.error) {
      return (
        <View style={{ flex: 1, padding: 30 }}>
          <Text>Error loading data: {this.state.error.message}</Text>
        </View>
      )
    }
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 30 }}>
          <Text>Loading...</Text>
          <ActivityIndicator />
        </View>
      )
    }

    /* ORIGINAL
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.name} {item.DTE} {item.IOTM} {item.pctIOTM} {item.price} {item.optionsPrice} {item.type} {item.premium}</Text>}
          keyExtractor={({currentPrice}, index) => currentPrice}
        />
      </View>

    );
    */

    return (

      <View style={styles.container} >
        <Text style={styles.h2text}>
          Options Watchdog
      </Text>
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
              {(item.alert == 'y') ? (
                <Text style={styles.firstAlert}>{item.name} {item.type} DTE: {item.DTE} {item.IOTM} {item.pctIOTM}</Text>
              ) : (
                <Text style={styles.first}>{item.name} {item.type} DTE: {item.DTE} {item.IOTM} {item.pctIOTM}</Text>
              )}
              <Text style={styles.second}>Price: {item.price} Opts: {item.optionsPrice} Prem: {item.premium}</Text>
            </View>
          }
          //keyExtractor={item => item.email}
          //renderItem={({item}) => <Text>{item.name} {item.DTE} {item.IOTM} {item.pctIOTM} {item.price} {item.optionsPrice} {item.type} {item.premium}</Text>}
          keyExtractor={({ price }, index) => price}

        />
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
  firstAlert: {
    fontFamily: 'normal',
    fontSize: 18,
    color: 'red'
  },
  second: {
    color: 'blue'
  }

});