import { getData } from 'country-list';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface CountryOption {
    name: string;
    code: string;
}

interface CountryListProps {
    selectedCountry: CountryOption | null;
    onChange: (country: CountryOption | null) => void;
}

export default function CountryList({ selectedCountry, onChange }: CountryListProps) {
    const countries: CountryOption[] = getData()
        .filter(country => country.name !== "Israel")
        .map(country => ({
            name: country.name,
            code: country.code
        }));

    const countryTemplate = (option: CountryOption) => (
        <div className="flex items-center">
            <img
                alt={option.name}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                className="mr-2 rounded-sm"
                style={{ width: '20px', height: '15px' }}
            />
            <span>{option.name}</span>
        </div>
    );

    return (
        <div className="flex justify-center p-3">
            <Dropdown
                value={selectedCountry}
                onChange={(e: DropdownChangeEvent) => onChange(e.value)}
                options={countries}
                optionLabel="name"
                placeholder="Select a Country"
                className="w-full md:w-14rem"
                itemTemplate={countryTemplate}
                editable
            />
        </div>
    );
}
