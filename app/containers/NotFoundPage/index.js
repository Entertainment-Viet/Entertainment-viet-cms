/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import comingSoonGif from './img/comingsoon-page.gif';
import { ComingSoonGIF } from './styles';

export default function NotFound() {
  return (
    <h1>
      <ComingSoonGIF src={comingSoonGif} />
    </h1>
  );
}
