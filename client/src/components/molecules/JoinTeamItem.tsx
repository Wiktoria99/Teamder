import React, { useEffect, useState } from 'react';
import { TeamI } from '@/interfaces';
import { Button, Box, makeStyles } from '@material-ui/core';
import { colors } from '@/styles';
import { CalendarIconY, InterestsIconY, LocationIconY, TeamIconY, DescriptionIconY} from '@/assets';

interface Props {
  team: TeamI;
}

const useStyles = makeStyles((theme) => ({
  teamItemContainer: {
    display: 'flex',
    padding: 40,
    minHeight: 500,
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
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
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
    marginTop: 30,
  },
  iconInfo: {
    display: 'flex',
  },
  minorInfo: {
    fontSize: 16,
    margin: '0px 0px 0px 7px',
  },
  interestsContainer: {
    paddingTop: 10,
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
    color: colors.SECONDARY,
  },
  interestsList: {
    fontSize: '16px',
    marginTop: '10px',
  },
  descriptionContainer: {
    paddingTop: 10,
    display: 'flex',
    flexFlow: 'column',
  },
  descriptionLabel: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '25px',
  },
  description: {
    marginTop: 15,
    display: 'flex',
    border: `1px solid ${colors.BORDER_GRAY}`,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 16,
  },
  descriptionText: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '125%',
    margin: 0,
    marginLeft: '10px',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.SECONDARY,
    color: colors.BLACK,
    width: '100px',
    height: '30px',
    '&:hover': {
      backgroundColor: colors.SECONDARY_HOV,
    },
  },
}));

export const JoinTeamItem: React.FC<Props> = ({team}) => {
  const styles = useStyles();

  return (
  <Box className={styles.teamItemContainer}>
    <Box className={styles.avatarContainer}>
      <img className={styles.photo} height="100" width="100" alt="avatar" />
    </Box>
    <Box className={styles.contentContainer}>
      <p className={styles.hostName}>{team.host}</p>
      <h3 className={styles.teamTitle}>{team.name}</h3>
      <Box className={styles.infoBox}>
        <Box className={styles.iconInfo}>
          <CalendarIconY />
          <p className={styles.minorInfo}>{team.expiration_date}</p>
        </Box>
        <Box className={styles.iconInfo}>
          <LocationIconY />
          <p className={styles.minorInfo}>Kraków</p>
        </Box>
        <Box className={styles.iconInfo}>
          <TeamIconY />
          <p className={styles.minorInfo}>
            {team.accepted_people_id?.length}/{team.size}
          </p>
        </Box>
      </Box>
      <Box className={styles.interestsContainer}>
        <Box className={styles.interestsLabel}>
          <InterestsIconY />
          <p className={styles.interestsText}>Zainteresowania</p>
        </Box>
        <Box className={styles.interestsList}>
          {/* {team.interests.map((interest, idx) =>
            idx !== team.interests.length - 1 ? interest + ', ' : interest,
          )} */}
        </Box>
      </Box>
      <Box className={styles.descriptionContainer}>
        <Box className={styles.descriptionLabel}>
          <DescriptionIconY />
          <p className={styles.descriptionText}>Opis</p>
        </Box>
        <Box className={styles.description}>
            {/* tu opis z team */}
            <p>Nikt nie robi projektów tak jak Ćwierz obiera mandarynki. Guziol "Dołącz" jeszcze nie działa ale kiedyś będzie, trzeba mi dużo tekstu żeby wyszło na trzy linijki, no i jest</p>
        </Box>
      </Box>
      {/* TO DO: ten guzik ma coś robić */}
      <Button className={styles.button}>Dołącz</Button>
    </Box>
  </Box>
  );
};