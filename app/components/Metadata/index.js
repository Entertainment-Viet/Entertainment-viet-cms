import React from 'react';
import { Helmet } from 'react-helmet';
import { metaVi, metaEn } from 'constants/messages';

function Metadata() {
  return (
    <Helmet>
      {navigator.language === 'vi' && (
        <meta name="description" content={metaVi} />
      )}
      {navigator.language.includes('en') && (
        <meta name="description" content={metaEn} />
      )}
    </Helmet>
  );
}

export default Metadata;
