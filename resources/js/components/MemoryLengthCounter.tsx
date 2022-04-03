import {useEffect, useState} from "react";
import stripHTML from "../utils/stripHTML";

import {MEMORY_MIN_LENGTH} from "../utils/MEMORY_CONSTANTS";
import  StrippedHTMLCounter from "./StrippedHTMLCounter";

type Props = {
    html: string;
};


export default function MemoryLengthCounter(props: Props){

    let isMemoryLessThanMinLength = stripHTML(props.html).length < MEMORY_MIN_LENGTH;

    return (
        <div className={`${isMemoryLessThanMinLength ? "text-danger" : "text-dark"}`}>
            <StrippedHTMLCounter html={props.html}/>
            /{MEMORY_MIN_LENGTH}
        </div>
    );

}