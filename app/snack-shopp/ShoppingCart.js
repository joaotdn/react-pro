import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import PropTypes from 'prop-types';
import constants from './constants';

const ShoppingCartSpec = {
    drop() {
        return { name: 'ShoppingCart' };
    }
};

let collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

class ShoppingCart extends Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = '#ffffff';

        if(isActive) {
            backgroundColor = '#F7f7bd';
        } else if(canDrop) {
            backgroundColor = '#f7f7f7';
        }

        const style = {
            backgroundColor: backgroundColor
        };

        return connectDropTarget(
            <div className="shopping-cart" style={style}>
                {
                    isActive ? 'hmmm, snack!' : 'Drag here to order!'
                }
            </div>
        );
    }
}

ShoppingCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);