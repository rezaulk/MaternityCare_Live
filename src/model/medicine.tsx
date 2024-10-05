
interface Medicine {
    id: number,
    brand_id: number, 
    brand_name: string,
    generic: string,
    manufacturer: string,
    Package_Size: string,
    dosage_form: string,
    package_container: string,
    slug: string,
    strength: string,
    type: string,
    prices: Prices[],
    volume: number,  // 100  etc: 100 ml
    price: number, // 10
    unit: string // ml
    select_quantity: string,
    descriptor: string, // bottle
    stripSize: number,
    stripPrice: number
}

interface Prices {
    quantity: number,
    price: number,
    unit: string,
    descriptor: string,
    PriceVolume: PricesVolume[]
}

interface PricesVolume {
    quantity: string,
    price: number,
    container_name: string
}