const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS'


// props.setUsers([
//     {
//         id: 1,
//         followed: true,
//         fullName: 'Igor',
//         status: 'in education process',
//         location: {city: 'Minsk', country: 'Belarus'},
//         avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2700.jpg'
//     },
//     {
//         id: 2,
//         followed: true,
//         fullName: 'Nikita',
//         status: 'repair conditioners',
//         location: {city: 'Smolevichi', country: 'Belarus'},
//         avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2506.jpg'
//     },
//     {
//         id: 3,
//         followed: false,
//         fullName: 'Anton',
//         status: 'arrest cars',
//         location: {city: 'Minsk', country: 'Belarus'},
//         avatar: 'https://cs16planet.ru/steam-avatars/images/avatar3317.jpg'
//     },
//     {
//         id: 4,
//         followed: true,
//         fullName: 'Andrey',
//         status: 'repair PC',
//         location: {city: 'Dubrovno', country: 'Belarus'},
//         avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2672.jpg'
//     },
//     {
//         id: 5,
//         followed: false,
//         fullName: 'Yuli',
//         status: 'doing nothing',
//         location: {city: 'Minsk', country: 'Belarus'},
//         avatar: 'https://cs16planet.ru/steam-avatars/images/avatar3171.jpg'
//     },
//     {
//         id: 6,
//         followed: true,
//         fullName: 'Vlad',
//         status: 'lend money',
//         location: {city: 'Dubrovno', country: 'Belarus'},
//         avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2812.jpg'
//     },
//     {
//         id: 7,
//         followed: true,
//         fullName: 'Zhenya',
//         status: 'working',
//         location: {city: 'Lida', country: 'Belarus'},
//         avatar: 'https://cs16planet.ru/steam-avatars/images/avatar3268.jpg'
//     }
// ])




let initialState = {
        users: []

};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId){
                        return {...u, followed: true}
                    }
                    return u;
                })
              }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId){
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default: return state;

    }




}

export let followAC = (userId) => {
    return {
        type: FOLLOW, userId
    }
}

export let unfollowAC = (userId) => {
    return {
        type: UNFOLLOW, userId
    }
}

export let setUsersAC = (users) => {
    return {
        type: SET_USERS, users
    }
}

export default usersReducer;