import { findByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import React from 'react';


// role ile element bulma
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

// form elementlerinde falan labelden inputu bulma
function TestTwo(){
  return(
    <>
      <label for='user-name'>User name:</label>
      <input id='user-name' />
    </>
  )
}

it("Test Two label test", () => {
  // labeli buldu sonra bind edilmis inputu elemente atti.
  render(<TestTwo />)
  const element = screen.getByLabelText('User name:')

  expect(element).toBeInTheDocument()
})

// placeholder ile element bulmak
function TestThree(){
  return(
    <>
      <input id='user-name' placeholder='Enter your name' />
    </>
  )
}

it('should be find placeholder element', () => {
  render(<TestThree />)
  const element = screen.getByPlaceholderText('Enter your name')

  expect(element).toBeInTheDocument()
})

// text ile element bulmak
function TestFour(){
  return(
    <>
      <div>Nuri Onur</div>
    </>
  )
}

it('should find element by text', () => {
  render(<TestFour />)
  const element = screen.getByText('Nuri Onur')
  expect(element).toBeInTheDocument()
})

// value ile element bulmak (Value verilen elementler icin gecerli - input, select, textarea etc.)
function TestFive(){
  return(
    <>
      <input value='modern testing' />
    </>
  )
}

it('should find element by value', () => {
  render(<TestFive />)
  const element = screen.getByDisplayValue('modern testing')
  expect(element).toBeInTheDocument()
})

// imagelere verilen alt text ile element bulmak (Value verilen elementler icin gecerli - input, select, textarea etc.)
function TestSix(){
  return(
      <img src='#' alt='image alt text'/>
  )
}

it('should find by alt text', () => {
  render(<TestSix />)
  const element = screen.getByAltText('image alt text')
  expect(element).toBeInTheDocument()
  // expect(element.src).toBeInTheDocument('http://localhost/#)
})

// Title ile element bulmak (Value verilen elementler icin gecerli - input, select, textarea etc.)
function TestSeven(){
  return(
      // title hover oldugunda cikan tooltip
      <div title='modern test'>Title Test</div>
  )
}

it('should find element by title attr.', () => {
  render(<TestSeven />)
  const element = screen.getByTitle('modern test')
  expect(element).toBeInTheDocument()
})

// Ozel olarak test attr verilir onun ile element bulmak 
function TestEight(){
  return(
      <div data-testid='ornek'>Data Test</div>
  )
}

it('should find by test id', () => {
  render(<TestEight />)
  const element = screen.getByTestId('ornek')
  expect(element).toBeInTheDocument()
})


// multiple element query etmek 
function TestNine({ products }){
  return(
      <ul>
        {
          products.map((product, index) => (
            <li key={index}>{product}</li>
          ))
        }
      </ul>
  )
}

it('should find according to multiple element length', () => {
  const products = ['urun1', 'urun2', 'urun3']
  
  render(<TestNine products={products} />)
  const elements = screen.getAllByRole('listitem')
  expect(elements).toHaveLength(products.length)
})

// text matching yontemleri 
function TestTen({ products }){
  return(
    <div>
      Modern: {products}
    </div>
  )
}

it('should match text', () => {
  render(<TestTen />)
  // object icinde ikinci args gecebiliriz. Yada regex kulannabiliriz.
  const element = screen.getByText('Moder',{
    exact: false
  })
  expect(element).toBeInTheDocument()
})

// QueryBy ile olmayan elementleri kontrol etmek

function TestEleven({item}) {
  return (
    <div>
      {item && <p>{item}</p>}
      {!item && <p>Item not found!</p>}
    </div>
  )
}

it('should be check exist and not exist items', () => {
  render(<TestEleven item='Test' />)
  const element = screen.getByText(/Test/i)
  const emptyElement = screen.queryByText('Item not found!')

  expect(element).toBeInTheDocument()
  // eger query kullanmasak alttaki satir patlardi.
  expect(emptyElement).not.toBeInTheDocument()
})

// findBy ile async 

function TestTwelve() {
  const [message, setMessage] = React.useState('Nuri')

  React.useEffect(() => {
    setTimeout(() => {
      setMessage('Selin')
    }, [300])
  },[])

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

it('should be check async text value', async () => {
  render(<TestTwelve />)
  const element = await screen.findByText('Selin')
  expect(element).toBeInTheDocument()
})


// waitFor ile async 

function TestThirhteen() {
  const [message, setMessage] = React.useState('Nuri')

  React.useEffect(() => {
    setTimeout(() => {
      setMessage('Selin')
    }, [300])
  },[])

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

it('should be check async text value with wait for', async () => {
  render(<TestThirhteen />)

  await waitFor(() => {
    expect(screen.getByText('Selin')).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(screen.queryByText('Nuri')).not.toBeInTheDocument()
  })
})

// waitForElementToBeRemoved ile async islem ile elementin silindigini kontrol etmek 

function TestFourteen() {
  const [message, setMessage] = React.useState('Nuri')

  React.useEffect(() => {
    setTimeout(() => {
      setMessage('Selin')
    }, [300])
  },[])

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

it('should be check async text value removed with waitForElementToBeRemoved', async () => {
  render(<TestFourteen />)

  await waitForElementToBeRemoved(() => screen.queryByText('Nuri'))
  expect(screen.getByText('Selin')).toBeInTheDocument()
})


// DOM Query Selector ile element bulma

function TestFifteen() {
  return (
    <div>
      <p className='primary'>Modern Test</p>
    </div>
  )
}

it('should be have a primary class', () => {
  const { container } = render(<TestFifteen />)
  // for debug
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug()
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const element = container.querySelector('.primary')
  expect(element).toBeInTheDocument()
})


// Kullanici etkilisimleri (mouse)

function TestSixteen() {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

it('should be sure increment value', async () => {
  const user = userEvent.setup()
  render(<TestSixteen />)

  await user.pointer({
    keys: '[MouseLeft]',
    target: screen.getByRole('button', { name: 'Increment' })
  })
  // Best practice
  const headingElement = await screen.findByRole('heading')
  expect(headingElement).toHaveTextContent(1)
})


// Kullanici etkilisimleri (keyboard)

function TestSeventeen() {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

it('should be sure keyboards things', async () => {
  const user = userEvent.setup()
  render(<TestSeventeen />)

  const buttonElement = screen.getByRole('button')

  await user.keyboard('[tab]')
  await user.keyboard('[enter]')

  const heading = screen.getByRole('heading')
  expect(buttonElement).toHaveFocus()
  expect(heading).toHaveTextContent(1)
})

// Kullanici etkilesimleri (clipboard events)

function TestEighteen() {
  const [count, setCount] = React.useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  const handleCopy = () => {
    window.navigator.clipboard.writeText('Heey')
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleCopy}>Copy</button>
      <input type='text' />
    </div>
  )
}

it('should render the element correctly', async () => {
  const user = userEvent.setup()
  render(<TestEighteen />)

  await user.keyboard('[tab]')
  await user.keyboard('[enter]')

  const inputElement = screen.getByRole('textbox')
  inputElement.focus()

  await user.paste()
  
  expect(inputElement).toHaveValue('Heey')
})

// clear input value

function TestNineteen() {
  return (
    <div>
      <select multiple>
        <option value='elma'>Elma</option>
        <option value='armuut'>Armut</option>
        <option value='ayva'>Ayva</option>
      </select>
    </div>
  )
}

it('should be clear input', async () => {
  const user = userEvent.setup()
  render(<TestNineteen />)

  const fruits = screen.getByRole('listbox')

  await user.selectOptions(fruits, ['Elma', 'armuut'])

  expect(screen.getByRole('option',{ name: 'Elma'}).selected).toBe(true)
  expect(screen.getByRole('option',{ name: 'Armut'}).selected).toBe(true)
  expect(screen.getByRole('option',{ name: 'Ayva'}).selected).toBe(false)

  await user.deselectOptions(fruits, ['armuut'])

  expect(screen.getByRole("option", { name: 'Armut'}).selected).toBe(false)
})

// timeout da verebiliriz. Sanirim default 5s. Bu zamani belirleyebiliriz. Sureyi gecerse failed olur.
// it, test yerine yazilabilirnir.

// test("test aciklamasi", () => {} )


// TDD = Test Driven Development. Yani once testini yaz. Test patlasin. Sonra componenti yap.