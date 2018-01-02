import React, {Component} from 'react';
import ProtoTypes from 'prop-types';

class SearchBar extends Component {
    handleChange(event) {
        this.props.onUserInput(event.target.value)
    }

    render() {
        return <input type="search" placeholder="Search"
                      onChange={this.handleChange.bind(this)}
                      value={this.props.filterText}/>
    }
}

SearchBar.propTypes={
    onUserInput: ProtoTypes.func.isRequired,
    filterText: ProtoTypes.string.isRequired
};

export default SearchBar;