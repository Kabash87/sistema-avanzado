/**Se importan los elementos para las publicaciones */
import "./styles.css";
import { useEffect, useState } from "react";
import { getLastestPosts } from "./service";
import { logout } from "../auth/service";
import { Link } from "react-router-dom";
import {
  authLogout,
  postsLoaded,
  postsRequest,
  tagsLoaded,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { getPosts, getTags } from "../store/selectors";
import { connect } from "react-redux";

/**Logica de Inicio y Cierre de Sesion */
const PostsPage = ({ posts, onLoad }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [saleFilter, setSaleFilter] = useState(null);
  const dispatch = useDispatch();
  const PostRequest = () => dispatch(postsRequest());
  const PostsTags = () => dispatch(tagsLoaded());
  useEffect(() => {
    setIsLoading(true);
    getLastestPosts().then((posts) => {
      setIsLoading(false);
      onLoad(posts);
      PostRequest();
      PostsTags();
    });
  }, []);

  /**Icono de carga de mientras se esta cargando */
  if (isLoading) {
    <div>
      <center>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p>Cargando...</p>
      </center>
    </div>;
  }

  /**Cierre de Sesion */

  const handleClick = async () => {
    const onLogout = () => dispatch(authLogout());
    await logout();
    onLogout(true);
  };

  /**Filtro de Busqueda de Publicaciones */
  const filterPosts = posts.filter(
    (post) =>
      (post.name ?? "").toUpperCase().startsWith(query.toUpperCase()) &&
      (saleFilter === null || post.sale === saleFilter)
  );

  const handleSaleFilterChange = (event) => {
    const selectedSale =
      event.target.value === "null" ? null : event.target.value === "true";
    setSaleFilter(selectedSale);
  };

  return (
    <div className="postsPage">
      {/**Botones de Cierre de Sesion, y para publicar */}
      <div className="botones">
        <center>
          <Link to="/login">
            <button className="Logout" onClick={handleClick}>
              Cerrar Sesión
            </button>
          </Link>
          <Link to="/newpost">
            <button>Publicar algo nuevo</button>
          </Link>
        </center>
      </div>
      {/**Se imprimen todos los productos dentro de la Base de datos */}
      {!!posts.length ? (
        <>
          <div className="Buscador">
            {" "}
            {/**Input de Busqueda */}
            <label>
              Buscar:{" "}
              <input
                type="text"
                placeholder="Escribe y busca aqui..."
                className="buscador-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <select
              value={saleFilter ?? "null"}
              onChange={handleSaleFilterChange}
              className="tipo"
            >
              <option value="null">De Todo</option>
              <option value="true">En venta</option>
              <option value="false">En busca</option>
            </select>
          </div>

          <br />

          <ul>
            {filterPosts.map((post) => (
              <div className="posts1">
                <li key={post.id}>
                  <Link to={`/home/${post.id}`}>
                    <img
                      src={post.photo}
                      alt="Producto"
                      width="230px"
                      className="ProductImg"
                    />
                    <h3>{post.name}</h3>
                    <div className="space">
                      <div className="priceInfo">
                        <p>{post.price}€</p>
                      </div>
                      <div className="tagInfo">
                        <p>{post.tags}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              </div>
            ))}
            <br />{" "}
          </ul>
        </>
      ) : (
        <>
          {/**Frase de Error si no se ha encontrado ningun elemento */}
          <br />
          <center>
            {" "}
            <img
              src="https://www.pngarts.com/files/8/Chibi-Anime-Download-PNG-Image.png"
              alt="Dibujo"
              width="220px"
            />
            <h3>¡WoW! Esto se ve muy vacio por aqui...</h3>
            <Link to="/newpost">
              {" "}
              <button>¿No hay nada? Crea la primera publicacion</button>
            </Link>
            <br />
            <br />
          </center>
        </>
      )}
    </div>
  );
};

/**Configuracion de Redux */
const mapStateToProps = (state) => ({
  posts: getPosts(state),
  tags: getTags(state),
});

const mapDispatchToProps = {
  onLoad: postsLoaded,
  tagsLoaded,
};
export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
