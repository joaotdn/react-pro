import React, {Component, PropTypes} from 'react';

class Greeter extends Component {
    render() {
        return (
            <h1>{this.props.salutation}</h1>
        );
    }
}

Greeter.propTypes = {
    salutation: PropTypes.string
};

Greeter.defaultProps = {
    salutation: "Hello World!"
}

export default Greeter;