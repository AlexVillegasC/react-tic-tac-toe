export default function SearchPage({routeParams}) {
  return (
    <>
      <h2>Search Page</h2>
      <h1>Has buscado {routeParams.query}</h1>
    </>
  );
}