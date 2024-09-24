'use client';
import { useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import BillTemplate from './bill_template';
import { Service } from '@/lib/types';

interface PDFGeneratorProps {
  userDetails: { name: string; phone: string; email: string };
  cartItems:Service[];
  subtotal: number;
  discount: number;
  tax: number;
  clearCart: () => void;
  router: any;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ userDetails, cartItems, subtotal, discount, tax, clearCart, router }) => {
  useEffect(() => {
    const element = document.getElementById('invoice');
    if (element) {
      const options = {
        margin: 1,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };

      // Generate PDF
      html2pdf().from(element).set(options).save().then(() => {
        clearCart(); // Clear the cart after saving PDF
        router.push('/'); // Redirect to the homepage
      });
    }
  }, [userDetails, cartItems, subtotal, discount, tax, clearCart, router]);

  return (
    <div id="invoice">
      <BillTemplate
        userDetails={userDetails}
        cartItems={cartItems}
        subtotal={subtotal}
        discount={discount}
        tax={tax}
      />
    </div>
  );
};

export default PDFGenerator;
