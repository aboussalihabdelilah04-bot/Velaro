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
        image: "images/cars/dacia-logan/main.png",
        images: [
            "images/cars/dacia-logan/main.png",
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
        image: "images/cars/renault-megan/main.png",
        images: [
            "images/cars/renault-megan/main.png",
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
        image: "images/cars/peugeot-208/main.png",
        images: [
            "images/cars/peugeot-208/main.png",
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
        image: "images/cars/volkswagen-golf/main.png",
        images: [
            "images/cars/volkswagen-golf/main.png",
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
        image: "images/cars/mercedes-classe-c/main.png",
        images: [
            "images/cars/mercedes-classe-c/main.png",
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
        image: "images/cars/dacia-sandero-stepway/main.png",
        images: [
            "images/cars/dacia-sandero-stepway/main.png",
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
        image: "images/cars/range-rover-evoque/main.png",
        images: [
            "images/cars/range-rover-evoque/main.png",
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
        image: "images/cars/hyundai-accent/main.png",
        images: [
            "images/cars/hyundai-accent/main.png",
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
        image: "images/cars/hyundai-tucson/main.png",
        images: [
            "images/cars/hyundai-tucson/main.png",
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
        image: "images/cars/kia-sportage/main.png",
        images: [
            "images/cars/kia-sportage/main.png",
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
        image: "images/cars/volkswagen-t-roc/main.png",
        images: [
            "images/cars/volkswagen-t-roc/main.png",
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
        image: "images/cars/fiat-500/main.png",
        images: [
            "images/cars/fiat-500/main.png",
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
        image: "images/cars/dacia-jogger/main.png",
        images: [
            "images/cars/dacia-jogger/main.png",
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
        image: "images/cars/dacia-sandero/main.png",
        images: [
            "images/cars/dacia-sandero/main.png",
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
        image: "images/cars/hyundai-staria/main.png",
        images: [
            "images/cars/hyundai-staria/main.png",
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
        image: "images/cars/renault-clio5/2024.png",
        images: [
            "images/cars/renault-clio5/2024.png",
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
        image: "images/cars/renault-clio5/2025.png",
        images: [
            "images/cars/renault-clio5/2025.png",
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
        image: "images/cars/renault-arkana/main.png",
        images: [
            "images/cars/renault-arkana/main.png",
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
        image: "images/cars/renault-clio5-alpine/main.png",
        images: [
            "images/cars/renault-clio5-alpine/main.png",
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
        image: "images/cars/peugeot-3008/main.png",
        images: [
            "images/cars/peugeot-3008/main.png",
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
        image: "images/cars/kia-picanto/main.png",
        images: [
            "images/cars/kia-picanto/main.png",
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
        image: "images/cars/volkswagen-golf/8.png",
        images: [
            "images/cars/volkswagen-golf/8.png",
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
        image: "images/cars/toyota-prado/main.png",
        images: [
            "images/cars/toyota-prado/main.png",
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
        image: "images/cars/toyota-TX/main.png",
        images: [
            "images/cars/toyota-TX/main.png",
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
        image: "images/cars/audi-a3/main.png",
        images: [
            "images/cars/audi-a3/main.png",
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
        image: "images/cars/audi-Q3/main.png",
        images: [
            "images/cars/audi-Q3/main.png",
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
        image: "images/cars/porsche/macan.png",
        images: [
            "images/cars/porsche/macan.png",
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
        image: "images/excursions/desert-agafay/main.jpg",
        images: [
            "images/excursions/desert-agafay/main.jpg",
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
        notIncluded: ["Déjeuner", "Quad (optionnel +200 DH )", "Boissons"],
        rating: 4.7,
        reviews: 128,
        available: true
    },
    {
        id: "exc-002",
        name: "Vallée de l'Ourika",
        city: "Marrakech",
        duration: "Journée complète",
        durationHours: 8,
        price: 450,
        difficulty: "Modéré",
        image: "images/excursions/vallee-ourika/main.jpg",
        images: [
            "images/excursions/vallee-ourika/main.jpg",
            "images/excursions/vallee-ourika/1.jpg",
            "images/excursions/vallee-ourika/2.jpg",
            "images/excursions/vallee-ourika/3.jpg",
            "images/excursions/vallee-ourika/4.jpg"
        ],
        description: "Escapade dans la magnifique vallée de l'Ourika, nichée dans l'Atlas. Visite de villages berbères, cascades et marchés traditionnels.",
        program: [
            { time: "08:00", activity: "Départ de Marrakech" },
            { time: "09:30", activity: "Arrivée au village d'Ourika" },
            { time: "10:00", activity: "Randonnée vers les cascades" },
            { time: "12:00", activity: "Déjeuner au bord de l'oued" },
            { time: "14:00", activity: "Visite d'un village berbère et musée des saveurs" },
            { time: "16:00", activity: "Temps libre au souk" },
            { time: "17:00", activity: "Retour à Marrakech" }
        ],
        included: ["Transport ", "Guide", "Randonnée"],
        notIncluded: ["Déjeuner"],
        rating: 4.6,
        reviews: 95,
        available: true
    },
    {
        id: "exc-003",
        name: "Jardin Majorelle & Palais Bahia",
        city: "Marrakech",
        duration: "Demi-journée",
        durationHours: 4,
        price: 250,
        difficulty: "Facile",
        image: "images/excursions/jardin-majorelle/main.jpg",
        images: [
            "images/excursions/jardin-majorelle/main.jpg",
            "images/excursions/jardin-majorelle/1.jpg",
            "images/excursions/jardin-majorelle/2.jpg",
            "images/excursions/jardin-majorelle/3.jpg",
            "images/excursions/jardin-majorelle/4.jpg"
        ],
        description: "Visitez le mythique Jardin Majorelle et le magnifique Palais Bahia, deux joyaux architecturaux de Marrakech.",
        program: [
            { time: "09:00", activity: "Visite du Jardin Majorelle et Musée Yves Saint Laurent" },
            { time: "11:00", activity: "Traversée de la médina" },
            { time: "11:30", activity: "Visite du Palais Bahia" },
            { time: "13:00", activity: "Fin de la visite" }
        ],
        included: ["Transport","Guide", "Entrées"],
        notIncluded: [ "Déjeuner"],
        rating: 4.8,
        reviews: 210,
        available: true
    },
    {
        id: "exc-004",
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
        rating: 4.7,
        reviews: 87,
        available: true
    },
    /* --- ESSAOUIRA --- */
    {
        id: "exc-005",
        name: "Essaouira - Port & Médina",
        city: "Essaouira",
        duration: "Journée complète",
        durationHours: 10,
        price: 600,
        difficulty: "Facile",
        image: "images/excursions/essaouira-port/main.jpg",
        images: [
            "images/excursions/essaouira-port/main.jpg",
            "images/excursions/essaouira-port/1.jpg",
            "images/excursions/essaouira-port/2.jpg",
            "images/excursions/essaouira-port/3.jpg",
            "images/excursions/essaouira-port/4.jpg"
        ],
        description: "Excursion à Essaouira, la perle de l'Atlantique. Découvrez sa médina classée UNESCO, son port de pêche coloré et ses plages de sable.",
        program: [
            { time: "07:00", activity: "Départ de Marrakech" },
            { time: "10:00", activity: "Arrivée à Essaouira" },
            { time: "10:30", activity: "Visite de la médina et ramparts" },
            { time: "12:30", activity: "Déjeuner de fruits de mer au port" },
            { time: "14:00", activity: "Balade sur la plage et temps libre" },
            { time: "16:00", activity: "Visite des ateliers d'artisans" },
            { time: "17:00", activity: "Retour à Marrakech" }
        ],
        included: ["Transport ", "Guide"],
        notIncluded: ["Déjeuner", ],
        rating: 4.8,
        reviews: 156,
        available: true
    },
    {
        id: "exc-006",
        name: "Essaouira - Balade en Quad",
        city: "Essaouira",
        duration: "Demi-journée",
        durationHours: 4,
        price: 500,
        difficulty: "Modéré",
        image: "images/excursions/essaouira-quad/main.jpeg",
        images: [
            "images/excursions/essaouira-quad/main.jpeg",
            "images/excursions/essaouira-quad/1.jpg",
            "images/excursions/essaouira-quad/2.jpg",
            "images/excursions/essaouira-quad/3.jpg",
            "images/excursions/essaouira-quad/4.jpg"
        ],
        description: "Aventure en quad sur les dunes et pistes côtières autour d'Essaouira. Adrénaline garantie !",
        program: [
            { time: "09:00", activity: "Briefing sécurité et prise en main du quad" },
            { time: "09:30", activity: "Départ en piste vers les dunes" },
            { time: "11:00", activity: "Pause au bord de la mer" },
            { time: "12:00", activity: "Retour et fin de l'activité" }
        ],
        included: ["Transport","Quad", "Casque", "Guide", "Assurance"],
        notIncluded: [],
        rating: 4.6,
        reviews: 64,
        available: true
    },
    {
        id: "exc-007",
        name: "Essaouira - Balade à Cheval",
        city: "Essaouira",
        duration: "Demi-journée",
        durationHours: 3,
        price: 400,
        difficulty: "Facile",
        image: "images/excursions/essaouira-cheval/main.jpg",
        images: [
            "images/excursions/essaouira-cheval/main.jpg",
            "images/excursions/essaouira-cheval/1.jpg",
            "images/excursions/essaouira-cheval/2.jpg",
            "images/excursions/essaouira-cheval/3.jpg",
            "images/excursions/essaouira-cheval/4.jpg"
        ],
        description: "Promenade à cheval sur la plage d'Essaouira au coucher du soleil. Une expérience magique et romantique.",
        program: [
            { time: "16:00", activity: "Accueil et choix du cheval" },
            { time: "16:30", activity: "Départ sur la plage" },
            { time: "17:30", activity: "Promenade le long de l'océan" },
            { time: "18:30", activity: "Coucher de soleil et retour" }
        ],
        included: ["Cheval","Transport", "Guide", "Casque"],
        notIncluded: [],
        rating: 4.9,
        reviews: 78,
        available: true
    },
    /* --- OUARZAZATE --- */
    {
        id: "exc-008",
        name: "Ouarzazate & Aït Ben Haddou",
        city: "Ouarzazate",
        duration: "Journée complète",
        durationHours: 12,
        price: 700,
        difficulty: "Facile",
        image: "images/excursions/ouarzazate-ait-ben-haddou/main.jpg",
        images: [
            "images/excursions/ouarzazate-ait-ben-haddou/main.jpg",
            "images/excursions/ouarzazate-ait-ben-haddou/1.jpg",
            "images/excursions/ouarzazate-ait-ben-haddou/2.jpg",
            "images/excursions/ouarzazate-ait-ben-haddou/3.jpg",
            "images/excursions/ouarzazate-ait-ben-haddou/4.jpg"
        ],
        description: "Excursion aux portes du Sahara. Visite de la kasbah d'Aït Ben Haddou (UNESCO) et des studios de cinéma d'Ouarzazate.",
        program: [
            { time: "06:00", activity: "Départ de Marrakech" },
            { time: "09:00", activity: "Traversée du col du Tizi n'Tichka (2260m)" },
            { time: "11:00", activity: "Visite d'Aït Ben Haddou" },
            { time: "13:00", activity: "Déjeuner" },
            { time: "14:30", activity: "Visite des Studios Atlas (Game of Thrones)" },
            { time: "16:00", activity: "Visite de la Kasbah de Taourirt" },
            { time: "17:00", activity: "Retour à Marrakech" }
        ],
        included: ["Transport ", "Guide", "Entrées"],
        notIncluded: ["Déjeuner"],
        rating: 4.8,
        reviews: 112,
        available: true
    },
    /* --- AGADIR --- */
    {
        id: "exc-009",
        name: "Agadir - Crocoparc & Marina",
        city: "Agadir",
        duration: "Journée complète",
        durationHours: 10,
        price: 650,
        difficulty: "Facile",
        image: "images/excursions/agadir-crocoparc/main.jpg",
        images: [
            "images/excursions/agadir-crocoparc/main.jpg",
            "images/excursions/agadir-crocoparc/1.jpg",
            "images/excursions/agadir-crocoparc/2.jpg",
            "images/excursions/agadir-crocoparc/3.jpg",
            "images/excursions/agadir-crocoparc/4.jpg"
        ],
        description: "Découvrez Agadir : Crocoparc, Marina, Corniche et vue panoramique depuis le Kasbah.",
        program: [
            { time: "07:00", activity: "Départ de Marrakech" },
            { time: "10:00", activity: "Arrivée à Agadir - Visite du Crocoparc" },
            { time: "12:00", activity: "Balade à la Marina" },
            { time: "13:00", activity: "Déjeuner sur la Corniche" },
            { time: "14:30", activity: "Montée à la Kasbah - Vue panoramique" },
            { time: "16:00", activity: "Plage libre" },
            { time: "17:30", activity: "Retour à Marrakech" }
        ],
        included: ["Transport", "Guide", "Entrée Crocoparc"],
        notIncluded: ["Déjeuner"],
        rating: 4.5,
        reviews: 73,
        available: true
    },
    {
        id: "exc-010",
        name: "Paradise Valley & Agadir",
        city: "Agadir",
        duration: "Journée complète",
        durationHours: 10,
        price: 550,
        difficulty: "Modéré",
        image: "images/excursions/paradise-valley/main.jpg",
        images: [
            "images/excursions/paradise-valley/main.jpg",
            "images/excursions/paradise-valley/1.jpg",
            "images/excursions/paradise-valley/2.jpg",
            "images/excursions/paradise-valley/3.jpg",
            "images/excursions/paradise-valley/4.jpg"
        ],
        description: "Randonnée dans le paradis secret de l'Atlas marocain. Piscines naturelles, cascades et paysages verdoyants.",
        program: [
            { time: "07:00", activity: "Départ de Marrakech" },
            { time: "09:30", activity: "Traversée de l'Anti-Atlas" },
            { time: "11:00", activity: "Début de la randonnée" },
            { time: "12:30", activity: "Baignade dans les piscines naturelles" },
            { time: "13:30", activity: "Déjeuner pique-nique" },
            { time: "15:00", activity: "Suite de la randonnée" },
            { time: "17:00", activity: "Retour à Marrakech" }
        ],
        included: ["Transport ", "Guide randonnée", "Déjeuner picnic"],
        notIncluded: ["Boissons"],
        rating: 4.7,
        reviews: 58,
        available: true
    },
    /* --- MERZOUGA --- */
    {
        id: "exc-011",
        name: "Dunes de Merzouga - Nuit en Bivouac",
        city: "Merzouga",
        duration: "2 jours / 1 nuit",
        durationHours: 36,
        price: 1800,
        difficulty: "Modéré",
        image: "images/excursions/dunes-merzouga/main.jpg",
        images: [
            "images/excursions/dunes-merzouga/main.jpg",
            "images/excursions/dunes-merzouga/1.jpg",
            "images/excursions/dunes-merzouga/2.jpg",
            "images/excursions/dunes-merzouga/3.jpg",
            "images/excursions/dunes-merzouga/4.jpg"
        ],
        description: "Aventure totale dans les dunes de l'Erg Chebbi. Balade en dromadaire, nuit en bivouac sous les étoiles et lever de soleil magique.",
        program: [
            { time: "J1 06:00", activity: "Départ de Marrakech" },
            { time: "J1 12:00", activity: "Arrivée à Erfoud - déjeuner" },
            { time: "J1 15:00", activity: "Visite des ksour et fossiles" },
            { time: "J1 16:30", activity: "Balade en dromadaire vers les dunes" },
            { time: "J1 18:00", activity: "Coucher de soleil sur les dunes" },
            { time: "J1 20:00", activity: "Dîner et soirée musicale au bivouac" },
            { time: "J2 05:30", activity: "Lever de soleil sur les dunes" },
            { time: "J2 08:00", activity: "Petit-déjeuner et retour" }
        ],
        included: ["Transport", "Dromadaire", "Bivouac","Boissons", "Dîner + Petit-déj", "Guide"],
        notIncluded: ["Déjeuner J1"],
        rating: 4.9,
        reviews: 203,
        available: true
    },
    {
        id: "exc-012",
        name: "Merzouga - Quad dans les Dunes",
        city: "Merzouga",
        duration: "Demi-journée",
        durationHours: 3,
        price: 600,
        difficulty: "Modéré",
        image: "images/excursions/merzouga-quad/main.jpg",
        images: [
            "images/excursions/merzouga-quad/main.jpg",
            "images/excursions/merzouga-quad/1.jpg",
            "images/excursions/merzouga-quad/2.jpg",
            "images/excursions/merzouga-quad/3.jpg",
            "images/excursions/merzouga-quad/4.jpg"
        ],
        description: "Conduisez un quad à travers les dunes dorées de l'Erg Chebbi. Une aventure palpitante au cœur du Sahara.",
        program: [
            { time: "08:00", activity: "Briefing et prise en main du quad" },
            { time: "08:30", activity: "Départ en piste vers les dunes" },
            { time: "10:00", activity: "Pause au milieu des dunes" },
            { time: "11:00", activity: "Retour" }
        ],
        included: ["Transport", "Quad", "Casque", "Guide", "Assurance"],
        notIncluded: [""],
        rating: 4.7,
        reviews: 45,
        available: true
    },
    /* --- CHEFCHAOUEN --- */
    {
        id: "exc-013",
        name: "Chefchaouen - La Ville Bleue",
        city: "Chefchaouen",
        duration: "Journée complète",
        durationHours: 12,
        price: 800,
        difficulty: "Facile",
        image: "images/excursions/chefchaouen/main.jpg",
        images: [
            "images/excursions/chefchaouen/main.jpg",
            "images/excursions/chefchaouen/1.jpg",
            "images/excursions/chefchaouen/2.jpg",
            "images/excursions/chefchaouen/3.jpg",
            "images/excursions/chefchaouen/4.jpg"
        ],
        description: "Explorez Chefchaouen, la perle bleue du Maroc. Ruelle fleuries, artisans et panoramas exceptionnels.",
        program: [
            { time: "06:00", activity: "Départ de Marrakech" },
            { time: "11:00", activity: "Arrivée à Chefchaouen" },
            { time: "11:30", activity: "Visite de la médina bleue" },
            { time: "13:00", activity: "Déjeuner local" },
            { time: "14:30", activity: "Randonnée vers le Ras El Maa" },
            { time: "16:00", activity: "Place Outa el Hammam et mosquée" },
            { time: "17:30", activity: "Retour" }
        ],
        included: ["Transport", "Guide"],
        notIncluded: ["Déjeuner"],
        rating: 4.8,
        reviews: 89,
        available: true
    },
    /* --- FÈS --- */
    {
        id: "exc-014",
        name: "Fès - Médina & Tanneries",
        city: "Fès",
        duration: "Journée complète",
        durationHours: 12,
        price: 850,
        difficulty: "Modéré",
        image: "images/excursions/fes-medina/main.jpg",
        images: [
            "images/excursions/fes-medina/main.jpg",
            "images/excursions/fes-medina/1.jpg",
            "images/excursions/fes-medina/2.jpg",
            "images/excursions/fes-medina/3.jpg",
            "images/excursions/fes-medina/4.jpg"
        ],
        description: "Découvrez Fès el Bali, la plus grande zone piétonne au monde. Tanneries, fondouks, mosquées et artisanat d'exception.",
        program: [
            { time: "06:00", activity: "Départ de Marrakech" },
            { time: "11:00", activity: "Arrivée à Fès" },
            { time: "11:30", activity: "Visite de la médersa Bou Inania" },
            { time: "12:30", activity: "Balade dans les ruelles de la médina" },
            { time: "13:30", activity: "Déjeuner traditionnel" },
            { time: "15:00", activity: "Visite des Tanneries Chouara" },
            { time: "16:30", activity: "Université Al Quaraouiyine" },
            { time: "17:30", activity: "Retour" }
        ],
        included: ["Transport ", "Guide"],
        notIncluded: ["Déjeuner", ],
        rating: 4.8,
        reviews: 134,
        available: true
    },
    /* --- TANGER --- */
    {
        id: "exc-015",
        name: "Tanger - Cap Spartel & Hercules",
        city: "Tanger",
        duration: "Journée complète",
        durationHours: 12,
        price: 750,
        difficulty: "Facile",
        image: "images/excursions/tanger/main.jpg",
        images: [
            "images/excursions/tanger/main.jpg",
            "images/excursions/tanger/1.jpg",
            "images/excursions/tanger/2.jpg",
            "images/excursions/tanger/3.jpg",
            "images/excursions/tanger/4.jpg"
        ],
        description: "Excursion à Tanger, porte de l'Afrique. Cap Spartel, Grottes d'Hercule, médina et views spectaculaires.",
        program: [
            { time: "06:00", activity: "Départ de Marrakech" },
            { time: "10:00", activity: "Arrivée à Tanger" },
            { time: "10:30", activity: "Cap Spartel - jonction Atlantique/Méditerranée" },
            { time: "12:00", activity: "Grottes d'Hercule" },
            { time: "13:00", activity: "Déjeuner avec vue sur le détroit" },
            { time: "14:30", activity: "Visite de la médina et souk" },
            { time: "16:00", activity: "Palais du Dar el-Makhzen" },
            { time: "17:00", activity: "Retour" }
        ],
        included: ["Transport", "Guide"],
        notIncluded: ["Déjeuner"],
        rating: 4.6,
        reviews: 67,
        available: true
    },
    /* --- CASABLANCA --- */
    {
        id: "exc-016",
        name: "Casablanca - Mosquée Hassan II",
        city: "Casablanca",
        duration: "Journée complète",
        durationHours: 10,
        price: 700,
        difficulty: "Facile",
        image: "images/excursions/casablanca/main.jpg",
        images: [
            "images/excursions/casablanca/main.jpg",
            "images/excursions/casablanca/1.jpg",
            "images/excursions/casablanca/2.jpg",
            "images/excursions/casablanca/3.jpg",
            "images/excursions/casablanca/4.jpg"
        ],
        description: "Visitez la plus grande mosquée du Maroc, chef-d'architecture moderne. Corniche Ain Diab et centre-ville Art Déco.",
        program: [
            { time: "07:00", activity: "Départ de Marrakech" },
            { time: "10:00", activity: "Arrivée à Casablanca" },
            { time: "10:30", activity: "Visite de la Mosquée Hassan II" },
            { time: "12:30", activity: "Déjeuner à la Corniche" },
            { time: "14:00", activity: "Place Mohammed V et centre-ville" },
            { time: "15:30", activity: "Quartier Art Déco" },
            { time: "17:00", activity: "Retour" }
        ],
        included: ["Transport ", "Guide", "Entrée Mosquée"],
        notIncluded: ["Déjeuner"],
        rating: 4.7,
        reviews: 98,
        available: true
    },
    /* --- RABAT --- */
    {
        id: "exc-017",
        name: "Rabat - Capitale Royale",
        city: "Rabat",
        duration: "Journée complète",
        durationHours: 11,
        price: 750,
        difficulty: "Facile",
        image: "images/excursions/rabat/main.jpg",
        images: [
            "images/excursions/rabat/main.jpg",
            "images/excursions/rabat/1.jpg",
            "images/excursions/rabat/2.jpg",
            "images/excursions/rabat/3.jpg",
            "images/excursions/rabat/4.jpg"
        ],
        description: "Découvrez la capitale du Maroc : Kasbah des Oudayas, Tour Hassan, Mausolée Mohammed V et Chellah.",
        program: [
            { time: "07:00", activity: "Départ de Marrakech" },
            { time: "10:30", activity: "Arrivée à Rabat" },
            { time: "11:00", activity: "Kasbah des Oudayas" },
            { time: "12:30", activity: "Déjeuner" },
            { time: "14:00", activity: "Tour Hassan et Mausolée Mohammed V" },
            { time: "15:30", activity: "Ruines de la Chellah" },
            { time: "17:00", activity: "Retour" }
        ],
        included: ["Transport", "Guide"],
        notIncluded: ["Déjeuner"],
        rating: 4.6,
        reviews: 54,
        available: true
    },
    /* --- IFRANE --- */
    {
        id: "exc-018",
        name: "Ifrane & Forêt des Cèdres",
        city: "Ifrane",
        duration: "Journée complète",
        durationHours: 11,
        price: 650,
        difficulty: "Facile",
        image: "images/excursions/ifrane/main.jpg",
        images: [
            "images/excursions/ifrane/main.jpg",
            "images/excursions/ifrane/1.jpg",
            "images/excursions/ifrane/2.jpg",
            "images/excursions/ifrane/3.jpg",
            "images/excursions/ifrane/4.jpg"
        ],
        description: "Échappée au « petit Suisse » du Maroc. Forêt de cèdres, singes de l'Atlas et air pur de montagne.",
        program: [
            { time: "07:00", activity: "Départ de Marrakech" },
            { time: "10:00", activity: "Traversée du Moyen Atlas" },
            { time: "11:30", activity: "Forêt des Cèdres - observation des singes" },
            { time: "13:00", activity: "Déjeuner" },
            { time: "14:30", activity: "Visite d'Ifrane" },
            { time: "16:00", activity: "Lac Dayet Aoughem" },
            { time: "17:30", activity: "Retour" }
        ],
        included: ["Transport ", "Guide"],
        notIncluded: ["Déjeuner"],
        rating: 4.7,
        reviews: 42,
        available: true
    },
    /* --- DAKHLA --- */
    {
        id: "exc-019",
        name: "Dakhla - Kitesurf & Lagune",
        city: "Dakhla",
        duration: "2 jours / 1 nuit",
        durationHours: 36,
        price: 2200,
        difficulty: "Modéré",
        image: "images/excursions/dakhla/main.jpg",
        images: [
            "images/excursions/dakhla/main.jpg",
            "images/excursions/dakhla/1.jpg",
            "images/excursions/dakhla/2.jpg",
            "images/excursions/dakhla/3.jpg",
            "images/excursions/dakhla/4.jpg"
        ],
        description: "Séjour à Dakhla, capitale mondiale du kitesurf. Lagune turquoise, sports nautiques et couchers de soleil exceptionnels.",
        program: [
            { time: "J1 07:00", activity: "Vol Marrakech-Dakhla" },
            { time: "J1 11:00", activity: "Installation hôtel" },
            { time: "J1 14:00", activity: "Cours de kitesurf ou balade lagune" },
            { time: "J1 18:00", activity: "Coucher de soleil sur la lagune" },
            { time: "J2 08:00", activity: "Session kitesurf" },
            { time: "J2 12:00", activity: "Déjeuner et retour" }
        ],
        included: ["Vol A/R", "Guide","Hébergement", "Cours kitesurf", "Transferts" , "Repas", "Assurance voyage"],
        notIncluded: [],
        rating: 4.8,
        reviews: 36,
        available: true
    },
    /* --- AL HOCEIMA --- */
    {
        id: "exc-020",
        name: "Al Hoceïma - Méditerranée Marocaine",
        city: "Al Hoceïma",
        duration: "Journée complète",
        durationHours: 11,
        price: 700,
        difficulty: "Facile",
        image: "images/excursions/al-hoceima/main.webp",
        images: [
            "images/excursions/al-hoceima/main.webp",
            "images/excursions/al-hoceima/1.webp",
            "images/excursions/al-hoceima/2.webp",
            "images/excursions/al-hoceima/3.webp",
            "images/excursions/al-hoceima/4.webp"
        ],
        description: "Découvrez la Méditerranée marocaine. Plages cristallines, Parc National du Cap des Trois Fourches.",
        program: [
            { time: "06:00", activity: "Départ de Marrakech" },
            { time: "10:00", activity: "Arrivée à Al Hoceïma" },
            { time: "10:30", activity: "Plage de Quemado" },
            { time: "12:30", activity: "Déjeuner de poisson frais" },
            { time: "14:00", activity: "Parc National du Cap des Trois Fourches" },
            { time: "16:00", activity: "Balade côtière" },
            { time: "17:00", activity: "Retour" }
        ],
        included: ["Transport A/R", "Guide", "Transport", "Entrée Parc National"],
        notIncluded: ["Déjeuner"],
        rating: 4.5,
        reviews: 31,
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
    return price.toLocaleString('fr-MA') + ' MAD';
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
