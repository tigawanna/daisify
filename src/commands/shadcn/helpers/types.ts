
export interface ShadcnProperties {
    style: Style
    tailwind: Tailwind
    rsc: Rsc
    tsx: Tsx
    aliases: Aliases
}

export interface Style {
    type: string
    enum: string[]
}

export interface Tailwind {
    type: string
    properties: Properties2
    required: string[]
}

export interface Properties2 {
  config: Config
  css: Css
  baseColor: BaseColor
  cssVariables: CssVariables
}

export interface Config {
  type: string
}

export interface Css {
  type: string
}

export interface BaseColor {
  type: string
}

export interface CssVariables {
  type: string
}

export interface Rsc {
  type: string
}

export interface Tsx {
  type: string
}

export interface Aliases {
  type: string
  properties: Properties3
  required: string[]
}

export interface Properties3 {
  utils: Utils
  components: Components
}

export interface Utils {
  type: string
}

export interface Components {
  type: string
}
