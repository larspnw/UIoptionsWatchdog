import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class App extends Component {
  state = {
    options: [],
    APIKEY: "uFBeU8GkjE7pD2kd0bcn176ZY16p8foFl1Gb9Qbe"
    isLoading: true
  }
  
  
  componentDidMount() {
    fetch('https://lrzmovv1td.execute-api.us-east-1.amazonaws.com/default/optionsWatchdog', {
      method: 'GET',
      headers:{
        'X-api-key': this.state.APIKEY
      }
    })
    .then(res => res.text())
    .then(response => console.log('Response:', response)) // if text, no need for JSON.stringify
    .catch(error => console.error('Error:', error));
    */
    /*.then((data) => {
      this.setState({ options: data })
      console.log(this.state.options)
    })
    .catch(console.log)
*/
    /*
    fetch('http://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then((data) => {
      this.setState({ options: data })
      console.log(this.state.options)
    })
    .catch(console.log)
    */
  //}
  
  render () {
    return (
      // JSX to render goes here...
      this.state.options.map((option) => (
        <View style={styles.container}>
          <Text>Options Watchdog: options.title</Text>
        </View>
      ))
    );
  }
}

export default App;

/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>hello lars!!</Text>
    </View>
  );
}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

