import React from 'react';
import {Link as BaseLink} from 'react-router';

/**
 * Link component which can infer href and children from page metadata.
 */
export default function Link({page, to, children, ...props}) {
  to = to || page.path;
  children = children || page.title;
  return <BaseLink {...props} to={to}>{children}</BaseLink>;
}
