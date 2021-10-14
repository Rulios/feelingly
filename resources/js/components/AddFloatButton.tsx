import React, {FC} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {primaryColor} from "../../sass/_constants.scss";

console.log(primaryColor);

type Props = {
    _onClick: () => void;
};

export default function AddFloatButton({_onClick}: Props){
    return (
        <div>
            <Fab color={primaryColor} aria-label="add" className="m-5 fixedRight" onClick={_onClick}>
                <AddIcon />
            </Fab>
        </div>
    );
}



