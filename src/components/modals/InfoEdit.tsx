import React, {Component} from 'react';

type PropsType = {
    title: string
}

type State = {

}

export default class InfoEdit extends Component<PropsType, State>{
    constructor(props: PropsType){
        super(props);
    }

    render() {
        return(
            <h1>{this.props.title}</h1> //this will say whatever you pass down as props
        )
    }
};