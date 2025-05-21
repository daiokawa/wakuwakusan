import { redirect } from 'next/navigation';

export default function Home() {
  // For now, simply redirect to the login page
  // In a real implementation, you would check if the user is already authenticated
  redirect('/login');
}