import React, {PropTypes} from 'react';

export default class RenderRoot extends React.Component {

  static propTypes = {
    markup: PropTypes.string
  };

  static id = 'SitegenRoot';

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
