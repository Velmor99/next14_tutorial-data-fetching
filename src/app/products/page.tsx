import { cookies } from "next/headers";
// export const fetchCache = "default-cache";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

export default async function ProductsPage() {
  const detailsResponse = await fetch("http://localhost:3001/products/1"); // has been cached and reused
  const details = await detailsResponse.json();

  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  const response = await fetch("http://localhost:3001/products", {
    cache: "no-store",
  });

  const detailsResponse2 = await fetch("http://localhost:3001/products/2"); // hasn't been cached and reused becouse position bellow "no-store"
  const details2 = await detailsResponse2.json();

  const products = await response.json();
  return (
    <ul className="space-y-4 p-4">
      {products.map((product: Product) => (
        <li
          key={product.id}
          className="p-4 bg-white shadow-md rounded-lg text-gray-700"
        >
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p>{product.description}</p>
          <p className="text-lg font-medium">${product.price}</p>
          <p>{details.price}</p>
        </li>
      ))}
    </ul>
  );
}
