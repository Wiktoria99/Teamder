import React, { useState } from 'react';
import { makeStyles, Button ,Grid} from '@material-ui/core';
import { BarWrapper, CustomButton } from '@/components';
import { NavLink } from 'react-router-dom';
import { paths } from '@/routing';
import styled from 'styled-components';
import { TeamderLogoSidebar } from '@/assets';
import { SidebarData } from '@/components';
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
    color: #F2F2F2;
    alignItems: 'center',
    flexWrap: 'wrap',
    height: 60px;
    vertical-Align: 'middle';
    padding: 0px 0px 15px 0px;
    text-decoration: none;
    font-size: 20px;
    list-style: none;
    &:hover {
        cursor: pointer;
        color: #FFB800;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;


export const Sidebar = (props: Props) => {
  const styles = useStyles();
  return (
    <>
            <BarWrapper>
              <TeamderLogoSidebar />
              <div style={{marginTop: "45px"}}>
                { SidebarData.map((item, index) => {
                    return (
                      <SidebarLink to={item.path} >
                        <Grid container direction="row" alignItems="flex-end" >
                          {item.icon}
                          <SidebarLabel>{item.title}</SidebarLabel>
                        </Grid> 
                      </SidebarLink>);
                }) }
              </div>
              <NavLink to={paths.CREATE_TEAM} style={{ textDecoration: 'none' }} >
                <CustomButton
                  type="submit"
                  color="secondary"
                  className={styles.button}
                  >
                  Stwórz zespół
                </CustomButton>
              </NavLink>
            </BarWrapper>
    </>
    );
};
