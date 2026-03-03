import { createBrowserRouter } from "react-router";
import ProposalPage from "./proposal/ProposalPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProposalPage,
  },
]);
