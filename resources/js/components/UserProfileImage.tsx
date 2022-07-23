import PATHS from "../utils/PATHS";
import {useState, useEffect} from "react";
import { ContactsOutlined } from "@material-ui/icons";

import Avatar from '@mui/material/Avatar';

interface Props{
    user?: string;
    url: string | null | undefined;
    className?: string;
}

/**
 * Rounded Profile Image
 * 
 * @param param0 
 * @returns 
 */


const DEFAULT_AVATAR = `${PATHS.ROOT}/${PATHS.DEFAULT_PROFILE_IMAGE}`;

export default function UserProfileImage({url, user, className}: Props){

    const [URL, setURL] = useState(DEFAULT_AVATAR);

    useEffect(() => {
        if(url){
            setURL(`${PATHS.ROOT}${url}`);
        }else{
            setURL(DEFAULT_AVATAR);
        }
    }, [url]);



    return (
        <Avatar src={URL} className={`rounded-circle ${className}`} 
            alt={`${user} profile image`}
        />
    )

}