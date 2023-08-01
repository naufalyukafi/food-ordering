import React, { useContext } from "react";
import FoodCard from "../components/FoodCard";
import { MyContext } from "../context/apifood";
import { useRequest } from "../hooks/useRequest";
import { IProduct } from "../ts/foood";

const Home = () => {
  const { data: menu } = useRequest("menus");

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
        {menu?.datas?.map((el: IProduct, i: number) => (
          <FoodCard
            id={el.id}
            gambar={el.gambar}
            harga={el.harga}
            nama={el.nama}
            tipe={el.tipe}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
