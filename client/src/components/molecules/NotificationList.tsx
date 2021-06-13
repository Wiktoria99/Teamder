import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { NotificationI } from '@/interfaces';
import { Loading, NotificationItem } from '@/components';
import { toast } from 'react-toastify';
import { getMyProfile, getNotifications } from '@/api';

interface Props {}

const useStyles = makeStyles((theme) => ({
  notificationList: {
    display: 'flex',
    flexFlow: 'column',
  },
}));

export const NotificationList = (props: Props) => {
  const [notifications, setNotifications] = useState<NotificationI[]>([]);
  const [username, setUsername] = useState<string>();

  const styles = useStyles();

  useEffect(() => {
    const getNotificationsFnc = async () => {
      const { data } = await getNotifications();
      setNotifications(data);
    };

    const getProfileIdFnc = async () => {
      const { data } = await getMyProfile();
      setUsername(data.user_name);
    };

    try {
      getProfileIdFnc();
      getNotificationsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zespołów!');
    }
  }, []);

  return (
    <Box className={styles.notificationList}>
      {notifications && username ? (
        <>
          {notifications.map((notification) => {
            return notification.waiting_people.map((person) => (
              <div key={notification.team_id}>
                <NotificationItem
                  username={username}
                  team_id={notification.team_id}
                  person={person}
                />
              </div>
            ));
          })}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
