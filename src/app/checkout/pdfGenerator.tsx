'use client';
import { useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import BillTemplate from './bill_template';
import { Service } from '@/lib/types';
import { supabase } from '@/config/supabase';

interface PDFGeneratorProps {
  userDetails: { name: string; phone: string; email: string };
  cartItems: Service[];
  subtotal: number;
  discount: number;
  tax: number;
  clearCart: () => void;
  router: any;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  userDetails,
  cartItems,
  subtotal,
  discount,
  tax,
  clearCart,
  router,
}) => {
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

      // Generate PDF and directly handle the Blob
      html2pdf()
        .from(element)
        .set(options)
        .output('blob') // Change this line to output 'blob'
        .then(async (blob: Blob) => {  // Explicitly typing 'blob' as Blob
          // Upload the PDF Blob to Supabase storage
          const fileName = `invoices/invoice_${Date.now()}.pdf`;
          const { data, error } = await supabase.storage
            .from('invoices')
            .upload(fileName, blob, {
              contentType: 'application/pdf',
              upsert: true, // Replace if file already exists
            });

          if (error) {
            console.error('Error uploading PDF:', error);
          } else {
            console.log('PDF uploaded successfully:', data);
            clearCart(); // Clear the cart after uploading PDF
            localStorage.setItem('isLoggedIn', 'false');
            router.push('/'); // Redirect to the homepage
          }
        })
        .catch((err: unknown) => {
          // Handle error with type assertion
          if (err instanceof Error) {
            console.error('Error generating PDF:', err.message);
          } else {
            console.error('Unknown error generating PDF:', err);
          }
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
