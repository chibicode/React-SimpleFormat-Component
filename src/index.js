import React, { Component, PropTypes, createElement } from 'react'
import sanitizeHtml from 'sanitize-html'

export default class SimpleFormat extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    wrapperTag: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    wrapperTagProps: PropTypes.object
  }

  static defaultProps = {
    wrapperTag: 'div',
    wrapperTagProps: {}
  }

  // Based on:
  // https://github.com/rails/rails/blob/312485f3e88af3966b586275ae5097198bfef6a0/actionview/lib/action_view/helpers/text_helper.rb#L454-L460
  paragraphs () {
    const pattern = /([^\n]\n)(?=[^\n])/g
    const text = sanitizeHtml(this.props.text)
    return text.replace(/\r\n?/g, '\n').split(/\n\n+/).map((t) => {
      if (t.match(pattern)) {
        return t.replace(pattern, '$1<br />')
      } else {
        return t
      }
    })
  }

  render () {
    const { wrapperTag, wrapperTagProps } = this.props
    return createElement(wrapperTag, wrapperTagProps, this.paragraphs().map((paragraph, index) => (
      <p key={ index } dangerouslySetInnerHTML={{ __html: paragraph }} />
    )))
  }
}
