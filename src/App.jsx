import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'
import { useState } from 'react'

const App = () => {
  const [photos, setPhotos] = useState([])

  const open = (urlPhoto) => {
    window.open(urlPhoto)
  }

  console.log('Photos', photos)

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values) => {
            const resp = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    'Client-ID PC_z5t2ExByEk9wnwz3xGaN-Ys2UitHcRYjGTsHwi1U',
                },
              }
            )
            const data = await resp.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <section className='container'>
        <div className='center'>
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt='' />
              <p>{[photo.description, photo.alt_description].join('-')}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
