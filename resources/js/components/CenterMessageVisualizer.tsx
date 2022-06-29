import React, {useState, useEffect, FC} from "react";




type Props = {

    message: string; 
    media?: React.ReactNode; //can be a img, video, any media component
    shouldBlink?: boolean;

};

/**
 * Description: 
 *  
 * This component renders in the center of x and y axis of any parent component. With fixed top margin. 
 * It is used to display a message to the user. 
 * 
 * E.g. of use cases: 
 *  - When there is an error loading something
 *  - When there're no memories to display 
 *  - When the component is loading
 * 
 * Pre-requisite to use this component: 
 * - Should include to the view, the aniamtions/Blink.scss file
 */
export default function CenterMessageVisualizer({message, media, shouldBlink}: Props){

    return (
        <>

            <div className={`text-center mt-5  ${shouldBlink ? "blink-me" : ""}`}
            >
                {media}
                {message}
            </div>

        </>
    );

};