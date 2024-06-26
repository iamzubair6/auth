export const onProduction = Boolean(import.meta.env.PROD);

//
// Create an .env file in project root.
// VITE_BACKEND_API=http://192.168.1.100:8001
// Use the pattern above to set env variables
//

// BACKEND URLs
const devBackendURL = import.meta.env.VITE_BACKEND_API ?? null;
const prodBackendURL = "https://api-corbelapp.corbelbd.com/";
// console.log(devBackendURL);

export const baseURL = devBackendURL ? devBackendURL : prodBackendURL;
