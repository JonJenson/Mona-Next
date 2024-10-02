'use client'
import React, { useEffect, useState } from "react";

interface TotalCartCheckoutProps {
  subtotal: number;
  discount: number;
  tax: number;
}

const TotalCartCheckout: React.FC<TotalCartCheckoutProps> = ({
  subtotal,
  discount,
  tax,
}) => {
  const [clientSubtotal, setClientSubtotal] = useState<number>(0);
  const [clientDiscount, setClientDiscount] = useState<number>(0);
  const [clientTax, setClientTax] = useState<number>(0);

  useEffect(() => {
    // Ensure the values are only updated after the component mounts to avoid hydration mismatch
    setClientSubtotal(subtotal);
    setClientDiscount(discount);
    setClientTax(tax);
  }, [subtotal, discount, tax]);

  const calculateTotal = (subtotal: number, tax: number, discount: number) => {
    return subtotal + tax - discount;
  };

  const total = calculateTotal(clientSubtotal, clientTax, clientDiscount);

  return (
    <div className="flex flex-col space-y-5 p-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Subtotal</h3>
        <p className="text-gray-600">₹{clientSubtotal.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Tax</h3>
        <p className="text-gray-600">₹{clientTax.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Discount</h3>
        <p className="text-gray-600">₹{clientDiscount.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-red-500">Total</h3>
        <p className="text-red-500 text-xl">₹{total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TotalCartCheckout;
