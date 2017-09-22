import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './img.png'
import profilePic2 from './profile-pic.jpg'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRealMe: false
    }
  }
  
  render() {
    return (
      <p
        style={{
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          onClick={() => { this.setState({ showRealMe: !this.state.showRealMe })}}
          src={this.state.showRealMe ? profilePic2 : profilePic}
          alt={`Tarcode`}
          style={{
            float: 'left',
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            width: rhythm(2),
            borderRadius: rhythm(1),
            height: rhythm(2),
          }}
        />
        By <strong>Taariq</strong> who lives in Cape Town. He also happens to computer alot.{' '}
        <a href="https://twitter.com/tarcode33">
          You should probably follow him on Twitter
        </a>
      </p>
    )
  }
}

export default Bio
