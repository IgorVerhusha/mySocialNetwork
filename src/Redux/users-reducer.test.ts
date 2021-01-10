import usersReducer, {actions, initialState} from './users-reducer'
import { userType } from './types/types'

let state: initialState

beforeEach(()=>{
state = {
        users: [{
            id: 0,
            name: "testUser0",
            followed: false,
            status: "fkdkfsd",
            photos: {
                large:null,
                small:null
            }
        },
            {
                id: 1,
                name: "testUser1",
                followed: false,
                status: "fkdkfsd",
                photos: {
                    large:null,
                    small:null
                }
            },
            {
                id: 2,
                name: "testUser2",
                followed: true,
                status: "fkdkfsd",
                photos: {
                    large:null,
                    small:null
                }
            },
            {
                id: 3,
                name: "testUser3",
                followed: true,
                status: "fkdkfsd",
                photos: {
                    large:null,
                    small:null
                }
            }] as Array<userType>,
        pageSize: 10 as number,
        totalUsersCount: 0 as number,
        currentPage: 1 as number,
        isFetching: false as boolean,
        followingInProgress: [] as Array<number>,
        paginatorPage: 1 as number,
    }
})

test('', () => {
 const newState = usersReducer(state, actions.follow(1))

    expect(newState.users[0].followed).toBeFalsy()
        expect(newState.users[1].followed).toBeTruthy()
})

test('', () => {
    const newState = usersReducer(state, actions.unfollow(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})