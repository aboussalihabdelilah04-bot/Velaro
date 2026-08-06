/* ============================================
   VelaroCar - Data Layer
   Toutes les données du site
   ============================================ */

const SITE_CONFIG = {
    name: "VelaroCar",
    tagline: "Location Premium à Marrakech",
    slogan: "Découvrez Marrakech avec Style",
    description: "Location de voitures, motos, maisons et excursions touristiques à Marrakech et dans tout le Maroc.",
    phone: "+212 681 11 71 95",
    whatsapp: "+212681117195",
    email: "velarocars26@gmail.com",
    address: "Avenue Al Mhamid, Marrakech 40000, Maroc",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.123456789!2d-8.008!3d31.629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ0LjQiTiA4wrAwMCc0OC4wIlc!5e0!3m2!1sfr!2sma!4v1234567890",
    social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
        youtube: "#",
        tiktok: "#"
    }
};

/* ============================================
   VOITURES
   ============================================ */
const CARS = [
    {
        id: "car-001",
        name: "Dacia Logan",
        brand: "Dacia",
        year: 2025,
        fuel: "Diesel",
        transmission: "Manuelle",
        seats: 5,
        pricePerDay: 300,
        category: "Économique",
        image: "images/cars/dacia-logan/main.webp",
        images: [
            "images/cars/dacia-logan/main.webp",
            "images/cars/dacia-logan/1.png",
            "images/cars/dacia-logan/2.png",
            "images/cars/dacia-logan/3.png",
            "images/cars/dacia-logan/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS"],
        available: true,
        rating: 4.5,
        reviews: 23
    },
    
    {
        id: "car-002",
        name: "Renault Megan",
        brand: "Renault",
        year: 2025,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 400,
        category: "Compacte",
        image: "images/cars/renault-megan/main.webp",
        images: [
            "images/cars/renault-megan/main.webp",
            "images/cars/renault-megan/1.png",
            "images/cars/renault-megan/2.png",
            "images/cars/renault-megan/3.png ",
            "images/cars/renault-megan/4.png "
        ],
        features: ["Climatisation", "Bluetooth", "Caméra recul"],
        available: true,
        rating: 4.6,
        reviews: 31
    },
    {
        id: "car-003",
        name: "Peugeot 208",
        brand: "Peugeot",
        year: 2024,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 350,
        category: "Compacte",
        image: "images/cars/peugeot-208/main.webp",
        images: [
            "images/cars/peugeot-208/main.webp",
            "images/cars/peugeot-208/1.png",
            "images/cars/peugeot-208/2.png",
            "images/cars/peugeot-208/3.png  ",
            "images/cars/peugeot-208/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "Écran tactile", "Caméra recul"],
        available: true,
        rating: 4.7,
        reviews: 100
    },
    {
        id: "car-004",
        name: "Volkswagen Golf 7",
        brand: "Volkswagen",
        year: 2024,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 1200,
        category: "Compacte",
        image: "images/cars/volkswagen-golf/main.webp",
        images: [
            "images/cars/volkswagen-golf/main.webp",
            "images/cars/volkswagen-golf/1.png",
            "images/cars/volkswagen-golf/2.png",
            "images/cars/volkswagen-golf/3.png  ",
            "images/cars/volkswagen-golf/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS","toit panoramique" , "Caméra 360", "Son Harman Kardon"],
        available: true,
        rating: 5,
        reviews: 690
    },
    {
        id: "car-005",
        name: "Mercedes Classe C",
        brand: "Mercedes",
        year: 2025,
        fuel: "Diesel",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 1200,
        category: "Premium",
        image: "images/cars/mercedes-classe-c/main.webp",
        images: [
            "images/cars/mercedes-classe-c/main.webp",
            "images/cars/mercedes-classe-c/1.png",
            "images/cars/mercedes-classe-c/2.png",
            "images/cars/mercedes-classe-c/3.png    ",
            "images/cars/mercedes-classe-c/4.png"
        ],
        features: ["Climatisation", "Cuir", "GPS", "Caméra 360", "Toit panoramique", "Son Harman Kardon"],
        available: true,
        rating: 4.9,
        reviews: 56
    },
    {
        id: "car-006",
        name: "Dacia sandero stepway",
        brand: "Dacia",
        year: 2025,
        fuel: "Diesel",
        transmission: "Manuelle",
        seats: 5,
        pricePerDay: 300,
        category: "Economique",
        image: "images/cars/dacia-sandero-stepway/main.webp",
        images: [
            "images/cars/dacia-sandero-stepway/main.webp",
            "images/cars/dacia-sandero-stepway /1.png",
            "images/cars/dacia-sandero-stepway /2.png",
            "images/cars/dacia-sandero-stepway /3.png",
            "images/cars/dacia-sandero-stepway /4.png"
        ],
        features: ["Climatisation", "Cuir", "GPS", "Caméra 360", , "Sieges chauffants"],
        available: true,
        rating: 4.9,
        reviews: 67
    },
    
    {
        id: "car-008",
        name: "Range Rover Evoque",
        brand: "Land Rover",
        year: 2024,
        fuel: "Diesel",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 1200,
        category: "SUV Premium",
        image: "images/cars/range-rover-evoque/main.webp",
        images: [
            "images/cars/range-rover-evoque/main.webp",
            "images/cars/range-rover-evoque/1.png",
            "images/cars/range-rover-evoque/2.png",
            "images/cars/range-rover-evoque/3.png",
            "images/cars/range-rover-evoque/4.png"
        ],
        features: ["Climatisation", "Cuir", "GPS", "Caméra 360", "4x4", "Toit panoramique", "Meridian Sound"],
        available: true,
        rating: 5.0,
        reviews: 38
    },
    
    {
        id: "car-009",
        name: "Hyundai accent",
        brand: "Hyundai",
        year: 2025,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay:350 ,
        category: "Economique",
        image: "images/cars/hyundai-accent/main.webp",
        images: [
            "images/cars/hyundai-accent/main.webp",
            "images/cars/hyundai-accent/1.png",
            "images/cars/hyundai-accent/2.png",
            "images/cars/hyundai-accent/3.png",
            "images/cars/hyundai-accent/4.png"
        ],
        features: ["Climatisation", "Cuir", "GPS", "V8", "Mode sport", "Son premium"],
        available: true,
        rating: 4.9,
        reviews: 29
    },
     
    {
        id: "car-010",
        name: "Hyundai Tucson",
        brand: "Hyundai",
        year: 2025,
        fuel: "Diesel",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 800,
        category: "SUV",
        image: "images/cars/hyundai-tucson/main.webp",
        images: [
            "images/cars/hyundai-tucson/main.webp",
            "images/cars/hyundai-tucson/1.png",
            "images/cars/hyundai-tucson/2.png",
            "images/cars/hyundai-tucson/3.png",
            "images/cars/hyundai-tucson/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS", "Caméra 360", "Toit panoramique"],
        available: true,
        rating: 5,
        reviews: 200
    },
    {
        id: "car-011",
        name: "Kia Sportage",
        brand: "Kia",
        year: 2025,
        fuel: "Diesel",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 650,
        category: "SUV",
        image: "images/cars/kia-sportage/main.webp",
        images: [
            "images/cars/kia-sportage/main.webp",
            "images/cars/kia-sportage/1.png",
            "images/cars/kia-sportage/2.png",
            "images/cars/kia-sportage/3.png",
            "images/cars/kia-sportage/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS", "Sièges chauffants"],
        available: true,
        rating: 4.6,
        reviews: 97
    },
    {
        id: "car-012",
        name: "⁠Volgswagen T-roc",
        brand: "Volkswagen",
        year: 2025,
        fuel: "Diesel",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 900,
        category: "SUV Premium",
        image: "images/cars/volkswagen-t-roc/main.webp",
        images: [
            "images/cars/volkswagen-t-roc/main.webp",
            "images/cars/volkswagen-t-roc/1.png",
            "images/cars/volkswagen-t-roc/2.png",
            "images/cars/volkswagen-t-roc/3.png",
            "images/cars/volkswagen-t-roc/4.png"
        ],
        features: ["Climatisation", "Cuir", "GPS", "Caméra 360", "4x4", "Toit panoramique", "MBUX"],
        available: true,
        rating: 5.0,
        reviews: 410
    },
    {
        id: "car-013",
        name: "Fiat 500",
        brand: "Fiat",
        year: 2025,
        fuel: "Essence",
        transmission: "Manuelle",
        seats: 4,
        pricePerDay: 400,
        category: "Économique",
        image: "images/cars/fiat-500/main.webp",
        images: [
            "images/cars/fiat-500/main.webp",
            "images/cars/fiat-500/1.png",
            "images/cars/fiat-500/2.png",
            "images/cars/fiat-500/3.png",
            "images/cars/fiat-500/4.png"
        ],
        features: ["Climatisation", "Bluetooth"],
        available: true,
        rating: 4.4,
        reviews: 70
    },
    {
        id: "car-014",
        name: "Dacia jogger",
        brand: "Dacia",
        year: 2025,
        fuel: "Diesel",
        transmission: "Manuelle",
        seats: 7,
        pricePerDay: 350,
        category: "Economique",
        image: "images/cars/dacia-jogger/main.webp",
        images: [
            "images/cars/dacia-jogger/main.webp",
            "images/cars/dacia-jogger/1.png",
            "images/cars/dacia-jogger/2.png",
            "images/cars/dacia-jogger/3.png",
            "images/cars/dacia-jogger/4.png"
        ],
        features: ["Climatisation", "4x4", "Toit amovible", "GPS", "Bluetooth"],
        available: true,
        rating: 4.7,
        reviews: 33
    },
    {
        id: "car-015",
        name: "Dacia sandero",
        brand: "Dacia",
        year: 2025,
        fuel: "Diesel",
        transmission: "Manuelle",
        seats: 5,
        pricePerDay: 300,
        category: "Économique",
        image: "images/cars/dacia-sandero/main.webp",
        images: [
            "images/cars/dacia-sandero/main.webp",
            "images/cars/dacia-sandero/1.png",
            "images/cars/dacia-sandero/2.png",
            "images/cars/dacia-sandero/3.png",
            "images/cars/dacia-sandero/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS"],
        available: true,
        rating: 4.5,
        reviews: 23
    },
    {
        id: "car-016",
        name: "Hyundai Staria",
        brand: "Hyundai",
        year: 2025,
        fuel: "Diesel",
        transmission: "Automatique",
        seats: 9,
        pricePerDay:1200 ,
        category: " Van",
        image: "images/cars/hyundai-staria/main.webp",
        images: [
            "images/cars/hyundai-staria/main.webp",
            "images/cars/hyundai-staria/1.png",
            "images/cars/hyundai-staria/2.png",
            "images/cars/hyundai-staria/3.png",
            "images/cars/hyundai-staria/4.png"
        ],
        features: ["Climatisation", "Cuir", "GPS", "V8", "Mode sport", "Son premium"],
        available: true,
        rating: 4.9,
        reviews: 29
    },
    {
        id: "car-0017",
        name: "Renault Clio 5 ",
        brand: "Renault",
        year: 2024,
        fuel: "Diesel",
        transmission: "Manuelle",
        seats: 5,
        pricePerDay: 400,
        category: "Économique",
        image: "images/cars/renault-clio5/2024.webp",
        images: [
            "images/cars/renault-clio5/2024.webp",
            "images/cars/renault-clio5/1.png",
            "images/cars/renault-clio5/2.png",
            "images/cars/renault-clio5/3.png ",
            "images/cars/renault-clio5/4.png "
        ],
        features: ["Climatisation", "Bluetooth", "Caméra recul"],
        available: true,
        rating: 4.8,
        reviews: 310
    },
    {
        id: "car-0018",
        name: "Renault Clio 5 ",
        brand: "Renault",
        year: 2025,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 400,
        category: "Économique",
        image: "images/cars/renault-clio5/2025.webp",
        images: [
            "images/cars/renault-clio5/2025.webp",
            "images/cars/renault-clio5/1.png",
            "images/cars/renault-clio5/2.png",
            "images/cars/renault-clio5/3.png ",
            "images/cars/renault-clio5/4.png "
        ],
        features: ["Climatisation", "Bluetooth", "Caméra recul"],
        available: true,
        rating: 4.8,
        reviews: 310
    },
    {
        id: "car-0019",
        name: "Renault Arkana ",
        brand: "Renault",
        year: 2025,
        fuel: "Hybride",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 500,
        category: "Économique",
        image: "images/cars/renault-arkana/main.webp",
        images: [
            "images/cars/renault-arkana/main.webp",
            "images/cars/renault-arkana/1.png",
            "images/cars/renault-arkana/2.png",
            "images/cars/renault-arkana/3.png ",
            "images/cars/renault-arkana/4.png "
        ],
        features: ["Climatisation", "Bluetooth", "Caméra recul"],
        available: true,
        rating: 4.8,
        reviews: 109
    },
    {
        id: "car-0021",
        name: "renault clio 5 alpine ",
        brand: "Renault",
        year: 2025,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 700,
        category: "Économique",
        image: "images/cars/renault-clio5-alpine/main.webp",
        images: [
            "images/cars/renault-clio5-alpine/main.webp",
            "images/cars/renault-clio5-alpine/1.png",
            "images/cars/renault-clio5-alpine/2.png",
            "images/cars/renault-clio5-alpine/3.png ",
            "images/cars/renault-clio5-alpine/4.png "
        ],
        features: ["Climatisation", "Bluetooth", "Caméra recul"],
        available: true,
        rating: 4.9,
        reviews: 519
    },
    {
        id: "car-0022",
        name: "Peugeot 3008 ",
        brand: "Peugeot",
        year: 2025,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 350,
        category: "Économique",
        image: "images/cars/peugeot-3008/main.webp",
        images: [
            "images/cars/peugeot-3008/main.webp",
            "images/cars/peugeot-3008/1.png",
            "images/cars/peugeot-3008/2.png",
            "images/cars/peugeot-3008/3.png ",
            "images/cars/peugeot-3008/4.png "
        ],
        features: ["Climatisation", "Bluetooth", "Caméra recul"],
        available: true,
        rating: 4.7,
        reviews: 254
    },
    {
        id: "car-0023",
        name: "Kia Picanto ",
        brand: "Kia",
        year: 2024,
        fuel: "Essence",
        transmission: "Manuelle",
        seats: 5,
        pricePerDay: 300,
        category: "Économique",
        image: "images/cars/kia-picanto/main.webp",
        images: [
            "images/cars/kia-picanto/main.webp",
            "images/cars/kia-picanto/1.png",
            "images/cars/kia-picanto/2.png",
            "images/cars/kia-picanto/3.png ",
            "images/cars/kia-picanto/4.png "
        ],
        features: ["Climatisation", "Bluetooth", "Caméra recul"],
        available: true,
        rating: 4.5,
        reviews: 254
    },
     
    {
        id: "car-0025",
        name: "Volkswagen Golf 8",
        brand: "Volkswagen",
        year: 2025,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 1500,
        category: "Compacte",
        image: "images/cars/volkswagen-golf/8.webp",
        images: [
            "images/cars/volkswagen-golf/8.webp",
            "images/cars/volkswagen-golf/1.png",
            "images/cars/volkswagen-golf/2.png",
            "images/cars/volkswagen-golf/3.png  ",
            "images/cars/volkswagen-golf/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS","toit panoramique" , "Caméra 360", "Son Harman Kardon"],
        available: true,
        rating: 5,
        reviews: 667
    },
    {
        id: "car-0026",
        name: "Toyota Prado",
        brand: "Toyota",
        year: 2025,
        fuel: "Diesel",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 2600,
        category: "SUV Premium",
        image: "images/cars/toyota-prado/main.webp",
        images: [
            "images/cars/toyota-prado/main.webp",
            "images/cars/toyota-prado/1.png",
            "images/cars/toyota-prado /2.png",
            "images/cars/toyota-prado/3.png  ",
            "images/cars/toyota-prado/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS","toit panoramique" , "Caméra 360", "Son Harman Kardon"],
        available: true,
        rating: 4.9,
        reviews: 543
    },
    {
        id: "car-0027",
        name: "Toyota TX",
        brand: "Toyota",
        year: 2019,
        fuel: "Diesel",
        transmission: "Manuelle",
        seats: 7,
        pricePerDay: 1800,
        category: "SUV Premium",
        image: "images/cars/toyota-TX/main.webp",
        images: [
            "images/cars/toyota-TX/main.webp",
            "images/cars/toyota-TX/1.png",
            "images/cars/toyota-TX /2.png",
            "images/cars/toyota-TX/3.png  ",
            "images/cars/toyota-TX/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS","toit panoramique" , "Caméra 360", "Son Harman Kardon"],
        available: true,
        rating: 4.7,
        reviews: 321
    },
    
    {
        id: "car-0029",
        name: "Audi A3 S line",
        brand: "Audi",
        year: 2025,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 1400,
        category: " SUV Premium",
        image: "images/cars/audi-a3/main.webp",
        images: [
            "images/cars/audi-a3/main.webp",
            "images/cars/audi-a3/1.png",
            "images/cars/audi-a3/2.png",
            "images/cars/audi-a3/3.png  ",
            "images/cars/audi-a3/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS","toit panoramique" , "Caméra 360", "Son Harman Kardon"],
        available: true,
        rating: 5,
        reviews: 511
    },
    {
        id: "car-0030",
        name: "Audi Q3",
        brand: "Audi",
        year: 2025,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 1400,
        category: " SUV Premium",
        image: "images/cars/audi-Q3/main.webp",
        images: [
            "images/cars/audi-Q3/main.webp",
            "images/cars/audi-Q3/1.png",
            "images/cars/audi-Q3/2.png",
            "images/cars/audi-Q3/3.png  ",
            "images/cars/audi-Q3/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS","toit panoramique" , "Caméra 360", "Son Harman Kardon"],
        available: true,
        rating: 5,
        reviews: 511
    },
    {
        id: "car-0031",
        name: "Porsche Macan",
        brand: "Porsche",
        year: 2025,
        fuel: "Essence",
        transmission: "Automatique",
        seats: 5,
        pricePerDay: 1500,
        category: " SUV Premium",
        image: "images/cars/porsche/macan.webp",
        images: [
            "images/cars/porsche/macan.webp",
            "images/cars/porsche/1.png",
            "images/cars/porsche/2.png",
            "images/cars/porsche/3.png  ",
            "images/cars/porsche/4.png"
        ],
        features: ["Climatisation", "Bluetooth", "GPS","toit panoramique" , "Caméra 360", "Son Harman Kardon"],
        available: true,
        rating: 5,
        reviews: 511
    },
    
    



];

/* ============================================
   MAISONS / VILLAS
   ============================================ */
const HOUSES = [
    {
        id: "house-001",
        name: "Villa Prestigia Topaze",
        location: "Marrakech",
        pricePerNight: 1800,
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        floors: 2,
        elevator: true,
        pool: true,
        wifi: true,
        ac: true,
        kitchen: true,
        garden: true,
        parking: true,
        terrace: true,
        tv: true,
        description: "Villa haut standing de 2 étages avec ascenseur. 3 chambres spacieuses, salon moderne et salon marocain traditionnel. Grande terrasse avec vue sur la piscine. Climatisation, Wi-Fi et parking privé. Une expérience de luxe au cœur de Marrakech.",
        image: "images/houses/prestigia/5.jpg",
        images: [
            "images/houses/prestigia/5.jpg",
            "images/houses/prestigia/1.jpg",
            "images/houses/prestigia/2.jpg",
            "images/houses/prestigia/3.jpg",
            "images/houses/prestigia/4.jpg"
        ],
        features: ["2 étages avec ascenseur", "3 chambres", "Salon moderne", "Salon marocain", "Grande terrasse", "Vue piscine", "Climatisation", "Wi-Fi", "Parking privé"],
        rating: 4.5,
        reviews: 440,
        available: true
    },
    {
        id: "house-002",
        name: "Villa Route d'Amezmiz",
        location: "Route d'Amezmiz, Marrakech",
        pricePerNight: 9000,
        bedrooms: 5,
        bathrooms: 4,
        maxGuests: 10,
        floors: 1,
        elevator: false,
        pool: true,
        wifi: true,
        ac: true,
        kitchen: true,
        garden: true,
        parking: true,
        terrace: true,
        tv: true,
        description: "Villa de luxe située sur la Route d'Amezmiz. 5 chambres élégantes, grande piscine privée et jardin paysager. Salon moderne, cuisine équipée, climatisation, Wi-Fi et parking privé. L'élégance du luxe marocain dans un cadre exceptionnel.",
        image: "images/houses/amezmiz/main.jpg",
        images: [
            "images/houses/amezmiz/main.jpg",
            "images/houses/amezmiz/1.jpg",
            "images/houses/amezmiz/2.jpg",
            "images/houses/amezmiz/3.jpg",
            "images/houses/amezmiz/4.jpg"
        ],
        features: ["5 chambres", "Villa de luxe", "Grande piscine privée", "Grand jardin", "Salon moderne", "Cuisine équipée", "Climatisation", "Wi-Fi", "Parking privé"],
        rating: 5.0,
        reviews: 680,
        available: true
    },
    {
        id: "house-003",
        name: "Appartement Guéliz",
        location: "Guéliz, Marrakech",
        pricePerNight: 600,
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        floors: 1,
        elevator: false,
        pool: false,
        wifi: true,
        ac: true,
        kitchen: true,
        garden: true,
        parking: true,
        terrace: true,
        tv: true,
        description: "Appartement moderne au quartier de Guéliz. 1 chambre, salon, cuisine équipée, télévision et Wi-Fi. Idéal pour un séjour à Marrakech à prix accessible.",
        image: "images/houses/gueliz/main.jpg",
        images: [
            "images/houses/gueliz/main.jpg",
            "images/houses/gueliz/1.jpg",
            "images/houses/gueliz/2.jpg"
        ],
        features: ["1 chambre", "Salon", "Cuisine équipée", "Télévision", "Wi-Fi", "Appartement moderne"],
        rating: 4.5,
        reviews: 240,
        available: true
    }
];

/* ============================================
   EXCURSIONS
   ============================================ */
const EXCURSIONS = [
    /* --- MARRAKECH --- */
    {
        id: "exc-001",
        name: "Désert d'Agafay",
        city: "Marrakech",
        duration: "Demi-journée",
        durationHours: 4,
        price: 350,
        difficulty: "Facile",
        image: "images/excursions/desert-agafay/main.webp",
        images: [
            "images/excursions/desert-agafay/main.webp",
            "images/excursions/desert-agafay/1.jpg",
            "images/excursions/desert-agafay/2.jpg",
            "images/excursions/desert-agafay/3.jpg",
            "images/excursions/desert-agafay/4.jpg"
        ],
        description: "Découvrez les paysages lunaires du désert d'Agafay, à seulement 40 minutes de Marrakech. Balade en quad, dromadaire ou promenade calme au coucher du soleil.",
        program: [
            { time: "08:00", activity: "Départ de votre hôtel à Marrakech" },
            { time: "08:45", activity: "Arrivée au désert d'Agafay" },
            { time: "09:00", activity: "Balade en dromadaire dans les paysages rocheux" },
            { time: "10:30", activity: "Pause thé et pâtisseries dans un bivouac" },
            { time: "11:00", activity: "Activité au choix : quad ou promenade" },
            { time: "12:30", activity: "Déjeuner traditionnel marocain (optionnel)" },
            { time: "13:00", activity: "Retour à Marrakech" }
        ],
        included: ["Transport ", "Guide francophone", "Dromadaire", "Thé"],
        notIncluded: ["Déjeuner", "Quad (optionnel +20 € )", "Boissons"],
        rating: 4.9,
        reviews: 428,
        available: true
    },
    
    {
        id: "exc-002",
        name: "Atlas & Cascades d'Ouzoud",
        city: "Marrakech",
        duration: "Journée complète",
        durationHours: 10,
        price: 550,
        difficulty: "Modéré",
        image: "images/excursions/atlas-ouzoud/main.jpg",
        images: [
            "images/excursions/atlas-ouzoud/main.jpg",
            "images/excursions/atlas-ouzoud/1.jpg",
            "images/excursions/atlas-ouzoud/2.jpg",
            "images/excursions/atlas-ouzoud/3.jpg",
            "images/excursions/atlas-ouzoud/4.jpg"
        ],
        description: "Journée inoubliable dans l'Atlas marocain avec visite des magnifiques Cascades d'Ouzoud, les plus hautes du Maroc.",
        program: [
            { time: "07:00", activity: "Départ de Marrakech" },
            { time: "09:30", activity: "Arrêt dans un village berbère de l'Atlas" },
            { time: "11:00", activity: "Arrivée aux Cascades d'Ouzoud" },
            { time: "11:30", activity: "Randonnée autour des cascades" },
            { time: "13:00", activity: "Déjeuner avec vue" },
            { time: "15:00", activity: "Observation des singes et baignade" },
            { time: "17:00", activity: "Retour à Marrakech" }
        ],
        included: ["Transport ", "Guide", "Randonnée"],
        notIncluded: ["Déjeuner"],
        rating: 4.9,
        reviews: 459,
        available: true
    },
    
];

/* ============================================
   TRANSFERTS PRIVÉS (Mercedes Vito)
   Même structure que les excursions
   ============================================ */
const TRANSFERS = [
    /* --- MARRAKECH : AÉROPORT --- */
    {
        id: "trf-001",
        name: "Aéroport Menara → Hôtel / Riad / Villa",
        city: "Marrakech",
        duration: "≈ 30 min",
        durationHours: 1,
        price: 500,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/airport-arrival/main.png",
        images: [
            "images/transfers/airport-arrival/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito depuis l'aéroport Marrakech Menara vers votre hôtel, riad ou villa à Marrakech. Accueil avec pancarte et prise en charge immédiate.",
        program: [
            { time: "00:00", activity: "Accueil à l'aéroport Marrakech Menara avec pancarte" },
            { time: "00:10", activity: "Installation des bagages à bord de la Mercedes Vito" },
            { time: "00:15", activity: "Départ vers votre hôtel, riad ou villa" },
            { time: "00:45", activity: "Arrivée et dépose à votre hébergement à Marrakech" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Pancarte à l'aéroport"],
        notIncluded: ["Péages", "Attente supplémentaire"],
        rating: 4.9,
        reviews: 412,
        available: true
    },
    {
        id: "trf-002",
        name: "Hôtel / Riad / Villa → Aéroport Menara",
        city: "Marrakech",
        duration: "≈ 30 min",
        durationHours: 1,
        price: 500,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/airport-departure/main.png",
        images: [
            "images/transfers/airport-departure/main.png",
           
        ],
        description: "Transfert privé en Mercedes Vito depuis votre hôtel, riad ou villa à Marrakech vers l'aéroport Marrakech Menara. Ponctualité garantie pour votre vol.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre hôtel, riad ou villa" },
            { time: "00:10", activity: "Installation des bagages à bord de la Mercedes Vito" },
            { time: "00:15", activity: "Départ vers l'aéroport Marrakech Menara" },
            { time: "00:45", activity: "Arrivée et dépose au terminal de l'aéroport" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Ponctualité garantie"],
        notIncluded: ["Péages", "Attente supplémentaire"],
        rating: 4.9,
        reviews: 389,
        available: true
    },

    /* --- MARRAKECH → CASABLANCA --- */
    {
        id: "trf-003",
        name: "Marrakech → Casablanca Centre-ville",
        city: "Casablanca",
        duration: "≈ 3h",
        durationHours: 3,
        price: 2500,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/casablanca/main.png",
        images: [
            "images/transfers/casablanca/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers le centre-ville de Casablanca. Confort et discrétion sur la route, trajet direct sans escale.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:30", activity: "Sortie de Marrakech vers l'autoroute A3" },
            { time: "02:30", activity: "Traversée des plaines de la Chaouia" },
            { time: "03:00", activity: "Arrivée au centre-ville de Casablanca" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.8,
        reviews: 276,
        available: true
    },
    {
        id: "trf-004",
        name: "Marrakech → Aéroport Mohammed V",
        city: "Casablanca",
        duration: "≈ 3h",
        durationHours: 3,
        price: 2000,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/casablanca-airport/main.png",
        images: [
            "images/transfers/casablanca-airport/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers l'aéroport international Mohammed V de Casablanca. Départ à l'heure convenue, sans aucun stress.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:30", activity: "Départ sur l'autoroute A3" },
            { time: "02:30", activity: "Approche de l'aéroport Mohammed V" },
            { time: "03:00", activity: "Dépose au terminal de départ" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Ponctualité garantie"],
        notIncluded: ["Péages", "Attente supplémentaire"],
        rating: 4.8,
        reviews: 244,
        available: true
    },

    /* --- MARRAKECH → VILLES --- */
    {
        id: "trf-005",
        name: "Marrakech → Rabat",
        city: "Rabat",
        duration: "≈ 3h30",
        durationHours: 4,
        price: 3500,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/rabat/main.png",
        images: [
            "images/transfers/rabat/main.png",
           
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers la capitale Rabat. Confort optimal pour un trajet long, avec chauffeur expérimenté.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:30", activity: "Départ sur l'autoroute A3 vers Casablanca" },
            { time: "02:30", activity: "Contournement de Casablanca" },
            { time: "03:30", activity: "Arrivée à Rabat, dépose à votre destination" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.8,
        reviews: 198,
        available: true
    },
    {
        id: "trf-006",
        name: "Marrakech → Essaouira",
        city: "Essaouira",
        duration: "≈ 2h30",
        durationHours: 3,
        price: 1500,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/essaouira/main.png",
        images: [
            "images/transfers/essaouira/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers la cité des alizés, Essaouira. Traversée de la forêt d'arganiers dans un confort absolu.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:30", activity: "Traversée de la plaine du Haouz" },
            { time: "01:30", activity: "Forêt d'arganiers et villages berbères" },
            { time: "02:30", activity: "Arrivée à Essaouira" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.9,
        reviews: 331,
        available: true
    },
    {
        id: "trf-007",
        name: "Marrakech → Ouarzazate",
        city: "Ouarzazate",
        duration: "≈ 4h",
        durationHours: 4,
        price: 2500,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/ouarzazate/main.png",
        images: [
            "images/transfers/ouarzazate/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers Ouarzazate, porte du désert. Route spectaculaire du Tizi n'Tichka dans un confort premium.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:30", activity: "Montée vers le col du Tizi n'Tichka" },
            { time: "02:00", activity: "Paysages du Haut Atlas" },
            { time: "04:00", activity: "Arrivée à Ouarzazate" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.8,
        reviews: 215,
        available: true
    },
    {
        id: "trf-008",
        name: "Marrakech → Imlil (Atlas)",
        city: "Atlas / Imlil",
        duration: "≈ 1h30",
        durationHours: 2,
        price: 800,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/imlil/main.png",
        images: [
            "images/transfers/imlil/main.png",
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers Imlil, au cœur du Haut Atlas. Vallées verdoyantes et villages de montagne en toute sérénité.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:20", activity: "Départ vers le Haut Atlas" },
            { time: "01:00", activity: "Traversée des villages berbères" },
            { time: "01:30", activity: "Arrivée à Imlil" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.9,
        reviews: 287,
        available: true
    },
    {
        id: "trf-009",
        name: "Marrakech → Désert d'Agafay",
        city: "Agafay",
        duration: "≈ 1h",
        durationHours: 1,
        price: 700,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/agafay/main.png",
        images: [
            "images/transfers/agafay/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers le désert d'Agafay. Paysages lunaires et montagnes de l'Atlas à seulement une heure de route.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:15", activity: "Départ vers les collines d'Agafay" },
            { time: "00:45", activity: "Entrée dans le désert d'Agafay" },
            { time: "01:00", activity: "Arrivée à votre campement ou lodge" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.9,
        reviews: 356,
        available: true
    },
    {
        id: "trf-010",
        name: "Marrakech → Agadir",
        city: "Agadir",
        duration: "≈ 5h",
        durationHours: 5,
        price: 3000,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/agadir/main.png",
        images: [
            "images/transfers/agadir/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers Agadir et sa baie. Long trajet confortable avec un chauffeur professionnel aux petits soins.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:30", activity: "Départ sur l'autoroute A7" },
            { time: "03:00", activity: "Traversée de l'Anti-Atlas et d'Essaouira" },
            { time: "05:00", activity: "Arrivée à Agadir" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.8,
        reviews: 173,
        available: true
    },
    {
        id: "trf-011",
        name: "Marrakech → Fès",
        city: "Fès",
        duration: "≈ 6h",
        durationHours: 6,
        price: 5000,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/fes/main.png",
        images: [
            "images/transfers/fes/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers la cité spirituelle de Fès. Confort premium pour l'un des plus beaux trajets du Maroc.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:30", activity: "Départ sur l'autoroute vers Casablanca" },
            { time: "03:00", activity: "Contournement de Casablanca puis Rabat" },
            { time: "06:00", activity: "Arrivée à Fès" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.9,
        reviews: 302,
        available: true
    },
    {
        id: "trf-012",
        name: "Marrakech → El Jadida",
        city: "El Jadida",
        duration: "≈ 3h",
        durationHours: 3,
        price: 2800,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/el-jadida/main.png",
        images: [
            "images/transfers/el-jadida/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers El Jadida, cité fortifiée de la côte atlantique. Route directe et confort exceptionnel.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:30", activity: "Départ sur l'autoroute A3" },
            { time: "02:30", activity: "Traversée des plaines côtières" },
            { time: "03:00", activity: "Arrivée à El Jadida" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.8,
        reviews: 154,
        available: true
    },
    {
        id: "trf-013",
        name: "Marrakech → Oualidia",
        city: "Oualidia",
        duration: "≈ 3h",
        durationHours: 3,
        price: 2800,
        difficulty: "Confort",
        vehicle: "Mercedes Vito",
        image: "images/transfers/oualidia/main.png",
        images: [
            "images/transfers/oualidia/main.png",
            
        ],
        description: "Transfert privé en Mercedes Vito de Marrakech vers Oualidia, la lagune aux huîtres. Une heure trente de quiétude avant la côte atlantique.",
        program: [
            { time: "00:00", activity: "Prise en charge à votre adresse à Marrakech" },
            { time: "00:30", activity: "Départ sur l'autoroute vers le littoral" },
            { time: "02:30", activity: "Traversée des plaines côtières" },
            { time: "03:00", activity: "Arrivée à Oualidia" }
        ],
        included: ["Chauffeur professionnel", "Mercedes Vito 7 places", "Carburant", "Assurance", "Trajet direct"],
        notIncluded: ["Péages", "Attente sur place"],
        rating: 4.8,
        reviews: 141,
        available: true
    }
];

/* ============================================
   AVIS CLIENTS
   ============================================ */
const REVIEWS = [
    {
        name: "Sophie M.",
        location: "Paris, France",
        rating: 5,
        text: "Service exceptionnel ! La Mercedes était impeccable et le transfert à l'aéroport parfait. Je recommande vivement VelaroCar pour un séjour à Marrakech.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        service: "Location Voiture"
    },
    {
        name: "Abdelilah A.",
        location: "Marrakech, Maroc",
        rating: 5,
        text: "Service exceptionnel ! J'ai réservé une voiture avec une excursion à Ouzoud et tout était parfaitement organisé. Véhicule très propre, chauffeur ponctuel et équipe toujours disponible sur WhatsApp. Franchement, je recommande à 100 % pour toute personne qui visite Marrakech.",
        avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tbWV8ZW58MHx8MHx8fDA%3D",
        service: "Location Voiture + Excursion"
    },
    {
        name: "Marie-Claire D.",
        location: "Bruxelles, Belgique",
        rating: 5,
        text: "L'excursion dans le Sahara était un rêve devenu réalité. Le bivouac sous les étoiles, le lever de soleil sur les dunes... inoubliable !",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        service: "Excursion Sahara"
    },
    {
        name: "Jean-Pierre L.",
        location: "Lyon, France",
        rating: 4,
        text: "Très bon service, moto en parfait état, prix raisonnables. Le seul petit bémol : j'aurais aimé un casque neuf. Mais dans l'ensemble, je suis satisfait.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
        service: "Location Moto"
    },
    {
        name: "Fatima Z.",
        location: "Rabat, Maroc",
        rating: 5,
        text: "Le Riad dans la médina était un vrai coup de cœur. Architecture magnifique, petit-déjeuner délicieux, personnel aux petits soins. Merci VelaroCar !",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
        service: "Location Maison"
    },
    {
        name: "Ahmed B.",
        location: "Casablanca, Maroc",
        rating: 5,
        text: "La villa de la Palmeraie était magnifique. Piscine, jardin, tout était parfait. L'équipe était très réactive et professionnelle.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        service: "Location Villa"
    },
];


/* ============================================
   FAQ
   ============================================ */
const FAQ = [
    {
        question: "Quels documents sont nécessaires pour louer un véhicule ?",
        answer: "Vous devez présenter un permis de conduire valide, une pièce d'identité ou un passeport, et une carte bancaire pour la caution."
    },
    {
        question: "La livraison à l'hôtel est-elle possible ?",
        answer: "Oui, nous offrons la livraison et le retrait gratuits à votre hôtel, riad ou à l'aéroport de Marrakech."
    },
    {
        question: "Quelle est la politique d'annulation ?",
        answer: "Annulation gratuite jusqu'à 48h avant la date de réservation. Au-delà, des frais de 30% seront appliqués."
    },
    {
        question: "Les véhicules sont-ils assurés ?",
        answer: "Oui, tous nos véhicules sont couverts par une assurance tous risques avec franchise. Une assurance premium sans franchise est disponible en option."
    },
    {
        question: "Puis-je louer un véhicule pour plusieurs villes ?",
        answer: "Absolument ! Nous proposons des forfaits multi-villes avec des tarifs avantageux. Contactez-nous pour un devis personnalisé."
    },
    {
        question: "Comment fonctionne le paiement ?",
        answer: "Nous acceptons les cartes bancaires, les virements et le paiement en espèces. Un acompte de 30% est requis à la réservation."
    },
    {
        question: "Les excursions incluent-elles le transport ?",
        answer: "La plupart de nos excursions incluent le transport A/R depuis votre hébergement à Marrakech. Vérifiez les détails de chaque excursion."
    },
    {
        question: "Puis-je modifier ma réservation ?",
        answer: "Oui, vous pouvez modifier votre réservation jusqu'à 24h avant la date prévue, sous réserve de disponibilité."
    }
];

/* ============================================
   DONNÉES ADMIN (par défaut)
   ============================================ */
const DEFAULT_ADMIN = {
    email: "admin@velarocar.com",
    password: "admin123",
    name: "VelaroCar Admin"
};

/* ============================================
   HELPER FUNCTIONS
   ============================================ */
function formatPrice(price) {
    return Math.round(price / 10.2).toLocaleString('fr-FR') + ' €';
}

function generateId() {
    return 'RES-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function getStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
}

function calculateDays(start, end) {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
}

function getReservationData() {
    const data = localStorage.getItem('velarocar_reservations');
    return data ? JSON.parse(data) : [];
}

function saveReservationData(data) {
    localStorage.setItem('velarocar_reservations', JSON.stringify(data));
}

function getFavorites() {
    const data = localStorage.getItem('velarocar_favorites');
    return data ? JSON.parse(data) : [];
}

function saveFavorites(favs) {
    localStorage.setItem('velarocar_favorites', JSON.stringify(favs));
}

function getUserData() {
    const data = localStorage.getItem('velarocar_user');
    return data ? JSON.parse(data) : null;
}

function saveUserData(data) {
    localStorage.setItem('velarocar_user', JSON.stringify(data));
}
