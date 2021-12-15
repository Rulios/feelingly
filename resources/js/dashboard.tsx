import "bootstrap";
import $ from "jquery";
import ReactDOM from "react-dom";
import React, {FC, useState, useEffect, memo} from "react";

import AddNewMemoryModal from "./components/AddNewMemoryModal";

import axios from "axios";
import useAlias from "./hooks/useAlias";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Memory from "./types/Memory";

window.onload = () =>{
    
    ReactDOM.render(
        <App/>,
        document.getElementById("root")
        );
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffffff" //white
        },

        secondary: {
            main: "#00baff"
        }
    },

    typography:{
        fontFamily: "Roboto Slab",
    }
});

const useStyles = makeStyles({  
    tab: {
        boxShadow: "none",
        marginBottom: "1em"
    }
});
    
    
function App(): JSX.Element{
        /**TOGGLER */
        //TO DOOOOO, IMPLEMENT THE DASHBOARD FETCHING AND MEMORY BOX HEERE
        
    const [ tabIndex, setTabIndex ] = useState(0);

    const classes = useStyles();

    //for the tabs
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    };

    //for the swipeable views
    const handleChangeIndex = (index:number) => {
        setTabIndex(index);
    };
    
    return (
        <div>

            <div>
                <ThemeProvider theme={theme}>
                    <AppBar position="static" className={classes.tab}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            centered
                        >
                            <Tab label="Following"  />
                            <Tab label="Global"  />
                        </Tabs>
                    </AppBar>
                </ThemeProvider>
                

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={tabIndex}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={tabIndex} index={0} dir={theme.direction}>
                    Item One
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1} dir={theme.direction}>
                    Item Two
                    </TabPanel>
                </SwipeableViews>
            </div>

            <AddNewMemoryModal/>
        </div>
    );
}

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box /* sx={{ p: 3 }} */>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function FollowersFeed(){

    const [memories, setMemories] = useState<Memory[]>([]);
    const [amountFetched, setAmountFetched] = useState(0);

    //FINISH THIS FEED

    return null;
}



