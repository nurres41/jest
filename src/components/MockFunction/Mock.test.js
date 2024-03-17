
it('should be returns undefined by default', () => {
    const mock = jest.fn()

    let result = mock('some arg')

    expect(result).toBeUndefined() // undefined dondugunu gor
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith('some arg')
})

it('should be mock implementation', () => {
    const mock = jest.fn(() => 'return something')

    expect(mock('some arg')).toBe('return something')
    expect(mock).toHaveBeenCalledWith('some arg')
})

it('should mock implementation one time', () => {
    // Bir kere return eder. Sonrasinda ise undefined
    const mock = jest.fn().mockImplementationOnce(() => 'return something')

    expect(mock('some arg')).toBe('return something')
    expect(mock).toHaveBeenCalledWith('some arg')

    expect(mock('baz')).toBe(undefined)
    expect(mock).toHaveBeenCalledWith('baz')
})

it('should mock return value', () => {
    const mock = jest.fn()
    // sadece value doner. Diger implementlerde istedigimizi yapabiliyoruz.
    mock.mockReturnValue('return something')

    expect(mock('some arg')).toBe('return something')
    expect(mock).toHaveBeenCalledWith('some arg')
})

it('should mock promise resolution', async () => {
    const mock = jest.fn().mockResolvedValue('return something')
    // async fonk. oldugu icin await ile cagirdik
    const result = await mock('some arg')

    expect(result).toBe('return something')
    expect(mock).toHaveBeenCalledWith('some arg')
    // bir diger yaklasim
    await expect(mock('some arg')).resolves.toBe('return something')
})

it('should mock promise rejection', async () => {
    const mock = jest.fn()

    mock.mockRejectedValue('Return')

    await expect(mock('arg')).rejects.toBe('Return')
})