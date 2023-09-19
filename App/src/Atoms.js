import {atom } from 'jotai'

export const MoviesAtom = atom([])

export const MembersAtom = atom([])

// atom to hold the version of local storage data, this way we will know if a subscription has been added without another call to the server to update data in all members page
export const StoreVersion = atom(0)


export const MoviesToSubscribeAtom = atom([])
