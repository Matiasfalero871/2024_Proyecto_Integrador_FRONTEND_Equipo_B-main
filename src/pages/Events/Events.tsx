import EventCarousel from "./Events Components/EventsCarousel"
import '../Home/Home.css'
import NavbarComponent from "./Events Components/NavBar";
import Category from "./Events Components/CatEventos";

 export const EventsPage = () => {

    return (
        <div className="page-container">
            <div>
                <NavbarComponent/>
                <Category/>
            </div>
        </div>

    );


}