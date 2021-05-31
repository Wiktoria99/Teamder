import React, { useContext } from 'react';
import { CustomButton } from '@/components';
import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { colors } from '@/styles';
import { InterestI } from '@/interfaces';
import { InterestsContext } from '@/components/atoms';

interface Props {
  interests: number[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'auto',
      maxHeight: 250,
      overflowY: 'auto',
      margin: 30,
      padding: 10,
      listStyle: 'none',
      border: `1px solid ${colors.BORDER_GRAY}`,
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
      },
      '& .MuiTypography-displayBlock': {
        fontSize: '18px',
      },
    },
    button: {
      borderRadius: '5px',
      height: 40,
      width: 140,
    },
    buttonPos: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: 30,
    },
  }),
);

export const UserInterests: React.FC<Props> = ({ interests }) => {
  const styles = useStyles();
  //@ts-ignore
  const InterestList: InterestI[] = useContext(InterestsContext);

  return (
    <>
      <List className={styles.root}>
        {interests.map((value) => {
          return (
            <ListItem key={value}>
              <ListItemText
                primary={InterestList.find((x) => x.id === value)!.name}
              />
            </ListItem>
          );
        })}
      </List>
      <div className={styles.buttonPos}>
        <CustomButton
          type="submit"
          color="secondary"
          variant="contained"
          className={styles.button}
        >
          <Typography variant="button">Edytuj</Typography>
        </CustomButton>
      </div>
    </>
  );
};
