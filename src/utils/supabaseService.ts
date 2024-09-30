import { supabase } from '@/config/supabase'

export const checkCustomerExists = async (email: string) => {
  const { data: existingCustomer, error } = await supabase
    .from('customers')
    .select('email')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error('Error checking for existing customer: ' + error.message)
  }
  return existingCustomer
}

export const insertCustomer = async (
  name: string,
  phone: string,
  email: string
) => {
  const { error } = await supabase.from('customers').insert([
    {
      name,
      phone,
      email
    }
  ])

  if (error) {
    throw new Error('Error inserting customer: ' + error.message)
  }

  return true
}

export const fetchCustomers = async () => {
  try {
    const { data, error } = await supabase.from('customers').select('*')

    if (error) {
      throw new Error(`Error fetching customers: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error fetching customers:', error)
    throw error
  }
}

/////// -----------------------------PDF Generators -----------------------------------//////

/**
 * Uploads a PDF Blob to Supabase storage and returns the file name and public URL.
 * @param blob The PDF Blob to upload.
 * @param userDetails User details object containing the customer's name.
 * @param currentDate The current date object for generating the file name.
 * @returns An object containing the fileName and publicUrl, or an error.
 */
export const uploadPDFToSupabase = async (
  blob: Blob,
  userDetails: { name: string },
  currentDate: Date
) => {
  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th' // Handle special case for 11th - 19th
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }
  const day = currentDate.getDate()
  const dayWithSuffix = `${day}${getDaySuffix(day)}`
  const monthName = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()
  const folder = `${monthName}-${year}`
  const uniqueId = Math.floor(10000 + Math.random() * 90000) // Random 5-digit number
  const fileName = `${folder}/${dayWithSuffix} - invoice_${uniqueId}.pdf`

  try {
    // Upload the PDF Blob to Supabase storage
    const { error } = await supabase.storage
      .from('invoices')
      .upload(fileName, blob, {
        contentType: 'application/pdf',
        upsert: true
      })

    if (error) {
      throw new Error(`Error uploading PDF: ${error.message}`)
    }

    // Get the public URL of the uploaded file
    const { data } = supabase.storage.from('invoices').getPublicUrl(fileName)
    const publicUrl = data?.publicUrl

    if (!publicUrl) {
      throw new Error('Error retrieving public URL')
    }

    return { fileName, publicUrl }
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Inserts the invoice details into the Supabase 'invoices' table.
 * @param fileName The name of the uploaded file.
 * @param publicUrl The public URL of the uploaded file.
 * @param userDetails User details object containing the customer's name.
 * @param totalAmount The total amount of the invoice.
 */
export const insertInvoiceDetails = async (
  fileName: string,
  publicUrl: string,
  userDetails: { name: string },
  totalAmount: number
) => {
  try {
    const { error: insertError } = await supabase.from('invoices').insert([
      {
        file_name: fileName,
        url: publicUrl,
        customer_name: userDetails.name,
        total_amount: totalAmount
      }
    ])

    if (insertError) {
      throw new Error(
        `Error inserting into invoices table: ${insertError.message}`
      )
    }

    console.log('Invoice details inserted successfully')
  } catch (error) {
    console.error(error)
    throw error
  }
}
