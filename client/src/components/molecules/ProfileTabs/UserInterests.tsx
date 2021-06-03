import React, { useContext, useState } from 'react';
import { CustomButton, CustomTextField } from '@/components';
import { Box } from '@material-ui/core';
import {
  Checkbox,
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
import { InterestI, ProfileI, EditI } from '@/interfaces';
import { InterestsContext } from '@/components/atoms';
import { editMyProfile } from '@/api';
import { toast } from 'react-toastify';

interface Props {
  profile: ProfileI;
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
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  }),
);

export const UserInterests: React.FC<Props> = ({ profile }) => {
  const styles = useStyles();
  //@ts-ignore
  const InterestList: InterestI[] = useContext(InterestsContext);
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

  const handleToggle = (value: number) => () => {
    let interestsNew = editInfo.list_of_interests;
    interestsNew = interestsNew.includes(value)
      ? interestsNew.filter((el) => el !== value)
      : [...interestsNew, value];

    setEditInfo({ ...editInfo, list_of_interests: interestsNew });
  };
  
  const handleEdit = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await editMyProfile(editInfo);
      console.log(data);
      toast.success('Zainteresowania zostały zedytowane pomyślnie!');
      window.location.reload();
    } catch (error) {
      toast.error('Nie udało się edytować zainteresowań!');
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
          {profile.list_of_interests_id.map((value) => {
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
            <Typography variant="button" onClick={handleClick}>Edytuj</Typography>
          </CustomButton>
        </div>
      </>
      ) : (
        <>
          <form onSubmit={handleEdit} className={styles.form}>
            <List className={styles.root}>
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
                        checked={editInfo.list_of_interests.includes(
                          value.id,
                        )}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={value.name} />
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
            <Typography variant="button" >Zatwierdź</Typography>
          </CustomButton>
          </div>
          </form>
        </>
      )}
  </>
  );
};
