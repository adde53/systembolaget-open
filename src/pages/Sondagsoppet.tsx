import { Navigate } from 'react-router-dom';

// Redirect to the canonical Sunday page to avoid cannibalization
export default function Sondagsoppet() {
  return <Navigate to="/systembolaget-oppet-sondag" replace />;
}
