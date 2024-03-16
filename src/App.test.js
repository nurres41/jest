import { render, screen } from '@testing-library/react';

function TestComponent() {
  return(
    <>
      <button>Test</button>
      <button>Test2</button>
    </>
  )
}

it("should render app component without crashing", () => {
  render(<TestComponent />) // Arrange
  const element = screen.getByRole('button', {
    name: 'Test2'
  })
  expect(element).toBeInTheDocument(); // Assertion
})




// timeout da verebiliriz. Sanirim default 5s. Bu zamani belirleyebiliriz. Sureyi gecerse failed olur.
// it, test yerine yazilabilirnir.

// test("test aciklamasi", () => {} )


// TDD = Test Driven Development. Yani once testini yaz. Test patlasin. Sonra componenti yap.