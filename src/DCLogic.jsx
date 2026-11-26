import React from 'react';

// Base class for the design's logic. It is deliberately not a React component:
// the logic reads this.state right after setState, which React-managed state does not allow.
export default class DCLogic {
  constructor(props) {
    this.props = props;
    this.state = {};
    this.host = null;
  }

  setState(update, callback) {
    const patch = typeof update === 'function' ? update(this.state) : update;
    this.state = { ...this.state, ...patch };
    this.host.forceUpdate(callback);
  }
}

// Renders a logic class through its view and forwards the React lifecycle to it.
export class DCHost extends React.Component {
  constructor(props) {
    super(props);
    this.logic = new props.logic(props.logic.defaultProps);
    this.logic.host = this;
  }

  componentDidMount() {
    this.logic.componentDidMount();
  }

  componentDidUpdate() {
    this.logic.componentDidUpdate(this.logic.props);
  }

  componentWillUnmount() {
    this.logic.componentWillUnmount();
  }

  render() {
    const View = this.props.view;
    return View(this.logic.renderVals());
  }
}
