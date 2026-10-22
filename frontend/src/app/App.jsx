import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

const dummyUrls = [
  {
    _id:"1",
    originalUrl:"https://www.amazon.in/Cetaphil-Hydrating-Sulphate-Free-Niacinamide-Sensitive/dp/B01CCGW4OE/ref=sr_1_1?_encoding=UTF8&content-id=amzn1.sym.f36a001d-ef43-4626-979c-6ac82a5dd5b4&dib=eyJ2IjoiMSJ9.4_T46P6gx9Lv7IG2-LmqX_IFNZJtZapIIzKtijLbNihob9yTnn-Qd2Go1F0IHwrk5aByOlL8pRA1Z5EtNAqUDRnKoi8R1VFSlqidfCv5eZXxh0uCJLmOStUC8xyEW24oxJyRfFoY8Jl5YZEtBi-1NdtfOPyliG2M9E9WFvVRHhLKpdhhrvOYYbftn0Edl1rc5rfsJjnNtkioSEBbtYgQye2uuYlDER0dO_ifVTHAoI33PboD-K4QToc_62ivU1gLAKMW-RW_3HEWFq5M3k_GdApT6hcaVRZPZRUiRmnyjtw.NN_rf2snu9m7QccqLD3PGJulAcGxrTrB8bSUvkatnc0&dib_tag=se&pd_rd_r=709a5d24-05d9-47f9-9857-89f4067442d4&pd_rd_w=GUj7f&pd_rd_wg=WAaVw&pf_rd_i=1374407031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-4&qid=1792667584&refinements=p_85%3A10440599031%2Cp_36%3A9900-&rnid=1741387031&rps=1&s=beauty&sr=1-1",
    shortCode:"ISFGRH",
    clicks:5
  },
  {
    _id:"2",
    originalUrl:"https://www.amazon.in/Cetaphil-Hydrating-Sulphate-Free-Niacinamide-Sensitive/dp/B01CCGW4OE/ref=sr_1_1?_encoding=UTF8&content-id=amzn1.sym.f36a001d-ef43-4626-979c-6ac82a5dd5b4&dib=eyJ2IjoiMSJ9.4_T46P6gx9Lv7IG2-LmqX_IFNZJtZapIIzKtijLbNihob9yTnn-Qd2Go1F0IHwrk5aByOlL8pRA1Z5EtNAqUDRnKoi8R1VFSlqidfCv5eZXxh0uCJLmOStUC8xyEW24oxJyRfFoY8Jl5YZEtBi-1NdtfOPyliG2M9E9WFvVRHhLKpdhhrvOYYbftn0Edl1rc5rfsJjnNtkioSEBbtYgQye2uuYlDER0dO_ifVTHAoI33PboD-K4QToc_62ivU1gLAKMW-RW_3HEWFq5M3k_GdApT6hcaVRZPZRUiRmnyjtw.NN_rf2snu9m7QccqLD3PGJulAcGxrTrB8bSUvkatnc0&dib_tag=se&pd_rd_r=709a5d24-05d9-47f9-9857-89f4067442d4&pd_rd_w=GUj7f&pd_rd_wg=WAaVw&pf_rd_i=1374407031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-4&qid=1792667584&refinements=p_85%3A10440599031%2Cp_36%3A9900-&rnid=1741387031&rps=1&s=beauty&sr=1-1",
    shortCode:"ISHRGH",
    clicks:9
  },
  {
    _id:"3",
    originalUrl:"https://www.amazon.in/Cetaphil-Hydrating-Sulphate-Free-Niacinamide-Sensitive/dp/B01CCGW4OE/ref=sr_1_1?_encoding=UTF8&content-id=amzn1.sym.f36a001d-ef43-4626-979c-6ac82a5dd5b4&dib=eyJ2IjoiMSJ9.4_T46P6gx9Lv7IG2-LmqX_IFNZJtZapIIzKtijLbNihob9yTnn-Qd2Go1F0IHwrk5aByOlL8pRA1Z5EtNAqUDRnKoi8R1VFSlqidfCv5eZXxh0uCJLmOStUC8xyEW24oxJyRfFoY8Jl5YZEtBi-1NdtfOPyliG2M9E9WFvVRHhLKpdhhrvOYYbftn0Edl1rc5rfsJjnNtkioSEBbtYgQye2uuYlDER0dO_ifVTHAoI33PboD-K4QToc_62ivU1gLAKMW-RW_3HEWFq5M3k_GdApT6hcaVRZPZRUiRmnyjtw.NN_rf2snu9m7QccqLD3PGJulAcGxrTrB8bSUvkatnc0&dib_tag=se&pd_rd_r=709a5d24-05d9-47f9-9857-89f4067442d4&pd_rd_w=GUj7f&pd_rd_wg=WAaVw&pf_rd_i=1374407031&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-4&qid=1792667584&refinements=p_85%3A10440599031%2Cp_36%3A9900-&rnid=1741387031&rps=1&s=beauty&sr=1-1",
    shortCode:"ISHIKA",
    clicks:7
  }
]

function App() {

  const [urls, seturls] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [currentUrl, setCurrentUrl] = useState(null)

  async function fetchUrls() {

    const responce = await axios.get("http://localhost:5173/api/url")

    const responceData = responce.data

    seturls(responceData.data.urls)
  }

  async function createShortUrl(){
    const response = await axios.post("http://localhost:5173/api/url",{url:inputValue})

    setCurrentUrl({
      originalUrl: response.data.data.originalUrl,
      shortCode: response.data.data.shortCode
    })
  } 
  async function deleteUrl(){
    await axios.delete(`http://localhost:5173/api/url/${id}`)
  }

  useEffect(()=>{
    fetchUrls()
  },[])

  return (
   
    <main className='p-10 flex flex-col gap-5'>
      <div className='w-full max-w-4xl p-2 flex gap-2'>
        <input 
          className='border rounded w-full p-3 flex gap-2'
          placeholder='Paste Original Url'
          type="text"
          value={inputValue}
          onChange ={(e) =>{setInputValue(e.target.value)}} 
          />
          <button onClick={createShortUrl}
          className='p-2 rounded bg-orange-600 text-white cursor-pointer'>Shorten
          </button>
      </div>
      <div className='w-full max-w-4xl p-2'></div>
      <div className='w-full max-w-4xl p-2 flex flex-col gap-2'>
        {
          urls.map(urls =>{
            return(
             <div className='border border-neutral-200 p-2 flex justify-evenly gap-9'>
              <a href={`http://localhost:4000/${urls.shortCode}`} target='_blank'>{urls.shortCode}</a>
              <p className='truncate'>{urls.originalUrl}</p>
              <p>{urls.clicks}</p>
              <div className='flex gap-4'>
                <button className='p-2 rounded bg-orange-600 text-white cursor-pointer'>COPY</button>
                <button
                onClick={()=>deleteUrl(urls._id)}
                className='p-2 rounded bg-orange-600 text-white cursor-pointer'>DELETE</button>
              </div>
             </div>
            )
          })
        }
      </div>
    </main>
  )
}

export default App
