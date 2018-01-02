import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import 'whatwg-fetch';
import ContactApp from './ContactApp'

class ContactAppContainer extends Component {
    constructor() {
        super();
        this.state={
            contacts: []
        };
    }

    componentDidMount() {
        fetch('./contacts.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({contacts: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            })
    }

    render() {
        return (
            <ContactApp contacts={this.state.contacts} />
        );
    }
}

render(<ContactAppContainer />, document.getElementById('root'));