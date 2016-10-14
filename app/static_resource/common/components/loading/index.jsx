import style from './loading.scss'
import React, { PropTypes, Component } from 'react'
import Loader from 'halogen/ScaleLoader'

class Loading extends Component {

  static propTypes = {
    'color': PropTypes.string,
    'width': PropTypes.number,
    'height': PropTypes.number,
    'margin': PropTypes.number
  }

  static defaultProps = {
    'color': '#ccc',
    'height': 20,
    'width': 2,
    'margin': 1
  }

  constructor(props) {
    super(props)
  }

  render() {
    // if (supportSvg()) {
    //   const { height, width, color, margin } = this.props

    //   return (
    //     <Loader className={ style.loading }
    //       height={ height + `px` }
    //       width={ width + `px` }
    //       color={ color }
    //       margin={ margin + `px` } />
    //   )
    // } else {
    //   return (<span>正在加载...</span>)
    // }
    const { height, width, color, margin } = this.props

    return (
      <Loader className={ style.loading }
        height={ height + `px` }
        width={ width + `px` }
        color={ color }
        margin={ margin + `px` } />
    )
  }

}

// // helper
// let supportSvg = () => {
//   return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')
// }

export default Loading
