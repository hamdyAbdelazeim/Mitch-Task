import { useQuery } from '@tanstack/react-query'

export const getProduct = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['Products'],
    queryFn: () =>
      fetch('https://woosonicpwa.com/MitchAPI/filter.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'postman',
          Cookie: 'cookieName=cookieValue',
        },
        body: JSON.stringify({
          category: '',
          price_range: [0, 100000000],
          products_per_page: 108,
          page: 1,
          sort: {
            criteria: 'date',
            arrangement: 'DESC',
          },
          keyword: '',
        }),
      }).then((res) => res.json()),
  })
  return { data, isPending, error }
}
