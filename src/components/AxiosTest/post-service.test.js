import postService from "./post-service"
import { MOCK_POSTS } from '../mocks';

// axios olmadan fetch calistirmak icin spyOn ile windowa gidip calistirmak gerekiyor.
const fetch = jest.spyOn(window, 'fetch')

describe('fetch test', () => {
    it('should be render axios data', async () => {
        fetch.mockResolvedValue({
            json: () => {
                return Promise.resolve({
                    data: MOCK_POSTS
                })
            }
        })

        const result = await postService.getPosts()

        expect(result).toHaveLength(MOCK_POSTS.length)
        expect(result).toMatchObject(MOCK_POSTS)
    })
})