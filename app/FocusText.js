import React, {Component} from 'react';

class FocusText extends Component {
    handleClick() {
        this.refs.myInputText.focus();
    }

    render() {
        return (
            <div>
                <input type="text" ref="myInputText" />
                <input type="button" value="Focus the text input" onClick={this.handleClick.bind(this)}  />
            </div>
        );
    }
}

export default FocusText;