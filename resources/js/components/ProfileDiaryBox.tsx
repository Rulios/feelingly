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
    diary : {id, name, visibility, created_at},
    onClick
}: Props){


    return (
        <button className="col-md-6 noDecorationButton" onClick={onClick}>
            <div className="box p-2">
                <div id="titleAndInformation">

                    <div className="date">
                        {dayjs(created_at).utc().fromNow()}
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
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </div>

                </div>
            </div>
        </button>
    );
}