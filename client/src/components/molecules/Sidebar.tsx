import React from 'react';
import { makeStyles, Grid, Box } from '@material-ui/core';
import { BarWrapper, CustomButton } from '@/components';
import { NavLink, useHistory } from 'react-router-dom';
import { paths } from '@/routing';
import styled from 'styled-components';
import { TeamderLogoSidebar } from '@/assets';
import { SidebarData } from '@/components';
import { TOKEN } from '@/constants';
import { useLocalStorage } from '@/hooks';
interface Props {}

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '5px',
    height: 40,
    marginTop: 40,
    width: 220,
  },
}));

const SidebarLink = styled(NavLink)`
  display: flex;
  color: #f2f2f2;
  align-items: 'center';
  flex-wrap: 'wrap';
  height: 60px;
  vertical-align: 'middle';
  padding: 0px 0px 15px 0px;
  text-decoration: none;
  font-size: 20px;
  list-style: none;
  &:hover {
    cursor: pointer;
    color: #ffb800;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

export const Sidebar = (props: Props) => {
  const styles = useStyles();
  const history = useHistory();
  const [, setToken] = useLocalStorage<string>(TOKEN, '');

  const logoutHandler = async () => {
    try {
      setToken('');
      localStorage.removeItem(TOKEN);
      history.push('/login');
    } catch (error) {
      console.log('There was an error when logging out!', error);
    }
  };

  return (
    <>
      <BarWrapper>
        <Box>
          <TeamderLogoSidebar onClick={() => history.push('/')} />
          <div style={{ marginTop: '45px' }}>
            {SidebarData.map((item, index) => {
              return (
                <SidebarLink key={item.title} to={item.path}>
                  <Grid container direction="row" alignItems="flex-end">
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                  </Grid>
                </SidebarLink>
              );
            })}
          </div>
          <NavLink to={paths.CREATE_TEAM} style={{ textDecoration: 'none' }}>
            <CustomButton
              type="submit"
              color="secondary"
              className={styles.button}
            >
              Stwórz zespół
            </CustomButton>
          </NavLink>
        </Box>
        <CustomButton
          type="submit"
          color="secondary"
          className={styles.button}
          onClick={logoutHandler}
        >
          WYLOGUJ
        </CustomButton>
      </BarWrapper>
    </>
  );
};
