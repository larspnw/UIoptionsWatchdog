import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet  } from 'react-native';

//TODO refresh button
//TODO status box
//TODO read json

export default class OptionsWatchdog extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://lrzmovv1td.execute-api.us-east-1.amazonaws.com/default/optionsWatchdog?requestJson=true', {
      method: 'GET',
      headers: {
        'X-api-key': "uFBeU8GkjE7pD2kd0bcn176ZY16p8foFl1Gb9Qbe"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 30}}>
          <ActivityIndicator/>
        </View>
      )
    }
      
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.name} {item.DTE} {item.IOTM} {item.pctIOTM} {item.price} {item.optionsPrice} {item.type} {item.premium}</Text>}
          keyExtractor={({currentPrice}, index) => currentPrice}
        />
      </View>

    );
  }
} 