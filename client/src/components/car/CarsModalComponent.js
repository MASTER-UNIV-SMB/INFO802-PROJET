import {useEffect, useState} from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, Spinner, SimpleGrid, Box,
} from "@chakra-ui/react";
import CarAPI from "../../api/CarAPI";

function CarsModalComponent(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        CarAPI.listCars().then(cars => {
            setCars(cars.carList);
            setIsLoading(false);
        });
    }, []);

    return (
        <Drawer
            isOpen={props.isOpen}
            closeOnEsc={false}
            closeOnOverlayClick={false}
            size={"2xl"}
            placement={"bottom"}
            onClose={() => props.onChooseCar(undefined)}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader textAlign={"center"} fontWeight={700}>Choisissez une voiture</DrawerHeader>

                <DrawerBody minHeight={400} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                    {isLoading ? (
                        <Spinner/>
                    ) : (
                        <SimpleGrid columns={4} spacing={5}>
                            {cars.map((c, i) => {
                                return (
                                    <Box borderRadius={10} className={"car-item"}
                                         border={"1px solid #e7e7e7"} display={"flex"}
                                         flexDirection={"column"} justifyContent={"center"}
                                        alignItems={"center"} onClick={() => {
                                        props.onChooseCar(c)
                                    }}>
                                        <img src={c.media.image.thumbnail_url}></img>
                                        <h5>{c.naming.make}</h5>
                                        <h3>{c.naming.model}</h3>
                                    </Box>
                                )
                            })}
                        </SimpleGrid>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

export default CarsModalComponent;
