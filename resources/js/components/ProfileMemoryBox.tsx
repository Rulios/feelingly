import React, {useEffect, useState} from "react";
import Memory from "../types/Memory";
import VISIBILITY_TYPES from "../utils/VISIBILITY_TYPES";    
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(utc);

interface UnOmittedProps extends Memory{
    diaryName: string;
    onClick(): void;
}

//omits the unnecesary fields
type Props = Omit <UnOmittedProps, "user_id" | "diary_id" | "updated_at">;

console.log(dayjs().utc().format());
export default function ProfileMemoryBox({
    id, title, content, visibility, created_at, diaryName, onClick
}: Props){
    console.log(created_at);
    return (
        <div className="col-md-6">
            <div className="box px-2">
                <div id="titleAndInformation">

                    <div className="date">
                        {dayjs(created_at).utc().fromNow()}
                    </div>

                    <br/>

                    <div id="title" className="truncate" >
                        <b>
                            {title}
                        </b>
                    </div>

                    <div id="visibility" className="visibilityFont">
                        {VISIBILITY_TYPES[visibility]}
                    </div>

                    <div id="diaryName">
                        {diaryName}
                    </div>
                </div>

                <hr/>

                <p id="content" className="truncate" dangerouslySetInnerHTML={{__html: content}}>
                </p>

            </div>
        </div>
    );
}