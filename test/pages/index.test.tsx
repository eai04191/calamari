import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IndexPage from "../../src/pages/index";

describe("Index Page", () => {
    test("Sample Test", () => {
        render(<IndexPage />);
        expect(screen.getByText("Hello Next.js 👋")).toBeInTheDocument();
    });
});
