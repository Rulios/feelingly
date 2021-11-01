import { useEffect, useState } from "react";
import Memory from "../types/Memory";
import ReactQuill from 'react-quill';
import TOOLBAR from "../quill-editor-configs/toolbar";
import TextField from "@material-ui/core/TextField";
import useAlias from "../hooks/useAlias";
import useDiaries from "../hooks/useDiaries";

import InputAdornment from '@material-ui/core/InputAdornment';

type Props = {
    memory: Memory;
    setMemory(updatedMemory: Memory): void;
    isAReply?: boolean;
};

const VISIBILITY:any = {
    public: "Public",
    private: "Private"
};



export default function WriteMemoryModal({memory, setMemory, isAReply}: Props){

    const alias = useAlias("self");

    /**Get self user alias priority to be the sessionStorage, 
    * if not, use the DOM tag one passed through props */
     const [statusDiaries, diaries, errorDiaries] = useDiaries(alias);

    useEffect(() => {
        /**Performs a validation to set default memory's diary id. If memory's diary id is 
         * empty, it should be filled with a default value.
         */
        if(!memory.diary_id && diaries){
            setMemory({...memory, diary_id: diaries![0].id});
        }
    }, [diaries]);

    return (
        <div>
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

            <ReactQuill theme="snow" 
               
                value={memory.content}
                onChange={(text) => setMemory({...memory, content: text})}
                modules={{
                    toolbar: TOOLBAR
                }}
            />

            <div className="mt-2 row p-2">

                <div className="col-lg-2">
                    <TextField select label="Visibility" id="memoryVisibility" 
                        helperText="Select the visibility for this memory"
                        SelectProps={{
                            native: true,
                            children: []
                        }}
                        value={memory.visibility}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setMemory({...memory, visibility: e.target.value})}
                    >
                        {Object.keys(VISIBILITY).map(visibility => {
                            return (<option value={visibility} key={visibility}>
                                {VISIBILITY[visibility]}
                            </option>)
                        })}
                    </TextField>
                </div>

                <div className="col-lg-2">
                    <TextField select label="Diarie Group" id="diarieGroup" 
                        helperText="Select the diarie to store this memory"
                        SelectProps={{
                            native: true,
                            children: []
                        }}
                        value={memory.diary_id ?? diaries![0].id ?? ""}
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
                            diaries && 
                            diaries.map(({id, name}, i) => {
                                return <option key={`Diary${id}`} value={id}>{name}</option>
                            })
                        }

                    </TextField>
                </div>
            </div>
        </div>
    )
}