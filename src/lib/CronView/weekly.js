import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/styles";
import StartTime from "./chooseTime";
import Card from "./card";
import { Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(1),
  },
  secondaryPaper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  radioBtn: {
    marginTop: theme.spacing(2),
  },
  textField: {
    minWidth: 260,
  },
}));

const Weekly = (props) => {
  const [value] = useState(props.value);

  const onAtHourChange = (e) => {
    let val = value;
    val[0] = "0";
    val[2] = `${e.target.value}`;
    props.onChange(val);
  };
  const onAtMinuteChange = (e) => {
    let val = value;
    val[0] = "0";
    val[1] = `${e.target.value}`;
    props.onChange(val);
  };

  const onCheck = (e) => {
    let val = value;
    val[0] = "0";
    if (e.target.checked) {
      val[2] = `${val[2]}`.split("/").length > 1 ? "0" : val[2].toString();
      val[3] = "?";
      val[4] = "*";
      if (val[5] === "*" || val[5] === "?" || val[5] === "MON-FRI") {
        val[5] = e.target.value;
      } else {
        val[5] = val[5] + "!" + e.target.value;
      }
    } else {
      val[5] = val[5].split("!");
      if (val[5].length > 1) {
        val[5].splice(val[5].indexOf(e.target.value), 1);
        val[5] = val[5].toString().replace(/,/g, "!");
      } else {
        val[5] = "*";
      }
    }

    props.onChange(val);
  };

  const classes = useStyles();
  return (
    <div>
      <Divider />
      <div className={classes.root} variant="outlined">
        <Grid container justify="space-evenly">
          <Grid item>
            <FormControlLabel
              label="Monday"
              control={
                <Checkbox
                  color="primary"
                  type="checkbox"
                  value="MON"
                  onChange={onCheck}
                  checked={value[5].search("MON") !== -1 ? true : false}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Wednesday"
              control={
                <Checkbox
                  color="primary"
                  type="checkbox"
                  value="WED"
                  onChange={onCheck}
                  checked={value[5].search("WED") !== -1 ? true : false}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Friday"
              control={
                <Checkbox
                  color="primary"
                  type="checkbox"
                  value="FRI"
                  onChange={onCheck}
                  checked={value[5].search("FRI") !== -1 ? true : false}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Sunday"
              control={
                <Checkbox
                  color="primary"
                  type="checkbox"
                  value="SUN"
                  onChange={onCheck}
                  checked={value[5].search("SUN") !== -1 ? true : false}
                />
              }
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              label="Tuesday"
              control={
                <Checkbox
                  color="primary"
                  type="checkbox"
                  value="TUE"
                  onChange={onCheck}
                  checked={value[5].search("TUE") !== -1 ? true : false}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Thursday"
              control={
                <Checkbox
                  color="primary"
                  type="checkbox"
                  value="THU"
                  onChange={onCheck}
                  checked={value[5].search("THU") !== -1 ? true : false}
                />
              }
            />
            <br />
            <FormControlLabel
              label="Saturday"
              control={
                <Checkbox
                  color="primary"
                  type="checkbox"
                  value="SAT"
                  onChange={onCheck}
                  checked={value[5].search("SAT") !== -1 ? true : false}
                />
              }
            />

            <br />
            <br />
          </Grid>
        </Grid>
      </div>
      <Divider />

      <div className={classes.secondaryPaper}>
        <Typography variant="subtitle2">Start time</Typography>
        <StartTime
          hour={value[2]}
          minute={value[1]}
          onAtMinuteChange={onAtMinuteChange}
          onAtHourChange={onAtHourChange}
        />
      </div>
    </div>
  );
};

export default Weekly;
