import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ReactMarquee extends Component {
  static defaultProps = {
    speed: 2,
    children: []
  };

  constructor(props) {
    super(props);
    this.state = {
      nowLocal: 0,
      transformWidth: 0
    };
    this.autoPlayFlag = null;
    this.startPoint = 0;
  }

  // 向前向后多少
  turn() {
    const local = this.state.nowLocal >= this.props.children.length - 1
      ? 0
      : this.state.nowLocal + 1;
    const childElem =
      ReactDOM.findDOMNode(this.track) &&
      ReactDOM.findDOMNode(this.track).childNodes[local - 1];
    console.log('current local:', local);
    const transformWidth = local === 0
      ? 0
      : this.state.transformWidth + this.getWidth(childElem);
    this.setState(
      {
        nowLocal: local,
        transformWidth
      },
      () => {
        if (local === 0) {
          this.turn();
        }
      }
    );
  }

  // 开始自动轮播
  goPlay() {
    this.turn();
  }

  // 暂停自动轮播
  pausePlay() {
    clearTimeout(this.autoPlayFlag);
    this.autoPlayFlag = null;
  }

  getWidth(elem) {
    return elem
      ? elem.getBoundingClientRect().width || elem.offsetWidth || 0
      : 0;
  }

  componentDidMount() {
    if (this.props.children.length > 0) {
      this.goPlay();
    }
    document.addEventListener('visibilitychange', () => {
      console.warn(document.visibilityState);
      if (document.visibilityState === 'hidden') {
        this.pausePlay();
      } else if (document.visibilityState === 'visible') {
        this.goPlay();
      }
    });
  }

  componentWillUnmount() {
    clearTimeout(this.autoPlayFlag);
  }

  render() {
    const { children, className, speed } = this.props;
    const count = React.Children.count(this.props.children);
    if (count === 0) return null;
    const { nowLocal, transformWidth } = this.state;
    const transition = `${-transformWidth}px`;
    const style = {
      WebkitTransform: `translate3d(${transition},0,0)`,
      transition: nowLocal === 0 ? 'none' : `transform ${speed}s linear`
    };
    return (
      <div className={`slider ${className}`}>
        <div
          style={style}
          className={'slider-track'}
          ref={(track) => {
            this.track = track;
          }}
          onTransitionEnd={() => {
            this.goPlay();
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default ReactMarquee;
