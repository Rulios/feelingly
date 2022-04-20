import React from "react";
import Button from '@material-ui/core/Button';


type Props = {
    onClick: () => void;
};

export default function CloseModalButton({onClick}: Props){
    return (
        <button type="button" className="close float-right" aria-label="Close"
            
            onClick={onClick}
            style={{
                float:"left",
                display: "inline-block",
            }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
    )
}