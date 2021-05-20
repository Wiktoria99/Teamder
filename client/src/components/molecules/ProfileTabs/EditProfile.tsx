import React, {useState} from 'react';
import { CustomButton, CustomTextField, useFormStyles } from '@/components';
import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { colors } from '@/styles';

interface EditI {
  name: string,
  surname: string,
  city: string,
  age: number | null,
  bio: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 30,
      padding: 20,
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
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  }),
);

export const EditProfile: React.FC = () => {
  const styles = useStyles();
  const [editInfo, setEditInfo] = useState<EditI>({
    name: '',
    surname: '',
    city: '',
    age: null,
    bio: '',
  });

  const handleClick = (e: any) => {
    e.preventDefault();
    //EDIT 
  };

  return (
    <>
        <Box className={styles.root}>
        <form onSubmit={handleClick} className={styles.form}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CustomTextField
              style={{ width: '46%' }}
              label="Imię"
              variant="standard"
              color="secondary"
              onChange={(e) => setEditInfo({...editInfo, name: e.currentTarget.value})}
              value={editInfo.name}
            />
            
            <CustomTextField
              style={{ width: '46%' }}
              label="Nazwisko"
              variant="standard"
              color="secondary"
              onChange={(e) => setEditInfo({...editInfo, surname: e.currentTarget.value})}
              value={editInfo.surname}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CustomTextField
              style={{ width: '56%' }}
              label="Miejscowość"
              variant="standard"
              color="secondary"
              onChange={(e) => setEditInfo({...editInfo, city: e.currentTarget.value})}
              value={editInfo.city}
            />
            
            <CustomTextField
              style={{ width: '36%' }}
              label="Wiek"
              variant="standard"
              color="secondary"
              onChange={(e) => setEditInfo({...editInfo, age: Number(e.currentTarget.value)})}
              value={editInfo.age}
            />
          </div>
          <CustomTextField
            label="Opis"
            variant="standard"
            color="secondary"
            multiline
            rowsMax={4}
            onChange={(e) => setEditInfo({...editInfo, bio: e.currentTarget.value})}
            value={editInfo.bio}
          /> 
          </form>
        </Box>
        <div className={styles.buttonPos} >
          <CustomButton 
            type="submit"
            color="secondary"
            variant="contained"
            className={styles.button}
          >
            <Typography variant="button">Zatwierdź</Typography>
          </CustomButton>
          </div>
    </>
  );
};
