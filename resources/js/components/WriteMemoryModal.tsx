import Memory from "../types/Memory";
import Diary from "../types/Diary";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Input from "@material-ui/core/Input";
import TOOLBAR from "../quill-editor-configs/toolbar";
import TextField from "@material-ui/core/TextField";
import { withWidth } from "@material-ui/core";


type Props = {
    memory: Memory;
    setMemory(updatedMemory: Memory): void;
    diaries: Diary[] | undefined;
};

const VISIBILITY:any = {
    public: "Public",
    private: "Private"
};


/**
 * TO DO LIST
 * 
 * - Change the style of the TitleInput. 
 *      This needs to be wider as the parent container.
 *      Meet the roboto-slab font requirements
 *      Change Font Size to 2em
 * 
 */


export default function WriteMemoryModal({memory, setMemory, diaries}: Props){
    return (
        <div>
            <div >
                <Input id="memoryTitle" 
                    placeholder="This memory's title"
                    className="mb-3"
                    value={memory.title}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setMemory({...memory, title: e.target.value})}
                    style={{
                        width: "100%"
                    }
                    }
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
        </div>
    )
}