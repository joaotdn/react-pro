import React, {Component} from 'react';
import {render} from 'react-dom';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm : "React"
        };
    }

    handleChange() {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return (
            <div>
                Search Item: <input type="search" value={this.state.searchTerm}
                                    onChange={this.handleChange.bind(this)} />
                <select value="B">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>

                <input type="text" defaultValue="TESTE"/>
            </div>
        );
    }
}

export default Search;