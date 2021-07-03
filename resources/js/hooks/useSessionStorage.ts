import {useRef} from "react";

export default function useSessionStorage(key:string):[any, (newValue:any)=>void]{

    const value = useRef(sessionStorage.getItem(key));

    
    const setValue = (newValue:any):void => {
        sessionStorage.setItem(key, newValue);
    }

    return [value.current, setValue];
}