export const getProducts = () => {
  const api = `/json/MOCK_DATA.json`

  return fetch(api)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data
    })
}
