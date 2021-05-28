import React, { useEffect, useState } from 'react';
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
    login: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    city: '',
    dayOfBirth: null,
    bio: '',
    socialMedia: {
      first: '',
      second: '',
      third: '',
    },
    interests: [],
  });
  const titles = ['Basic information', 'Additional information', 'Interests'];

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
