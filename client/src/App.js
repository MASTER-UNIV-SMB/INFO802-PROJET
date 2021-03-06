import MapComponent from "./components/MapComponent";
import {useEffect, useState} from "react";
import CarsModalComponent from "./components/car/CarsModalComponent";
import CarCardComponent from "./components/car/CarCardComponent";
import CarAPI from "./api/CarAPI";

function App() {

    const [carData, setCarData] = useState(undefined);

    return (
        <>
            <MapComponent autonomy={carData === undefined ? 0 : carData.range.chargetrip_range.best}/>
            <CarsModalComponent isOpen={carData === undefined} onChooseCar={(car) => setCarData(car)}/>
            {carData !== undefined && <CarCardComponent car={carData} onChangeCar={() => setCarData(undefined)}/>}
        </>
    );
}

export default App;
