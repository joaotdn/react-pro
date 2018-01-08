import React, {Component} from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

// coloque o Button separado, é um outro componente
// use export const ButtonStyled = {...}
import ButtonStyled from './ButtonStyled';

class IndexPage extends Component {
    render(){
        return (
            <div>
                <ButtonStyled />
                <ButtonStyled prymary />
            </div>
        );
    }
}

export default IndexPage;