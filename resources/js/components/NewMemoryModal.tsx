
import React, {useState, useEffect} from "react";
import axios from "axios";
import {Formik, useFormik, FormikErrors, Form} from "formik";
import Modal from "react-modal";

import Memory from "../types/Memory";
import OperationStates from "../types/OperationStates";

import WriteMemoryFields from "./WriteMemoryFields";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloseModalButton from "./CloseModalButton";

import useDiaries from "../hooks/useDiaries";
import useAlias from "../hooks/useAlias";
import { useSnackbar } from "notistack";



type Props = {
    closeModal(): void;
    open: boolean;

    //if this isn't undefined nor null, then it means that this component
    //should show the the form for a REPLY MEMORY. 
    reply_to?: string | number ;
}



export default function NewMemoryModal({open, closeModal, reply_to}: Props){

    const INITIAL_VALUES = {
        title: "",
        content: "",
        visibility: "public",
        diary_id: "",
        reply_to_memory_id: reply_to ?? null
    } as Memory; 
   

    const alias = useAlias("self");
    const [statusDiaries, diaries, errorDiaries] = useDiaries(alias);
    const [openSnackbar, setOpenSnackbar] = useState({open: false, type: "", message: ""});
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const submitMemory = (memory: Memory):void => {
        console.log(memory);
        axios.post("/memories/new", {...memory})
        .then(({data : {status_message}, status}) => {

            switch(status){
                case 200:
                    enqueueSnackbar(status_message, {variant: "success"})
                    closeModal();
                break;

                case 500:
                    enqueueSnackbar("Oops, something went wrong. Please try again later.", {variant: "error"})
                    throw new Error(status_message);
                break;
            }

        
        }).catch(err =>{
            alert(err);
        });
    }

    const validation = (values:Memory) => {

        const errors: FormikErrors<Memory> = {};

      
        if(!values.title){
            errors.title = "Title is required";
        }

        if(!values.content){
            errors.content = "Content is required";
        }else if(values.content.length < 1000){
            errors.content = "Content is too short";
        }

        if(!values.diary_id){
            errors.diary_id = "Diary is required";
        }

        return errors;

    }

    return(

        <>
             
            <Modal isOpen={open} className="border-0">
                <div className="c-modal">     

                   
                        
                    <div className="content container-fluid px-3">

                        <Formik 
                            initialValues={INITIAL_VALUES}
                            validate={validation}

                            onSubmit={(values, actions) => {
                                submitMemory(values);
                                
                            }}
                        >

                            <Form className="h-100">


                                <div className=" d-inline p-3 row">

                                    <div className="">
                                        <CloseModalButton onClick={closeModal}/>
                                    </div>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        style={{
                                            maxWidth: "140px",
                                            maxHeight: "100px",
                                            minWidth: "120px",
                                            float: "right",
                                            fontSize: "0.80rem",
                                            backgroundColor: "#007ab3",
                                        }}
                                        endIcon={<SendIcon/>}
                                    >
                                        Share {reply_to ? "reply" : ""}     
                                    </Button>

                                    

                                </div>

                                <div className="mt-5">
                                    <WriteMemoryFields
                                        diaries={diaries}
                                        isAReply={reply_to != null}
                                    />
                                </div>

                            </Form>
                        </Formik>

                    </div>  
                </div>
            </Modal>

        </>
    );
}