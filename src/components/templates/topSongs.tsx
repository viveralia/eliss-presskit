import { Button, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

import { Section, Song } from "~components";
import { StrapiSong } from "~types";

export interface TopSongsProps {
  songs: Pick<StrapiSong, "id" | "spotifyUri">[];
}

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    margin: "1.75rem auto 0 auto",
    [theme.breakpoints.up("md")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "20rem",
    },
  },
  empty: {
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
    },
  },
  grid: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "1fr",
    [theme.breakpoints.up("md")]: {
      columnGap: "3rem",
      gridTemplateColumns: "1fr 1fr",
    },
    [theme.breakpoints.up("xl")]: {
      columnGap: "4rem",
    },
  },
}));

const TopSongs: FC<TopSongsProps> = ({ songs }) => {
  const classes = useStyles();
  const router = useRouter();

  const handleMusicClick = useCallback(() => {
    if (router.query.music) return;

    const url = new URL(window?.location.href);
    url.searchParams.append("music", "open");
    router.push(url, undefined, { scroll: false });
  }, [router]);

  return (
    <Section title="Te recomendamos escuchar">
      {songs.length > 0 ? (
        <>
          <div className={classes.grid}>
            {songs.map(song => (
              <Song key={song.id} spotifyUri={song.spotifyUri} />
            ))}
          </div>
          <Button
            onClick={handleMusicClick}
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            size="large"
            className={classes.button}
          >
            Más música
          </Button>
        </>
      ) : (
        <Typography className={classes.empty} color="textSecondary">
          No hay música disponible
        </Typography>
      )}
    </Section>
  );
};

export default TopSongs;
