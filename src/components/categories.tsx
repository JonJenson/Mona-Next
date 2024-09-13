import React from "react";
import { CategoriesData } from "@/utils/data";
import CategoriesCard from "./categoriesCard";


const Categories:React.FC = () => { 

  return (
    <section className="w-full">
        <h2 className="text-5xl font-bold text-center text-black py-10 font-playfair">Step into a World of Beauty!</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {CategoriesData.map((item, index) => (
            <CategoriesCard
              key={index}
              image={item.image}
              heading={item.heading}
              link={item.link}
            />
          ))}
      </div>
      <div className="flex justify-center my-10">
        <a href="" className="w-4/5 p-5 bg-gradient-to-b from-[#A4B1C1] to-[#0F1A3A] rounded-2xl flex flex-col items-center justify-center overflow-hidden">
          <img src="./bridal-text.png" alt="BRIDAL" className="max-w-full max-h-full object-contain" />
          <span className="text-white text-xl font-light mt-2 tracking-[10px]">By MONA</span>

        </a>
      </div>
    </section>
  );
};

export default Categories;
