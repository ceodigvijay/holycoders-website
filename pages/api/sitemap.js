// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
export default async (req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/xml");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sitemap`);
    var data = await response.data;
    res.send(data)
  }
  