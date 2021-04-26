import {currentUser} from './currentUser'
import {currentUserId} from './currentUser'

test("current user change state input",()=>{
    const text = currentUser('user1')
    expect(text).toBe(currentUserId)
    
    const text2 = currentUser('')
    expect(text2).toBe(currentUserId)
})
