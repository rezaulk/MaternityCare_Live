interface User {
    Name: string;
    // Email: string;
    id: string, 
   
}


interface Chats {
    id: string;
    userId1: string;
    userId2: string;  
    messages: Messages[];
   
}

interface Messages {
    id: string;
    message: string;
    createdBy: string;
    createdAt: string;
   
}

