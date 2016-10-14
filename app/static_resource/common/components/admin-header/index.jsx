import style from './admin-header.scss'
import React, {
  Component,
  PropTypes
} from 'react'
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

  render() {
    let {
      user,
      className
    } = this.props

    return (
      <div className={ classnames(style.wrap, `ui menu`, className) }>
        <div className={ classnames(style.logo, `header item`) }>
          <i className='icon settings'></i>
        </div>
        <div className='right menu'>
          <a href='/' className='header item'>
            <i className='icon home'></i>
          </a>
          <div className={ classnames(style.user, `ui dropdown item`) }>
            { user.name }
          </div>
        </div>
      </div>
    )
  }
}

export default Header
