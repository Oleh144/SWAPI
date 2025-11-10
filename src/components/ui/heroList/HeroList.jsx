import styles from './heroList.module.scss';
import HeroListItem from "../heroListItem/HeroListItem.jsx";
import {useSWAPIStore} from "../../../store/useSWAPIStore.jsx";
import {useEffect} from "react";
import Loader from "../loader/Loader.jsx";
import { Badge, Box, Button, Card, HStack, Image } from "@chakra-ui/react"

function HeroList() {
    const {heroes, errors, loading, fetchHeroes} = useSWAPIStore();

    useEffect(() => {
        fetchHeroes();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200 &&
                !loading
            ) {
                fetchHeroes();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchHeroes, loading]);

    return (
        <>
            {heroes.map((hero) => (
                <Card.Root flexDirection="row" key={hero.id} overflow="hidden" maxW="xl" mb={4}>
                    <Image
                        objectFit="cover"
                        maxW="200px"
                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt={hero.name}
                    />
                    <Box>
                        <Card.Body>
                            <Card.Title mb="2">{hero.name}</Card.Title>
                            {/*<Card.Description>*/}
                            {/*    Caffè latte is a coffee beverage of Italian origin made with espresso*/}
                            {/*    and steamed milk.*/}
                            {/*</Card.Description>*/}
                            <HStack mt="4">
                                <Badge>Gender: {hero.gender ? hero.gender : "other"}</Badge>
                                <Badge>Height: {hero.height}</Badge>
                                <Badge>Eye: {hero.eye_color}</Badge>
                                <Badge>Hair: {hero.hair_color}</Badge>
                            </HStack>
                        </Card.Body>
                        <Card.Footer>
                            <Button>See more details</Button>
                        </Card.Footer>
                    </Box>
                </Card.Root>
            ))}
            <ul className={styles.heroList}>
                {heroes.map((hero) => (
                    <HeroListItem key={hero.name}> {hero.name} </ HeroListItem>
                ))}

                {loading && (
                    <Loader />
                )}

                {errors && <h1>errors</h1>}
            </ul>
        </>
    );
}

export default HeroList;