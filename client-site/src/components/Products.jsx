import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const retrieveProducts = async ({ queryKey }) => {
  const res = await axios.get(`http://localhost:3000/${queryKey[0]}`);
  return res.data;
};

export default function Products() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: retrieveProducts,
    retry: false,
    staleTime: 5000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <>
      <div className="flex flex-col items-center justify-center w-3/5">
        <p className="text-center text-xl font-bold">Products List</p>
        <ul className="flex flex-wrap gap-4 justify-center items-center">
          {data &&
            data.map((product) => (
              <li
                className="flex flex-col items-center m-2 border rounded-sm"
                key={product.id}
              >
                <img src={product?.thumbnail} alt={product?.title} />
                {product.title}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
