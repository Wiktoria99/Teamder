import React, { createContext, useEffect, useState } from 'react';
import { getInterests } from '@/api';
import { InterestI } from '@/interfaces';

export interface Props {
  children: any;
}

//@ts-ignore
export const InterestsContext = createContext();

export const InterestsProvider = ({ children }: Props) => {
  const [interests, setInterests] = useState<InterestI[]>([]);
  
  useEffect(() => {
    const getInterestsFnc = async () => {
      const { data } = await getInterests();
      data.map((d) => (d.count = 0));
      setInterests(data);
    };

    getInterestsFnc();
  }, []);

  return (
    <InterestsContext.Provider value={interests}>
      {children}
    </InterestsContext.Provider>
  );
};
