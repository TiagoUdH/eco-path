import axios from "axios"

export const api = axios.create({
    baseURL: 'https://tiagofernandes.pythonanywhere.com/api'
})

api.defaults.headers.common['Authorization'] = `Token c0aea1efd6683b9be0b81cffa7d9cce9198e9289`;