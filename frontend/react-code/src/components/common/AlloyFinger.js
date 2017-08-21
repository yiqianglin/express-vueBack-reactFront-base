/* AlloyFinger v0.1.0
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyFinger
 */

import React from 'react';

export default class AlloyFinger extends React.Component {
  constructor(props) {
    super(props);

    this.preV = { x: null, y: null };
    this.pinchStartLen = null;
    this.scale = 1;
    this.isDoubleTap = false;
    this.delta = null;
    this.last = null;
    this.now = null;
    this.tapTimeout = null;
    this.longTapTimeout = null;
    this.swipeTimeout = null;
    this.x1 = null;
    this.x2 = null;
    this.y1 = null;
    this.y2 = null;
    this.preTapPosition = { x: null, y: null };
  }

  getLen(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  getAngle(v1, v2) {
    const mr = this.getLen(v1) * this.getLen(v2);
    if (mr === 0) return 0;
    let r = this.dot(v1, v2) / mr;
    if (r > 1) r = 1;
    return Math.acos(r);
  }

  cross(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
  }

  getRotateAngle(v1, v2) {
    let angle = this.getAngle(v1, v2);
    if (this.cross(v1, v2) > 0) {
      angle *= -1;
    }

    return angle * 180 / Math.PI;
  }

  _resetState() {
    this.setState({ x: null, y: null, swiping: false, start: 0 });
  }


  _emitEvent(name, e) {
    if (this.props[name]) {
      this.props[name](e);
    }
  }

  _handleTouchStart(evt) {
    evt.persist();
    this.now = Date.now();
    this.x1 = evt.touches[0].pageX;
    this.y1 = evt.touches[0].pageY;
    this.delta = this.now - (this.last || this.now);
    if (this.preTapPosition.x !== null) {
      this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30);
    }
    this.preTapPosition.x = this.x1;
    this.preTapPosition.y = this.y1;
    this.last = this.now;
    const preV = this.preV;
    const len = evt.touches.length;
    if (len > 1) {
      const v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
      preV.x = v.x;
      preV.y = v.y;
      this.pinchStartLen = this.getLen(preV);
      this._emitEvent('onMultipointStart', evt);
    }
    this.longTapTimeout = setTimeout(() => {
      this._emitEvent('onLongTap', evt);
    }, 750);
  }

  _handleTouchMove(evt) {
    evt.persist();
    const preV = this.preV;
    const len = evt.touches.length;
    const currentX = evt.touches[0].pageX;
    const currentY = evt.touches[0].pageY;
    const event = evt;
    this.isDoubleTap = false;
    if (len > 1) {
      const v = { x: event.touches[1].pageX - currentX, y: event.touches[1].pageY - currentY };

      if (preV.x !== null) {
        if (this.pinchStartLen > 0) {
          event.scale = this.getLen(v) / this.pinchStartLen;
          this._emitEvent('onPinch', event);
        }

        event.angle = this.getRotateAngle(v, preV);
        this._emitEvent('onRotate', event);
      }
      preV.x = v.x;
      preV.y = v.y;
    } else {
      if (this.x2 !== null) {
        event.deltaX = currentX - this.x2;
        event.deltaY = currentY - this.y2;
      } else {
        event.deltaX = 0;
        event.deltaY = 0;
      }
      this._emitEvent('onPressMove', event);
    }
    this._cancelLongTap();
    this.x2 = currentX;
    this.y2 = currentY;
    if (len > 1) {
      evt.preventDefault();
    }
  }

  _handleTouchCancel() {
    clearInterval(this.tapTimeout);
    clearInterval(this.longTapTimeout);
    clearInterval(this.swipeTimeout);
  }

  _handleTouchEnd(evt) {
    this._cancelLongTap();
    const self = this;
    const event = evt;
    if (evt.touches.length < 2) {
      this._emitEvent('onMultipointEnd', evt);
    }

    if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
      (this.y2 && Math.abs(this.preV.y - this.y2) > 30)) {
      event.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
      this.swipeTimeout = setTimeout(() => {
        self._emitEvent('onSwipe', event);
      }, 0);
    } else {
      this.tapTimeout = setTimeout(() => {
        self._emitEvent('onTap', event);
        if (self.isDoubleTap) {
          self._emitEvent('onDoubleTap', event);
          self.isDoubleTap = false;
        }
      }, 0);
    }

    this.preV.x = 0;
    this.preV.y = 0;
    this.scale = 1;
    this.pinchStartLen = null;
    this.x1 = null;
    this.x2 = null;
    this.y1 = null;
    this.y2 = null;
  }

  _cancelLongTap() {
    clearTimeout(this.longTapTimeout);
  }

  _swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      onTouchStart: this._handleTouchStart.bind(this),
      onTouchMove: this._handleTouchMove.bind(this),
      onTouchCancel: this._handleTouchCancel.bind(this),
      onTouchEnd: this._handleTouchEnd.bind(this)
    });
  }
}
