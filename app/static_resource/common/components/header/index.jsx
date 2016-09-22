import style from './header.scss'
import React, { Component, PropTypes } from 'react'
import Logo from 'common/components/logo'

class Header extends Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     'subject': '',
  //     'contents': []
  //   }
  // }

  // componentDidMount () {
  //   let { data } = this.props
  //   this.setState({
  //     'subject': data.subject ? data.subject : '',
  //     'contents': data.contents
  //   })
  // }

  render () {
    return (
      <div className={ style.wrap }>
        <Logo />
        <nav>
          <a href="/admin">管理后台</a>
        </nav>
      </div>
    )
  }
}

export default Header
