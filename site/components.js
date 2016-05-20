/**
 * @copyright 2016-present, Reactdown team
 */

import React from 'react';

import {contextTypes} from 'reactdown/lib/DocumentContext';
import Helmet from 'react-helmet';

import {
  Root as BaseRoot,
  Link,
  Sidebar,

  ToCItem,

  NoteRoot,
  NoteTitle,
  NoteContent,

  TKRoot,
  TKTitle
} from './components.component.css';

export function Root({children, ...props}, {reactdown: {model, metadata}}) {
  return (
    <BaseRoot>
      <Helmet title={metadata.title || model.title} />
      {children}
    </BaseRoot>
  );
}
Root.contextTypes = contextTypes;

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
  Heading
} from './components.component.css';
