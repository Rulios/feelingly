import { useEffect, useMemo, useState } from "react";
import Memory from "../types/Memory";
import Diary from "../types/Diary";

import ReactQuill from 'react-quill';
import TOOLBAR from "../quill-editor-configs/toolbar";

import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

import useAlias from "../hooks/useAlias";
import useDiaries from "../hooks/useDiaries";


import VISIBILITY from "../utils/VISIBILITY_TYPES";

//to read and modification of the memory
type MemoryUtils = {
    memory: Memory;
    setMemory(updatedMemory: Memory): void;
}

interface Props extends MemoryUtils{
    isAReply?: boolean;
};




export default function WriteMemoryFields({memory, setMemory, isAReply}: Props){

    const alias = useAlias("self");


     const [statusDiaries, diaries, errorDiaries] = useDiaries(alias);
     console.log(diaries);

    useEffect(() => {
        /**Performs a validation to set default memory's diary id. If memory's diary id is 
         * empty, it should be filled with a default value.
         */
        if(!memory.diary_id && diaries?.length){
            setMemory({...memory, diary_id: diaries![0].id});
        }
    }, [diaries]);

    /**
     * FIX THIS COMPONENT SELECTS FIELDS TO DOOOOOOOOOOOOOO
     */

    return (
        <div>
            
            <MemoryTitleField memory={memory} setMemory={setMemory} isAReply={isAReply}/>

            <ReactQuill theme="snow" 
               
                value={memory.content}
                onChange={(text) => setMemory({...memory, content: text})}
                modules={{
                    toolbar: TOOLBAR
                }}
            />

            <div className="mt-2 row p-2">

                <div className="col-lg-2">
                    <MemoryVisibilityField memory={memory} setMemory={setMemory}/>                    
                </div>

                <div className="col-lg-2">
                   {
                        <MemoryDiarySelectorField memory={memory} setMemory={setMemory} diaries={diaries}/>
                   } 
                </div>
                
            </div>
        </div>

    
    );
}



/**
 * @param param0 
 * @returns 
 */
function MemoryTitleField({memory, isAReply, setMemory}: Props){
    return (
        <div >
            <TextField id="memoryTitle" 
                placeholder="This memory's title"
                className="mb-3 roboto-slab-font"
                value={memory.title}
                fullWidth
                InputProps={{
                    classes: {
                        input: "roboto-slab-font h2"
                    },
                    startAdornment: (isAReply ? <InputAdornment position="start">Reply |</InputAdornment> : null) 
                }}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setMemory({...memory, title: e.target.value})}
            />
        </div>
    )
}

function MemoryVisibilityField({memory, setMemory}: MemoryUtils){

    const visibilityReferences: string[] = Object.keys(VISIBILITY);
    const DEFAULT_VISIBILITY = visibilityReferences[0];

    return (
        <TextField select label="Visibility" id="memoryVisibility" 
            helperText="Select the visibility for this memory"
            value={(memory.visibility) ? memory.visibility : DEFAULT_VISIBILITY}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setMemory({...memory, visibility: e.target.value})}
        >
            {visibilityReferences.map(visibility => {
                return (<MenuItem value={visibility} key={visibility}>
                    {VISIBILITY[visibility]}
                </MenuItem>)
            })}
        </TextField>
    );
}

interface MemoryDiarySelectorFieldProps extends MemoryUtils{
    diaries: Diary[] | undefined;
}

function MemoryDiarySelectorField({memory, setMemory, diaries}: MemoryDiarySelectorFieldProps){

    let defaultDiary: string = "";

    if(diaries?.length){
        //defaultDiary = diaries[0].id;
        console.log("There're no diaries")
    } 

    return (
        <TextField select label="Diarie Group" id="diarieGroup" 
            helperText="Select the diarie to store this memory"
            value={(memory.diary_id) ? memory.diary_id : defaultDiary }
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                /**
                 * Verifies that the diary id selected is available on diaries[]
                 */

                for(let i = 0; i < diaries!.length; i++){
                    if(diaries![i].id == e.target.value){
                        setMemory({...memory, diary_id: diaries![i].id});
                        break;
                    }
                }
            }}
        >
            {   
                diaries?.map(({id, name}, i) => {
                    return <MenuItem key={`Diary${id}`} value={id}>{name}</MenuItem>
                })
            }

        </TextField>
    );
}