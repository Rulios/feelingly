import Memory from "../types/Memory";
import {useState, useEffect} from "react";
import useDiaries from "../hooks/useDiaries";
import useAlias from "../hooks/useAlias";

import WriteMemoryModal from "./WriteMemoryModal";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloseModalButton from "./CloseModalButton";

import axios from "axios";

type Props = {
    handleClose: () => void;
    reply_to: string | number | undefined;
};

export default function AddNewReplyMemoryModal({handleClose, reply_to}: Props){

    const alias = useAlias("self");

    const [memory, setMemory] = useState<Memory>({
        title: "",
        content: "",
        visibility: "public",
        diary_id: "",
        reply_to_memory_id: reply_to
    } as Memory);

    /**
     * TO DOOO FINISH THIS COMPONENET
     */

    const submitReplyMemory = ():void => {
        axios.post("/memories/reply", {...memory})
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
        <div className="c-modal c-modal-index-3">     
        
            <div className="content p-3">
            
                <div className="sticky-top">
                    <CloseModalButton onClick={handleClose}/>
                </div> 

                <WriteMemoryModal
                    memory={memory}
                    setMemory={setMemory}
                    isAReply={true}
                />
                
                <div className="mt-3 p-3 row">
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon/>}
                        onClick= {submitReplyMemory}
                    >
                        Share reply
                    </Button>
                </div>

            </div>  
        </div>
    );
}