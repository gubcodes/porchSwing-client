import React, { Component } from 'react';

interface ProfileProps {
    name?: string,
    username?: string,
    age?: number
}

interface ProfileState {
    publicStatus?: boolean;
};

export default class Profile extends Component<ProfileProps, ProfileState> {
    state: ProfileState = {
      publicStatus: false
    };

    changeStatus = () => {
        this.setState({
            publicStatus: (!this.state.publicStatus)
        });
    }

    render(){
        return(
            <div>
                
                    { this.state.publicStatus ? (
                        <h1>This Profile is Public</h1>
                    ) : (
                        <h1>This Profile is Private</h1>
                    )} 
                
                <p>Name: {this.props.name}</p>
                <p>Username: {this.props.username}</p>
                <p>Age: {this.props.age}</p>
                <button onClick={this.changeStatus}>Set Status</button>
            </div>
        )
    }
  }