
export interface TypeCategory {
    label: "Asia" | "Africa" | "Australia" | "Europe" | "North America" | "South America";
}

export interface TypeDestinationListItem {
    name: string;
    id: string;
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
        label: "South America",
    },
];



export const destinations: TypeDestinationListItem[] = [
    {
        name: "Banff National Park",
        id: '7brHScqDkJqEB1NbM0GFYz',
        country: "Canada",
        categories: [
        {
            label: "North America",
        },
        ],
        borderRadius: "30% 0 0 0",
        heroImage: "https://images.unsplash.com/photo-1561134643-668f9057cce4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Nestled in the heart of the Canadian Rockies, Banff National Park is a breathtaking destination renowned for its stunning landscapes, turquoise lakes, and rugged mountain peaks. As one of Canada's oldest national parks, Banff offers visitors an unparalleled experience of natural beauty and outdoor adventure.",
    },
    {
        name: "New York City",
        id: '5BiUgYdVYaWRH1CHX7BKKx',
        country: "USA",
        categories: [
        {
            label: "North America",
        },
        ],
        borderRadius: "0 30% 0 0",
        description: "New York City, the city that never sleeps, is an iconic metropolis that pulsates with energy, diversity, and a rich cultural tapestry. Nestled along the northeastern coast of the United States, this sprawling urban jungle is a global hub for finance, arts, fashion, and cuisine, making it a must-visit destination for travelers seeking an unparalleled blend of excitement and sophistication.",
        heroImage: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Split",
        id: '3NLoTvtHJnJeLM22PeuKA8',
        country: "Croatia",
        categories: [
        {
            label: "Europe",
        },
        ],
        borderRadius: "0 0 0 30%",
        description: "Nestled on the Adriatic coast, Split is a historic city with a unique blend of ancient architecture, vibrant culture, and stunning coastal views. As the second-largest city in Croatia, Split serves as a gateway to the Dalmatian Islands and offers a compelling mix of history, natural beauty, and a lively atmosphere.",
        heroImage: "https://images.unsplash.com/photo-1602436012494-74da0a911c85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Cairo",
        id: '151LnbwmVA38i5C2IrcQMO',
        country: "Egypt",
        categories: [
        {
            label: "Africa",
        },
        ],
        borderRadius: "0 0 30% 0",
        description: "Cairo, the vibrant capital of Egypt, stands as a testament to the country's rich history and cultural heritage. Nestled along the banks of the Nile River, Cairo is a bustling metropolis where ancient wonders coexist with modern life. From the iconic pyramids to bustling bazaars, Cairo is a city that captivates the senses and offers a glimpse into Egypt's past and present.",
        heroImage: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Kyoto",
        id: '6hlC8qBNShFBy2dpjl3eyH',
        country: "Japan",
        categories: [
        {
            label: "Asia",
        },
        ],
        description: "Kyoto, the cultural heart of Japan, is a city that effortlessly blends ancient traditions with modernity. Nestled in the Kansai region, Kyoto served as the imperial capital for more than a thousand years, leaving an indelible mark on the country's history and cultural identity. From serene temples and traditional tea houses to bustling markets and vibrant festivals, Kyoto offers a captivating journey through time.",
        heroImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Sydney",
        id: '4irIcXoB6Py7hPZBB2yJi9',
        country: "Australia",
        categories: [
        {
            label: "Australia",
        },
        ],
        description: "Sydney, the jewel of Australia's east coast, is a vibrant and cosmopolitan metropolis that effortlessly combines natural beauty with urban sophistication. Nestled around the iconic Sydney Harbour, this dynamic city is renowned for its striking landmarks, diverse culture, and outdoor lifestyle. From the iconic Sydney Opera House to the golden beaches and lush parks, Sydney offers a captivating blend of the modern and the traditional.",
        heroImage: "https://images.unsplash.com/photo-1597249120850-c0f3512cb6b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    },
    {
        name: "Rio de Janeiro ",
        id: 'jZ77ILy0sUegXvyeeagY8',
        country: "Brazil",
        categories: [
        {
            label: "South America",
        },
        ],
        description: "Rio de Janeiro, a city pulsating with life and rhythm, stands as a global icon of passion, celebration, and natural beauty. Nestled between lush mountains and golden beaches, Rio captivates with its vibrant culture, samba beats, and iconic landmarks. From the famous Carnival to the towering Christ the Redeemer statue, Rio de Janeiro is a city that embraces diversity and exudes a unique energy.",
        heroImage: "https://images.unsplash.com/photo-1548963670-aaaa8f73a5e3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    },
    {
        name: "Paris",
        id: '4g6yjpVrDrESSBS0GeinHK',
        country: "France",
        categories: [
        {
            label: "Europe",
        },
        ],
        description: "Nestled along the banks of the Seine River, Paris beckons with its romantic ambiance, artistic heritage, and iconic landmarks that exude a unique charm. PlanVoyage invites you to immerse yourself in the enchanting allure of the City of Light, where art, culture, and history converge to create an unparalleled experience.",
        heroImage: "https://images.unsplash.com/photo-1614918616986-d88642582e9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    },
]