import React from 'react';
import {Meta} from '../../';
import {
  Root, ContentWrapper,
  HeadingLine, SubHeadingLine,
  NavBar, NavLink,
  Section, SectionHeader,
  Par, CodeBlock
} from '../Site.component.css';

export default function Docs() {
  return (
    <div>
      <Meta
        title="Docs"
        />

      <Section noWrap>
        <ContentWrapper>
          <SectionHeader>Docs</SectionHeader>
        </ContentWrapper>
      </Section>

    </div>
  );
}


