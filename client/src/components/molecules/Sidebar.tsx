import React from 'react';
import { makeStyles } from '@material-ui/core';
import { SideBarButton, BarWrapper, CustomButton } from '@/components';
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
