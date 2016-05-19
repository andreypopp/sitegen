import React from 'react';
import {Meta} from '../';
import {
  Root, ContentWrapper,
  HeadingLine, SubHeadingLine,
  NavBar, NavLink,
  Section, SectionHeader,
  Par, CodeBlock
} from './index.component.css';

export default function Community() {
  return (
    <div>
      <Meta
        title="Community"
        />

      <Section noWrap>
        <ContentWrapper>
          <SectionHeader>Community</SectionHeader>
        </ContentWrapper>
      </Section>

    </div>
  );
}
