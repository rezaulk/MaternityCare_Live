interface Orders {
    medicines: Medicine[];
    address: string;
    amountPayable: number;
    createdAt: string;
    status: string;
    orderId: string;  // INV-last 4 of number - order counter + 1
    customerName: string;
    phoneNumber: string;
   
}

interface Address {
    id: string;
    address: string;
    userName: string;  
    phoneNumber: string;
   
}
 

