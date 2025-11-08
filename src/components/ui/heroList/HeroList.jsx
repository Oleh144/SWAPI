import styles from './heroList.module.scss';
import HeroListItem from "../heroListItem/HeroListItem.jsx";
import {useSWAPIStore} from "../../../store/useSWAPIStore.jsx";
import {useEffect} from "react";
import Loader from "../loader/Loader.jsx";

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
            <ul className={styles.heroList}>
                {heroes.map((hero) => (
                    <HeroListItem key={hero.id}> {hero.name} </ HeroListItem>
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