import PATHS from "../utils/PATHS";
import {useState, useEffect} from "react";
import { ContactsOutlined } from "@material-ui/icons";

interface Props{
    image_url: string | null | undefined;
    size: number; // specified in px
}


/**
 * Rounded Profile Image
 * 
 * @param param0 
 * @returns 
 */


const DEFAULT_AVATAR = `${PATHS.ROOT}/${PATHS.DEFAULT_PROFILE_IMAGE}`;

export default function UserProfileImage({image_url, size}: Props){

    const [URL, setURL] = useState(DEFAULT_AVATAR);

    useEffect(() => {
        if(image_url){
            setURL(`${PATHS.ROOT}${image_url}`);
        }else{
            setURL(DEFAULT_AVATAR);
        }
    }, [image_url]);


    console.log(URL);

    return (
        <img src={URL} className="rounded-circle" 
            alt="User Profile Image" 
            width={size} height={size}/>
    )

}