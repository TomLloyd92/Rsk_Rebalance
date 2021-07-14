import React from 'react';
import {Menu} from 'semantic-ui-react'
import {Link} from '../routes'

export default () =>
{
    return(
        //Two sets of braces for Javascript
        //and object literal
        <Menu style={{marginTop: '10px'}}>
            <Link route="/">
                <a className= "item">
                    Personal AMM
                </a>
            </Link>

            <Menu.Menu position = "right">
            <Link route="/">
                <a className= "item">AMMs</a>
            </Link>
            <Link route="/campaigns/new">
                <a className= "item">+</a>
            </Link>
            </Menu.Menu>
        </Menu>
    )
}