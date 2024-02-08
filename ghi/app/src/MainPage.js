import felix_lee_name from "./static/img/felix_lee_name.png";

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
        <div id="dealership-div">
          <img src={felix_lee_name} alt="dealership name"/>
        </div>
      <h2 className="display-sm fw-bold">Car Showroom</h2>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          To get started, tell us about yourself!
        </p>
      </div>
      <div className="container">
        <div className="row gx-5">
          <div className="card col-md h-100" >
            <h3>I'm looking for a car</h3>
            <img className="card-img-top" src="https://car-images.bauersecure.com/wp-images/3033/1056x594/020_tesla_model_3.jpg" alt="tesla customer"/>
          </div>
          <div className="card col-md h-100">
            <h3>I need to service my car</h3>
            <img className="card-img-top" src="https://scitexas.edu/wp-content/uploads/2021/05/auto-hero-2.jpg"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
