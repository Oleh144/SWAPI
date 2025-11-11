import { useSWAPIStore } from "@/stores/useSWAPIStore";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader";
import { Badge, Box, Button, Card, Flex, HStack, Image } from "@chakra-ui/react"
import { Link } from "react-router";
import { useSelectedHeroStore } from "@/stores/useSelectedHeroStore";
import { Hero } from "@/types/hero";
import { wrap } from "node:module";

function HeroList() {
    const { heroes, errors, loading, fetchHeroes, fetchStarships } = useSWAPIStore();
    const { setSelectedHero } = useSelectedHeroStore();

    function handleSetHero(hero: Hero) {
        setSelectedHero(hero)
    }

    // first time uploads data of heroes and starships
    useEffect(() => {
        fetchHeroes();
        fetchStarships();
    }, []);

    // upload heroes on scroll
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
            {heroes.map((hero: Hero) => (
                <Card.Root key={hero.id} overflow="hidden" width="100%" maxW="100%" mb={4} p={3} pb={6}>
                    <Flex flexDirection={{
                        base: "column",
                        md: "row"
                    }} align={{
                        base: "center",
                        md: "left"
                    }} gap={4}>
                        <Image
                            objectFit="cover"
                            maxW="150px"
                            maxH="150px"
                            src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
                            // placeholder image
                            onError={(e) => (e.currentTarget.src = "https://i.imgur.com/9SBQCQJ.png")}
                            alt={hero.name}
                        />
                        <Box>
                            <Card.Body px={0} pt={0}>
                                <Card.Title textAlign={{
                                    base: "center",
                                    md: "left"
                                }} mb="2">{hero.name}</Card.Title>
                                <HStack wrap="wrap" justifyContent={{
                                    base: "center",
                                    md: "left"
                                }}>
                                    <Badge>Gender: {hero.gender ? hero.gender : "other"}</Badge>
                                    <Badge>Height: {hero.height}</Badge>
                                    <Badge>Eye: {hero.eye_color}</Badge>
                                    <Badge>Hair: {hero.hair_color}</Badge>
                                </HStack>
                            </Card.Body>
                            <Card.Footer justifyContent={{
                                base: "center",
                                md: "left"
                            }} p={0}>
                                <Button onClick={() => handleSetHero(hero)}>
                                    <Link to="graph">See more details</Link>
                                </Button>
                            </Card.Footer>
                        </Box>
                    </Flex>
                </Card.Root>

            ))}

            {loading && <Loader />}
            {errors && <h1>errors</h1>}
        </>
    );
}

export default HeroList;