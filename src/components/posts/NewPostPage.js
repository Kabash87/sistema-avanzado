import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "./service";
import { useDispatch } from "react-redux";
import { postCreated } from "../../redux/actions";
const NewPostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**Se declaran las variables */
  const [name, setName] = useState("");
  const [sale, setSale] = useState(false);
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState(null);

  /**Se declaran las variables de datos */
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleSaleChange = (event) => {
    setSale(event.target.value === "true");
  };
  const handleTagChange = (event) => {
    setTags(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file || null);
  };

  /**Se manda toda la informacion dentro de la base de datos */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sale", sale);
      formData.append("tags", tags);
      formData.append("price", price);

      if (photo) {
        formData.append("photo", photo);
      }

      const post = await createPost(formData);
      alert("Se ha creado la publicacion correctamente");
      dispatch(postCreated());
      navigate(`/home/${post.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="formPost">
      <center>
        <Link to="/">
          <button>Regresar al Inicio</button>
        </Link>
        <h2>Crea una nueva publicacion</h2>
        <h3>Todo el mundo sabra sobre el, te lo aseguramos 😃</h3>
        <br />
      </center>
      <form onSubmit={handleSubmit}>
        <center>
          {/**Input que especifica si es Compra o venta */}
          <div className="input1">
            <label>Escoje el tipo de Publicacion: </label>
            <select
              name="sale"
              className="input-post"
              onChange={handleSaleChange}
              required
            >
              <option value="true">Venta de un Producto</option>
              <option value="false">Busqueda de un Producto</option>
            </select>
          </div>

          <div className="input1">
            <label>Nombre del Producto: </label>
            <input
              type="text"
              name="product"
              className="input-post"
              placeholder="¿Que vas a publicar?"
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="input3">
            <label>Precio del Producto: </label>
            <input
              type="number"
              name="price"
              className="input-post"
              placeholder="¿Y cuanto cuesta?"
              onChange={handlePriceChange}
              required
            />
          </div>

          <div className="input4">
            <label>Etiqueta: </label>
            <select
              name="tag"
              className="input-post"
              onChange={handleTagChange}
              required
            >
              <option selected disabled>
                Seleciona un Tag...
              </option>
              <option value="lifestyle">Hogar y Cocina</option>
              <option value="mobile">Tecnologia</option>
              <option value="motor">Automotriz</option>
              <option value="work">Trabajo</option>
            </select>
          </div>

          <div className="input5">
            <label>Imagen: </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="input-post"
              onChange={handlePhotoChange}
            />
          </div>
        </center>
        <center>
          <h5>*Inserta unicamente un link de una Imagen valida de Internet*</h5>
          <button type="submit">¡Publicar Ahora!</button>
        </center>
      </form>
    </div>
  );
};

export default NewPostPage;
