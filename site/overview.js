import React from 'react';
import {Meta} from '../';
import {
  Root, ContentWrapper,
  HeadingLine, SubHeadingLine,
  NavBar, NavLink,
  Section, SectionHeader,
  Par, CodeBlock
} from './index.component.css';

export default function Overview() {
  return (
    <div>
      <Meta
        title="Overview"
        />

      <Section noWrap>
        <ContentWrapper>
          <SectionHeader>Design with components</SectionHeader>
          <Par>
            Design your site as a collection of React components.
            Use any npm package you found on the web.
          </Par>
        </ContentWrapper>
        <CodeBlock>{`export default Site() {
return <div>Hello, world!</div>
}`}</CodeBlock>
      </Section>

      <Section noWrap>
        <ContentWrapper>
          <SectionHeader>Define content structure</SectionHeader>
          <Par>
            Define your site content structure.
          </Par>
        </ContentWrapper>
        <CodeBlock>{`export let route = {
  page: './index',
  route: {
    index: './main',
    about: './about',
  }
}`}</CodeBlock>
      </Section>
      <Section noWrap>
        <ContentWrapper>
          <SectionHeader>Serve & build</SectionHeader>
        </ContentWrapper>
        <CodeBlock>{`% sitegen-serve .\n% sitegen-build .`}</CodeBlock>
      </Section>

    </div>
  );
}
