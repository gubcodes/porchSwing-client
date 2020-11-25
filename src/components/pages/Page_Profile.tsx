import React, {Component} from 'react';

type PropsType = {
    title: string
}

type State = {

}

export default class Profile extends Component<PropsType, State>{
    constructor(props: PropsType){
        super(props);
    }

    render() {
        return(
            <div>
            <h1>{this.props.title}</h1>
            <h4>add messages</h4>
            </div>
        )
    }
};