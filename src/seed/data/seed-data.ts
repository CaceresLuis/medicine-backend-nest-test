import * as bcrypt from 'bcrypt';

interface SeedUser{
    email: string;
    fullName: string;
    password: string;
    role: string;
}

interface SeedMedicine{
    name: string;
    sale_price: number;
    cost: number;
    supplier: string;
    stock: number
}

interface SeedData{
    users: SeedUser[];
    medicine: SeedMedicine[];
}

export const initialData: SeedData = {
    users:[
        {
            email: 'user@mail.com',
            fullName: 'user account',
            password: bcrypt.hashSync('Pass145', 10),
            role: 'user'
        },
        {
            email: 'admin@mail.com',
            fullName: 'admin account',
            password: bcrypt.hashSync('Pass145', 10),
            role: 'admin'
        },
    ],
    medicine:[
        {
            name: "Paracetamol",
            sale_price: 5,
            cost: 2,
            supplier: "Farmacia ABC",
            stock: 100,
        },
        {
            name: "Ibuprofeno",
            sale_price: 4,
            cost: 1.5,
            supplier: "Farmacia XYZ",
            stock: 80,
        },
        {
            name: "Omeprazol",
            sale_price: 6,
            cost: 3,
            supplier: "Farmacia Salud",
            stock: 120,
        },
        {
            name: "Amoxicilina",
            sale_price: 7,
            cost: 2.5,
            supplier: "Farmacia Bienestar",
            stock: 90,
        },
        {
            name: "Dipirona",
            sale_price: 3,
            cost: 1,
            supplier: "Farmacia Rápida",
            stock: 150,
        },
        {
            name: "Loratadina",
            sale_price: 4.5,
            cost: 2,
            supplier: "Farmacia Económica",
            stock: 70,
        },
        {
            name: "Cetirizina",
            sale_price: 5.5,
            cost: 2.2,
            supplier: "Farmacia Moderna",
            stock: 110,
        },
        {
            name: "Aspirina",
            sale_price: 2.5,
            cost: 1.2,
            supplier: "Farmacia Central",
            stock: 200,
        },
        {
            name: "Metformina",
            sale_price: 8,
            cost: 4,
            supplier: "Farmacia Vital",
            stock: 60,
        },
        {
            name: "Atorvastatina",
            sale_price: 9,
            cost: 3.5,
            supplier: "Farmacia Saludable",
            stock: 100,
        },
    ]
}
