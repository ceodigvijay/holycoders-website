import axios from 'axios'
export async function handleImageUpload(file) {
    console.log("Uploading the Image.");
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/image`;
    const formData = new FormData();
    formData.append("avatar", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const res = await axios.post(url, formData, config);
    return res.data;
  }