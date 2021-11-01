import WriteMemoryModal from "./WriteMemoryModal";
import Memory from "../types/Memory";
import {useState, useEffect} from "react";
import AddFloatButton from "./AddFloatButton";

import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloseModalButton from "./CloseModalButton";

import axios from "axios";

type Props = {

};

export default function AddNewMemoryModal(){

    const [openWriteModal, setOpenWriteModal] = useState(false);

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
        <div className="mt-5">

            <div>
                <AddFloatButton _onClick={() => setOpenWriteModal(!openWriteModal)}/>
            </div>

            {openWriteModal && 

                <div className="c-modal c-modal-index-3">     

                    <div className="content p-3">

                        <div className="sticky-top">
                            <CloseModalButton onClick={() => setOpenWriteModal(false)}/>
                        </div>

                        <WriteMemoryModal
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
            }
        </div>
    );
}
/* 
<div className={`${openWriteModal ? "show" : "d-none"}`}>
                    

                    
                    
                </div> */