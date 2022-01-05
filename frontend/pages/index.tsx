/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Container, Typography, Box } from '@mui/material';
import Link from '../components/Link';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const Index = () => {
  const { t } = useTranslation(['common', 'homepage']);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }} css={css`text-align: center;`}>
        <Typography variant="h4" component="h1" css={css`padding-bottom: 24px;`}>
          {t('homepage:title')}
        </Typography>
        <Container>
          <Link href="/about" color="secondary">
            {t('common:navigation-page-about')}
          </Link>
        </Container>
        <Container>
          <video width="400" height="300" controls muted>
            <source src="/video/test-app-finale-step-recording.m4v" type="video/mp4" />
          </video>
        </Container>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const locale: string = context.locale ? context.locale : 'en';
  return {
    props: {...await serverSideTranslations(locale, ['common', 'homepage'])},
  }
}

export default Index;
