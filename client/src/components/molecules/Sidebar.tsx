import React from 'react';
import { makeStyles, Grid, Box } from '@material-ui/core';
import { BarWrapper, CustomButton } from '@/components';
import { NavLink, useHistory } from 'react-router-dom';
import { paths } from '@/routing';
import styled from 'styled-components';
import { TeamderLogoSidebar, LogoSimple } from '@/assets';
import { SidebarData } from '@/components';
import { TOKEN } from '@/constants';
import { useLocalStorage, useWindowSize, Size } from '@/hooks';
import { Add, ExitToApp } from '@material-ui/icons';
interface Props {}

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    ['@media (max-width:999px)']: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  button: {
    borderRadius: '5px',
    height: 40,
    marginTop: 40,
    width: '100%',
  },
  routeList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  linkItem: {
    ['@media (max-width:999px)']: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));

const SidebarLink = styled(NavLink)`
  display: flex;
  color: #f2f2f2;
  flex-wrap: 'wrap';
  height: 60px;
  vertical-align: 'middle';
  padding: 0px 0px 15px 0px;
  text-decoration: none;
  font-size: 20px;
  list-style: none;
  justify-content: 'center';
  align-items: 'center';
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
  const size: Size = useWindowSize();
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
        <Box className={styles.mainContainer}>
          {size.width! >= 1000 ? (
            <TeamderLogoSidebar onClick={() => history.push('/')} />
          ) : (
            <LogoSimple onClick={() => history.push('/')} />
          )}

          <div className={styles.routeList} style={{ marginTop: '45px' }}>
            {SidebarData.map((item, index) => {
              return (
                <SidebarLink key={item.title} to={item.path}>
                  <Grid
                    container
                    direction="row"
                    alignItems="flex-end"
                    className={styles.linkItem}
                  >
                    {item.icon}
                    {size.width! >= 1000 && (
                      <SidebarLabel>{item.title}</SidebarLabel>
                    )}
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
              {size.width! >= 1000 ? 'Stwórz zespół' : <Add />}
            </CustomButton>
          </NavLink>
        </Box>
        <CustomButton
          type="submit"
          color="secondary"
          className={styles.button}
          onClick={logoutHandler}
        >
          {size.width! >= 1000 ? 'WYLOGUJ' : <ExitToApp />}
        </CustomButton>
      </BarWrapper>
    </>
  );
};
