/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AppBar, Box, Toolbar } from "@mui/material";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { LanguageSelector } from './LanguageSelector';

interface Props {
  children: any;
}

export const Layout = (props: Props) => {
  const { children} = props;
  const router = useRouter();

  return (
    <>
      <Box css={css`flex-grow: 1`}>
        <AppBar position="static" css={css`flex-grow: 1; display: inline-block;`}>
          <Toolbar css={css`top: 4px;`}>
            <Box css={css`flex-grow: 1;`}>
              <Image
                src="/img/logo-dark.png"
                alt="Logo"
                width="72"
                height="72"
              />
            </Box>
            <div css={css`padding: 12px;`}>
              <LanguageSelector language={router.locale} />
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Box>
        {children}
      </Box>
    </>
  );
}
