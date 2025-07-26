import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RecipeModalContent from "../components/RecipeModalContent";

/**
 * `RecipeModal` is a modal that allows users to create a new recipe.
 */
interface RecipeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    picture: string;
    steps: string[];
    ingredients: {
      name: string;
      amount: number;
      unit: string;
      allergy: string;
    }[];
  }) => void;
}

/**
 *  RecipeModal component
 * @param param0  open, onClose, onSubmit 
 * @returns   RecipeModal
 */
const RecipeModal: React.FC<RecipeModalProps> = ({ open, onClose, onSubmit }) => {
  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      aria-labelledby="new-recipe-modal-title"
      aria-describedby="new-recipe-modal-description"
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <Box
        className="recipe-modal-box"
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          maxWidth: 600,
          mx: "auto",
          position: "relative",
          maxHeight: "90vh", 
          overflowY: "auto", // Enable vertical scrolling if content overflows
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <RecipeModalContent onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
};

export default RecipeModal;
