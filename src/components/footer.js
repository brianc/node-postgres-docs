import React, { Component } from 'react'

export default class Footer extends Component {
  state = { over: false }

  onEnter = () => {
    this.setState({ over: true })
  }

  onLeave = () => {
    this.setState({ over: false })
  }

  render() {
    const { over } = this.state

    const style = {
      color: '#AAA',
      fontSize: 12,
      paddingBottom: 20,
    }

    const iconClasses = `fa fa-heart ${over ? 'beat' : ''}`

    return (
      <div className="footer text-center" style={style}>
        <div className="level-item has-text-centered" onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>
          <span>
            <span>made with</span>
            <i className={iconClasses} style={{ padding: '0 5px', color: 'pink' }} />
            <span style={{ paddingRight: 5 }}>by</span>
            <a href="https://twitter.com/briancarlson" target="_blank">
              @briancarlson
            </a>
          </span>
        </div>
      </div>
    )
  }
}
