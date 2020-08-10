import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
import Layout from '../components/layout'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

deckDeckGoHighlightElement()

function toMenuEntry(pres: object): MenuEntry {
  return {
    slug: pres.node.frontmatter.slug,
    title: pres.node.frontmatter.title,
  }
}

class IndexPage extends React.Component {

  timeoutId: number | null = null
  wrapperRef: Node | null = null

  constructor(props) {
    super(props)
    this.state = {
      isArticleVisible: false,
      timeout: false,
      articleTimeout: false,
      article: '',
      loading: 'is-loading',
    }
    this.handleOpenArticle = this.handleOpenArticle.bind(this)
    this.handleCloseArticle = this.handleCloseArticle.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '' })
    }, 100)
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleOpenArticle(article) {
    this.setState({
      isArticleVisible: !this.state.isArticleVisible,
      article,
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout,
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        articleTimeout: !this.state.articleTimeout,
      })
    }, 350)
  }

  handleCloseArticle() {
    this.setState({
      articleTimeout: !this.state.articleTimeout,
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout,
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        isArticleVisible: !this.state.isArticleVisible,
        article: '',
      })
    }, 350)
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.isArticleVisible) {
        this.handleCloseArticle()
      }
    }
  }


  render() {
    return (
      <StaticQuery
        query={graphql`
      {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title] }
          limit: 1000
          ) {
            edges {
              node {
                html
                frontmatter {
                  slug
                  title
                }
              }
            }
          }
        }
        `}
        render={data => (
          <Layout location={this.props.location}>
            <div>
              <div id="wrapper">
                <Header menuEntries={data.allMarkdownRemark.edges.map(toMenuEntry)} onOpenArticle={this.handleOpenArticle} timeout={this.state.timeout} />
                <Main
                  isArticleVisible={this.state.isArticleVisible}
                  timeout={this.state.timeout}
                  articleTimeout={this.state.articleTimeout}
                  article={this.state.article}
                  onCloseArticle={this.handleCloseArticle}
                  setWrapperRef={this.setWrapperRef}
                  presentations={data.allMarkdownRemark.edges}
                />
                <Footer timeout={this.state.timeout} />
              </div>
              <div id="bg"></div>
            </div>
          </Layout>
        )}


      />
    )
  }
}

export default IndexPage
