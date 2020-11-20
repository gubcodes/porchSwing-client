import React, {Component} from 'react';

type State = {

}

type PropsType = {
    name: string
}

class Test extends Component<PropsType, State>{
    constructor(props: PropsType){
        super(props);
    }

    render() {
        return(
            <h1>{this.props.name}</h1> //this will say 'hello'
        )
    }
}

export default Test;

// in app.js: <Test name='hello'>