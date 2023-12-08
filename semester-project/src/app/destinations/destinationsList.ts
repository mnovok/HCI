
export interface TypeCategory {
    label: "Asia" | "Africa" | "Australia" | "Europe" | "North America" | "South  America" | "Antarctica";
}

export interface TypeDestinationListItem {
    name: string;
    id: number;
    country: string;
    categories: TypeCategory[];
    heroImage: string;
    description: string;
    borderRadius?: string;
}

export const categories: TypeCategory[] = [
    {
        label: "Asia",
    },
    {
        label: "Africa",
    },
    {
        label: "Europe",
    },
    {
        label: "Australia",
    },
    {
        label: "North America",
    },
    {
        label: "South  America",
    },
    {
        label: "Antarctica",
    },
];



export const destinations: TypeDestinationListItem[] = [
    {
        name: "Banff National Park",
        id: 1,
        country: "Canada",
        categories: [
        {
            label: "North America",
        },
        ],
        borderRadius: "20% 0 0 0",
        heroImage: "https://images.unsplash.com/photo-1561134643-668f9057cce4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Nestled in the heart of the Canadian Rockies, Banff National Park is a breathtaking destination renowned for its stunning landscapes, turquoise lakes, and rugged mountain peaks. As one of Canada's oldest national parks, Banff offers visitors an unparalleled experience of natural beauty and outdoor adventure.",
    },
    {
        name: "New York City",
        id: 2,
        country: "USA",
        categories: [
        {
            label: "North America",
        },
        ],
        borderRadius: "0 20% 0 0",
        description: "New York City, the city that never sleeps, is an iconic metropolis that pulsates with energy, diversity, and a rich cultural tapestry. Nestled along the northeastern coast of the United States, this sprawling urban jungle is a global hub for finance, arts, fashion, and cuisine, making it a must-visit destination for travelers seeking an unparalleled blend of excitement and sophistication.",
        heroImage: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Split",
        id: 3,
        country: "Croatia",
        categories: [
        {
            label: "Europe",
        },
        ],
        borderRadius: "0 0 0 20%",
        description: "Nestled on the Adriatic coast, Split is a historic city with a unique blend of ancient architecture, vibrant culture, and stunning coastal views. As the second-largest city in Croatia, Split serves as a gateway to the Dalmatian Islands and offers a compelling mix of history, natural beauty, and a lively atmosphere.",
        heroImage: "https://images.unsplash.com/photo-1602436012494-74da0a911c85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Cairo",
        id: 4,
        country: "Egypt",
        categories: [
        {
            label: "Africa",
        },
        ],
        borderRadius: "0 0 20% 0",
        description: "Cairo, the vibrant capital of Egypt, stands as a testament to the country's rich history and cultural heritage. Nestled along the banks of the Nile River, Cairo is a bustling metropolis where ancient wonders coexist with modern life. From the iconic pyramids to bustling bazaars, Cairo is a city that captivates the senses and offers a glimpse into Egypt's past and present.",
        heroImage: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
]