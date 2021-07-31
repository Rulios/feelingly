import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root: {
      "max-width": "100% !important",
    },
});

interface Props{
  defaultValue?: number;
  newValue(value: number): void;
};

export default function ProfileButtonNavigation({defaultValue, newValue}: Props){
    const classes = useStyles();
    const [value, setValue] = React.useState(defaultValue ?? 0);

    useEffect(() => {
      newValue(value);
    }, [value]);


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