import { Button, Link, makeStyles, Typography } from "@material-ui/core";
import { FC, useEffect, useState } from "react";

import { StrapiEvent } from "../../types";
import { RevealOnScroll } from "../atoms";
import { LiveBadge } from "../molecules";

export interface EventProps {
  event: StrapiEvent;
}

const DATE_REFRESH_TIME_IN_MS = 5000;

const useStyles = makeStyles(theme => ({
  name: {
    fontSize: "1.125rem",
    marginBottom: "0.125rem",
    position: "relative",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.725rem",
    },
  },
  details: {
    fontSize: "0.875rem",
    lineHeight: 1.375,
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  },
  detailsContainer: {
    alignItems: "center",
    display: "flex",
  },
  day: {
    fontSize: "1.75rem",
    lineHeight: 1,
    marginBottom: "0.25rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "2.25rem",
    },
  },
  month: {
    fontSize: "1rem",
    lineHeight: 1,
    marginBottom: 0,
    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem",
    },
  },
  container: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  rightContainer: {
    alignItems: "center",
    display: "flex",
  },
  button: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
      marginRight: "3rem",
    },
  },
}));

const Event: FC<EventProps> = ({ event }) => {
  const classes = useStyles();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, DATE_REFRESH_TIME_IN_MS);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const startDate = new Date(event.starts);
  const endDate = new Date(event.ends);
  const isLive = now > startDate && now < endDate;

  const dateParts = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    month: "short",
  }).formatToParts(startDate);

  const get = (type: string) => {
    return dateParts.filter(p => p.type === type)[0].value;
  };

  return (
    <RevealOnScroll>
      <article className={classes.container}>
        <Link
          underline="none"
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="h3" className={classes.name}>
            {event.name}
            {isLive && <LiveBadge />}
          </Typography>
          <Typography color="textSecondary" className={classes.details}>
            {`${get("hour")}:${get("minute")} ${get("dayPeriod")}`}
          </Typography>
          <Typography color="textSecondary" className={classes.details}>
            {event.place}
          </Typography>
        </Link>
        <div className={classes.rightContainer}>
          <Button
            component="a"
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="large"
            className={classes.button}
          >
            Ver detalles
          </Button>
          <div>
            <Typography variant="h6" component="p" className={classes.day}>
              {get("day")}
            </Typography>
            <Typography variant="h6" component="p" className={classes.month}>
              {get("month")}
            </Typography>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  );
};

export default Event;