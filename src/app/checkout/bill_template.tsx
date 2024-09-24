'use client'
import React from 'react'
import { Service } from '@/lib/types'

interface BillTemplateProps {
  userDetails: { name: string; email: string; phone: string }
  cartItems: Service[]
  subtotal: number
  discount: number
  tax: number
}

const BillTemplate: React.FC<BillTemplateProps> = ({
  userDetails,
  cartItems,
  subtotal,
  tax,
  discount
}) => {
  const total = subtotal + tax - discount

  return (
    <div
      className='mx-auto my-6 max-w-3xl rounded bg-white p-6 shadow-sm'
      id='invoice'
    >
      <div className='grid grid-cols-2 items-center'>
        <div>
          <img
            src='./favicon-new.jpg'
            alt='company-logo'
            height='100'
            width='100'
          />
        </div>
        <div className='text-right'>
          <p>MONA Inc.</p>
          <p className='text-sm text-gray-500'>mona@gmail.com</p>
          <p className='mt-1 text-sm text-gray-500'>+91 98402 47628</p>
          <p className='mt-1 text-sm text-gray-500'>VAT: 8657671212</p>
        </div>
      </div>

      <div className='mt-8 grid grid-cols-2 items-center'>
        <div>
          <p className='font-bold text-gray-800'>Bill to :</p>
          <p className='text-gray-500'>{userDetails.name}</p>
          <p className='text-gray-500'>{userDetails.phone}</p>
          <p className='text-gray-500'>{userDetails.email}</p>
        </div>
        <div className='text-right'>
          <p>
            Invoice number:{' '}
            <span className='text-gray-500'>INV-2023786123</span>
          </p>
          <p>
            Invoice date: <span className='text-gray-500'>03/07/2023</span>
          </p>
        </div>
      </div>

      <div className='-mx-4 mt-8 flow-root sm:mx-0'>
        <table className='min-w-full'>
          <thead className='border-b border-gray-300 text-gray-900'>
            <tr>
              <th className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                Services
              </th>
              <th className='hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell'>
                Price
              </th>
              <th className='hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell'>
                Discount
              </th>
              <th className='py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0'>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(service => (
              <tr key={service.id} className='border-b border-gray-200'>
                <td className='py-4 pl-4 pr-3 text-sm sm:pl-0'>
                  <div className='font-medium text-gray-900'>
                    {service.title}
                  </div>
                </td>
                <td className='hidden px-3 py-4 text-right text-sm text-gray-500 sm:table-cell'>
                  ${service.price}
                </td>
                <td className='hidden px-3 py-4 text-right text-sm text-gray-500 sm:table-cell'>
                  $0
                </td>
                <td className='py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>
                  ${service.price}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                colSpan={2}
                className='hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0'
              >
                Subtotal
              </th>
              <td
                className='pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-0'
                colSpan={2}
              >
                ${subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <th
                colSpan={2}
                className='hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0'
              >
                Tax (10%)
              </th>
              <td
                className='pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-0'
                colSpan={2}
              >
                ${tax.toFixed(2)}
              </td>
            </tr>
            <tr>
              <th
                colSpan={2}
                className='hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0'
              >
                Discount
              </th>
              <td
                className='pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-0'
                colSpan={2}
              >
                -${discount.toFixed(2)}
              </td>
            </tr>
            <tr>
              <th
                colSpan={2}
                className='hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0'
              >
                Total
              </th>
              <td
                className='pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0'
                colSpan={2}
              >
                ${total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* <div className="border-t-2 pt-4 text-xs text-gray-500 text-center mt-16">
        Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.
      </div> */}
    </div>
  )
}

export default BillTemplate
