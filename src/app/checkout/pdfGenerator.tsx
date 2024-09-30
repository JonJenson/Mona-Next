// PDFGenerator.tsx
'use client'
import { useEffect, useRef } from 'react'
import html2pdf from 'html2pdf.js'
import BillTemplate from './bill_template'
import { Service } from '@/lib/types'
import {
  uploadPDFToSupabase,
  insertInvoiceDetails
} from '@/utils/supabaseService'
import SuccessComponent from './SucessComponent'

interface PDFGeneratorProps {
  userDetails: { name: string; phone: string; email: string }
  cartItems: Service[]
  subtotal: number
  discount: number
  tax: number
  clearCart: () => void
  router: any
  onSuccess: () => void
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  userDetails,
  cartItems,
  subtotal,
  discount,
  tax,
  clearCart,
  router,
  onSuccess

}) => {
  const currentDate = new Date()
  const day = String(currentDate.getDate()).padStart(2, '0')
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const year = currentDate.getFullYear()
  const formattedDate = `${day}/${month}/${year}`

  // Ref to ensure the effect runs only once
  const isEffectRan = useRef(false)

  useEffect(() => {
    // Prevent the effect from running more than once
    if (isEffectRan.current) return
    isEffectRan.current = true

    const element = document.getElementById('invoice')
    if (element) {
      const options = {
        margin: 1,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }

      html2pdf()
        .from(element)
        .set(options)
        .output('blob')
        .then(async (blob: Blob) => {
          try {
            // Upload PDF to Supabase
            const { fileName, publicUrl } = await uploadPDFToSupabase(
              blob,
              userDetails,
              currentDate
            )

            // Insert invoice details into the database
            const totalAmount = subtotal - discount + tax
            await insertInvoiceDetails(
              fileName,
              publicUrl,
              userDetails,
              totalAmount
            )

            // Clear cart and navigate
            onSuccess()

          } catch (error) {
            console.error(
              'An error occurred during the PDF upload or insertion:',
              error
            )
          }
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            console.error('Error generating PDF:', err.message)
          } else {
            console.error('Unknown error generating PDF:', err)
          }
        })
    }
  }, [clearCart, currentDate, discount, router, subtotal, tax, userDetails])

  return (
    
      <div id='invoice'>
        <BillTemplate
          userDetails={userDetails}
          cartItems={cartItems}
          subtotal={subtotal}
          discount={discount}
          tax={tax}
          date={formattedDate}
        />
      </div>
  )
}

export default PDFGenerator
