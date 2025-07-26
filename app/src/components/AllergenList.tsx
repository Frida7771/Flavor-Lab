import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Allergen } from '../models/Allergen';

interface AllergenListProps {
  allergens: Allergen[];
  onDelete: (allergenId: string) => void;
}

const AllergenList: React.FC<AllergenListProps> = ({ allergens }) => {
  return (
    <List>
      {allergens.map((allergen) => (
        <ListItem
          key={allergen.id}
        >
          <ListItemText primary={allergen.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default AllergenList;
