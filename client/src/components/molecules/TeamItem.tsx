import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { CalendarIcon, InterestsIcon, LocationIcon, TeamIcon } from '@/assets';
import { colors } from '@/styles';

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
  teamItemContainer: {
    display: 'flex',
    borderBottom: `1px solid ${colors.BORDER_GRAY}`,
    padding: 40,
  },
  avatarContainer: {
    paddingRight: 20,
  },
  photo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  contentContainer: {
    display: 'flex',
    flexFlow: 'column',
  },
  hostName: {
    fontWeight: 100,
    fontSize: 16,
    lineHeight: '22px',
    margin: 0,
  },
  teamTitle: {
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '125%',
    margin: 0,
  },
  infoBox: {
    display: 'flex',
    width: '70%',
    minWidth: '230px',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  iconInfo: {
    display: 'flex',
  },
  minorInfo: {
    fontSize: 16,
    margin: '0px 0px 0px 7px',
  },
  interestsContainer: {
    display: 'flex',
    flexFlow: 'column',
  },
  interestsLabel: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '25px',
  },
  interestsText: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '125%',
    margin: 0,
    marginLeft: '10px',
  },
  interestsList: {
    fontSize: '16px',
    marginTop: '10px',
  },
}));

export const TeamItem = (props: Props) => {
  const styles = useStyles();

  return (
    <Box className={styles.teamItemContainer}>
      <Box className={styles.avatarContainer}>
        <img
          className={styles.photo}
          height="100"
          width="100"
          src={team.photoSource}
          alt="avatar"
        />
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
        <Box className={styles.interestsContainer}>
          <Box className={styles.interestsLabel}>
            <InterestsIcon />
            <p className={styles.interestsText}>Related interests</p>
          </Box>
          <Box className={styles.interestsList}>
            {team.interests.map((interest, idx) =>
              idx !== team.interests.length - 1 ? interest + ', ' : interest,
            )}
          </Box>
        </Box>
        <Button />
      </Box>
    </Box>
  );
};
