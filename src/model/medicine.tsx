
interface Medicine {
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
    volume: number,
    price: number,
    unit: string
    select_quantity: string
 
}

interface Prices {
    volume: number,
    price: number,
    unit: string
    PriceVolume: PricesVolume[]
}

interface PricesVolume {
    quantity: string,
    price: number,
    container_name: string
}