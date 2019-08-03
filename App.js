import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

//TODO refresh button
//TODO status box
//TODO read json

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://lrzmovv1td.execute-api.us-east-1.amazonaws.com/default/optionsWatchdog', {
      method: 'GET',
      headers: {
        'X-api-key': "uFBeU8GkjE7pD2kd0bcn176ZY16p8foFl1Gb9Qbe"
      }
    })
      .then((response) => response.text())
      .then((responseText) => {

        this.setState({
          isLoading: false,
          dataSource: responseText,
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
          <Text>{this.state.dataSource}</Text>
      </View>
    );
  }
}
