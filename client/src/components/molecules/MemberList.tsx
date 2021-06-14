import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, makeStyles } from '@material-ui/core';
import { Loading } from '@/components';
import { getMyProfile, getMyTeamProfiles } from '@/api';
import { ProfileI } from '@/interfaces';
import { Member } from '../atoms';

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
}));

export const MemberList: React.FC<Props> = ({ membersIDs }) => {
  const [members, setMembers] = useState<ProfileI[]>([]);
  const [username, setUsername] = useState<string>();

  const styles = useStyles();

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

  return (
    <Box className={styles.memberList}>
      {members.length && username ? (
        <>
          {members.map((member, idx) => (
            <Member member={member} username={username} />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
