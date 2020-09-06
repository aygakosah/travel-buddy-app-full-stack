let infoPosted = localStorage.getItem('infoPosted')
let travellersFound = JSON.parse(localStorage.getItem('travellersfound'))
const messages =document.querySelector('#messages')
const messageTemplate=document.querySelector('#message-template').innerHTML
const travellersTemplate=document.querySelector('#travellersTemplate').innerHTML


if(infoPosted){
    const html =Mustache.render(messageTemplate, {
        message:infoPosted
    })
    messages.insertAdjacentHTML('beforeend', html)
}
localStorage.removeItem('infoPosted')
console.log(travellersFound)
if(travellersFound.length>0){
    travellersFound.forEach(element => {
        const html =Mustache.render(travellersTemplate, {
            name:element.name,
            email:element.email,
            destination:element.destination,
            traveldate:element.departure_date,
            returndate:element.return_date
        })
        messages.insertAdjacentHTML('beforeend', html)
        
    });
}
localStorage.removeItem('travellersfound')

