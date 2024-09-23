import React, { useEffect, useState } from "react";
import MembershipDropdown from "./membership_dropdown";

interface TotalCartCheckoutProps{
  subtotal:number 
  discount:number
  tax:number
}

const TotalCartCheckout: React.FC<TotalCartCheckoutProps> = ({ subtotal , discount ,tax}) => {
  
  return (
    <div className="flex flex-col space-y-5 p-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Subtotal</h3>
        <p className="text-gray-600">₹{subtotal}</p>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Tax</h3>
        <p className="text-gray-600">₹{tax}</p>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Discount</h3>
        <p className="text-gray-600">₹{discount}</p>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-red-500">Total</h3>
        <p className="text-red-500 text-xl">₹{subtotal + tax - discount}</p>
      </div>
      <MembershipDropdown/>
    </div>
  );
};

export default TotalCartCheckout;
