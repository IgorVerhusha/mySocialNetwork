import { actions, followThunkCreator, unfollowThunkCreator } from './users-reducer'
import { usersAPI } from '../api/users-api'
import { APIResponseType, ResultCodeEnum } from '../api/api'

jest.mock('../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: APIResponseType = {
  resultCode: ResultCodeEnum.success,
  messages: [],
  data:{}
}
usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(()=>{
  dispatchMock.mockClear()
   getStateMock.mockClear()
  usersAPIMock.follow.mockClear()
  usersAPIMock.unfollow.mockClear()
})






test("test follow thunk", async () => {
  const thunk = followThunkCreator(3)


 await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 3))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(3))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 3))
});

test("test unfollow thunk", async () => {
  const thunk = unfollowThunkCreator(3)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 3))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(3))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 3))
});