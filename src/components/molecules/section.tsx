import { Container, ContainerProps, makeStyles, Typography } from "@material-ui/core";
import { FC } from "react";

export interface SectionProps extends ContainerProps {
  title: string;
}

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: "3.5rem",
    paddingTop: "3.5rem",
    [theme.breakpoints.up("md")]: {
      paddingBottom: "4.5rem",
      paddingTop: "4.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: "5rem",
      paddingTop: "5rem",
    },
  },
  title: {
    fontSize: "0.8125rem",
    marginBottom: "1.75rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
      textAlign: "center",
    },
  },
}));

const Section: FC<SectionProps> = ({ children, title, ...containerProps }) => {
  const classes = useStyles();

  return (
    <Container component="section" className={classes.container} {...containerProps}>
      <Typography color="textSecondary" variant="h2" className={classes.title}>
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default Section;
