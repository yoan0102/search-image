import { Formik, Form, Field } from 'formik'
import './header.css'
import { useState } from 'react'

const App = () => {
  const [photos, setPhotos] = useState([])
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
    </div>
  )
}

export default App
