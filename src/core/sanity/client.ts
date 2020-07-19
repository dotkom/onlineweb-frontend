// client.js
import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'wsqi2mae', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: false
})