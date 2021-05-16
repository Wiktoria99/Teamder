import React, { useEffect } from 'react';
import { useLocalStorage } from '@/hooks';
import { useHistory } from 'react-router';
import { ACCESS_TOKEN, ID_TOKEN } from '@/constants';
import {MainWrapper, SideBarButton, useSideBarStyles, BarWrapper,CustomButton } from '@/components';
import { Typography, ButtonGroup } from '@material-ui/core';
import { 
  HomeOutlined, 
  GroupOutlined, 
  EmailOutlined, 
  PersonOutlined,
} from '@material-ui/icons';
import { paths } from '@/routing';
import { logout } from '@/api';




export const MainPage: React.FC = () => {
  const [token, setToken] = useLocalStorage(ID_TOKEN, '');
  const [accessToken] = useLocalStorage(ACCESS_TOKEN, '');
  const history = useHistory();

  const styles = useSideBarStyles();

  // useEffect(() => {
  //   if (!token) {
  //     history.push(paths.LOGIN);
  //   }
  // }, [token]);

  const logoutHandler = async () => {
    try {
      setToken('');
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(ID_TOKEN);
      await logout({ access_token: accessToken }, token);
    } catch (error) {
      console.log('There was an error when logging out!', error);
    }
  };


 return (
          <BarWrapper>
          <Typography align="center" variant="h2">TEAMDER</Typography>
            <SideBarButton
                type="button"
                color="secondary"
                startIcon={<HomeOutlined />}
                className={styles.button}
              >
                Home
              </SideBarButton>
              <SideBarButton
                type="button"
                color="secondary"
                startIcon={<GroupOutlined />}
                className={styles.button}
              >
                My Teams
              </SideBarButton>
              <SideBarButton
                type="button"
                color="secondary"
                startIcon={<EmailOutlined />}
                className={styles.button}
              >
                Notifications
                </SideBarButton>
              <SideBarButton
                type="button"
                color="secondary"
                startIcon={<PersonOutlined />}
                className={styles.button}
              >
              Profile
              </SideBarButton>
            <CustomButton
              type="submit"
              color="secondary"
              className={styles.buttonYellow}
          >
            Create a team
          </CustomButton>
            </BarWrapper>
            
  );
};
