import BorderColorIcon from '@material-ui/icons/BorderColor';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
  _onClick(): void;
}

export default function ReplyButton({_onClick}: Props){
 

    return (
        <Fab  variant="extended" aria-label="like" onClick={_onClick}>
            <BorderColorIcon className=""/>
        </Fab>
    )
}