import React, { useContext } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { CalendarIcon, InterestsIcon, LocationIcon, TeamIcon } from '@/assets';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { InterestI, TeamI } from '@/interfaces';
import { colors } from '@/styles';
import { useHistory } from 'react-router';
import { InterestsContext } from '../atoms';

interface Props {
  team: TeamI;
}

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

export const CurrentTeamItem: React.FC<Props> = ({ team }) => {
  const styles = useStyles();
  const history = useHistory();
  const teamSelectedHandler = (id: number) => {
    history.push('/my_team/' + id);
  };

  //@ts-ignore
  const InterestList: InterestI[] = useContext(InterestsContext);

  return (
    <Box className={styles.teamItemContainer}>
      <Box className={styles.avatarContainer}>
        {team.host_profile_picture_url ? (
          <img
            className={styles.photo}
            src={team.host_profile_picture_url}
            height="100"
            width="100"
            alt="avatar"
          />
        ) : (
          <img
            className={styles.photo}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            height="100"
            width="100"
            alt="no-avatar"
          />
        )}
      </Box>
      <Box className={styles.contentContainer}>
        <p className={styles.hostName}>{team.host}</p>
        <h3 className={styles.teamTitle}>{team.name}</h3>
        <Box className={styles.infoBox}>
          <Box className={styles.iconInfo}>
            <CalendarIcon />
            <p className={styles.minorInfo}>
              {new Date(team.expiration_date!).toLocaleDateString('us-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </p>
          </Box>
          <Box className={styles.iconInfo}>
            <LocationIcon />
            <p className={styles.minorInfo}>{team.location}</p>
          </Box>
          <Box className={styles.iconInfo}>
            <TeamIcon />
            <p className={styles.minorInfo}>
              {team.accepted_people_id?.length}/{team.size}
            </p>
          </Box>
          {team.cost_per_person ? (
            <Box className={styles.iconInfo}>
              <MonetizationOnIcon style={{ height: '20px', width: '20px' }} />

              <p className={styles.minorInfo}>{team.cost_per_person} zł</p>
            </Box>
          ) : null}
        </Box>
        <Box className={styles.interestsContainer}>
          <Box className={styles.interestsLabel}>
            <InterestsIcon />
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
        <Button
          className={styles.button}
          onClick={() => teamSelectedHandler(team.id)}
        >
          Więcej
        </Button>
      </Box>
    </Box>
  );
};
