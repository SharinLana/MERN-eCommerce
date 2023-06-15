import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Product details page</h1>
    </div>
  );
};

export default ProductDetailsPage;
