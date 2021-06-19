import React, {FC} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {primaryColor} from "../../sass/_constants.scss";

console.log(primaryColor);

interface AddFloatButtonProps{
   _onClick(): void
};


const AddFloatButton : FC <AddFloatButtonProps> = (props): JSX.Element => {
    return (
        <div>
            <Fab color={primaryColor} aria-label="add" className="m-5 fixedRight" onClick={props._onClick}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default AddFloatButton;

