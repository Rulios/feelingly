import React, {useContext, useState, useEffect} from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import HiddenContext from "../contexts/HiddenContext";
import axios from "axios";

type Props = {
 memory_id: string | number | undefined | null;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },

    colorRed:{
        color: "red"
    }
  }),
);

export default function AppreciationButton({memory_id}: Props){

    const classes = useStyles();
    const [appreciation, setAppreciation] = useState(false);

    const toggleAppreciation = () => {

    };


    return (
        <Fab  variant="extended" aria-label="like" onClick={toggleAppreciation}>
            <FavoriteIcon 
              className={`${classes.extendedIcon} ${classes.colorRed}`}
              style={{
              }}
            /> Love it!
        </Fab>
    )
}