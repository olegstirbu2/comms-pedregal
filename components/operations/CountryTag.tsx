import { COUNTRY_FLAGS } from '@/lib/operations-template-data';

interface CountryTagProps {
  country: string;
}

export default function CountryTag({ country }: CountryTagProps) {
  const flag = COUNTRY_FLAGS[country] || '';
  
  return (
    <span>
      {flag} {country}
    </span>
  );
}


