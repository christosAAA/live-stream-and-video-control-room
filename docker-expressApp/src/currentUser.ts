let currentUserId: string

export const currentUser = (userId: string) => {
  currentUserId = userId
  return userId
}

export { currentUserId }
