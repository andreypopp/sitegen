import React from 'react';
import {topTop, calculateScrollY, isMeasured} from 'react-track/tracking-formulas';
import {TrackDocument, TrackedDiv} from 'react-track';
import {Gateway, GatewayDest, GatewayProvider} from 'react-gateway';

export const GATEWAY_NAME = "fixedTop";

export function Sticky({children}) {

  function renderChildren(scrollY, top, isMeasured) {
    let stickyChildren = React.cloneElement(children, {
      sticky: true,
      stickyActive: isMeasured && top > 0 && scrollY >= 0,
    });
    return (
      <div>
        <Gateway into={GATEWAY_NAME}>
          {stickyChildren}
        </Gateway>
        {children}
      </div>
    );
  }

  return (
    <TrackDocument updateOnDidMount formulas={[topTop]}>
      {topTop =>
        <TrackedDiv formulas={[calculateScrollY, topTop, isMeasured]}>
          {renderChildren}
        </TrackedDiv>}
    </TrackDocument>
  );
}

export function StickyDest({name}) {
  return (
    <GatewayDest
      style={{width: '100%', position: 'fixed', top: 0}}
      name={GATEWAY_NAME}
      />
  );
}

export let StickyRoot = GatewayProvider;
