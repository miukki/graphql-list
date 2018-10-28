import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getTripQuery} from '../queries/queries'

class TripDetails extends Component {
    render() {
      const {data} = this.props;
      const {trip} = data;
      return (
        <div id="TripDetails">
            {data.loading ? (<div>Loading..</div>) : (
                <div>
                  {trip.name}, {trip.country}, {trip.owner.name}
                </div>
            )}
  
        </div>
      );
    }
  }
  
  export default graphql(getTripQuery, {
    options: props => ({
      variables: {
        id: props.tripId
      }
  })
})(TripDetails);
  