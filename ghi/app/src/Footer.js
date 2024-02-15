import felix_lee_black from "./static/img/felix_lee_black.png";

function Footer() {
    return (
        <footer className="mt-auto">
            <div className="container">
            <div className="row footer-class">
                <div className="col text-center">About
                    <div className="col text-center">Careers</div>
                    <div className="col text-center">Locations</div>
                    <div className="col text-center">© 2024 by Elian Felix and Shiela Lee</div>
                </div>
                <div className="col text-center">Contact Us
                    <div className="col text-center">123 Alphabet Ave. New York, NY 10022</div>
                    <div className="col text-center">New York, NY 10022</div>
                    <div className="col text-center">(303)123-4567</div>
                </div>
                <div className="col-3">
                    <img src={felix_lee_black} id="logo" alt="logo" />
                </div>
            </div>
        </div>
    </footer>

    )
}
export default Footer;
