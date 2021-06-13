import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { NotificationI } from '@/interfaces';
import { Loading, NotificationItem } from '@/components';
import { toast } from 'react-toastify';
import { getNotifications } from '@/api';

interface Props {}

const useStyles = makeStyles((theme) => ({
  notificationList: {
    display: 'flex',
    flexFlow: 'column',
  },
}));

export const NotificationList = (props: Props) => {
  const [notifications, setNotifications] = useState<NotificationI[]>([]);
  const styles = useStyles();

  useEffect(() => {
    const getNotificationsFnc = async () => {
      const { data } = await getNotifications();
      setNotifications(data);
    };

    try {
      getNotificationsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zespołów!');
    }
  }, []);

  return (
    <Box className={styles.notificationList}>
      {notifications ? (
        <>
          {notifications.map((notification) => {
            return notification.waiting_people.map((person) => (
              <div key={notification.team_id}>
                <NotificationItem
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
