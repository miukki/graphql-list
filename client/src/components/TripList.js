import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getTripsQuery} from '../queries/queries'


class TripList extends Component {
  render() {
    const {data} = this.props;
    const {trips} = data;
    return (
      <div id="TripList">
        <ul>
          {data.loading ? (<div>Loading..</div>) : trips.map((trip, index) => (
            <li key={trip.id}>{trip.name}</li>
            ))}
        </ul>

      </div>
    );
  }
}

export default graphql(getTripsQuery)(TripList);
