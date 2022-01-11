import React, {useState, useEffect} from "react";
import {createPortal} from "react-dom";


type Props = {
    children: JSX.Element;
};

const Z_INDEX_GAP = 10;

/**
 * This component ensures that the modal is always rendered on top of the rest of the page.
 * Using React's Portals
 * 
 * Reasons to use this component:
 *  - Fixes the issue of having nested modal, and not being showed at fixed to viewport
 *      because parent element has any transform css property applied.
 */
export default function FixedModal({children}: Props){

    let modalRoot = document.getElementById("modal");
    let zIndex = 0;

    console.log(modalRoot?.children);

    if(modalRoot){
        //calculates the z-index for the appended modal
        zIndex = modalRoot.childElementCount * Z_INDEX_GAP;
    }else{
        //creates a div to be used as the portal
        modalRoot = document.createElement("div");
        modalRoot.setAttribute("id", "modal");
        document.body.appendChild(modalRoot);
    }

    const modalElement = document.createElement("div");
    modalElement.style.zIndex = zIndex.toString();

    
    useEffect(() => {
        modalRoot?.appendChild(modalElement);
        
        return function cleanup(){
            modalRoot?.removeChild(modalElement);
        }
    });

    return createPortal(children, modalElement);
}