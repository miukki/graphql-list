import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getTripsQuery} from '../queries/queries'
import TripDetails from './TripDetails'

class TripList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedId: null
    }
  }
  render() {
    const {data} = this.props;
    const {trips} = data;
    return (
      <div id="TripList">
        <ul>
          {data.loading ? (<div>Loading..</div>) : trips.map((trip, index) => (
            <li style={{cursor: 'pointer', margin: '10px'}} key={trip.id} onClick={e=>this.setState({selectedId: trip.id})}>
              {trip.name}
              {this.state.selectedId===trip.id && (
                <TripDetails tripId={this.state.selectedId}></TripDetails>
              )}
            </li>
            ))}
        </ul>

      </div>
    );
  }
}

export default graphql(getTripsQuery)(TripList);
