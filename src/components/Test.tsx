import { useQuery } from "@tanstack/react-query";

const fetchHelloWorld = async () => {
  return "Hello, TanStack Query!";
};

const TestComponent = () => {
  const { data, error, isLoading } = useQuery(["hello"], fetchHelloWorld);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data}</div>;
};

export default TestComponent;
