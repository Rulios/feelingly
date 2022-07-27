import React, {FC} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


type Props = {
    text?: string; // will only be showed if screen size is bigger than md (> 992px wide)
    _onClick: () => void;
};

//SHOULD FINISH, ADD MEDIA QUERY BREAKPOINT FOR TEXT TO BE SHOW
export default function AddFloatButton({_onClick, text}: Props){
    return (
        <div>
            <Fab aria-label="add" variant="extended" className="m-5 fixedRight" onClick={_onClick}>
                <CreateIcon />
                <Box sx={{display:{ xs:"none", sm:"block", lg:"block", md:"block"}}}>
                    <Typography variant="button">
                        {text}
                    </Typography>
                </Box>
            </Fab>
        </div>
    );
}



