function Carousel() {
    return (
        <div id="carousel-Felix-Lee" class="carousel slide" data-interval="3000" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="https://www.freewebheaders.com/wp-content/gallery/cars/toyota-gt86-red-car-on-road-website-header.jpg" alt="Toyota"/>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="https://www.freewebheaders.com/wp-content/gallery/cars/tesla-roadster-red-super-sports-car-website-header.jpg" alt="Tesla"/>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="https://www.freewebheaders.com/wp-content/gallery/cars/blue-bmw-alpina-b6-xdrive-gran-coupe-car-web-header.jpg" alt="Volkswagon"/>
          </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-Felix-Lee" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-Felix-Lee" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
</div>
      </div>
    )
}

export default Carousel;
