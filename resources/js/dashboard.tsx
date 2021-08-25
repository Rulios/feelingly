import $ from "jquery";
import bootstrap from "bootstrap";
import ReactDOM from "react-dom";
import React, {FC, useState, useEffect, memo} from "react";
import AddFloatButton from "./components/AddFloatButton";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TOOLBAR from "./quill-editor-configs/toolbar";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Memory from "./types/Memory";

import {SELF_USER_ALIAS} from "./utils/SESSION_STORAGE_NAMES";

import axios from "axios";
import useDiaries from "./hooks/useDiaries";
import useAlias from "./hooks/useAlias";

/**
 * This line performs a bug fixer. I don't know why, but it seems
 * the need to call once bootstrap to be working on the page. 
 * It's isn't enough by importing it.
 * 
 */
console.log(bootstrap);

window.onload = () =>{

    /**
     * Get the self alias from a hidden input to store it at
     * sessionStorage, this will help us to build custom requests
     */
    let selfAliasDOM:string  = (document.getElementById("s_user_alias") as HTMLInputElement).value;


    ReactDOM.render(
        <App/>,
        document.getElementById("root")
    );
}



/**
 * TO DO LIST
 * 
 * - Change the style of the TitleInput. 
 *      This needs to be wider as the parent container.
 *      Meet the roboto-slab font requirements
 *      Change Font Size to 2em
 * 
 */

const VISIBILITY:any = {
    public: "Public",
    private: "Private"
};




function App(): JSX.Element{
    /**TOGGLER */
    const [openWriteSpace, setOpenWriteSpace] = useState(false);

    const selfUserAlias = useAlias("self");



    const [memory, setMemory] = useState<Memory>({
        title: "",
        content: "",
        visibility: "public",
        diary_id: ""
    } as Memory);

    /**Get self user alias priority to be the sessionStorage, 
     * if not, use the DOM tag one passed through props */
    const [statusDiaries, diaries, errorDiaries] = useDiaries(selfUserAlias);

    
    useEffect(() => {
        /**Performs a validation to set default memory's diary id. If memory's diary id is 
         * empty, it should be filled with a default value.
         */
        if(!memory.diary_id && diaries){
            setMemory({...memory, diary_id: diaries![0].id});
        }
    }, [diaries]);


    const submitMemory = ():void => {
        console.log(memory);
        axios.post("/memories/new", {...memory})
        .then(({data : {status_message}, status}) => {

            switch(status){
                case 200:
                    console.log(`${status_message}`);
                break;

                case 500:
                    throw new (status_message);
                break;
            }

        
        }).catch(err =>{
            alert(err);
        });
    }
    
    return (
        <div>
            <AddFloatButton _onClick={() =>{
                setOpenWriteSpace(!openWriteSpace)
            } }/>

            <div>
                {/* feed div */}
            </div>

            {openWriteSpace && 
                <div className="mt-5">
                    <div>
                        <Input id="memoryTitle" 
                            placeholder="This memory's title"
                            className="mb-3"
                            value={memory.title}
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

                    <div className="mt-3 row">
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon/>}
                        onClick= {() => submitMemory()}
                    >
                        Share memory 
                    </Button>
                    </div>

                </div>
                }

           

        </div>
    );
}



