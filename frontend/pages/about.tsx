/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useSWR from 'swr';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../components/Link';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Alert } from '@mui/material';
import fetcher from '../src/fetcher';

type Props = {
  data: any;
  error: string;
};

const AboutPage = (props: Props) => {
  const { data: initDataComingFromSSR, error: errorComingFromSSR } = props;
  const { t } = useTranslation(['common', 'about']);
  const { data: livenessData, error: livenessError } = useSWR('/api/livenessprobe', fetcher, {
    fallbackData: initDataComingFromSSR,
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }} css={css`text-align: center;`}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('about:title')}
        </Typography>
        <Container css={css`width: 100%; text-align: center;`}>
          <Button variant="contained" component={Link} noLinkStyle href="/">
            {t('common:navigation-page-index')}
          </Button>
        </Container>

        <div css={css`padding-top: 1rem;`}>
          {(livenessError || errorComingFromSSR) && <Alert severity="error">
            {t('common:api.error')}
          </Alert>}
          {(!livenessError && !errorComingFromSSR) && <Alert>
            {livenessData ? JSON.stringify(livenessData) : 'OK w/o data'}
          </Alert>}
        </div>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let gettingDataError;
  let ssData;
  try {
    const url = process.env.API_URL + '/livenessprobe';
    ssData = await fetcher(url);
  } catch (error: any) {
    console.error(error);
    gettingDataError = error.message;
  }

  const locale: string = context.locale ? context.locale : 'en';
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'about']),
      data: ssData ?? null,
      error: gettingDataError ? gettingDataError : null,
    },
  }
}

export default AboutPage;