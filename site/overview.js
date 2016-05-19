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
        <CodeBlock>{`export default Site() {
return <div>Hello, world!</div>
}`}</CodeBlock>
        </ContentWrapper>
      </Section>

      <Section noWrap>
        <ContentWrapper>
          <SectionHeader>Define content structure</SectionHeader>
          <Par>
            Define your site content structure.
          </Par>
        <CodeBlock>{`export let route = {
  page: './index',
  route: {
    index: './main',
    about: './about',
  }
}`}</CodeBlock>
        </ContentWrapper>
      </Section>
      <Section noWrap>
        <ContentWrapper>
          <SectionHeader>Serve & build</SectionHeader>
        <CodeBlock>{`% sitegen-serve .\n% sitegen-build .`}</CodeBlock>
        </ContentWrapper>
      </Section>

    </div>
  );
}
