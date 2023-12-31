import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

function VanDetail() {
  const params = useParams();
  console.log(params);

  const location = useLocation();
  console.log(location.state.search);
  console.log(location);
  const [van, setVan] = useState(null);

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);

  const search = location.state?.search || "";

  return (
    <>
      <div className="van-detail-container">
        <Link
          to={`..${location.state.search}`}
          relative="path"
          className="back-button"
        >
          &larr; <span>Back to all vans</span>
        </Link>

        {van ? (
          <div className="van-detail">
            <img src={van.imageUrl} />
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            <h2>{van.name}</h2>
            <p className="van-price">
              <span>${van.price}</span>/day
            </p>
            <p>{van.description}</p>
            <button className="link-button">Rent this van</button>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
}

export default VanDetail;
