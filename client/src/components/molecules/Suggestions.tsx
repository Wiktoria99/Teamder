import React, { useEffect, useState } from 'react';
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import { CustomTextField } from '../atoms';
import { Link } from 'react-router-dom';
import { colors } from '@/styles';
import { InterestI } from '@/interfaces';
import { getInterests } from '@/api';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebarContainer: {
      marginLeft: 30,
      marginRight: 10,
    },
    searchbar: {
      width: '100%',
      '& .MuiInputBase-root': {
        fontSize: 20,
      },
    },
    myTable: {
      color: '#F2F2F2',
      paddingTop: '40px',
      maxWidth: '310px',
      width: '100%',
      fontSize: '16px',
      border: '1px solid #3A444C',
      borderCollapse: 'collapse',
    },
    header: {
      textAlign: 'left',
      fontSize: '20px',
      style: 'normal',
      paddingTop: '15px',
      paddingLeft: '15px',
      paddingBottom: '15px',
    },
    myRow: {
      fontWeight: 500,
      border: '1px solid #3A444C',
      borderCollapse: 'collapse',
      paddingTop: '10px',
      paddingLeft: '15px',
      paddingBottom: '5px',
    },
    different: {
      height: '40px',
      color: '#FFB800',
      paddingTop: '15px',
      paddingLeft: '15px',
      paddingBottom: '15px',
    },
    sub: {
      fontSize: '13px',
      fontWeight: 'normal',
      margin: '0',
    },
    link: {
      color: colors.SECONDARY,
      textDecoration: 'none',
    },
    interestTitle: {
      color: colors.PRIMARY_FONT,
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: 'bold',
      lineHeight: ' 22px',
      margin: '5px 0',
      cursor: 'pointer',
  },
  }),
);

export const Suggestions = () => {
  const history = useHistory();
  const classes = useStyles();
  const [listOfInterests, setInterests] = useState<InterestI[]>([]);

  useEffect(() => {
    const getInterestsFnc = async () => {
    const { data } = await getInterests();
      setInterests(data);
    };

    try {
      getInterestsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać zainteresowań!');
    }
  }, []);

  const selectedHandler = (id: number, name: string) => {
    history.push('/teambyinterest/' + id + '/' + name);
  };

  return (
    <Box className={classes.sidebarContainer}>
      <CustomTextField
        className={classes.searchbar}
        placeholder="Przeszukaj Teamder..."
      />
      <table className={classes.myTable}>
        <th className={classes.header}>Proponowane</th>
        {/* tu zmeinić wyświetlanie id na liczbę zepołów z tym zainteresowaniem */}
        {listOfInterests.filter(element => element.id < 6).map((interest, idx) => {
          return (
            <tr key={idx}>
              <td className={classes.myRow}>
                <a className={classes.interestTitle} onClick={() => selectedHandler(interest.id, interest.name)}>#{interest.name}</a>
                <p className={classes.sub} >{interest.id} zespołów</p>
              </td>
            </tr>
          );
        })}
        <tr>
          <td className={classes.different}>
            <Link className={classes.link} to="/suggestions">
              Zobacz więcej...
            </Link>
          </td>
        </tr>
      </table>
    </Box>
  );
};
