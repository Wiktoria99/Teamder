import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { CalendarIcon, LocationIcon, TeamIcon } from '@/assets';

interface Props {}

const team = {
  host: 'Tomasz Gajda',
  photoSource: 'https://avatars.githubusercontent.com/u/31045802?v=4',
  title: 'Hackathon - Webdev and mobile applications! ',
  date: '24.05',
  location: 'Kraków',
  maxSize: 10,
  curSize: 2,
  interests: ['Programming', 'Technologies'],
};

const useStyles = makeStyles((theme) => ({
  teamItemContainer: {},
  avatarContainer: {},
  contentContainer: {},
  hostName: {},
  teamTitle: {},
  infoBox: {},
  iconInfo: {},
  minorInfo: {},
}));

export const TeamItem = (props: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.teamItemContainer}>
      <Box className={styles.avatarContainer}>
        <img height="100" width="100" src={team.photoSource} alt="avatar" />
      </Box>
      <Box className={styles.contentContainer}>
        <p className={styles.hostName}>{team.host}</p>
        <h3 className={styles.teamTitle}>{team.title}</h3>
        <Box className={styles.infoBox}>
          <Box className={styles.iconInfo}>
            <CalendarIcon />
            <p className={styles.minorInfo}>{team.date}</p>
          </Box>
          <Box className={styles.iconInfo}>
            <LocationIcon />
            <p className={styles.minorInfo}>{team.location}</p>
          </Box>
          <Box className={styles.iconInfo}>
            <TeamIcon />
            <p className={styles.minorInfo}>
              {team.curSize}/{team.maxSize}
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
