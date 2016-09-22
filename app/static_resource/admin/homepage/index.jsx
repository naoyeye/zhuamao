import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'admin/homepage/stores/homepageStore'
import HomepageApp from 'admin/homepage/containers/homepage'

let store = configureStore()

ReactDom.render(
  (
    <Provider store={ store }>
      <HomepageApp />
    </Provider>
  ), document.getElementById('app')
)
