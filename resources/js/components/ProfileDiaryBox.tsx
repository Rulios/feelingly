import React, {useEffect, useState} from "react";
import VISIBILITY_TYPES from "../utils/VISIBILITY_TYPES";    
import dayjs from "dayjs";
import Diary from "../types/Diary";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);


type Props = {
    diary: Diary;
    onClick():void;
};

export default function ProfileDiaryBox({
    diary : {id, name, description, visibility, created_at},
    onClick
}: Props){


    return (
        <button className="col-md-6 noDecorationButton" onClick={onClick}>
            <div className="box p-2">
                <div id="titleAndInformation">

                    <div className="date">
                        {dayjs(created_at).utc(true).fromNow()}
                    </div>

                    <br/>

                    <div id="name" className="truncate lead" >
                        <b>
                            {name}
                        </b>
                    </div>


                    <div id="visibility" className="visibilityFont">
                        {VISIBILITY_TYPES[visibility]}
                    </div>

                    <hr/>

                    <div id="description">
                        {description}
                    </div>

                </div>
            </div>
        </button>
    );
}