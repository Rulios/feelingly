import Memory from "../types/Memory";
import {useState, useEffect} from "react";
import useAlias from "../hooks/useAlias";

import WriteMemoryFields from "./WriteMemoryFields";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloseModalButton from "./CloseModalButton";


import Modal from "react-modal";

import axios from "axios";

type Props = {
    handleClose: () => void;
    reply_to: string | number | undefined;
    open: boolean;
};

Modal.setAppElement('#root');

export default function AddNewReplyMemoryModal({open, handleClose, reply_to}: Props){


    const [memory, setMemory] = useState<Memory>({
        title: "",
        content: "",
        diary_id: "",
        reply_to_memory_id: reply_to
    } as Memory);

    /**
     * TO DOOO FINISH THIS COMPONENET
     */

    const submitReplyMemory = function():void {

        console.log(memory);
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
        <Modal isOpen={open}>

            <div className="c-modal ">     
            
                <div className="content p-3">
                
                    <div className="sticky-top">
                        <CloseModalButton onClick={handleClose}/>
                    </div> 

                    <WriteMemoryFields
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
        </Modal>
    );
}