import { useNavigate } from "react-router";
import ProfileDataBox from "../components/ProfileDataBox";
import SinglePageMenuAppBar from "../components/SinglePageNavBar";
import { isSignIn } from "../services/userService";
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function UserPage() {
  const navigate = useNavigate();
  if (isSignIn() == false) {
    useEffect(() => {
      navigate('/');
    }, [navigate]);
    return;
  }
  return (
    <>
      <Box
        sx={(theme) => ({
          marginTop: `${theme.mixins.toolbar.minHeight}px`, // Default height
          [theme.breakpoints.up('xs')]: {
            '@media (orientation: landscape)': {
              marginTop: `48px`, // Landscape mode for xs
            },
          },
          [theme.breakpoints.up('sm')]: {
            marginTop: `64px`, // Larger screens
          },
        })}
      >
        <SinglePageMenuAppBar pageName="User" />
        {ProfileDataBox()}
      </Box>
    </>
  );
}