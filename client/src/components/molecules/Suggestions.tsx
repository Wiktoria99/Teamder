import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { InterestList } from '@/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myTable:{
      color: '#F2F2F2',
      position: 'absolute',
      width: '306px',
      height: '362px',
      left: '1236px',
      top: '96px',
      fontSize: '16px',
      border: '1px solid #3A444C',
      borderCollapse: 'collapse',
    },
    header:{
      textAlign: 'left',
      fontSize: '20px',
      style: 'normal',
      paddingTop: '15px',
      paddingLeft: '15px',
      paddingBottom: '15px',
    },
    myRow:{
      weight: '700',
    //   fontWeight: 'bold',
      border: '1px solid #3A444C',
      borderCollapse: 'collapse',
      paddingTop: '10px',
      paddingLeft: '15px',
      paddingBottom: '5px',
    },
    different:{
      height: '40px',
      color: '#FFB800',
      paddingTop: '15px',
      paddingLeft: '15px',
      paddingBottom: '15px',
    },
    sub:{
      fontSize: '13px',
      fontWeight: 'normal',
      margin: '0',
    },
  }),
);

export const Suggestions = () => {
  const classes = useStyles();

  return (
    <table className={classes.myTable}>
      <th className={classes.header}>Proponowane</th>
      {InterestList.map((value) => {
        return (
          <tr><td className={classes.myRow}> 
              #{value}
              <p className={classes.sub}>123 zespołów</p>
           </td></tr>
          );
        })}
      <tr>
        <td className={classes.different}>Zobacz więcej...</td>
      </tr>
    </table>
  )
};