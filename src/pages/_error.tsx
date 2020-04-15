import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import React from 'react';

const statusCodes: { [code: number]: string } = {
  400: 'Feil ved forespørselen',
  404: 'Kunne ikke finne siden',
  405: 'Metoden er ikke tillatt',
  500: 'Intern serverfeil',
};

export interface IProps {
  statusCode: number;
  title?: string;
}

const ErrorPage = ({ statusCode, title }: IProps) => {
  const displayTitle = title || statusCodes[statusCode] || 'Det har skjedd en uventet feil';
  return (
    <div>
      <Head>
        <title>
          {statusCode}: {displayTitle}
        </title>
      </Head>
      <div>
        <h1>{statusCode}</h1>
        <div>
          <h2>{displayTitle}.</h2>
        </div>
      </div>
    </div>
  );
};

ErrorPage.getInitialProps = DefaultErrorPage.getInitialProps;
ErrorPage.origGetInitialProps = DefaultErrorPage.origGetInitialProps;

export default ErrorPage;
