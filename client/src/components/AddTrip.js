import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo'
import {getOwnersQuery, addTripMutation, getTripsQuery} from '../queries/queries'

class AddTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      country: '',
      ownerId: ''
    }    
  } 
  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const {addTripMutation} = this.props;    
    addTripMutation({
      variables: Object.assign({},this.state),
      refetchQueries: [{query: getTripsQuery}]
    })
  }
  render() {
    const {getOwnersQuery} = this.props;
    const {owners, loading} = getOwnersQuery;
    return (
      <div id="AddTrip">

        <form id="add-trip" onSubmit={this.onSubmit.bind(this)}>
          <div>
              <label>Name</label>
              <input type="text" name="name" onChange={e=>this.setState({name: e.target.value})}></input>
          </div>
          <div>
              <label>Country</label>
              <input type="text" name="country" onChange={e=>this.setState({country: e.target.value})}></input>
          </div>
          <div>
              <label>Owner</label>
              {loading ? (<div>Loading..</div>) : (
                <select value={this.state.ownerId} onChange={e=>this.setState({ownerId: e.target.value})}>
                {!this.state.ownerId && <option>...</option> }
                {owners.map((owner) => <option key={owner.id} value={owner.id}>{owner.name}</option>)}
                </select>
                )}
          </div>
          <div><button>+</button></div>
        </form>
        <br/>        
      </div>

    );
  }
  }
  
  export default compose(
    graphql(getOwnersQuery, {name: 'getOwnersQuery'}),
    graphql(addTripMutation, {name: 'addTripMutation'}),

  )(AddTrip);
  