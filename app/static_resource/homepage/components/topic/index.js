import style from './topic.scss'
import React, { Component, PropTypes } from 'react'
import Banner from 'common/components/banner'
import ShopPanel from 'homepage/components/shop-panel'
import ProductsPanel from 'homepage/components/products-panel'
import PagesPanel from 'homepage/components/pages-panel'

class Topic extends Component {

  constructor (props) {
    super(props)
    this.state = {
      'subject': '',
      'contents': []
    }
  }

  componentDidMount () {
    let { data } = this.props
    this.setState({
      'subject': data.subject ? data.subject : '',
      'contents': data.contents
    })
  }

  render () {
    return (
      <div className={ style.topic }>
        { this.renderSubject() }
        { this.renderContents() }
      </div>
    )
  }

  renderSubject() {
    let subject = this.state.subject

    if (!subject) {
      return null
    }

    return (
      <h1 className={ style.subject }>{ subject }</h1>
    )
  }

  renderContents() {
    let contents = this.state.contents

    return (
      <div className={ style.contents }>
        {
          contents.map((item, index) => {
            if (item.key === 'banner') {
              return (
                <div className={ style.banner }
                     key={ `_topic_widgets_${index}`}>
                  <Banner images={ item.data.photos }
                          height={ item.data.height } />
                </div>
              )
            } else if (item.key === 'shop') {
              return (
                <ShopPanel data={ item.data }
                           key={ `_topic_widgets_${index}` } />
              )
            } else if (item.key === 'products') {
              return (
                <ProductsPanel data={ item.data }
                               key={ `_topic_widgets_${index}` } />
              )
            } else if (item.key === 'page_module') {
              return (
                <PagesPanel pages={ item.data }
                            key={ `_topic_widgets_${index}` } />
              )
            }
          })
        }
      </div>
    )
  }

}

export default Topic