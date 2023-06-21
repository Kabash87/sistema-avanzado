/**Detalles de la Publicacion */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getPost, deletePost } from "./service";
import { useDispatch } from "react-redux";
import { postDeleted, postInfo } from "../../redux/actions";

const PostPage = () => {
  const params = useParams();
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postSale = post && post.sale ? "En venta" : "Se busca";

  useEffect(() => {
    getPost(params.postId)
      .then((post) => setPost(post))
      .catch((error) => setError(error));
  }, [params.postId]);
  dispatch(postInfo());
  if (error?.status === 404) {
    return <Navigate to="/404" />;
  }

  /**Funcion que borra la publicacion */
  const handleDeleteClick = () => {
    if (window.confirm("¿Esta seguro que desea borrar la publicación?")) {
      deletePost(post.id)
        .then(() => {
          alert("Se ha borrado la publicación correctamente");
          dispatch(postDeleted());
          navigate("/");
        })
        .catch((error) => {
          setError(error);
          alert("Ha ocurrido un error, intente nuevamente");
          alert(setError);
        });
    }
  };

  /**Detalles de la publicacion impresa en la Página */
  return (
    <div>
      <center>
        <h3>Detalles de la publicacion n° {params.postId}</h3>
        <Link to="/">
          <button>Regresar al Inicio</button>
        </Link>
      </center>
      <br />
      <div className="posts2">
        {post && (
          <div className="postInfo">
            <img
              src={post.photo}
              alt="Producto"
              width="240px"
              className="ProductImg"
            />
            <div className="tagSell">
              <p>{postSale} </p>
            </div>
            <h3>{post.name}</h3>
            <div className="priceInfo">
              <p>{post.price}€</p>
            </div>

            <div className="tagInfo">
              <p>{post.tags}</p>
            </div>
          </div>
        )}
      </div>{" "}
      <br />
      <center>
        <button onClick={handleDeleteClick}>Borrar Publicacion</button>
      </center>
      <br />
      <br />
    </div>
  );
};

export default PostPage;
