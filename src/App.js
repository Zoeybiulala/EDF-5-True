import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { indigo, amber } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AlbumsPage from './pages/AlbumsPage';
import FellowDetail from './pages/FellowDetail';
import DrugInfoPage from "./pages/DrugInfoPage";
import ComparisonLandingPage from "./pages/ComparisonLandingPage";
import ComparisonPage from "./pages/ComparisonPage";
import ComparisonWithoutPage from "./pages/ComparisonWithoutPage";
import ComparisonWithAIPage from "./pages/ComparisonWithAIPage";
import AdvancedPage from './pages/AdvancedPage';
import OTC from './pages/OTCPrescription';
import Advanced from './pages/Advanced';
import ErrorPage from './pages/ErrorPage';
import SearchResult from './pages/SearchResult';
import FAQPage from "./pages/FAQPage";

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
            <Route path="/faqs" element={<FAQPage/>}/>
            <Route path="/landingPage" element={<AlbumsPage/>}/>
            <Route path="/fellowDetail" element={<FellowDetail/>}/>
            <Route path="/" element={<HomePage/>} errorElement={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}