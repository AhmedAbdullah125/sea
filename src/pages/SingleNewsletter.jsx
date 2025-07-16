import { useParams } from 'react-router-dom'
import BlogCategories from '../components/blogs/BlogCategories'
import NewsletterBody from '../components/blogs/NewsletterBody'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

const SingleNewsletter = () => {
  const { slug } = useParams()
  return (
    <>
      <Header />
      <main className='container space-y-12 mb-12'>
        <NewsletterBody slug={slug} />
        <BlogCategories />
      </main>
      <Footer />

    </>
  )
}

export default SingleNewsletter
