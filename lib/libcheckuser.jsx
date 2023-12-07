export function isUserLoggedIn({session}) {
    return session?.user ? true : false;
}

export function isUserRole({session, role}) {
    return session?.user.role === role ? true : false;
}

function getUser({email}){}