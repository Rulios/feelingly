import React, {useRef, useContext} from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Memory from "../types/Memory";
import CloseModalButton from "./CloseModalButton";
import parseHTML from "html-react-parser";
import ResponsiveLogo from "./ResponsiveLogo";
import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";
import HiddenContext from "../contexts/HiddenContext";


type Props = {
    memory: Memory | undefined | null;
    shouldOpen: boolean;
    handleClose: () => void; 
};

export default function MemoryModal({
    memory, shouldOpen, handleClose
}: Props){


    
    return (
        <div className={`${shouldOpen ? "show" : "hide"}`}>
      

            <div className="memory-modal ">     
          
                <div className="content p-3">

                    <div className="memory-modal-actions mb-5 mx-3">
                        <LikeButton/>
                        <ReplyButton/>
                    </div>
                
                    <div className="memory-modal-static-header">
                        <CloseModalButton onClick={handleClose}/>
                    </div>

                    <ResponsiveLogo/>

                    <div className="memory-modal-dynamic-header inline">

                        <div>
                            <h4 className="memory-modal-title modal-title">
                                {memory?.title}
                            </h4>

                            <br />

                            <div className="memory-modal-details">
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
                        <div className="memory-modal-content p-4">
                            {parseHTML(memory ? memory.content : "")}
                        </div>
                    </div>

                </div>  

                    
            </div>
            
        </div>
    );

};