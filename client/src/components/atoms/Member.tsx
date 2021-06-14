import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { rateUser } from '@/api';
import { toast } from 'react-toastify';
import { colors } from '@/styles';
import { ProfileI } from '@/interfaces';
import { useHistory } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

interface Props {
  member: ProfileI;
  username: string;
}

const useStyles = makeStyles((theme) => ({
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
      color: 'colors.SECONDARY',
    },
  },
}));

export const Member: React.FC<Props> = ({ member, username }) => {
  const [thumbColors, setThumbColors] = useState({
    up: 'white',
    down: 'white',
  });

  const styles = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (member.yourRate === 1) {
      setThumbColors({ up: colors.SECONDARY, down: 'white' });
    } else if (member.yourRate === -1) {
      setThumbColors({ up: 'white', down: colors.SECONDARY });
    }
  }, [member]);

  const openUserProfile = (username: string) => {
    history.push('/profile/' + username);
  };

  const rateUserPositive = async (user: ProfileI) => {
    try {
      await rateUser({ user_name: user.user_name, rate: 1 });
      setThumbColors({ up: colors.SECONDARY, down: 'white' });
      toast.success('Użytkownik został oceniony!');
    } catch (e) {
      toast.error('Nie udało się ocenić użytkownika!');
    }
  };

  const rateUserNegative = async (user: ProfileI) => {
    try {
      await rateUser({ user_name: user.user_name, rate: -1 });
      setThumbColors({ up: 'white', down: colors.SECONDARY });

      toast.success('Użytkownik został oceniony!');
    } catch (e) {
      toast.error('Nie udało się ocenić użytkownika!');
    }
  };

  return (
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
            style={{ marginRight: '10px', color: thumbColors.up }}
            className={styles.thumb}
            onClick={() => rateUserPositive(member)}
          />
          <ThumbDownIcon
            style={{ color: thumbColors.down }}
            className={styles.thumb}
            onClick={() => rateUserNegative(member)}
          />
        </div>
      ) : null}
    </Box>
  );
};
