import React, {useRef, useContext} from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Diary from "../types/Diary";
import Memory from "../types/Memory";
import CloseModalButton from "./CloseModalButton";
import MemoryRenderer from "./MemoryRenderer";

type Props = {
    diary?: Diary | null;
    memories?: Memory[] | null; 
    shouldOpen: boolean;
    handleClose: () => void; 
};

export default function DiaryModal({
    diary, memories, shouldOpen, handleClose
}: Props){
    

    return (
        <div className={`${shouldOpen ? "show" : "hide"}`}>
      

            <div className="diary-modal ">     
          
                <div className="content p-3">
                
                    <div className="diary-modal-static-header">
                        <CloseModalButton onClick={handleClose}/>
                    </div>

                    <div className="diary-modal-dynamic-header inline">

                        <div>
                            <h4 className="memory-modal-title modal-title">
                                {diary?.name}
                            </h4>

                            <br />

                            <div className="memory-modal-details">

                                <div className="">
                                    Description
                                </div>

                                <div className="">
                                    {`written by ${diary?.user_name}`}
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div className="row">
                        <MemoryRenderer
                            memories={memories}
                        />
                    </div>

                </div>  
                    
            </div>
            
        </div>
    );

};