import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { SideBarButton, BarWrapper, CustomButton } from '@/components';
import { NavLink } from 'react-router-dom';
import { paths } from '@/routing';
import {
  HomeOutlined,
  GroupOutlined,
  EmailOutlined,
  PersonOutlined,
} from '@material-ui/icons';
import { TeamderLogoSidebar } from '@/assets';
interface Props {}

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 0,
    width: 195,
    height: 20,
    marginTop: 20,

    '& .MuiTypography-button': {
      fontSize: 16,
      fontWeight: 400,
    },
  },
  buttonYellow: {
    borderRadius: '5px',
    height: 40,
    marginTop: 40,

    '& .MuiTypography-button': {
      fontSize: 16,
      fontWeight: 700,
    },
  },
}));

export const Sidebar = (props: Props) => {
  const styles = useStyles();

  return (
    <BarWrapper>
      <TeamderLogoSidebar />
      <NavLink
        to={paths.DASHBOARD}
        style={{
          marginBottom: '5px',
          marginTop: '40px',
          textDecoration: 'none',
        }}
      >
        <SideBarButton
          type="button"
          color="secondary"
          disableRipple
          startIcon={<HomeOutlined />}
        >
          Home
        </SideBarButton>
      </NavLink>
      <NavLink
        to={paths.DASHBOARD}
        style={{ marginBottom: '5px', textDecoration: 'none' }}
      >
        <SideBarButton
          type="button"
          color="secondary"
          disableRipple
          startIcon={<GroupOutlined />}
        >
          My Teams
        </SideBarButton>
      </NavLink>
      <NavLink
        to={paths.NOTIFICATIONS}
        style={{ marginBottom: '5px', textDecoration: 'none' }}
      >
        <SideBarButton
          type="button"
          color="secondary"
          disableRipple
          startIcon={<EmailOutlined />}
        >
          Notifications
        </SideBarButton>
      </NavLink>
      <NavLink to={paths.DASHBOARD} style={{ textDecoration: 'none' }}>
        <SideBarButton
          type="button"
          color="secondary"
          disableRipple
          startIcon={<PersonOutlined />}
        >
          Profile
        </SideBarButton>
      </NavLink>
      <NavLink to={paths.CREATE_TEAM} style={{ textDecoration: 'none' }}>
        <CustomButton
          type="submit"
          color="secondary"
          className={styles.buttonYellow}
        >
          Create a team
        </CustomButton>
      </NavLink>
    </BarWrapper>
  );
};
