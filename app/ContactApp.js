import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchBar from './card_app/SearchBar';
import ContactList from './card_app/ContactList';

class ContactApp extends Component {
    constructor() {
        super();
        this.state={
            filterText: ''
        }
    }

    handleUserInput(searchTerm) {
        this.setState({filterText:searchTerm});
    }

    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText}
                           onUserInput={this.handleUserInput.bind(this)} />

                <ContactList contacts={this.props.contacts}
                             filterText={this.state.filterText} />
            </div>
        );
    }
}

ContactApp.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)
};

export default ContactApp;