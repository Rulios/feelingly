import WriteMemoryFields from "./WriteMemoryFields";
import Memory from "../types/Memory";
import {useState, useEffect} from "react";
import AddFloatButton from "./AddFloatButton";

import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloseModalButton from "./CloseModalButton";

import useModal from "../hooks/useModal";

import Modal from "react-modal";

import axios from "axios";

type Props = {
    closeModal(): void;
    open: boolean;
}

Modal.setAppElement('#root');

export default function AddNewMemoryBundle(){

    const {open, openModal, closeModal} = useModal();

    
    return(
        <div className="mt-5">

            <div>
                <AddFloatButton _onClick={openModal}/>
            </div>

            <NewMemoryModal closeModal={closeModal} open={open}/>
        </div>
    );
}

function NewMemoryModal({open, closeModal}: Props){
    const [memory, setMemory] = useState<Memory>({
        title: "",
        content: "",
        visibility: "public",
        diary_id: ""
    } as Memory);


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
        <Modal isOpen={open}>
            <div className="c-modal">     

                <div className="content p-3">

                    <div className="sticky-top">
                        <CloseModalButton onClick={closeModal}/>
                    </div>

                    <WriteMemoryFields
                        memory={memory}
                        setMemory={setMemory}
                    />
                    


                    <div className="mt-3 p-3 row">
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
        </Modal>
    );
}