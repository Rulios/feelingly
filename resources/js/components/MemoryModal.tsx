import React, {useRef} from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Memory from "../types/Memory";
import CloseModalButton from "./CloseModalButton";
import parseHTML from "html-react-parser";


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
                    <div className="memory-modal-header">

                    <CloseModalButton onClick={handleClose}/>

                    <img src="/assets/logo-with-text.svg" 
                        className="logo-with-text-on-modal mb-3 rounded mx-auto d-block img-responsive mt-4" 
                        alt="Feelingly"
                    />

                    <h4 className="memory-modal-title modal-title">
                        {memory?.title}
                    </h4>

                    <br />

                    <div className="memory-modal-details">
                        <div className="">
                            written by user real name (@username)
                        </div>

                        <div className="">
                            in <i>Diary's name</i>
                        </div>
                    </div>

                    </div>

                    <hr/>

                    <div className="mb-5">
                        <div className="memory-modal-content">
                            {parseHTML(memory ? memory.content : "")}
                        </div>
                    </div>

                </div>  

                    
            </div>
            
        </div>
    );

};