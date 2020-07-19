import client from '../../../core/sanity/client'
import { ArticleView } from 'articles/components/SanityArticleView'
interface IProps {
  heading: string
  content: []
  authors: string[]
  ingress: []
  tags: string[]
  changed_date: string
  published_date: string 
  image: any
}


const Article = (props: IProps) => {

  const {
    heading = 'Missing heading',
    content = [],
    authors = [],
    ingress = [],
    tags = [],
    changed_date = "",
    published_date = "",
    image = "" } = props
  return (
    <ArticleView 
    tags={tags} 
    content={content} 
    changed_date={changed_date} 
    authors={authors} 
    heading={heading} 
    ingress={ingress}
    published_date={published_date}
    image={image}
     />
  )
}

Article.getInitialProps = async function (context: any) {
  const { slug = "" } = context.query
  return await client.fetch(`
    *[_type == "article" && slug.current == $slug][0]{heading, 
      content, 
      author, 
      ingress,
      tags,
      image,
      "author": author->name, 
      "changed_date": _updatedAt,
      "published_date": _createdAt
    }
  `, { slug })
}

export default Article