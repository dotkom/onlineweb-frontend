import React from 'react';

import HttpError from 'core/components/errors/HttpError';

const NotFoundPage = () => {
  return <HttpError code={404} />;
};

export default NotFoundPage;
