import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { interval, Subject, takeUntil } from "rxjs";

function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const unsubscribe = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (isActive) {
          setTime((time) => time + 1);
        }
      });
    return () => {
      unsubscribe.next(false);
      unsubscribe.complete();
    };
  }, [isActive]);
  const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(true);
  };
  const handleStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (time !== 0) {
      setIsActive(false);
      setTime(0);
    }
  };

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) =>
    setTime(0);

  let wasClicked = false;
  let timeout: NodeJS.Timeout;
  const handleWait = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (wasClicked) {
      wasClicked = false;
      clearTimeout(timeout);
      setIsActive(false);
      return;
    }
    wasClicked = true;
    timeout = setTimeout(() => {
      wasClicked = false;
    }, 300);
  };

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
              // onDoubleClick={handleWait}
              onClick={handleWait}
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
  const hours = ("0" + Math.floor((time / 3600) % 60)).slice(-2);
  const minutes = ("0" + Math.floor((time / 60) % 60)).slice(-2);
  const seconds = ("0" + Math.floor(time % 60)).slice(-2);
  return `${hours}:${minutes}:${seconds}`;
}
