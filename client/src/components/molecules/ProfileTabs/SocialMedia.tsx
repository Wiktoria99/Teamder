import React from 'react';
import { CustomButton } from '@/components';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '@/assets';
import {
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { colors } from '@/styles';

interface Props {
    links: {
        first: string;
        second: string;
        third: string;
      }
  }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 30,
      padding: 10,
      listStyle: 'none',
      border: `1px solid ${colors.BORDER_GRAY}`,
    },
    button: {
      borderRadius: '5px',
      height: 40,
      width: 140,
    },
    buttonPos: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: 0,
      paddingRight: 30,
    },
    linkFont: {
      "& span": {
        fontSize: 18,
    }
    }
  }),
);


export const SocialMedia: React.FC<Props> = ({links}) => {
  const styles = useStyles();

  return (
    <>
        <List className={styles.root}>
        <ListItem >
            <ListItemIcon>
              <FacebookIcon />
            </ListItemIcon>
            <ListItemText primary={links.first} className={styles.linkFont}/>
        </ListItem>
        <ListItem >
            <ListItemIcon>
              <InstagramIcon />
             </ListItemIcon>
            <ListItemText primary={links.second} className={styles.linkFont}/>
        </ListItem>
        <ListItem  >
            <ListItemIcon>
              <TwitterIcon />
             </ListItemIcon>
            <ListItemText primary={links.third} className={styles.linkFont}/>
        </ListItem>
        </List>
        <div className={styles.buttonPos} >
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
