import postService from "./post-service"
import axios from 'axios'
import { MOCK_POSTS } from '../mocks';

jest.mock('axios')

describe('axios test', () => {
    it('should be render axios data', async () => {
        const mockResponse = {
            data: MOCK_POSTS
        }
        axios.get.mockResolvedValue(mockResponse)

        const result = await postService.getPosts()

        expect(result).toHaveLength(MOCK_POSTS.length)
        expect(result).toMatchObject(MOCK_POSTS)
    })
})