import BorderColorIcon from '@material-ui/icons/BorderColor';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default function ReplyButton(){

    const classes = useStyles();

    return (
        <Fab  variant="extended" aria-label="like">
            <BorderColorIcon className={`${classes.extendedIcon} m-3`}/> Reply
        </Fab>
    )
}