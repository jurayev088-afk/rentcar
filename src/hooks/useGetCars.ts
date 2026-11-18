import { useQuery } from "@tanstack/react-query"
import api from "../services/api"

export const useGetCars = () => {
    const {data, isLoading} = useQuery({
        queryKey:["get-cars"],
        queryFn:() => api.get("/cars").then(res => res?.data)
    })
    return {data, isLoading}
}
