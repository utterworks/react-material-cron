import React, { useState, useEffect } from "react";
import cronstrue from "cronstrue";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Daily from "./daily";
import Weekly from "./weekly";
import Monthly from "./monthly";
import Yearly from "./yearly";
import DisplayCard from "./displayCard";
const tabs = ["Daily", "Weekly", "Monthly"]; //,'Yearly'
// const tabs = ['Minutes', 'Hourly', 'Daily', 'Weekly', 'Monthly'] //,'Yearly'

const useStyles = makeStyles((theme) => ({
  displayCard: {
    marginTop: "20px",
  },
}));

const Cron = (props) => {
  const [value, setValue] = useState(["0", "0", "00", "1/1", "*", "?", "*"]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabValue, setSelectedTabValue] = useState(0);

  useEffect(() => {
    if (!props.value || props.value.split(" ").length !== 7) {
      setValue(["0", "0", "00", "1/1", "*", "?", "*"]);
      setSelectedTab(tabs[0]);
      setSelectedTabValue(0);

      parentChange(value, getVal(value));
    } else {
      const val = props.value.replace(/,/g, "!").split(" ");

      if (val[3].search("/") !== -1 || val[5] === "MON-FRI") {
        setSelectedTab(tabs[0]);
        setSelectedTabValue(0);
      } else if (val[3] === "?") {
        setSelectedTab(tabs[1]);
        setSelectedTabValue(1);
      } else if (val[3].startsWith("L") || val[4] === "1/1") {
        setSelectedTab(tabs[2]);
        setSelectedTabValue(2);
      } else {
        setSelectedTab(tabs[0]);
        setSelectedTabValue(0);
      }

      setValue(val);
    }
  }, []);

  const defaultValue = (tab) => {
    switch (tab) {
      //   case tabs[0]:
      //     return ["0", "0/1", "*", "*", "*", "?", "*"];
      //   case tabs[1]:
      //     return ["0", "0", "00", "1/1", "*", "?", "*"];
      case tabs[0]:
        return ["0", "0", "00", "1/1", "*", "?", "*"];
      case tabs[1]:
        return ["0", "0", "00", "?", "*", "*", "*"];
      case tabs[2]:
        return ["0", "0", "00", "1", "1/1", "?", "*"];
      case tabs[3]:
        return ["0", "0", "00", "1", "1/1", "?", "*"];
      default:
        return;
    }
  };

  const tabChanged = ({ tab, index }) => {
    setSelectedTab(tab);
    setSelectedTabValue(index);
    setValue(defaultValue(tab));
    parentChange(defaultValue(tab), getVal(defaultValue(tab)));
  };

  const getHeaders = () => {
    const a11yProps = (index) => {
      return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
      };
    };

    return (
      <>
        <Tabs value={selectedTabValue} centered variant="fullWidth">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab}
              {...a11yProps(index)}
              onClick={() => tabChanged({ tab, index })}
            />
          ))}
        </Tabs>
      </>
    );
  };

  const onValueChange = (val) => {
    console.log("val", val);
    if (val && val.length) {
      setValue(val);
    } else {
      setValue(["0", "0", "00", "1/1", "*", "?", "*"]);
      val = ["0", "0", "00", "1/1", "*", "?", "*"];
    }
    parentChange(val, getVal(val));
  };

  const parentChange = (val, text) => {
    let newVal = "";
    newVal = val.toString().replace(/,/g, " ");
    newVal = newVal.replace(/!/g, ",");
    props.onChange(newVal, text);
  };

  const getVal = (cron = null) => {
    let cronVal = cron || value;
    let val = cronstrue.toString(
      cronVal.toString().replace(/,/g, " ").replace(/!/g, ",")
    );
    if (val.search("undefined") === -1) {
      return val;
    }
    return "-";
  };

  const getComponent = (tab) => {
    switch (tab) {
      // case tabs[0]:
      //     return <Minutes value={value} onChange={onValueChange} />
      // case tabs[1]:
      //     return <Hourly value={value} onChange={onValueChange} />
      case tabs[0]:
        return <Daily value={value} onChange={onValueChange} />;
      case tabs[1]:
        return <Weekly value={value} onChange={onValueChange} />;
      case tabs[2]:
        return <Monthly value={value} onChange={onValueChange} />;
      case tabs[3]:
        return <Yearly value={value} onChange={onValueChange} />;
      default:
        return;
    }
  };
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <div>{getHeaders()}</div>
          <div className="">{getComponent(selectedTab)}</div>
        </Grid>

        {(props.showResultText || props.showResultCron) && (
          <Grid container justify="center" className={classes.displayCard}>
            <Grid item xs={8} sm={7} lg={4}>
              <DisplayCard
                textResult={props.showResultText && getVal()}
                cronResult={
                  props.showResultCron &&
                  value.toString().replace(/,/g, " ").replace(/!/g, ",")
                }
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Cron;
