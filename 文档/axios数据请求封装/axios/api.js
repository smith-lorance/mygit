import {get, post} from "./axios";


let ip = 'http://116.62.58.101:8082'

export const API  = {


    getData(page){
        return get(`${ip}/api/getCarousel?pageNumber=${page}`)
    },

    setData(data){
        return post(`${ip}/api/getCarousel`, data)

    }

}