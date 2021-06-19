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

/**
 * This line performs a bug fixer. I don't know why, but it seems
 * the need to call once bootstrap to be working on the page. 
 * It's isn't enough by importing it.
 * 
 */
console.log(bootstrap);

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);

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


function App(){
    /**TOGGLER */
    const [openWriteSpace, setOpenWriteSpace] = useState(false);

    /**WRITE MEMORY SPACE STATES */
    const [writeSpaceValue, setWriteSpaceValue] = useState("");
    const [title, setTitle] = useState("");
    const [memoryVisibility, setMemoryVisibility] = useState("public");
    const [diarieGroup,  setDiarieGroup] = useState("");

    const [memory, setMemory] = useState<Memory>({
        title: "",
        content: "",
        visibility: "public"
    } as Memory);

    return (
        <div>
            <AddFloatButton _onClick={() => setOpenWriteSpace(!openWriteSpace)}/>

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
                                value={diarieGroup}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDiarieGroup(e.target.value)}
                            >
                                {Object.keys(VISIBILITY).map(visibility => {
                                    return (<option value={visibility} key={visibility}>
                                        {VISIBILITY[visibility]}
                                    </option>)
                                })}

                            </TextField>
                        </div>

                    </div>

                    <div className="mt-3 row">
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon/>}
                        onClick= {() => console.log("adw")}
                    >
                        Share memory 
                    </Button>
                    </div>

                </div>
                }

           

        </div>
    )
}



