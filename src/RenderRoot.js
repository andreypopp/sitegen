import React from 'react';

export default class RenderRoot extends React.Component {

  static id = "SitegenRoot";

  static getDOMNode() {
    return document.getElementById(this.id);
  }

  render() {
    let {markup} = this.props;
    return (
      <div
        id={this.constructor.id}
        dangerouslySetInnerHTML={{__html: markup}}
        />
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}
