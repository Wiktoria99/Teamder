import React, { useState } from 'react';
import {
  BasicInfo,
  AdditionalInfo,
  Interests,
  FormWrapper,
} from '@/components';
import { RegisterRequestI } from '@/interfaces';

export const Register: React.FC = () => {
  const [registerProgress, setRegisterProgress] = useState<number>(0);
  const [registerInfo, setRegisterInfo] = useState<RegisterRequestI>({
    user_name: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    password2: '',
    location: '',
    age: null,
    bio: '',
    photo_src: '',
    social_media_URL1: '',
    social_media_URL2: '',
    social_media_URL3: '',
    list_of_interests: [],
  });
  const titles = [
    'Podstawowe informacje',
    'Dodatkowe informacje',
    'Zainteresowania',
  ];

  const ChildProps = {
    registerInfo: registerInfo,
    setRegisterInfo: setRegisterInfo,
    updateProgressState: setRegisterProgress,
  };

  return (
    <>
      <FormWrapper title={titles[registerProgress]}>
        {registerProgress === 0 && <BasicInfo {...ChildProps} />}
        {registerProgress === 1 && <AdditionalInfo {...ChildProps} />}
        {registerProgress === 2 && <Interests {...ChildProps} />}
      </FormWrapper>
    </>
  );
};
