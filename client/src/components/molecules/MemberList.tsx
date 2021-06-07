import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, makeStyles } from '@material-ui/core';
import { Loading } from '@/components';
import { getMyTeamProfiles } from '@/api';
import { ProfileI } from '@/interfaces';
import { useHistory } from 'react-router';

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
    cursor: 'pointer',
  },
  memberContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },
  memberImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  memberName: { marginLeft: '20px', fontSize: '20px' },
}));

export const MemberList: React.FC<Props> = ({ membersIDs }) => {
  const [members, setMembers] = useState<ProfileI[]>([]);
  const styles = useStyles();
  const history = useHistory();

  useEffect(() => {
    const getMembersFnc = async () => {
      const { data } = await getMyTeamProfiles({ user_ids: membersIDs });
      setMembers(data.users_info);
    };

    try {
      getMembersFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zespołów!');
    }
  }, []);

  const openUserProfile = (username: string) => {
    history.push('/profile/' + username);
  };

  return (
    <Box className={styles.memberList}>
      {members.length ? (
        <>
          {members.map((member, idx) => (
            <Box
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
            </Box>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
