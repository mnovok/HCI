import { TypeDestinationListItem, destinations } from "../destinationsList";
import styles from './destionation.module.css';
import Image, { StaticImageData } from "next/image";

interface Params {
    destinationId: number;
}


const DestinationPage = async ({ params }: { params: Params }) => {
    const destination = destinations[params.destinationId-1];

    if (!destination) {
        return <div>Destination not found  ${params.destinationId} </div>;
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
            <h1 className={styles.name}>{destination.name}</h1>
            <div className={styles.countryContainer}>
                <Image src="/images/location2.png" alt="Location" width={20} height={20} className={styles.smallImage} />
                <h2 className={styles.country}>{destination.country}</h2>
            </div>
            <div className={styles.description}>{destination.description}</div>
            <img src={destination.heroImage} alt={destination.name} className={styles.image} />
            </div>
        </main>
    );
};

export default DestinationPage;