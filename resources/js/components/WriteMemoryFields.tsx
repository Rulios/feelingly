import { useEffect, useMemo, useState } from "react";
import Memory from "../types/Memory";
import Diary from "../types/Diary";

import ReactQuill from 'react-quill';
import TOOLBAR from "../quill-editor-configs/toolbar";

import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import MemoryLengthCounter from "./MemoryLengthCounter";

import useAlias from "../hooks/useAlias";
import useDiaries from "../hooks/useDiaries";
import { Formik, Form, useField, useFormik } from 'formik';


import VISIBILITY from "../utils/VISIBILITY_TYPES";



interface Props{
    diaries: Diary[]; //used to fill the dropdown
    isAReply?: boolean ;
};

export default function WriteMemoryFields({diaries, isAReply}: Props){

    

    return (
        <>
            
            <MemoryTitleField  isAReply={isAReply}/>


            <div className="mt-2 row p-2">

                <div className="col-lg-2">
                    <MemoryVisibilityField/>                    
                </div>

                <div className="col-lg-2 mt-1">
                   {
                        <MemoryDiarySelectorField diaries={diaries}/>
                   } 
                </div>
                
            </div>

            <ContentField/>
            
        </>

    
    );
}


function ContentField(){
    const [field, meta] = useField("content");

    return (
        <>
            <ReactQuill theme="snow" 
                modules={{
                    toolbar: TOOLBAR
                }}
                value={field.value}
                onChange={field.onChange(field.name)}
                style={{height: "50vw"}}
                
            />
            <MemoryLengthCounter html={field.value}/>
            {meta.touched && meta.error ? <div className="text-danger error-message">{meta.error}</div> : null}
        </>
    );
}




type MemoryTitleFieldProps = {
    isAReply?: boolean;
};

/**
 * @param param0 
 * @returns 
 */
function MemoryTitleField({isAReply}: MemoryTitleFieldProps){

    const [field, meta, helpers] = useField<string>("title"); 
    
    return (
        <div >
            <TextField id="memoryTitle" 
                placeholder="This memory's title"
                className="mb-3 roboto-slab-font"
                fullWidth
                InputProps={{
                    classes: {
                        input: "roboto-slab-font h2"
                    },
                    startAdornment: (isAReply ? <InputAdornment position="start">Reply |</InputAdornment> : null) 
                }}
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : null}
             
                {...field}
            />
        </div>
    );

}

function MemoryVisibilityField({...props}: any){

    const [field, meta] = useField("visibility");

    const visibilityReferences: string[] = Object.keys(VISIBILITY);
    const DEFAULT_VISIBILITY = visibilityReferences[0];

    return (
        <TextField select label="Visibility" id="memoryVisibility" 
            helperText="Select the visibility for this memory"
            {...field}
        >

            {visibilityReferences.map(visibility => {
                return (<MenuItem value={visibility} key={visibility}>
                    {VISIBILITY[visibility]}
                </MenuItem>)
            })}
            
        </TextField>
    );
}


interface MemoryDiarySelectorFieldProps {
    diaries: Diary[] ;
}

function MemoryDiarySelectorField({diaries}: MemoryDiarySelectorFieldProps){

    const [field, meta] = useField("diary_id");

    return (
        <TextField select label="Diarie Group" id="diarieGroup" 
            helperText="Select the diarie to store this memory"
            error={meta.touched && meta.error ? true : false}
            {...field}
   
        >
            {   
                diaries?.map(({id, name}, i) => {
                    return <MenuItem key={`Diary${id}`} value={id}>{name}</MenuItem>
                })
            }

        </TextField>
    );
}