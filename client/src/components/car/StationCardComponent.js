import {useEffect, useState} from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, Spinner, SimpleGrid, Box, Image, Badge, IconButton, CloseButton,
} from "@chakra-ui/react";
import CarAPI from "../../api/CarAPI";

function StationCardComponent(props) {

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' position={"absolute"} top={5} right={5} shadow={"lg"} background={"#fff"}>
            <Box p='6'>
                <Box display='flex' alignItems='baseline'>
                    {props.car.routing.fast_charging_support && (
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            Charge Rapide
                        </Badge>
                    )}

                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                        ml='2'
                    >
                        {props.car.battery.usable_kwh} kWh &bull; {props.car.range.chargetrip_range.best} km
                    </Box>
                </Box>

                <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    isTruncated
                >
                    {props.car.naming.model}
                </Box>

                <Box>
                    {props.car.naming.make}
                </Box>
            </Box>
        </Box>
    );
}

export default StationCardComponent;
