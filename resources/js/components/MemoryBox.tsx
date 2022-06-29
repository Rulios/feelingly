import React, {useEffect, useState, useRef} from "react";
import Memory from "../types/Memory";
import VISIBILITY_TYPES from "../utils/VISIBILITY_TYPES";    
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import parseHTML from "html-react-parser";

import UserProfileImage from "./UserProfileImage";

dayjs.extend(relativeTime);
dayjs.extend(utc);

type Props = {
    memory: Memory;
    showProfileImage?: boolean;
    onClick(): void;
}


export default function MemoryBox({
    memory: {id, title, content, visibility, created_at, diary_name, 
        user_alias, user_profile_image},
    showProfileImage = false,
    onClick
}: Props){

    //FIXES A BUG WHERE THE MEMORY MODAL POPPED UP WHEN THE USER
    //CLICKED ON THE AUTHOR SECTION
    const hasClickedAuthor = useRef(false);

    return (
        <button className="box noDecorationButton mb-3" onClick={() => {
            if(!hasClickedAuthor.current) onClick();
        }}>
            <div className={`p-2`}>
                <div id="titleAndInformation">

                    <div className="" onClick={() => hasClickedAuthor.current = true}>
                        <div className="author">
                            <a href={`/profile/${user_alias}`} className="text-decoration-none" >

                                    {showProfileImage && 
                                        <span style={{float:"left"}}>
                                            <UserProfileImage image_url={user_profile_image} size={30}/>
                                        </span>
                                    }

                                    

                                    <span className="m-2">
                                        {`${user_alias}`}
                                    </span>
                            </a> 
                        </div>

                        <div className="date">
                            {dayjs(created_at).utc(true).fromNow()}
                        </div>
                    </div>

                    
                    <br />
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

                <div id="content" className="truncate">
                    {parseHTML(content)}
                </div>

            </div>
        </button>
    );
}