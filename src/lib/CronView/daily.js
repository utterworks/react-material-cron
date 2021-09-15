import React, { useState, useEffect } from "react";
import { range } from "ramda";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
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
    // marginTop: "20px",
  },
  textField: {
    minWidth: 260,
  },
}));

const Daily = (props) => {
  const [every, setEvery] = useState();
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    const value = props.value;
    if (value[3] === "?") {
      setEvery(false);
    } else {
      setEvery(true);
    }
  }, []);

  const onDayChange = (e) => {
    if (!e.target.value) {
      return;
    }
    if ((e.target.value > 0 && e.target.value < 32) || e.target.value === "") {
      let val = [
        "0",
        value[1] === "*" ? "0" : value[1],
        value[2] === "*" ? "0" : value[2],
        "*",
        "*",
        "?",
        "*",
      ];
      if (e.target.value === "") {
        val[3] = "";
      } else {
        val[3] = `1/${e.target.value}`;
      }
      props.onChange(val);
    }
  };
  const onAtHourChange = (e) => {
    let val = value;
    val[2] = `${e.target.value}`;
    props.onChange(val);
  };
  const onAtMinuteChange = (e) => {
    let val = value;
    val[1] = `${e.target.value}`;
    props.onChange(val);
  };

  const classes = useStyles();
  return (
    <div>
      <Divider />
      <div className={classes.root} variant="outlined">
        <Radio
          className={classes.radioBtn}
          checked={every ? true : false}
          onClick={(e) => {
            setEvery(true);
            props.onChange();
          }}
          value="1"
          name="DailyRadio"
          inputProps={{ "aria-label": "DailyRadio" }}
        />
        <TextField
          className={classes.textField}
          id="outlined-number"
          label="Every day(s)"
          value={value[3].split("/")[1] ? value[3].split("/")[1] : ""}
          size="small"
          onChange={onDayChange}
          type="number"
          InputLabelProps={{
            disabled: every ? false : true,
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
      </div>
      <Divider />
      <div className={classes.secondaryPaper}>
        <FormControlLabel
          //   value="top"
          control={
            <Radio
              onClick={(e) => {
                setEvery(false);
                props.onChange([
                  "0",
                  value[1],
                  value[2],
                  "?",
                  "*",
                  "MON-FRI",
                  "*",
                ]);
              }}
              value="2"
              name="DailyRadio"
              checked={every ? false : true}
              inputProps={{ "aria-label": "DailyRadio" }}
            />
          }
          label="Every week day"
          labelPlacement="end"
        />
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

export default Daily;
