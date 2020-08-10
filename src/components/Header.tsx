import PropTypes from 'prop-types'
import React from 'react'

import logo from '../images/GODOT-ECMAScript.logo.png'

const MenuItem = (args: MenuItem.Arguments) =>
  <li key={`menuItem_${MenuItem._iter++}`}>
    <button onClick={() => args.onOpenArticle(args.article.slug)} >
      {args.article.title}
    </button>
  </li>

MenuItem._iter = 0

const print_menu = (entries: MenuEntry[], onOpenArticle: Function) =>
  entries.map(article => MenuItem({ article, onOpenArticle }))

const Header = ({ timeout, menuEntries, onOpenArticle }) => (
  <header id="header" style={timeout ? { display: 'none' } : {}}>
    <div className="icon">
      <img src={logo} width="68px" />
    </div>
    <div className="content">
      <div className="inner">
        <h1>GODOT ECMAScript Demos</h1>
        <p>A serie of exemples to showcase the ECMAScript GODOT module.</p>
      </div>
    </div>
    <nav>
      <ul>
        {print_menu(menuEntries, onOpenArticle)}
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
}

export default Header
