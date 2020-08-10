declare module "*.png"
declare module "*.md"

interface MenuEntry {
  slug: string
  title: string
}

interface Presentation extends MenuEntry {
  jumboImageSrc: string
  body: string
}

declare function MenuItem (args: MenuItem.Arguments): Element

declare namespace MenuItem {
  export interface Arguments {
    article: MenuEntry
    onOpenArticle: Function
  }
}

declare const MENU_ENTRIES: Array<MenuEntry>

declare function PresentationSection (args: PresentationSection.Arguments): JSX.Element

declare namespace PresentationSection {
  export interface Arguments {
    presentation: Presentation
    article: string
    articleTimeout: number
    close: Function
  }
}
