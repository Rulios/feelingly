import React, {useRef, useContext, useState} from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Memory from "../types/Memory";
import CloseModalButton from "./CloseModalButton";
import parseHTML from "html-react-parser";
import ResponsiveLogo from "./ResponsiveLogo";
import AppreciationButton from "./AppreciationButton";
import ReplyButton from "./ReplyButton";
import HiddenContext from "../contexts/HiddenContext";
import AddNewReplyMemoryModal from "./AddNewReplyMemoryModal";
import { MemoryOutlined } from "@material-ui/icons";

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

export default function MemoryModal({
    memory, shouldOpen, handleClose
}: Props){


    const [openReplyModal, setOpenReplyModal] = useState(false);

    

    return (

        <div>
            {openReplyModal && 

                <AddNewReplyMemoryModal
                    handleClose={() => setOpenReplyModal(false)}
                    reply_to={memory?.id}
                />
            }

            <div className={`${shouldOpen ? "show" : "d-none"}`}>
                

                <div className="c-modal ">     
            
                    <div className="content p-3">

                        <div className="c-actions mb-5 mx-3">
                            <AppreciationButton memory_id={memory?.id}/>
                            <ReplyButton _onClick={() => setOpenReplyModal(true)}/>
                        </div>
                    
                        <div className="sticky-top">
                            <CloseModalButton onClick={handleClose}/>
                        </div>

                        <ResponsiveLogo/>

                        <div className="inline">

                            <div>
                                <h4 className="title">
                                    {memory?.title}
                                </h4>

                                <br />

                                <div className="details">
                                    <div className="">
                                        written by {memory?.user_name} (@{memory?.user_alias})
                                    </div>

                                    <div className="">
                                        in <i>{memory?.diary_name}</i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="mb-5">
                            <div className="memory-content p-4">
                                {parseHTML(memory ? memory.content : "")}
                            </div>
                        </div>

                    </div>  

                        
                </div>
                
            </div>
        </div>


        
    );

};