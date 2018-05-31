/*
export class URL {
  private original: string
  public protocol: string // => "http:"
  public host: string     // => "example.com:3000"
  public hostname: string // => "example.com"
  public port: string     // => "3000"
  public pathname: string // => "/pathname/"
  public hash: string     // => "#hash"
  public search: string   // => "?search=test"
  public origin: string   // => "http://example.com:3000"

  public constructor(url: string) {
    this.original = url

    const parser: HTMLAnchorElement = document.createElement('a')
    parser.href = url
    
    this.protocol = parser.protocol
    this.host = parser.host
    this.hostname = parser.hostname
    this.port = parser.port
    this.pathname = parser.pathname
    this.hash = parser.hash
    this.search = parser.search
    this.origin = parser.origin
  }

  public toString() {
    return this.url
  }

  public get url(): string {
    return this.original
  }

  public set url(url: string) {
    this = 
  }

  private decompose(url: string) {
    this.original = url

    const parser: HTMLAnchorElement = document.createElement('a')
    parser.href = url
    
    this.protocol = parser.protocol
    this.host = parser.host
    this.hostname = parser.hostname
    this.port = parser.port
    this.pathname = parser.pathname
    this.hash = parser.hash
    this.search = parser.search
    this.origin = parser.origin
  }
}
*/