import axios from "axios";
import { useEffect, useState } from "react";
import InputGroup from "./InputGroup";
import { GiSpinningBlades } from "react-icons/gi";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
    imgFile: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.log(err))
  }, [])
  console.log(categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (productDetails.imgFile) {

      const imageData = new FormData();
      imageData.set("key", "b5009156314b835b7542545d197df0e9");
      imageData.append("image", productDetails.imgFile);

      axios.post("https://api.imgbb.com/1/upload", imageData)
        .then((response) => {
          const imgUrl = response.data.data.display_url;
          if (imgUrl) {
            axios.post(
                "/products/new",
                {
                  name: productDetails.name,
                  price: productDetails.price,
                  quantity: productDetails.quantity,
                  category: productDetails.category,
                  description: productDetails.description,
                  imgUrl,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                if (res.data) {
                  setLoading(false);
                  setSuccessMsg("Product has been Added");
                  setTimeout(() => {
                    setSuccessMsg("");
                  }, 2000);
                  setProductDetails({
                    name: "",
                    price: "",
                    quantity: "",
                    imgFile: "",
                    description: "",
                    category: "",
                  });
                  document.querySelector("form").reset();
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="p-3">
      <h1 className="text-4xl">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <InputGroup
          name="name"
          value={productDetails}
          onChange={setProductDetails}
          id="name"
          type="text"
          label="Name"
          placeholder="Product Name"
        />
        <div className="md:flex md:justify-between">
          <InputGroup
            name="price"
            value={productDetails}
            onChange={setProductDetails}
            id="price"
            type="number"
            label="Price"
            placeholder="Price"
          />
          <InputGroup
            name="quantity"
            value={productDetails}
            onChange={setProductDetails}
            id="quantity"
            type="number"
            label="Quantity"
            placeholder="Quantity"
          />
          <div className="flex flex-col py-3 rounded-sm">
            <label className="py-1" htmlFor="category">
              Choose a Category
            </label>
            <select
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  category: e.target.value,
                })
              }
              value={productDetails.category}
              id="category"
              name="category"
              className="border border-b-black px-3 py-2 rounded-sm"
              required
            >
              <option value="">Select Category</option>
              {
                categories.map(category => <option key={category._id} className="capitalize" value={category._id}>{category.name}</option>)
              }
            </select>
          </div>
        </div>
        <div className="flex flex-col py-3 rounded-sm">
          <label className="py-1" htmlFor="category">
            Description
          </label>
          <textarea
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                description: e.target.value,
              })
            }
            value={productDetails.description}
            name="description"
            className="border border-b-black px-3 py-2 rounded-sm"
            placeholder="Write small description"
            cols="90"
            rows="6"
            required
          />
        </div>
        <div className="flex flex-col py-3 rounded-sm">
          <label className="py-1" htmlFor="image">
            Upload Image
          </label>
          <input
            id="image"
            name="imgFile"
            type="file"
            className="border border-b-black px-3 py-2 rounded-sm"
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                imgFile: e.target.files[0],
              })
            }
            accept="image/*"
            required
          />
        </div>
        <button
          className="bg-green-400 text-white px-20 py-2 mx-auto block"
          type="submit"
        >
          Upload
        </button>
      </form>
      {loading && (
        <div className="">
          <GiSpinningBlades className="mx-auto w-8 h-8 mt-3 animate-spin" />
        </div>
      )}
      <p className="text-center py-3 text-xl text-green-800">{successMsg}</p>
    </div>
  );
};

export default AddProduct;
