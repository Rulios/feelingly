import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
      "max-width": "100% !important",
    },
});

export default function ProfileButtonNavigation(){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction className={classes.root} label="Written memories" icon={"📝"} />
          <BottomNavigationAction className={classes.root} label="Diaries" icon={"📔"} />
        </BottomNavigation>
      );

}