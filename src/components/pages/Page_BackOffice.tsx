import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ItemAdd from '../modals/ItemAdd';
import Firebase from '../firebase/firebasetest';

type PropsType = {
    title: string
}

type State = {

}

class BackOffice extends Component<PropsType, State>{
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {/* ^^this will say whatever you pass down as props */}
                <ItemAdd />
                {/* <Firebase /> */}
                {/* <h3><a href="/additem">add piece</a></h3>
                <Switch>
                    <Route exact path="/additem"><ItemAdd title='item add' /></Route>
                </Switch> */}
            </div>
        )
    }
}

export default BackOffice;

// in app.js: <BackOffice title='BackOffice'>