import {createContext} from 'react';
import useAlias from '../hooks/useAlias';

/**
 * This context stores data that is usually not rendered, but useful
 * when rendering and determining things. 
 */

const HiddenContext = createContext({
    selfAlias: "",
    targetAlias: ""
});
/* 
export function HiddenContextProvider(props: any){
    return (
        <HiddenContext.Provider value={{
            ...props.value
        }}>

            {props.children}

        </HiddenContext.Provider>
    )
}

export let HiddenContextConsumer = HiddenContext.Consumer;

 */


export default HiddenContext;