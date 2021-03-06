import React, { useContext, useEffect, useState } from 'react';
import { InterestI, TeamI } from '@/interfaces';
import { Button, Box, makeStyles } from '@material-ui/core';
import { colors } from '@/styles';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {
  CalendarIconY,
  InterestsIconY,
  LocationIconY,
  TeamIconY,
} from '@/assets';
import { InterestsContext, Loading } from '../atoms';
import { getMyProfile, joinTeam } from '@/api';
import { toast } from 'react-toastify';

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

export const JoinTeamItem: React.FC<Props> = ({ team }) => {
  const styles = useStyles();
  const [profileId, setProfileId] = useState<number>();
  //@ts-ignore
  const InterestList: InterestI[] = useContext(InterestsContext);

  useEffect(() => {
    const getProfileFnc = async () => {
      const { data } = await getMyProfile();
      setProfileId(data.id);
    };

    try {
      getProfileFnc();
    } catch (error) {
      toast.error('Nie uda??o si?? pobra?? id u??ytkownika!');
    }
  }, []);

  const clickHandler = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await joinTeam({
        team_id: team.id,
        person_joining: profileId!,
      });
      console.log(data);
      toast.success('Dodano na list?? ch??tnych!');
      window.location.reload();
    } catch (error) {
      toast.error('Nie uda??o si?? doda?? zespo??u!');
    }
  };

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
            <CalendarIconY />
            <p className={styles.minorInfo}>
              {new Date(team.expiration_date!).toLocaleDateString('us-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </p>
          </Box>
          <Box className={styles.iconInfo}>
            <LocationIconY />
            <p className={styles.minorInfo}>{team.location}</p>
          </Box>
          <Box className={styles.iconInfo}>
            <TeamIconY />
            <p className={styles.minorInfo}>
              {team.accepted_people_id?.length}/{team.size}
            </p>
          </Box>
          {team.cost_per_person ? (
            <Box className={styles.iconInfo}>
              <MonetizationOnIcon style={{ height: '20px', width: '20px' }} />

              <p className={styles.minorInfo}>{team.cost_per_person} z??</p>
            </Box>
          ) : null}
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
        <Box className={styles.description}>
          <p>{team.description ? team.description : 'Brak opisu'}</p>
        </Box>
        {profileId ? (
          team.waiting_people_id?.includes(profileId) ? (
            'Jeste?? ju?? na li??cie oczekuj??cych!'
          ) : (
            <Button className={styles.button} onClick={(e) => clickHandler(e)}>
              Do????cz
            </Button>
          )
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};
