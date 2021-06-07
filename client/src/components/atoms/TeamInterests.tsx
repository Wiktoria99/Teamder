import { useFormStyles } from '@/components';
import { CreateTeamI, InterestI } from '@/interfaces';
import {
  Checkbox,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Dispatch, SetStateAction, useContext } from 'react';
import { InterestsContext } from './InterestsProvider';

interface Props {
  setTeamInfo: Dispatch<SetStateAction<CreateTeamI>>;
  teamInfo: CreateTeamI;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      overflow: 'auto',
      maxHeight: 300,
      overflowY: 'auto',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      border: '1px solid #1F1F1F',
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
        fontSize: '16px',
      },
    },
  }),
);

export const TeamInterests: React.FC<Props> = ({ setTeamInfo, teamInfo }) => {
  const styles = useFormStyles();
  const classes = useStyles();
  //@ts-ignore
  const InterestList: InterestI[] = useContext(InterestsContext);

  const handleToggle = (value: number) => () => {
    let interestsNew = teamInfo.list_of_interests;
    interestsNew = interestsNew.includes(value)
      ? interestsNew.filter((el) => el !== value)
      : [...interestsNew, value];

    setTeamInfo({ ...teamInfo, list_of_interests: interestsNew });
  };

  return (
    <>
      <List className={classes.root}>
        {' '}
        Powiązane zainteresowania:
        {InterestList.map((value) => {
          return (
            <ListItem
              key={value.id}
              dense
              button
              onClick={handleToggle(value.id)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  color="primary"
                  style={{
                    transform: 'scale(0.6)',
                  }}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={value.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
