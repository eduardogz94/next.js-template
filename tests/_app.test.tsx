import { render, screen } from "@testing-library/react";
import MyApp from "pages/_app";

describe("MyApp", () => {
  it("renders the Header, Footer, and page content", () => {
    render(
      <MyApp
        Component={() => <div>Page content here</div>}
        pageProps={{}}
        router={{} as any}
      />
    );

    const pageContent = screen.getByText(/Page content here/i);
    expect(pageContent).toBeInTheDocument();
  });
});
