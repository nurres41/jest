import { render, screen } from "@testing-library/react";
import FetchData from "./fetchData";
import { MOCK_POSTS } from './mocks';

// mock data kullaniyoruz.
// boylelikle end pointe istek atmadan test yapabiliyoruz
jest.mock('../hooks/useFetch', () => {
    return {
        useFetch: () => {
            return {
                isLoading: false,
                data: MOCK_POSTS
            }
        }
    }
})


describe('Fetch Data', () => {
    it('should be fetch mock data', () => {
        render(<FetchData />)

        const listElements = screen.getAllByRole('listitem')
        expect(listElements).toHaveLength(MOCK_POSTS.length)
    })
})