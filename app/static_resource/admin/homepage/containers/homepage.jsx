import style from './homepage.scss'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import * as Actions from 'admin/homepage/actions/homepageActions'
import AdminHeader from 'common/components/admin-header'
import Photo from 'common/components/photo'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class HomepageApp extends Component {

  static propTypes = {
    'config': PropTypes.object.isRequired,
    'message': PropTypes.string,
    'loading': PropTypes.bool,
    'actions': PropTypes.object,
    'feedAccounts': PropTypes.array
  }

  static defaultProps = {
    'config': null
  }

  render() {
    let { config, /* message, */ loading } = this.props

    if (!config) {
      return (
        <div>
          empty
        </div>
      )
    }

    let buttonIconClasses = classnames(`ui icon refresh`, {
      'active': loading
    })

    let disabled = loading
    let _array = Array(10).fill('naive').map((v, i) => {
      return i
    })

    return (
      <div className={ classnames(style.homepage, `ui container`) }>
        <AdminHeader user={ config.user }
          className={ `admin-header fixed` } />

        <div className={style.main }>
          <div className={ style.buttons }>
            <button disabled={ disabled }
                    className='ui labeled icon button large green'
                    onTouchTap={ this.crawlImagesHandler.bind(this) }>
              <i className={ buttonIconClasses }></i>
              { loading ? `正在抓` : `去抓猫` }
            </button>
          </div>

          <div className={ classnames(style.result, `ui three column grid`) }>
            {
              _array.map((ele, index) => {
                return (
                  <div className='column'
                       key={ `_column_${index}` }>
                    <div className='ui segment'>
                      <Photo src={ `//unsplash.it/400/300/?random&r=${index}` } />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className={ style.footer }>
          <div className='ui horizontal divider'>
            <i className='tag icon'></i>
          </div>
          <div className={ style.container }>
            Copyright © 2016 · (MIT) License · Built by <a href='http://www.douban.com' target='_blank'>douban.com</a>
          </div>
        </div>
      </div>
    )
  }

  crawlImagesHandler() {
    let { actions, feedAccounts } = this.props

    console.log(feedAccounts)

    let crawlImagesHandler = actions.crawlImages
    if (crawlImagesHandler && typeof (crawlImagesHandler) === 'function') {
      console.log(feedAccounts)
      crawlImagesHandler(feedAccounts[0].douban[0])
    }
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
