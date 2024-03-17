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
        // eslint-disable-next-line testing-library/no-debugging-utils
        screen.debug()
        const listElements = screen.getAllByRole('listitem')
        expect(listElements).toHaveLength(MOCK_POSTS.length)
    })
})