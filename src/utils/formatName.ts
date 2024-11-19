const username=sessionStorage.getItem('username');

export const shortName=()=>{
    let namesList= username?.split(' ')
    let shortName=namesList?.map(eachName=>eachName[0].toUpperCase())
    return shortName?.join('')
}