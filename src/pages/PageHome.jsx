import Product from "../components/Product";

const PageHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Product />
      </div>
    </div>
  );
};

export default PageHome;
