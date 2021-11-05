import React, { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/store";

import { interval } from "rxjs";
import {
  resetTime,
  setIsActive,
  setStart,
  setTime,
} from "./state/stopWatchSlice";

function App() {
  const { time, isActive, started } = useSelector(
    (state: RootState) => state.stopWatch
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const observable = interval(10);
    const subscription = observable.subscribe((x) => {
      if (isActive && started) {
        dispatch(setTime(10));
      }
    });
    return () => subscription.unsubscribe();
  }, [isActive, started]);

  const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsActive(true));
    dispatch(setStart(true));
  };
  const handleStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsActive(false));
    dispatch(setStart(false));
    dispatch(resetTime());
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) =>
    dispatch(resetTime());
  const handleWait = (event: React.MouseEvent<HTMLButtonElement>) =>
    dispatch(setIsActive(false));

  const timer = convertTime(time);
  return (
    <Box>
      <Card variant="outlined" style={{ maxWidth: 400, margin: "0 auto" }}>
        <CardContent>
          <Typography style={{ textAlign: "center" }}>{timer}</Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "space-around" }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={isActive ? handleStop : handleStart}
            >
              Start / Stop
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onDoubleClick={handleWait}
            >
              Wait
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </Box>
  );
}

export default App;

function convertTime(time: number) {
  let pad = function (num: number, size: number) {
    return ("000" + num).slice(size * -1);
  };
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const milliseconds = Math.floor(time % (1000 * 60));
  return (
    pad(hours, 2) +
    ":" +
    pad(minutes, 2) +
    ":" +
    pad(seconds, 2) +
    ":" +
    pad(milliseconds, 3)
  );
}
