import React from "react";

const Home3: React.FC = () => {
  return (
    <section className="w-full h-[85vh] relative font-playfair">
      <div className="relative w-full h-full flex flex-col justify-center items-end bg-cover bg-center bg-no-repeat bg-home3">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.80)_0%,rgba(255,255,255,0.39)_0%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.56)_59%)] z-10"></div>
        <blockquote className="relative text-center text-4xl  text-black p-4 z-20">
          Save money & enjoy your monthly
          <br />
          beauty benefits on <br />
          <span className="text-deepBlue">Membership</span>
        </blockquote>
      </div>
    </section>
  );
};

export default Home3;
