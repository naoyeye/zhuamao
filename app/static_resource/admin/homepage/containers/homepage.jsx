import style from './homepage.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import * as Actions from 'admin/homepage/actions/homepageActions'

import AdminHeader from 'common/components/admin-header'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class HomepageApp extends Component {

  render () {
    let { config } = this.props
    if (!config) {
      return (
        <div>
          empty
        </div>
      )
    }

    return (
      <div className={ style.homepage }>
        <AdminHeader user={ config.user } />
        <div>这里是操作区</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    'actions': bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageApp)
