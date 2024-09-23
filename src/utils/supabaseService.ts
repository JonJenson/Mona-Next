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
    const { data, error } = await supabase
      .from('customers')
      .select('*');

    if (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};