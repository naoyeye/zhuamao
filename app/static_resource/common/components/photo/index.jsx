import style from './photo.scss'
import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import Loading from 'common/components/loading'
import Lazyload from 'common/components/lazyload'

class Photo extends Component {

  static propTypes = {
    'src': PropTypes.string.isRequired,
    'className': PropTypes.string,
    'lazyload': PropTypes.bool,
    'ratio': PropTypes.number,
    'isBackground': PropTypes.bool,
    'width': PropTypes.string
  }

  static defaultProps = {
    'lazyload': true,
    'ratio': 1,
    'isBackground': true
  }

  constructor(props) {
    super(props)
    this.state = {
      'loaded': false
    }
  }

  render() {
    let { className, ratio, isBackground } = this.props
    let ratioClasses = `ratio-${Math.round(ratio * 100)}`
    // 如果不是背景图，图片加载完之后，增加 .loaded
    // css 中会把带有 .loaded 的 .ratio-xx:before 区域隐藏掉
    // 否则会有因为 .ratio-xx:before 里有 margin-top 而多出一块区域
    let classes = classnames(style.wrap, style[ratioClasses], className, {
      'loaded': this.state.loaded && !isBackground
    })

    return (
      <div className={ classes }>
        { this.renderImage() }
      </div>
    )
  }

  renderImage() {
    let { lazyload, isBackground, width } = this.props
    let { loaded } = this.state
    let styleHide = {
      'position': 'absolute',
      'zIndex': -1,
      'width': 0,
      'height': 0
    }

    if (!loaded) {
      return (
        <div className={ style.box }>
          <Loading />

          {(() => {
            if (lazyload) {
              return (
                <Lazyload>
                  <img { ...this.props }
                    style={ styleHide }
                    onLoad={ this.loaded.bind(this) } />
                </Lazyload>
              )
            }
            return (
              <img { ...this.props }
                style={ styleHide }
                onLoad={ this.loaded.bind(this) } />
            )
          })()}

        </div>
      )
    }

    let boxStyle = {
      'backgroundImage': `url(${this.props.src})`,
      'backgroundSize': 'cover',
      'backgroundRepeat': 'no-repeat',
      'backgroundPosition': 'center'
    }


    let styleImageLoaded = {
      'display': 'block',
      'maxWidth': '100%',
      'width': width ? `${width}px` : '100%' // 如果不传 width, 默认 100%
    }

    if (isBackground) {
      return (
        <div className={ style.box } style={ boxStyle }></div>
      )
    } else {
      return (
        <img src={ this.props.src }
          style={ styleImageLoaded } />
      )
    }


  }

  loaded() {
    this.setState({
      'loaded': true
    })
  }
}

export default Photo
