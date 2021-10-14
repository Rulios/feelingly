import "bootstrap";
import $ from "jquery";
import ReactDOM from "react-dom";
import React, {FC, useState, useEffect, memo} from "react";

import AddNewMmoryModal from "./components/AddNewMemoryModal";

import axios from "axios";
import useAlias from "./hooks/useAlias";



window.onload = () =>{


    ReactDOM.render(
        <App/>,
        document.getElementById("root")
    );
}



function App(): JSX.Element{
    /**TOGGLER */

    const selfUserAlias = useAlias("self");

    
    
    return (
        <AddNewMmoryModal/>
    );
}



