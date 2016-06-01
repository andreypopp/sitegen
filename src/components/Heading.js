/**
 * @copyright 2016-present, Sitegen team
 * @flow
 */

import React from 'react';
import {Heading as BaseHeading} from 'reactdown/components';
import Ref from 'reactdown/lib/directives/ref';

type Props = {
  children: React.Element;
  name: string;
  Component: ReactClass<{}>;
};

export default function Heading({children, name, Component = BaseHeading, ...props}: Props) {
  return (
    <Component {...props}>
      <Ref name={name} />
      {children}
    </Component>
  );
}
