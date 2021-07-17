import $ from "jquery";
import bootstrap from "bootstrap";
import useMemories from "./hooks/useMemories";
import ProfileButtonNavigation from "./components/ProfileButtonNavigation";
import React from "react";
import ReactDOM from "react-dom";

/**
 * This line performs a bug fixer. I don't know why, but it seems
 * the need to call once bootstrap to be working on the page. 
 * It's isn't enough by importing it.
 * 
 */
 console.log(bootstrap);

 window.onload = function(){

    ReactDOM.render(
        <App/>,
        document.getElementById("root")
    );

 };


 function App(){

    //TO DO: LIFT THE STATE FROM PROFILEBUTTONNAVIGATION TO HANDLE IT HERE

    return (
        <div>
            <div className="row mt-5">
            <ProfileButtonNavigation/>
            </div>

            <div>
                
            </div>
        </div>
    );

 }

 function WrittenMemoriesFeed(){
     return (
        <div>

        </div>
     );
 }

