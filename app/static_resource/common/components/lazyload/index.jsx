import React, { PropTypes, Component } from 'react'
import ReactDom from 'react-dom'

let LAZY_LIST = {}
let TIMER = null
let SCREEN_HEIGHT = window.screen.availHeight

class Lazyload extends Component {

  static propTypes = {
    'offsetTop': PropTypes.number
  }

  static defaultProps = {
    'offsetTop': 50
  }

  constructor(props) {
    super(props)
    this.state = {
      'load': false
    }
  }

  componentDidMount() {
    // 这里加个 setTimeout，
    // 是因为在某些页面中(例如 category )页面，
    // 会出现先 render 主界面，然后再 render 一些其他部分的组件
    // 如果 render 的其他组件，在使用 lazyload 的组件之上
    // 获取到的 rect 就不准确了(没有加上新 render 的组件的高度)
    // 所以需要加个 setTimeout ，将 lazyload 组件滞后 render 一些
    setTimeout(() => {
      this.setPosition()
    }, 0)
  }

  setPosition() {
    // let { offsetTop } = this.props
    let dom = ReactDom.findDOMNode(this)
    let parent = dom ? dom.parentNode : null
    let rect = parent && parent.getBoundingClientRect ? parent.getBoundingClientRect() : null
    console.log(rect)
    if (!rect) {
      this.setState({
        'load': true
      })
    } else {
      let top = rect.top
      if (top <= SCREEN_HEIGHT) {
        this.display()
      } else {
        this.addToCache(top)
      }
    }
  }

  addToCache(top) {
    if (!LAZY_LIST[top]) {
      LAZY_LIST[top] = []
    }
    LAZY_LIST[top].push(this)
  }

  render() {
    const { /* offsetTop, */ children } = this.props
    const { load } = this.state

    if (!children || !load) {
      return (<i></i>)
    }

    return children
  }

  display() {
    console.log(1)
    this.setState({
      'load': true
    })
  }

}

// helper
function scroll() {
  window.addEventListener('scroll', scrollHandler)
}

function scrollHandler(e) {
  if (TIMER) {
    clearTimeout(TIMER)
    TIMER = null
  }
  TIMER = setTimeout(() => {
    let scrollHeight = window.scrollY

    for (let key in LAZY_LIST) {
      if (key <= scrollHeight + SCREEN_HEIGHT) {
        LAZY_LIST[key].forEach((lazy) => {
          lazy.display()
        })
        delete LAZY_LIST[key]
      }
    }
  }, 50)
}

scroll()

export default Lazyload
