import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import { InterestList } from '@/constants';
import { CustomTextField } from '../atoms';
import { Link } from 'react-router-dom';
import { colors } from '@/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebarContainer: {
      marginLeft: 30,
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
      width: '310px',
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
  }),
);

export const Suggestions = () => {
  const classes = useStyles();

  return (
    <Box className={classes.sidebarContainer}>
      <CustomTextField
        className={classes.searchbar}
        placeholder="Przeszukaj Teamder..."
      />
      <table className={classes.myTable}>
        <th className={classes.header}>Proponowane</th>
        {InterestList.map((value, idx) => {
          return (
            <tr key={idx}>
              <td className={classes.myRow}>
                #{value}
                <p className={classes.sub}>123 zespołów</p>
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
