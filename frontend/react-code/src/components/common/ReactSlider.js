import React, { Component } from 'react';

class ReactSlider extends Component {
  static defaultProps = {
    speed: 1,
    delay: 2,
    pause: true,
    autoplay: true,
    dots: true,
    children: [],
    vertical: false,
    isTouch: false
  }

  constructor(props) {
    super(props);
    this.state = {
      nowLocal: 0
    };
    this.autoPlayFlag = null;
    this.startPoint = 0;
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  // 向前向后多少
  turn(n) {
    let local = this.state.nowLocal + n;
    if (local < 0) {
      local += this.props.children.length;
    }
    if (local >= this.props.children.length) {
      local -= this.props.children.length;
    }
    this.setState({ nowLocal: local });
    this.autoPlayFlag = setTimeout(() => {
      this.turn(1);
    }, this.props.delay * 1000);
  }

  // 开始自动轮播
  goPlay() {
    if (this.props.autoplay) {
      this.turn(1);
    }
  }

  // 暂停自动轮播
  pausePlay() {
    clearTimeout(this.autoPlayFlag);
  }

  componentDidMount() {
    if (this.props.children.length > 0) {
      this.goPlay();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children.length === 0 && nextProps.children.length > 0) {
      if (this.autoPlayFlag) {
        clearTimeout(this.autoPlayFlag);
        this.goPlay();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.autoPlayFlag);
  }

  onTouchStart(e) {
    if (this.props.isTouch) {
      this.pausePlay();
      this.startPoint = e.targetTouches[0].pageX;
    }
  }

  onTouchEnd(e) {
    if (this.props.isTouch) {
      const endPoint = e.changedTouches[0].pageX;
      const { nowLocal } = this.state;
      if (endPoint - this.startPoint > 0) {
        this.turn(-1);
      }
      if (endPoint - this.startPoint < 0) {
        this.turn(1);
      }
      this.goPlay();
    }
  }

  render() {
    const { children, vertical, className, speed, dots, itemHight, itemWidth } = this.props;
    const count = this.props.children.length;
    if (!children || !children[0]) return null;
    const { nowLocal } = this.state;
    const transition = `${(-nowLocal * 100) / count}%`;
    const style = vertical ? {
      WebkitTransform: `translate3d(0,${transition},0)`,
      transition: nowLocal === 0 ? 'none' : `transform ${speed}s linear`,
      height: `${count * itemHight}rem`
    } : {
      WebkitTransform: `translate3d(${transition},0,0)`,
      transition: nowLocal === 0 ? 'none' : `transform ${speed}s linear`,
      width: `${count * itemWidth}rem`
    };
    return (
      <div className={`slider ${className}`}>
        <div style={style}
          className={'slider-items transition'}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}>
          {children}
        </div>
        {
          dots ?
            <div className="slider-pointer" style={{ width: `${((2 * count) - 1) * 0.1}rem` }}>
              {
                children.map((item, index) => {
                  return (
                    <div className={`pointer${nowLocal === index ? ' active' : ''}`} key={`pointer-${index}`}></div>
                  );
                })
              }
            </div> : ''
        }
      </div>
    );
  }
}

export default ReactSlider;
