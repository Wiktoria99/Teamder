import React from 'react';
import { useHistory } from 'react-router';
import { useLocalStorage } from '@/hooks';
import { ACCESS_TOKEN, ID_TOKEN } from '@/constants';
import { Layout, MainWrapper } from '@/components';
import { SuggestionList } from '@/components/molecules/SuggestionList';

export const SuggestionsAll: React.FC = () => {
  const [token, setToken] = useLocalStorage(ID_TOKEN, '');
  const history = useHistory();

  //   useEffect(() => {
  //     if (!token) {
  //       history.push(paths.LOGIN);
  //     }
  //   }, [token]);

  return (
    <Layout>
      <MainWrapper isBackBtn title="Zainteresowania" backBtnURL={'/'}>
        <SuggestionList />
      </MainWrapper>
    </Layout>
  );
};
