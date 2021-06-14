import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, makeStyles } from '@material-ui/core';
import { Loading } from '@/components';
import { getMyProfile, getMyTeamProfiles, rateUser } from '@/api';
import { ProfileI } from '@/interfaces';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useHistory } from 'react-router';
import { colors } from '@/styles';

interface Props {
  membersIDs: number[];
}

const useStyles = makeStyles((theme) => ({
  memberList: {
    display: 'flex',
    flexFlow: 'column',
    height: 'calc(100% - 100px)',
    overflowY: 'scroll',
    maxHeight: '525px',
  },
  memberContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
    cursor: 'pointer',
  },
  memberImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  memberName: { marginLeft: '20px', fontSize: '20px' },
  thumb: {
    cursor: 'pointer',
    '&:hover': {
      color: colors.SECONDARY,
    },
  },
}));

export const MemberList: React.FC<Props> = ({ membersIDs }) => {
  const [members, setMembers] = useState<ProfileI[]>([]);
  const [username, setUsername] = useState<string>();

  const styles = useStyles();
  const history = useHistory();

  useEffect(() => {
    const getProfileIdFnc = async () => {
      const { data } = await getMyProfile();
      setUsername(data.user_name);
    };

    const getMembersFnc = async () => {
      const { data } = await getMyTeamProfiles({ user_ids: membersIDs });
      setMembers(data.users_info);
    };

    try {
      getMembersFnc();
      getProfileIdFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zespołów!');
    }
  }, []);

  const openUserProfile = (username: string) => {
    history.push('/profile/' + username);
  };

  const rateUserPositive = async (user: ProfileI) => {
    try {
      const data = await rateUser({ user_name: user.user_name, rate: 1 });
      toast.success('Użytkownik został oceniony!');
    } catch (e) {
      toast.error('Nie udało się ocenić użytkownika!');
    }
  };

  const rateUserNegative = async (user: ProfileI) => {
    try {
      const data = await rateUser({ user_name: user.user_name, rate: -1 });
      toast.success('Użytkownik został oceniony!');
    } catch (e) {
      toast.error('Nie udało się ocenić użytkownika!');
    }
  };

  return (
    <Box className={styles.memberList}>
      {members.length && username ? (
        <>
          {members.map((member, idx) => (
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                className={styles.memberContainer}
                onClick={() => openUserProfile(member.user_name)}
              >
                <img
                  className={styles.memberImage}
                  src={member.photo_src}
                  alt="user_avatar"
                />
                <p className={styles.memberName}>
                  {member.name} {member.surname}
                </p>
              </div>
              {username !== member.user_name ? (
                <div style={{ marginRight: '30px' }}>
                  <ThumbUpIcon
                    style={{ marginRight: '10px' }}
                    className={styles.thumb}
                    onClick={() => rateUserPositive(member)}
                  />
                  <ThumbDownIcon
                    className={styles.thumb}
                    onClick={() => rateUserNegative(member)}
                  />
                </div>
              ) : null}
            </Box>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
