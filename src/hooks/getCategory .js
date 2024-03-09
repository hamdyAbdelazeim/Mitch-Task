import { useQuery } from '@tanstack/react-query'

export const getCategory = (categoryChoose, itemsNumber, searchItem) => {
  console.log(searchItem)

  const { isPending, error, data } = useQuery({
    queryKey: ['getCategory', categoryChoose, itemsNumber, searchItem],
    queryFn: () =>
      fetch('https://woosonicpwa.com/MitchAPI/filter.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'postman',
          Cookie: 'cookieName=cookieValue',
        },
        body: JSON.stringify({
          category: categoryChoose,
          price_range: [0, 100000000],
          products_per_page: 12 * itemsNumber,
          page: itemsNumber,
          sort: {
            criteria: 'date',
            arrangement: 'DESC',
          },
          keyword: searchItem,
        }),
      }).then((res) => res.json()),
  })
  // Check if there are more items available
  const hasMoreItems = data?.length >= itemsNumber * 12

  return { data, isPending, error, hasMoreItems }
}
