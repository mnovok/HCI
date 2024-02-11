import contentfulService from "../../../../lib/contentfulClient";
import styles from './destionation.module.css';
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface Params {
    destinationId: string;
}

export default async function DestinationPost({ params }: { params: Params })  {
    const destination = await contentfulService.getDestinationPostById(params.destinationId);

    if (!destination) {
        return <div>Destination post not found</div>;
    }

    return (
        <>
        <main className={styles.main}>
            <div className={styles.headerContainer}>
                <Image src={destination.thumbnail} alt="thumbnail"  priority layout="fill" className={styles.headerImage} />
                <div className={styles.overlay}>
                    <h1 className={styles.name}>{destination.title}</h1>
                    <div className={styles.countryContainer}>
                        <Image src="/images/location2.png" alt="Location" width={20} height={20} className={styles.pin} />
                        <h2 className={styles.country}>{destination.country}</h2>
                    </div>
                </div>  
            </div>
            
            <div className={styles.text}>{documentToReactComponents(destination.contentBody)}</div>
        </main>
        </>
    );
}

/*


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

export default DestinationPage;*/