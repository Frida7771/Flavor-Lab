import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

interface Allergen {
  id: string;
  name: string;
}

interface AllergenSelectorProps {
  allergens: Allergen[];
  onAdd: (allergenName: string) => void;
}

const AllergenSelector: React.FC<AllergenSelectorProps> = ({ allergens, onAdd }) => {
  const [selectedAllergen, setSelectedAllergen] = useState<string>('');

  const handleAdd = () => {
    if (selectedAllergen) {
      console.log('Adding allergen:', selectedAllergen);
      onAdd(selectedAllergen); 
      setSelectedAllergen(''); 
    } else {
      console.error('No allergen selected.');
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="allergen-select-label">Select Allergen</InputLabel>
      <Select
        labelId="allergen-select-label"
        value={selectedAllergen}
        onChange={(e) => setSelectedAllergen(e.target.value)}
      >
        {allergens.map((allergen) => (
          <MenuItem key={allergen.id} value={allergen.name}>
            {allergen.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add Allergen
      </Button>
    </FormControl>
  );
};

export default AllergenSelector;
