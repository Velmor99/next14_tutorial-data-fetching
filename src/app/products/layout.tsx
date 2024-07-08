export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetch("http://localhost:3001/products");
  const products = await response.json();
  console.log({ products });
  return <>{children}</>;
}
