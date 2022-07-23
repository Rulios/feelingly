import { Portal } from 'react-portal';
import { Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";

import OperationStates from "../types/OperationStates";

type Props = {
    open: boolean;
    type: OperationStates;
    message: string;
    onClose: () => void;
};


/**
 * This component is used to display a snackbar message. 
 * Uses React Portal to render the snackbar in the DOM.
 * @param param0 
 * @returns 
 */
/* export default function SnackbarMessage({open, type, message, onClose}: Props){
    
        return (
            <Portal>

                <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={onClose}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >

                    <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
                        {message}
                    </Alert>

                </Snackbar>
            </Portal>
        );
} */

export default function SnackbarMessage({open, type, message, onClose}: Props){
    
    return (

            <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={onClose}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >

                <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>

            </Snackbar>
    );
}