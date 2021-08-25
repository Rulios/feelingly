import React, {useState, useEffect} from "react";
import useSessionStorage from "./useSessionStorage";
import { SELF_USER_ALIAS, TARGET_USER_ALIAS } from "../utils/SESSION_STORAGE_NAMES";

/**
 * Gets the alias depending on the type. 
 * 
 * Types of alias used in production: 
 *  - Self: refers to the own alias if logged in
 *  - Target: refers to the alias of another user that can be targeted. 
 *          Example, when one user visits another user profile's page. The visited user will be the target alias.
 * 
 * How do the app gets the alias?
 * 
 * - First it's checked whether it's on a hidden field rendered by backend.
 * - Second, if it's not on the rendered template, it's got by checking the sessionStorage
 * @param aliasType 
 */

type AliasTypes = "self" | "target";


export default function useAlias(aliasType: AliasTypes):string{

    const [alias, setAlias] = useState("");

    useEffect(() => {   
        let aliasGotByDOM: string = "";
        let aliasGotBySessionStorage: string = "";

        
        aliasGotByDOM = getAliasByDOM(aliasType);
        if(aliasGotByDOM){
            setAlias(aliasGotByDOM);
        }else{
            aliasGotBySessionStorage = getAliasBySessionStorage(aliasType);
            setAlias(aliasGotBySessionStorage);
        }

    }, []);

    return alias;
}

/**TO DOO, FINISH THIS FILE */

function getAliasByDOM(aliasType: AliasTypes):string {
    let aliasGotByDOM:string = "";

    switch(aliasType){
        case "self":    
            aliasGotByDOM = (document.getElementById(SELF_USER_ALIAS) as HTMLInputElement).value;
        break;

        case "target":
            aliasGotByDOM = (document.getElementById(TARGET_USER_ALIAS) as HTMLInputElement).value;
        break;  
    }
    return aliasGotByDOM;
}

function getAliasBySessionStorage(aliasType: AliasTypes):string{
    let aliasBySessionStorage: string = "";

    switch(aliasType){
        case "self":    
            aliasBySessionStorage = useSessionStorage(SELF_USER_ALIAS)[0];
        break;

        case "target":
            aliasBySessionStorage = useSessionStorage(TARGET_USER_ALIAS)[0];
        break;  
    }
    return aliasBySessionStorage;
}