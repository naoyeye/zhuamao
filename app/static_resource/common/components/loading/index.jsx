import style from './loading.scss'
import React, { PropTypes, Component } from 'react'

class Loading extends Component {

  static propTypes = {
    'color': PropTypes.string,
    'width': PropTypes.number,
    'height': PropTypes.number
  }

  static defaultProps = {
    'color': '#fff',
    'width': 40,
    'height': 40
  }

  constructor(props) {
    super(props)
  }

  render() {
    if (supportSvg()) {
      // const { width, height, color } = this.props
      return (
        <div className={ style.loading + ' loadicon'}>加载中</div>
        // <div className={ style.loading + ' loadicon'}
          // dangerouslySetInnerHTML={{ __html: SVG }}></div>
      )
    } else {
      return (<span>正在加载...</span>)
    }
  }

}

// helper
let supportSvg = () => {
  return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')
}

export default Loading
