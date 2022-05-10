import ReactDOM from "react-dom";
import React from "react";
import { observer } from "mobx-react";

interface IPortal {
    children: React.ReactNode;
}

const Portal: React.FC<IPortal> = ({ children }) => {

    const el = document.getElementById('portal') as HTMLElement;

    return ReactDOM.createPortal(children, el);
};

export default observer(Portal);