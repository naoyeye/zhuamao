import style from './homepage.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import classnames from 'classnames'
import * as Actions from 'homepage/actions/homepageActions'

import Header from 'common/components/header'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class HomepageApp extends Component {

  static propTypes = {
    'config': PropTypes.object.isRequired
  }

  static defaultProps = {
    'config': null
  }

  render() {
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
        <Header />
        { config.name }
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
