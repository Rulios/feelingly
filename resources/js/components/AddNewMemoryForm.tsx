import React, {useState, useEffect} from "react";
import axios from "axios";
import validator from "validator";
import {Formik, useFormik, FormikErrors, Form} from "formik";
import Modal from "react-modal";

import Memory from "../types/Memory";
import OperationStates from "../types/OperationStates";

import WriteMemoryFields from "./WriteMemoryFields";
import AddFloatButton from "./AddFloatButton";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloseModalButton from "./CloseModalButton";
import SnackbarMessage from "./SnackbarMessage";

import useModal from "../hooks/useModal";
import useDiaries from "../hooks/useDiaries";
import useAlias from "../hooks/useAlias";

import toggleBodyOverflow from "../utils/toggleBodyOverflow";



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

    const INITIAL_VALUES = {
        title: "",
        content: "",
        visibility: "public",
        diary_id: ""
    } as Memory; 
   

    const alias = useAlias("self");
    const [statusDiaries, diaries, errorDiaries] = useDiaries(alias);
    const [openSnackbar, setOpenSnackbar] = useState({open: false, type: "", message: ""});

    const submitMemory = (memory: Memory):void => {
        console.log(memory);
        axios.post("/memories/new", {...memory})
        .then(({data : {status_message}, status}) => {

            switch(status){
                case 200:
                    setOpenSnackbar({open: true, type: "success", message: status_message});
                    closeModal();
                break;

                case 500:
                    setOpenSnackbar({open: true, type: "error", message: "Oops, something went wrong. Please try again later."});
                    throw new (status_message);
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

            {openSnackbar && 
                <SnackbarMessage 
                    open={openSnackbar.open}  
                    type={openSnackbar.type as OperationStates}
                    message={openSnackbar.message}
                    onClose={() => setOpenSnackbar({open: false, type: "", message: ""})}
                />
            }            

            <Modal isOpen={open}>
                <div className="c-modal">     
                    
                    <div className="content container-fluid px-3">

                        <Formik 
                            initialValues={INITIAL_VALUES}
                            validate={validation}

                            onSubmit={(values, actions) => {
                                console.log(values);
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
                                        Share        
                                    </Button>

                                    

                                </div>

                                <div className="mt-5">
                                    <WriteMemoryFields
                                        diaries={diaries}
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

