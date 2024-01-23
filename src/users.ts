import { v4 } from "uuid";

export const users:User[] = [
    { "id": 1, "firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "age": 25, "interests": ["reading", "traveling"], "height": 175 },
    { "id": 2, "firstName": "Jane", "lastName": "Smith", "email": "jane.smith@example.com", "age": 30, "interests": ["sports", "cooking"], "height": 180 },
    { "id": 3, "firstName": "David", "lastName": "Johnson", "email": "david.johnson@example.com", "age": 22, "interests": ["music", "gaming"], "height": 165 },
    { "id": 4, "firstName": "Emily", "lastName": "Williams", "email": "emily.williams@example.com", "age": 28, "interests": ["photography", "hiking"], "height": 170 },
    { "id": 5, "firstName": "Michael", "lastName": "Davis", "email": "michael.davis@example.com", "age": 35, "interests": ["painting", "movies"], "height": 185 },
    { "id": 6, "firstName": "Sarah", "lastName": "Brown", "email": "sarah.brown@example.com", "age": 27, "interests": ["coding", "swimming"], "height": 172 },
    { "id": 7, "firstName": "Brian", "lastName": "Miller", "email": "brian.miller@example.com", "age": 32, "interests": ["dancing", "reading"], "height": 178 },
    { "id": 8, "firstName": "Olivia", "lastName": "Moore", "email": "olivia.moore@example.com", "age": 29, "interests": ["traveling", "sports"], "height": 175 },
    { "id": 9, "firstName": "Matthew", "lastName": "Wilson", "email": "matthew.wilson@example.com", "age": 31, "interests": ["cooking", "music"], "height": 168 },
    { "id": 10, "firstName": "Amanda", "lastName": "Clark", "email": "amanda.clark@example.com", "age": 26, "interests": ["gaming", "coding"], "height": 180 },
    { "id": 11, "firstName": "Chris", "lastName": "Anderson", "email": "chris.anderson@example.com", "age": 28, "interests": ["photography", "reading"], "height": 175 },
    { "id": 12, "firstName": "Eva", "lastName": "Taylor", "email": "eva.taylor@example.com", "age": 33, "interests": ["traveling", "painting"], "height": 168 },
    { "id": 13, "firstName": "Justin", "lastName": "Harris", "email": "justin.harris@example.com", "age": 24, "interests": ["movies", "cooking"], "height": 182 },
    { "id": 14, "firstName": "Sophie", "lastName": "Roberts", "email": "sophie.roberts@example.com", "age": 29, "interests": ["swimming", "coding"], "height": 170 },
    { "id": 15, "firstName": "Alex", "lastName": "Turner", "email": "alex.turner@example.com", "age": 27, "interests": ["gaming", "music"], "height": 178 },
    { "id": 16, "firstName": "Grace", "lastName": "Collins", "email": "grace.collins@example.com", "age": 31, "interests": ["dancing", "hiking"], "height": 175 },
    { "id": 17, "firstName": "Liam", "lastName": "Baker", "email": "liam.baker@example.com", "age": 25, "interests": ["reading", "sports"], "height": 183 },
    { "id": 18, "firstName": "Mia", "lastName": "Garcia", "email": "mia.garcia@example.com", "age": 30, "interests": ["coding", "movies"], "height": 172 },
    { "id": 19, "firstName": "Jordan", "lastName": "Perez", "email": "jordan.perez@example.com", "age": 26, "interests": ["hiking", "photography"], "height": 180 },
    { "id": 20, "firstName": "Emma", "lastName": "Fisher", "email": "emma.fisher@example.com", "age": 28, "interests": ["painting", "traveling"], "height": 175 },
].map(item => ({...item, id: v4()}));
export type User = {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    interests: string[];
    height: number;
};


