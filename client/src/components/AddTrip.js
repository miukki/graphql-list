import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getOwnersQuery} from '../queries/queries'

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
    console.log(this.state)
  }
  render() {
    const {data} = this.props;
    const {owners} = data;
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
              {data.loading ? (<div>Loading..</div>) : (
                <select onChange={e=>this.setState({ownerId: e.target.value})}>
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
  
  export default graphql(getOwnersQuery)(AddTrip);
  