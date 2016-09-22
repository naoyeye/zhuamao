import style from './admin-header.scss'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Header extends Component {

  static propTypes = {
    'user': PropTypes.object,
    'className': PropTypes.string
  }

  static defaultProps = {
    'user': null,
    'className': ''
  }

  render () {
    let { user, className } = this.props
    let classes = classnames(style.wrap, className)

    return (
      <div className={ classes }>
        <div className={ style.logo }>
          <i className='icon settings'></i>
          管理后台
        </div>
        <nav className={ style.nav }>
          <a href="/">返回首页</a>
        </nav>
        <div className={ style.user }>
          { user.name }
        </div>
      </div>
    )
  }
}

export default Header
