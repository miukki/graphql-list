import React, { Component } from 'react';
import TripList from './components/TripList'
import AddTrip from './components/AddTrip'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

//setup apollo client 
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
        <TripList></TripList>
        <AddTrip></AddTrip>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
