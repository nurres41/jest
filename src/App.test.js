import { render, screen } from '@testing-library/react';
import App from './App';

it("should render app component without crashing", () => {
  render(<App />) // Arrange
  const element = screen.getByText("Modern Testing") // Assertion
  expect(element).toBeInTheDocument();
})




// timeout da verebiliriz. Sanirim default 5s. Bu zamani belirleyebiliriz. Sureyi gecerse failed olur.
// it, test yerine yazilabilirnir.

// test("test aciklamasi", () => {} )


// TDD = Test Driven Development. Yani once testini yaz. Test patlasin. Sonra componenti yap.