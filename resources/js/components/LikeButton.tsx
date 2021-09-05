import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

export default function LikeButton(){

    const classes = useStyles();

    return (
        <Fab  variant="extended" aria-label="like">
            <FavoriteIcon className={`${classes.extendedIcon} ${classes.colorRed}`}/> Love it!
        </Fab>
    )
}