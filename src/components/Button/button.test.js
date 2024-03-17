// Normalde test veya it ile test yazariz.
// Fakat describe kullanarak bunlari bir catir altinda toplamak mantiklidir.
// Kisacasi describe ile gruplandirma yapariz. 
// arrange - act - assertion

import { render, screen } from "@testing-library/react"
import { Button } from "./button"

import { userEvent } from '@testing-library/user-event';

// mock function aslinda hicbir sey yapmiyor
const randomFunction = jest.fn()

describe('Button component', () => {
    it('should be call onClick function when clicked button', async () => {
        const user = userEvent.setup()
        render(<Button onClick={randomFunction}>Modern Testing</Button>)

        const buttonElement = screen.getByRole('button')
        
        await user.click(buttonElement)

        expect(randomFunction).toHaveBeenCalled()
        expect(randomFunction).toHaveBeenCalledTimes(1)
        expect(randomFunction).toHaveBeenCalledWith('Clicked')
    })
})