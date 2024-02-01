import React, { createContext, useState, useContext } from 'react';
import { COLORS } from '../../theme/theme';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('movies');
  const [selectedColor, setSelectedColor] = useState(COLORS.primaryOrangeHex);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedColor(category === 'movies' ? COLORS.primaryOrangeHex : COLORS.primaryBlue);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategory, handleCategoryChange, selectedColor }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);