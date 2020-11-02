export default verifyLogin = () => {
  axios({
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_URL}/verify`,
    withCredentials: true,
  })
    .then((res) => {
      if (res.status === 200 && res.data.username) {
        return res.data;
      }
    })
    .catch((error) => {
      return { error };
    });
};
