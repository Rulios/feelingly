import React, {FC} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {primaryColor} from "../../sass/_constants.scss";

console.log(primaryColor);

type Props = {
    text?: string; // will only be showed if screen size is bigger than md (> 992px wide)
    _onClick: () => void;
};

//SHOULD FINISH, ADD MEDIA QUERY BREAKPOINT FOR TEXT TO BE SHOW
export default function AddFloatButton({_onClick, text}: Props){
    return (
        <div>
            <Fab color={primaryColor} aria-label="add" className="m-5 fixedRight" onClick={_onClick}>
                <AddIcon />
                {text}
            </Fab>
        </div>
    );
}



