import React, {useRef, useContext, useState} from "react";
import Memory from "../types/Memory";
import CloseModalButton from "./CloseModalButton";
import parseHTML from "html-react-parser";

import ResponsiveLogo from "./ResponsiveLogo";
import AppreciationButton from "./AppreciationButton";
import ReplyButton from "./ReplyButton";
import NewMemoryModal from "./NewMemoryModal";

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

    return (
        <Modal isOpen={shouldOpen}>
            
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
                
                        <div className="content p-3">

                            <div className="c-actions mb-5 mx-3">
                                <AppreciationButton memory_id={memory?.id}/>
                                <ReplyButton _onClick={openReplyModal}/>
                            </div>
                        
                            <div className="sticky-top">
                                <CloseModalButton onClick={handleClose}/>
                            </div>

                    
                            <div className="text-center">


                                <Typography  variant="h1" sx={{fontSize: 40}}>
                                    <b>{memory?.title}</b>
                                </Typography>

                                <Typography  variant="h6" sx={{fontSize: 10}}>
                                    in <i>{memory?.diary_name}</i>
                                    
                                </Typography>

                                <Typography  variant="h6" sx={{fontSize: 10}}>
                                    written by {memory?.user_name} (@{memory?.user_alias})
                                </Typography>

                            
                            </div>


                            <div className="mt-5">
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