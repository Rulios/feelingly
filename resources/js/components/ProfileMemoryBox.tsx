import React, {useEffect, useState} from "react";
import Memory from "../types/Memory";
import VISIBILITY_TYPES from "../utils/VISIBILITY_TYPES";    
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import parseHTML from "html-react-parser";

dayjs.extend(relativeTime);
dayjs.extend(utc);

type Props = {
    memory: Memory;
    onClick(): void;
}


export default function ProfileMemoryBox({
    memory: {id, title, content, visibility, created_at, diary_name},
    onClick
}: Props){


    return (
        <button className="col-md-6 noDecorationButton" onClick={onClick}>
            <div className="box memory-box p-2">
                <div id="titleAndInformation">

                    <div className="date">
                        {dayjs(created_at).utc(true).fromNow()}
                    </div>

                    <br/>

                    <div id="title" className="truncate lead" >
                        <b>
                            {title}
                        </b>
                    </div>

                    <div id="visibility" className="visibilityFont">
                        {VISIBILITY_TYPES[visibility]}
                    </div>

                    <div id="diary_name">
                        <i>
                            {`in ${diary_name}`}
                        </i>
                    </div>
                </div>

                <hr/>

                <p id="content" className="truncate">
                    {parseHTML(content)}
                </p>

            </div>
        </button>
    );
}