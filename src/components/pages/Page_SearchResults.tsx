import React, {Component} from 'react';

type State = {

}

type PropsType = {
    title: string
}

class SearchResults extends Component<PropsType, State>{
    constructor(props: PropsType){
        super(props);
    }

    render() {
        return(
            <h1>{this.props.title}</h1> //this will say whatever you pass down as props
        )
    }
}

export default SearchResults;

// in app.js: <SearchResults title='SearchResults'>