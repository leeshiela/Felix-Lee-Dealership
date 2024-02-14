function Carousel({props}) {

  return (
    <div id="carousel-Felix-Lee" className="carousel slide" data-interval="3000" data-bs-ride="carousel">
      <div className="carousel-inner">
          {props.map((pictureUrl, i) => {
            return (
              <div key={i} className={i === 0 ? "carousel-item active": "carousel-item"}>
                <img className="d-block w-100" src={pictureUrl} alt="car" />
              </div>
            )
          }
          )}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carousel-Felix-Lee" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carousel-Felix-Lee" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
    );
}

export default Carousel;
