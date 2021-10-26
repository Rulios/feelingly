import "bootstrap";
import $ from "jquery";
import ReactDOM from "react-dom";
import React, {FC, useState, useEffect, memo} from "react";

import AddNewMemoryModal from "./components/AddNewMemoryModal";

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

    
    
    return (
        <AddNewMemoryModal/>
    );
}



