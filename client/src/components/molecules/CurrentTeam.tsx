import React, { useContext } from 'react';
import { InterestI, TeamI } from '@/interfaces';
import { Box, makeStyles } from '@material-ui/core';
import { colors } from '@/styles';
import {
  CalendarIconY,
  InterestsIconY,
  LocationIconY,
  TeamIconY,
} from '@/assets';
import { InterestsContext } from '../atoms';

interface Props {
  team: TeamI;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
}));

export const CurrentTeam: React.FC<Props> = ({ team }) => {
  const styles = useStyles();

  //@ts-ignore
  const InterestList: InterestI[] = useContext(InterestsContext);

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
            {team.list_of_interests_id!.map((interest_id, idx) => {
              if (InterestList.length) {
                const interest = InterestList.find(
                  (x) => x.id === interest_id,
                )!.name;

                return idx !== team.list_of_interests_id!.length - 1
                  ? interest + ', '
                  : interest;
              }
            })}
          </Box>
        </Box>
        <Box className={styles.descriptionContainer}>
          <Box className={styles.description}>Tu będą guziczki...</Box>
        </Box>
      </Box>
    </Box>
  );
};
