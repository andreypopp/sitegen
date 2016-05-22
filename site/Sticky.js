import React from 'react';
import {topTop, calculateScrollY} from 'react-track/lib/tracking-formulas';
import {TrackDocument, TrackedDiv} from 'react-track';
import {Gateway, GatewayDest, GatewayProvider} from 'react-gateway';

export const GATEWAY_NAME = "fixedTop";

export function Sticky({children}) {
  return (
    <TrackDocument formulas={[topTop]}>
      {topTop =>
        <TrackedDiv formulas={[calculateScrollY, topTop]}>
          {(scrollY, top) =>
            <div>
              {top > 0 && scrollY > 0 &&
                <Gateway into={GATEWAY_NAME}>
                  {React.cloneElement(children, {sticky: true})}
                </Gateway>}
              {children}
            </div>}
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
