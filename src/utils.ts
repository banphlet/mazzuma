'use strict'


export const required = (str: string)=>{
    throw new Error(`${str} is required`)
}