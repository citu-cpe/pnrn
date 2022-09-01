import { GetStaticProps, NextPage } from 'next';
import { Themes } from '../../modules/theme/components/Themes';

const ThemePage: NextPage = () => <Themes />;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      dontShowUser: false,
    },
  };
};

export default ThemePage;
