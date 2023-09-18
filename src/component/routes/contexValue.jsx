
import * as React from "react";
import { Context } from './../../routes/root';
export const ContextValue = () => {
    return <Context.Consumer>

        {({ name }) => <h2>{name}</h2>}
    </Context.Consumer>
}