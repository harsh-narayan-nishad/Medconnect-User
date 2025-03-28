
import React, { useState, useEffect } from "react";

const countries = [
  { code: "WW", name: "Worldwide" },
  { code: "AF", name: "Afghanistan" }, { code: "AL", name: "Albania" }, { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" }, { code: "AO", name: "Angola" }, { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" }, { code: "AM", name: "Armenia" }, { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" }, { code: "AZ", name: "Azerbaijan" }, { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" }, { code: "BD", name: "Bangladesh" }, { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" }, { code: "BE", name: "Belgium" }, { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" }, { code: "BT", name: "Bhutan" }, { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" }, { code: "BW", name: "Botswana" }, { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" }, { code: "BG", name: "Bulgaria" }, { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" }, { code: "KH", name: "Cambodia" }, { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" }, { code: "CF", name: "Central African Republic" }, { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" }, { code: "CN", name: "China" }, { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" }, { code: "CD", name: "Congo (Democratic Republic)" }, { code: "CG", name: "Congo (Republic)" },
  { code: "CR", name: "Costa Rica" }, { code: "HR", name: "Croatia" }, { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" }, { code: "CZ", name: "Czechia" }, { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" }, { code: "DM", name: "Dominica" }, { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" }, { code: "EG", name: "Egypt" }, { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" }, { code: "ER", name: "Eritrea" }, { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" }, { code: "ET", name: "Ethiopia" }, { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" }, { code: "FR", name: "France" }, { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" }, { code: "GE", name: "Georgia" }, { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" }, { code: "GR", name: "Greece" }, { code: "GD", name: "Grenada" },
  { code: "GT", name: "Guatemala" }, { code: "GN", name: "Guinea" }, { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" }, { code: "HT", name: "Haiti" }, { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" }, { code: "IS", name: "Iceland" }, { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" }, { code: "IR", name: "Iran" }, { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" }, { code: "IL", name: "Israel" }, { code: "IT", name: "Italy" },
  { code: "US", name: "United States" }, { code: "GB", name: "United Kingdom" }, { code: "VA", name: "Vatican City" },
  { code: "ZW", name: "Zimbabwe" }, { code: "MX", name: "Mexico" }, { code: "RU", name: "Russia" },
  { code: "JP", name: "Japan" }, { code: "KR", name: "South Korea" }, { code: "VN", name: "Vietnam" },
  { code: "ZA", name: "South Africa" }, { code: "PK", name: "Pakistan" }, { code: "NG", name: "Nigeria" },
  { code: "ES", name: "Spain" }, { code: "NL", name: "Netherlands" }
];

const Input = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userCountryKey = user ? `selectedCountry_${user.id}` : "selectedCountry";
  const storedCountry = localStorage.getItem(userCountryKey);
  const [selectedCountry, setSelectedCountry] = useState(
    storedCountry ? storedCountry : "Worldwide"
  );

  useEffect(() => {
    localStorage.setItem(userCountryKey, selectedCountry);
  }, [selectedCountry, userCountryKey]);

  return (
    <div className="relative flex items-center max-w-xs text-gray-500">
  <select
    className="text-sm outline-none rounded-xl h-[43px] px-5 border border-gray-300 bg-white 
    focus:border-gray-400 shadow-lg w-[120px] overflow-hidden text-ellipsis z-10"
    value={selectedCountry}
    onChange={(e) => setSelectedCountry(e.target.value)}
  >
    {countries.map((country) => (
      <option key={country.code} value={country.name} title={country.code}>
        {country.name}
      </option>
    ))}
  </select>
</div>

  );
};

export default Input;

