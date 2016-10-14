import style from './logo.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { SITE_CONFIG } from '../../../../config/site-config'

class Logo extends Component {
  static propTypes = {
    'className': PropTypes.string,
    'siteConfig': PropTypes.object
  }

  static defaultProps = {
    'siteConfig': SITE_CONFIG,
    'className': ''
  }

  render() {
    const {
      siteConfig,
      className
    } = this.props

    let classes = classnames(style.wrap, className)
    console.log(SITE_CONFIG)

    return (
      <div className={ classes }>
        <a href={ siteConfig.url }>
         { siteConfig.logo.name }
        </a>
      </div>
    )
  }

}

export default Logo
