import React, { Component } from 'react';
import PropTypes from 'prop-types';

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

class ReactLink extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    replace: PropTypes.bool,
    activeClassName: PropTypes.string,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  };

  static defaultProps = {
    replace: false,
    activeClassName: 'active'
  };

  static contextTypes = {
    router: PropTypes.object
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      const { router } = this.context;
      const { replace, to } = this.props;

      if (replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    }
  };

  render() {
    const { router } = this.context;
    const { replace, to, activeClassName, className, ...props } = this.props; // eslint-disable-line no-unused-vars
    let classActName = className;

    const href = typeof to === 'string' ? to : to.pathname;
    const toLocation = typeof to === 'string' ? { pathname: to } : to;
    if (router.isActive(toLocation, false)) {
      if (activeClassName) {
        if (classActName) {
          classActName += ` ${activeClassName}`;
        } else {
          classActName = activeClassName;
        }
      }
    }

    return (
      <a
        {...props}
        onClick={this.handleClick}
        href={href}
        className={classActName}
      />
    );
  }
}

export default ReactLink;
