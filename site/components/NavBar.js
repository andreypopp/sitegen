import React from 'react';
import MenuIcon from 'react-icons/lib/ti/th-menu';
import CloseIcon from 'react-icons/lib/ti/times';
import {Link} from '../../';
import {Sticky} from './Sticky';
import {
  NavBar as NavBarBase,
  NavLink as NavLinkBase,
  NavBarWrapper,
  NavBarToC,
  NavBarToCShim,
  TocToggle
} from './NavBar.rcss';
import {HeadingLine} from './Site.rcss';

export function NavBar({children, ...props}) {
  return (
    <Sticky to="fixedTop">
      <NavBarRegular {...props}>
        {children}
      </NavBarRegular>
    </Sticky>
  );
}

class NavBarRegular extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tocActive: false
    };
  }

  render() {
    let {tocActive} = this.state;
    let {children, toc, ...props} = this.props;
    return (
      <div>
        <NavBarBase {...props} tocActive={tocActive}>
          <NavBarWrapper>
            {props.sticky &&
              <HeadingLine
                inline small decorated
                style={{marginLeft: 10, marginRight: 10}}>
                SG
              </HeadingLine>}
            {children}
            {props.stickyActive &&
              <TocToggle onClick={this.tocToggle}>
                {tocActive ? <CloseIcon /> : <MenuIcon />}
              </TocToggle>}
          </NavBarWrapper>
        </NavBarBase>
        {props.stickyActive && tocActive &&
          <NavBarToCShim onClick={this.tocToggle} />}
        {props.stickyActive &&
          <NavBarToC onClick={this.tocToggle} active={tocActive}>
            <NavBarWrapper>
              {toc}
            </NavBarWrapper>
          </NavBarToC>}
      </div>
    );
  }

  componentWillReceiveProps({stickyActive}) {
    if (!this.props.stickyActive && stickyActive) {
      this.setState({tocActive: false});
    }
  }

  tocToggle = () =>
    this.setState({tocActive: !this.state.tocActive});
}

export function NavLink(props) {
  return <Link {...props} Component={NavLinkBase} />;
}
