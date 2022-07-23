import React, {useRef, useContext, useState} from "react";
import Memory from "../types/Memory";
import CloseModalButton from "./CloseModalButton";
import parseHTML from "html-react-parser";

import AppreciationButton from "./AppreciationButton";
import ReplyButton from "./ReplyButton";
import NewMemoryModal from "./NewMemoryModal";
import UserProfileImage from "./UserProfileImage";

import Typography from '@mui/material/Typography';

import Modal from "react-modal";

import useModal from "../hooks/useModal";


type Props = {
    memory: Memory | undefined | null;
    shouldOpen: boolean;
    handleClose: () => void; 
};

/**
 * This component shows all the memory's information, title, content, author etc. 
 * @param Props
 * @returns 
 */

Modal.setAppElement('#root');

export default function MemoryModal({
    memory, shouldOpen, handleClose
}: Props){

    const {open, openModal: openReplyModal, closeModal: closeReplyModal} = useModal();

    const [headerSize, setHeaderSize] = useState(40)

    const handleScroll = (e: React.SyntheticEvent<EventTarget>) => {

        let scrollTop = (e.target as HTMLHeadingElement).scrollTop

        if(scrollTop > 50){
            setHeaderSize(20)
        }else{
            setHeaderSize(40);
        }
      };
    

    return (
        <Modal isOpen={shouldOpen} className="border-0">
            
            <div>
                {open && 

                    <NewMemoryModal
                        closeModal={closeReplyModal}
                        reply_to={memory?.id}
                        open={open}
                    />
                }

                <div className={`${shouldOpen ? "show" : "d-none"}`}>
                    

                    <div className="c-modal ">     
                
                        <div className="content px-3 pb-5" onScroll={(e) => handleScroll(e)} >

                            
                        
                            <div className="sticky-top bg-white shadow-sx bg-white rounded">
                                <CloseModalButton onClick={handleClose}/>

                                

                                <div className="pt-5 pb-2">

                                    <Typography className="animation-smooth"  variant="h1" sx={{fontSize: headerSize, fontWeight:"bold"}}>
                                            {memory?.title}
                                    </Typography>

                                </div>
                                
                            </div>

                            <div className="c-actions mb-5 mx-3">
                                <AppreciationButton memory_id={memory?.id}/>
                                <ReplyButton _onClick={openReplyModal}/>
                            </div>

                    
                            <div className="display-inline">


                                <Typography  variant="h6" sx={{fontSize: 12}}>
                                    in <i>{memory?.diary_name}</i>
                                    
                                </Typography>

                                <Typography  variant="h6" sx={{fontSize: 12}}>
                                    written by {memory?.user_name} (@{memory?.user_alias})
                                </Typography>
                                
                                <UserProfileImage className=" m-2" url={memory?.user_profile_image} user={memory?.user_alias}/>
                                <div className="float-right">

                                </div>
                            
                            </div>


                            <div className="mt-5" >
                                <div className="text-break">
                                    <Typography align="left" variant="h6" gutterBottom={true} sx={{fontSize: 16}}>
                                        {parseHTML(memory ? memory.content : "")}
                                    </Typography>
                                </div>
                            </div>

                        </div>  

                            
                    </div>
                    
                </div>
            </div>
        </Modal>


        
    );

};