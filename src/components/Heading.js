/**
 * @copyright 2016-present, Sitegen team
 * @flow
 */

import React from 'react';
import {Heading as BaseHeading} from 'reactdown/components';
import Ref from 'reactdown/lib/directives/ref';

type Props = {
  children: React.Element;
  name?: string;
  Component?: ReactClass<{}>;
  refStyle?: Object;
};

export default function Heading({children, name, Component = BaseHeading, refStyle, ...props}: Props) {
  return (
    <Component {...props}>
      <Ref name={name} style={refStyle} />
      {children}
    </Component>
  );
}
