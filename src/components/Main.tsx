import React from 'react'

const PresentationSection = ({
  presentation,
  article,
  articleTimeout,
  close,
}: PresentationSection.Arguments) =>
  <article
    id="{acticle.url}"
    className={
      `${article === presentation.frontmatter.slug ? 'active' : ''}
      ${articleTimeout ? 'timeout' : ''}`
    }
    style={{
      display: 'none'
    }}
  >
    <h2 className="major">{presentation.frontmatter.title}</h2>
    {/* <span className="image main">
    <img src={presentation.jumboImageSrc} />
    </span> */}
    <div dangerouslySetInnerHTML={{
      __html: presentation.html
    }} />
    <a
      href={`https://github.com/GodotExplorer/ECMAScriptDemos/tree/master/${presentation.frontmatter.slug}`}
      className="icon fa-github github-link"
    >
      <span className="label">Sources</span>
    </a>
    <div
    className="close"
    onClick={() => close()}
  ></div>
  </article>

const Main = (props) =>
  <div
    ref={props.setWrapperRef}
    id="main"
    style={props.timeout ? { display: 'flex' } : { display: 'none' }}
  >
    {props.presentations.map(({ node }) =>
      <PresentationSection
        key={`PresentationSection_${node.frontmatter.slug}`}
        presentation={node}
        article={props.article}
        articleTimeout={props.articleTimeout}
        close={props.onCloseArticle}
      />
    )}
  </div>

export default Main
