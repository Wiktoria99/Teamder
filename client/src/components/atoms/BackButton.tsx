import React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import { colors } from '@/styles';
import { makeStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

interface BackButtonI {
  pathname: string;
  classname?: string;
}

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    backgroundColor: colors.BLACK,
    color: colors.WHITE,
    position: 'fixed',
    left: 0,
    top: 50,
    padding: '6px 16px',
    paddingTop: 10,
    cursor: 'pointer',
    ['@media (max-width: 1360px)']: {
      top: 180,
    },
  },
}));

export const BackButton: React.FC<BackButtonI> = ({
  pathname,
  classname,
}: BackButtonI) => {
  const styles = useStyles();

  return (
    <NavLink className={cx(styles.iconContainer, classname)} to={pathname}>
      <ArrowBack />
    </NavLink>
  );
};
