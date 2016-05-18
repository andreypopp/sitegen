import './index.css';

import React from 'react';
import {Meta} from '../';
import GitHubCorner from './GitHubCorner';
import {
  Root, ContentWrapper,
  HeadingLine, SubHeadingLine,
  Section, SectionHeader,
  Par, CodeBlock
} from './index.component.css';

export default function Site({children}) {
  return (
    <Root>
      <Meta
        titleTemplate="%s | Sitegen"
        title="Main"
        />


      <Section decorated>
        <GitHubCorner />
        <HeadingLine>Sitegen</HeadingLine>
        <SubHeadingLine>
          Static site generator
        </SubHeadingLine>
        <SubHeadingLine>
          based on React and Webpack
        </SubHeadingLine>
      </Section>

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

      <Section decorated>
        <div style={{fontSize: '8pt', textAlign: 'center'}}>
          Made with <span style={{color: 'red'}}>❤</span> in St. Petersburg, Russia
        </div>
      </Section>
    </Root>
  );
}
