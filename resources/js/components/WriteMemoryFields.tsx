import { useEffect, useMemo, useState } from "react";
import Memory from "../types/Memory";
import Diary from "../types/Diary";

import ReactQuill from 'react-quill';
import TOOLBAR from "../quill-editor-configs/toolbar";

import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import MemoryLengthCounter from "./MemoryLengthCounter";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";


import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";

import {makeStyles} from "@material-ui/core/styles";

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
            

            <div className="row">
                <div className="col-12">
                    <MemoryTitleField  isAReply={isAReply}/>
                </div>
            </div>

            <div className="mt-2 row p-2">

                <div className="col-3">
                    <MemoryVisibilityField/>     
                </div>

                <div className="col-6 mt-1">
                        <MemoryDiarySelectorField diaries={diaries}/>
                </div>

                
            </div>
            
            <div className="mt-2 row position-relative">
                <div className="col-12">
                    <ContentField/>
                </div>
            </div>
        </>

    
    );
}


/**
 * Memory's content field
 * 
 * This field will have a fixed height of 100px, and it will grow with the content
 * until it reaches the end of the bottom of the screen. Then, scrollbar should appear. 
 * @returns 
 */
function ContentField(){
    const [field, meta] = useField("content");
    


    return (
        <>
            <textarea 
                placeholder="Click here to start writing!" 
                className="textarea w-100 "
                value={field.value}
                onChange={field.onChange(field.name)}
                spellCheck={true}
            >

            </textarea>

            {meta.touched && meta.error ? <div className="text-danger error-message">{meta.error}</div> : null}
        </>
    )
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



const useStyles = makeStyles((theme) => ({
    selected: {
      "&&": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
      }
    }
}));

/**
 * 
 * TO DO: Change the dropdown to a Icon Button select element
 * 
 * @param param0 
 * @returns 
 */

function MemoryVisibilityField({...props}: any){

    const [field, meta, helpers] = useField("visibility");

    const visibilityReferences: string[] = Object.keys(VISIBILITY);

    let {setValue} = helpers;

    

      const classes = useStyles();
    return (
        <ToggleButtonGroup
            size="small"
            exclusive
            color="primary"
            value={field.value}
            aria-label="memory visibility"
            onChange={(_, newValue) => setValue(newValue)}
        >
            <Tooltip title="Public">
                <ToggleButton value={visibilityReferences[0]} aria-label={visibilityReferences[0]}  classes={{ selected: classes.selected }} >
                    <PublicIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Private">
                <ToggleButton value={visibilityReferences[1]} aria-label={visibilityReferences[1]}  classes={{ selected: classes.selected }}>
                    <PublicOffIcon/>
                </ToggleButton>
            </Tooltip>
        </ToggleButtonGroup>
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