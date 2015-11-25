import React, {PropTypes} from 'react';

let Style = {
  self: {
    width: '100%',
    height: '100%',
  }
};

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
        style={Style.self}
        id={this.constructor.id}
        dangerouslySetInnerHTML={{__html: markup}}
        />
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}
