import React from "react";

interface IProduct {
    id: number,
    nama: string,
    gambar: string,
    harga: number,
    tipe: string,
    quantity?: number,
    note?: string,
}
interface IProductDetail {
    id: number,
    title: string,
    img: string,
    price: number,
    bonus: string,
    storage: string,
    colour: string,
    image: string,
    image_detail: string,
    stok: number
}

interface ICartProduct {
    id: number,
    title: string,
    storage: string,
    colour: string,
    stok: number,
    countBuy: number,
    price: number,
    image: string,
    onDelete: () => void,
}

interface IUseRequest {
    path: string,
    name?: any
}

interface IContextValue {
    products: IProductDetail[],
    carts: ICartProduct[],
    count: number,
    dispatch: React.Dispatch<IAction>
}

interface IContext {
    children: React.ReactNode;
}

interface IAction {
    type: string
}

interface IModalAddCart {
    isOpen: boolean,
    isClose: () => void,
    children: React.ReactNode
}

export type {
    IProduct,
    IProductDetail,
    ICartProduct,
    IUseRequest,
    IContext,
    IContextValue,
    IAction,
    IModalAddCart
}