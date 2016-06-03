/**
 * @copyright 2016-present, Reactdown team
 */

import React from 'react';
import Helmet from 'react-helmet';
import {contextTypes} from 'reactdown/lib/DocumentContext';
import {Heading as HeadingBase} from '../../components';
import {Link as LinkBase} from '../../';

import {
  Root as ThemedRoot,
  Heading as ThemedHeading,
  Link as ThemedLink
} from './Theme.rcss';

export function Root({children, ...props}, {reactdown: {meta}}) {
  return (
    <ThemedRoot>
      <Helmet title={meta.data.title || meta.model.title} />
      {children}
    </ThemedRoot>
  );
}
Root.contextTypes = contextTypes;

export function Heading(props) {
  return <HeadingBase {...props} Component={ThemedHeading} refStyle={{top: '-5em'}} />;
}

export function Link(props) {
  return <LinkBase {...props} Component={ThemedLink} />;
}

export {
  Paragraph,
  OrderedList,
  UnorderedList,
  InlineCode,
  Emphasis,
  Strong,
  Code,
  ListItem,
} from './Theme.rcss';
