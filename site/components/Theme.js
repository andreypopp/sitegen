/**
 * @copyright 2016-present, Reactdown team
 */

import React from 'react';
import Helmet from 'react-helmet';
import {contextTypes} from 'reactdown/lib/DocumentContext';
import {Heading as BaseHeading} from '../../components';

import {
  Root as ThemedRoot,
  Heading as ThemedHeading
} from './Theme.rcss';

export function Root({children, ...props}, {reactdown: {model, metadata}}) {
  return (
    <ThemedRoot>
      <Helmet title={metadata.title || model.title} />
      {children}
    </ThemedRoot>
  );
}
Root.contextTypes = contextTypes;

export function Heading(props) {
  return <BaseHeading {...props} Component={ThemedHeading} />;
}

export {
  Paragraph,
  OrderedList,
  UnorderedList,
  InlineCode,
  Emphasis,
  Strong,
  Code,
  Link,
  ListItem,
} from './Theme.rcss';
