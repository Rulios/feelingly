import {useState, useEffect} from "react";
import axios from "axios";
import validator from "validator";

import Memory from "../types/Memory";

import WriteMemoryFields from "./WriteMemoryFields";
import AddFloatButton from "./AddFloatButton";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloseModalButton from "./CloseModalButton";

import useModal from "../hooks/useModal";
import useDiaries from "../hooks/useDiaries";
import useAlias from "../hooks/useAlias";

import {Formik, useFormik, FormikErrors, Form} from "formik";

import Modal from "react-modal";


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

    const submitMemory = (memory: Memory):void => {
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

    }

    return(
        <Modal isOpen={open}>
            <div className="c-modal">     

                <div className="sticky-top">
                    <CloseModalButton onClick={closeModal}/>
                </div>

                <div className="content p-3">

                    <Formik 
                        initialValues={INITIAL_VALUES}
                        validate={validation}

                        onSubmit={(values, actions) => {
                            //TO DO: should fix these statements. Because setMemory is async, submit memory won't work well. 
                            console.log(values)
                            /* setMemory(values);
                            submitMemory(values);
                            closeModal(); */
                        }}
                    >
                        <Form>
                            <WriteMemoryFields
                                diaries={diaries}
                            />
                            


                            <div className="mt-3 p-3 row">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    endIcon={<SendIcon/>}
                                >
                                    Share memory        
                                </Button>
                            </div>
                        </Form>
                        
                    </Formik>

                </div>  
            </div>
        </Modal>
    );
}