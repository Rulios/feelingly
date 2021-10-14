import WriteMemoryModal from "./WriteMemoryModal";
import Memory from "../types/Memory";
import {useState, useEffect} from "react";
import useDiaries from "../hooks/useDiaries";
import useAlias from "../hooks/useAlias";
import AddFloatButton from "./AddFloatButton";

import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import axios from "axios";

type Props = {

};

export default function AddNewMmoryModal(){

    const alias = useAlias("self");

    const [openWriteModal, setOpenWriteModal] = useState(false);

    const [memory, setMemory] = useState<Memory>({
        title: "",
        content: "",
        visibility: "public",
        diary_id: ""
    } as Memory);

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

    return(
        <div className="mt-5">

            {/* <div>
                <AddFloatButton _onClick={() => setOpenWriteModal(!openWriteModal)}/>
            </div> */}

            <div>
                <WriteMemoryModal
                    memory={memory}
                    setMemory={setMemory}
                    diaries={diaries}
                />

                <div className="mt-3 row">
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon/>}
                        onClick= {submitMemory}
                    >
                        Share memory 
                    </Button>
                </div>
            </div>

        </div>
    );
}