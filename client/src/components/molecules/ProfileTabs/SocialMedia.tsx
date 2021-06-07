import React, { useState } from 'react';
import { CustomButton, CustomTextField } from '@/components';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '@/assets';
import { Box } from '@material-ui/core';
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
import { ProfileI, EditI } from '@/interfaces';
import { editMyProfile } from '@/api';
import { toast } from 'react-toastify';

interface Props {
  profile: ProfileI;
  edit: boolean;
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
      '& span': {
        fontSize: 18,
      },
    },
    textfield: {
      margin: '10px 0',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  }),
);

export const SocialMedia: React.FC<Props> = ({ profile, edit }) => {
  const styles = useStyles();
  const [editInfo, setEditInfo] = useState<EditI>({
    name: profile.name,
    surname: profile.surname,
    location: profile.location,
    age: profile.age,
    bio: profile.bio,
    photo_src: profile.photo_src,
    social_media_URL1: profile.social_media_URL1,
    social_media_URL2: profile.social_media_URL2,
    social_media_URL3: profile.social_media_URL3,
    list_of_interests: profile.list_of_interests_id,
  });

  const handleEdit = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await editMyProfile(editInfo);
      console.log(data);
      toast.success('Media społecznościowe zostały zedytowane pomyślnie!');
      window.location.reload();
    } catch (error) {
      toast.error('Nie udało się edytować mediów społecznościowych!');
    }
  };

  const handleClick = (event: React.ChangeEvent<{}>) => {
    setWithoutEditing(0);
  };
  const [withoutEditing, setWithoutEditing] = useState(1);

  return (
    <>
      {withoutEditing ? (
        <>
          <List className={styles.root}>
            <ListItem>
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>
              <ListItemText
                primary={profile.social_media_URL1}
                className={styles.linkFont}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InstagramIcon />
              </ListItemIcon>
              <ListItemText
                primary={profile.social_media_URL2}
                className={styles.linkFont}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TwitterIcon />
              </ListItemIcon>
              <ListItemText
                primary={profile.social_media_URL3}
                className={styles.linkFont}
              />
            </ListItem>
          </List>
          <div className={styles.buttonPos}>
            {edit && (
              <CustomButton
                type="submit"
                color="secondary"
                variant="contained"
                className={styles.button}
              >
                <Typography variant="button" onClick={handleClick}>
                  Edytuj
                </Typography>
              </CustomButton>
            )}
          </div>
        </>
      ) : (
        <>
          <Box className={styles.root}>
            <form onSubmit={handleEdit} className={styles.form}>
              <CustomTextField
                label="Link #1"
                variant="standard"
                color="secondary"
                className={styles.textfield}
                multiline
                rowsMax={2}
                onChange={(e) =>
                  setEditInfo({
                    ...editInfo,
                    social_media_URL1: e.currentTarget.value,
                  })
                }
                value={editInfo.social_media_URL1}
              />
              <CustomTextField
                label="Link #2"
                variant="standard"
                color="secondary"
                className={styles.textfield}
                multiline
                rowsMax={2}
                onChange={(e) =>
                  setEditInfo({
                    ...editInfo,
                    social_media_URL2: e.currentTarget.value,
                  })
                }
                value={editInfo.social_media_URL2}
              />
              <CustomTextField
                label="Link #3"
                variant="standard"
                color="secondary"
                className={styles.textfield}
                multiline
                rowsMax={2}
                onChange={(e) =>
                  setEditInfo({
                    ...editInfo,
                    social_media_URL3: e.currentTarget.value,
                  })
                }
                value={editInfo.social_media_URL3}
              />
            </form>
          </Box>
          <div className={styles.buttonPos}>
            <CustomButton
              type="submit"
              color="secondary"
              className={styles.textfield}
              variant="contained"
              onClick={(e) => handleEdit(e)}
            >
              <Typography variant="button">Zatwierdź</Typography>
            </CustomButton>
          </div>
        </>
      )}
    </>
  );
};
