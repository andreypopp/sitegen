import React from 'react';
import {Meta} from '../../';
import {
  Root, ContentWrapper,
  HeadingLine, SubHeadingLine,
  NavBar, NavLink,
  Section, SectionHeader,
  Par, CodeBlock
} from '../Site.component.css';

export default function Tutorial() {
  return (
    <div>
      <Meta
        title="Tutorial"
        />

      <Section noWrap>
        <ContentWrapper>
          <SectionHeader>Tutorial</SectionHeader>
        </ContentWrapper>
      </Section>

    </div>
  );
}

