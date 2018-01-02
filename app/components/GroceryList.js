import React, { Component } from 'react';

class GroceryList extends Component {
    render() {
        return (
            <ul>
                <ListItem quantity="1" name="Bread" />
                <ListItem quantity="6" name="Eggs" />
                <ListItem quantity="2" name="Milk" />
            </ul>
        );
    }
}

/**
 * Props é um mecanismo responsável em levar dados de um componente pai
 * para um componente filho.
 */
class ListItem extends Component {
    // props.children carregaria os conteudo dentro da tag no elemento pai
    // <li>Bread</li> -> this.props.children = Bread
    render() {
        return (
            <li>
                {this.props.quantity}x {this.props.name}
            </li>
        );
    }
}

React.render(<GroceryList />, document.getElementById("root"));