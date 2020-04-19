import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import React, { ComponentProps } from 'react';

type DocumentProps = ComponentProps<typeof Document>;

const getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
  };
};

const CustomDocument = ({  }: DocumentProps): JSX.Element => {
  return (
    <Html lang="nb-NO">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <link rel="icon" type="image/png" href="/img/icons/icon-256.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script id="stripe-js" src="https://js.stripe.com/v3/" async />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

CustomDocument.getInitialProps = getInitialProps;
CustomDocument.renderDocument = Document.renderDocument;

export default CustomDocument;
